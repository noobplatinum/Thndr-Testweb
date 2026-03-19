import { db } from "../db/connection";
import { customerStories } from "../db/schema";
import { desc } from "drizzle-orm";

export const getCustomerStoriesService = async () => {
  return await db.select().from(customerStories).orderBy(desc(customerStories.createdAt));
};
