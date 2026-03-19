import { db } from "../db/connection";
import { siteContent } from "../db/schema";
import { eq, sql } from "drizzle-orm";

let ensureTablePromise: Promise<void> | null = null;

const ensureSiteContentTable = async (): Promise<void> => {
  if (!ensureTablePromise) {
    ensureTablePromise = db
      .execute(sql`
        CREATE TABLE IF NOT EXISTS site_content (
          section TEXT PRIMARY KEY,
          data TEXT
        )
      `)
      .then(() => undefined);
  }

  await ensureTablePromise;
};

export const getContentService = async () => {
  await ensureSiteContentTable();
  return await db.select().from(siteContent);
};

export const updateContentService = async (section: string, data: string) => {
  await ensureSiteContentTable();
  const existing = await db.select().from(siteContent).where(eq(siteContent.section, section));
  if (existing.length > 0) {
    return await db.update(siteContent).set({ data }).where(eq(siteContent.section, section)).returning();
  } else {
    return await db.insert(siteContent).values({ section, data }).returning();
  }
};

export const deleteContentService = async (section: string) => {
  await ensureSiteContentTable();
  return await db.delete(siteContent).where(eq(siteContent.section, section)).returning();
};
