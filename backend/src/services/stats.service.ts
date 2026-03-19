import { db } from "../db/connection";
import { platformStats } from "../db/schema";
import { asc } from "drizzle-orm";

export const getStatsService = async () => {
  return await db.select().from(platformStats).orderBy(asc(platformStats.sortOrder));
};
