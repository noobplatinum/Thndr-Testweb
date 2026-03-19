import { Request, Response } from "express";
import { getCustomerStoriesService } from "../services/customerStories.service";

export const getCustomerStories = async (_req: Request, res: Response) => {
  try {
    const stories = await getCustomerStoriesService();
    res.json({ data: stories });
  } catch (error) {
    console.error("Failed to fetch customer stories:", error);
    res.status(500).json({ error: "Failed to fetch customer stories" });
  }
};
