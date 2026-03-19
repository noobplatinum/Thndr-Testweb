import { db } from "../db/connection";
import { demoRequests } from "../db/schema";
import { sql } from "drizzle-orm";

let ensureDemoRequestTablePromise: Promise<void> | null = null;

const ensureDemoRequestTable = async (): Promise<void> => {
  if (!ensureDemoRequestTablePromise) {
    ensureDemoRequestTablePromise = db
      .execute(sql`
        CREATE TABLE IF NOT EXISTS demo_requests (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          company VARCHAR(255) NOT NULL,
          message TEXT,
          created_at TIMESTAMP DEFAULT NOW() NOT NULL
        )
      `)
      .then(() => undefined);
  }

  await ensureDemoRequestTablePromise;
};

export const createDemoRequestService = async (email: string, name?: string, company?: string) => {
  await ensureDemoRequestTable();
  return await db.insert(demoRequests).values({ email, name: name || "", company: company || "" }).returning();
};
