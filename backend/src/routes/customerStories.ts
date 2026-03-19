import { Router, Request, Response } from "express";
import { db } from "../db/connection";
import { customerStories } from "../db/schema";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
  try {
    const stories = await db.select().from(customerStories);
    res.json({ data: stories });
  } catch (error) {
    console.error("Failed to fetch customer stories:", error);
    res.status(500).json({ error: "Failed to fetch customer stories" });
  }
});

export default router;
