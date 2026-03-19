import { Router, Request, Response } from "express";
import { db } from "../db/connection";
import { platformStats } from "../db/schema";
import { asc } from "drizzle-orm";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const stats = await db
      .select()
      .from(platformStats)
      .orderBy(asc(platformStats.sortOrder));

    res.json({ data: stats });
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    res.status(500).json({ error: "Failed to fetch platform stats" });
  }
});

export default router;
