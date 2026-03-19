import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { or, eq, sql } from "drizzle-orm";
import { db } from "../db/connection";
import { users } from "../db/schema";

interface SanitizedUser {
  id: number;
  username: string;
  email: string;
  createdAt: Date;
}

let ensureUsersTablePromise: Promise<void> | null = null;

const ensureUsersTable = async (): Promise<void> => {
  if (!ensureUsersTablePromise) {
    ensureUsersTablePromise = db
      .execute(sql`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(80) UNIQUE NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT NOW() NOT NULL
        )
      `)
      .then(() => undefined);
  }

  await ensureUsersTablePromise;
};

const hashPassword = (password: string): string => {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
};

const verifyPassword = (password: string, storedHash: string): boolean => {
  const [salt, originalHash] = storedHash.split(":");
  if (!salt || !originalHash) {
    return false;
  }

  const computedHash = scryptSync(password, salt, 64).toString("hex");
  const originalBuffer = Buffer.from(originalHash, "hex");
  const computedBuffer = Buffer.from(computedHash, "hex");

  if (originalBuffer.length !== computedBuffer.length) {
    return false;
  }

  return timingSafeEqual(originalBuffer, computedBuffer);
};

const sanitizeUser = (user: typeof users.$inferSelect): SanitizedUser => ({
  id: user.id,
  username: user.username,
  email: user.email,
  createdAt: user.createdAt,
});

export const createUserService = async (
  username: string,
  email: string,
  password: string
): Promise<SanitizedUser> => {
  await ensureUsersTable();

  const normalizedUsername = username.trim();
  const normalizedEmail = email.trim().toLowerCase();

  const existing = await db
    .select({ id: users.id })
    .from(users)
    .where(or(eq(users.username, normalizedUsername), eq(users.email, normalizedEmail)))
    .limit(1);

  if (existing.length > 0) {
    throw new Error("User already exists");
  }

  const [created] = await db
    .insert(users)
    .values({
      username: normalizedUsername,
      email: normalizedEmail,
      passwordHash: hashPassword(password),
    })
    .returning();

  return sanitizeUser(created);
};

export const loginUserService = async (login: string, password: string): Promise<SanitizedUser> => {
  await ensureUsersTable();

  const normalizedLogin = login.trim().toLowerCase();

  const [user] = await db
    .select()
    .from(users)
    .where(or(eq(users.email, normalizedLogin), eq(users.username, login.trim())))
    .limit(1);

  if (!user || !verifyPassword(password, user.passwordHash)) {
    throw new Error("Invalid credentials");
  }

  return sanitizeUser(user);
};
