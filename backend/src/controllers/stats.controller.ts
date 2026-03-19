import { Request, Response } from "express";
import { getStatsService } from "../services/stats.service";

export const getStats = async (_req: Request, res: Response) => {
  try {
    const stats = await getStatsService();
    res.json({ data: stats });
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    res.status(500).json({ error: "Failed to fetch platform stats" });
  }
};
