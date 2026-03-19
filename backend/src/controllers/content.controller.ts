import { Request, Response } from "express";
import { getContentService, updateContentService, deleteContentService } from "../services/content.service";

const ADMIN_BEARER_TOKEN = process.env.ADMIN_BEARER_TOKEN || "supersecretadmin";

function isAuthorized(authHeader: string | undefined): boolean {
  return authHeader === `Bearer ${ADMIN_BEARER_TOKEN}`;
}

function parseSection(value: unknown): string | null {
  if (Array.isArray(value)) {
    value = value[0];
  }

  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
}

export const getAllContent = async (_req: Request, res: Response) => {
  try {
    const content = await getContentService();
    res.json({ data: content });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch content" });
  }
};

export const updateContent = async (req: Request, res: Response): Promise<any> => {
  try {
    const { section, data } = req.body;
    const authHeader = req.headers.authorization;
    if (!isAuthorized(authHeader)) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const normalizedSection = parseSection(section);
    if (!normalizedSection) {
      return res.status(400).json({ error: "Invalid section" });
    }

    if (typeof data === "undefined") {
      return res.status(400).json({ error: "Missing data payload" });
    }

    const result = await updateContentService(normalizedSection, JSON.stringify(data));
    res.json({ message: "Content updated", data: result });
  } catch (error) {
    res.status(500).json({ error: "Failed to update content" });
  }
};

export const deleteContent = async (req: Request, res: Response): Promise<any> => {
  try {
    const section = parseSection(req.params.section);
    const authHeader = req.headers.authorization;
    if (!isAuthorized(authHeader)) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if (!section) {
      return res.status(400).json({ error: "Invalid section parameter" });
    }
    const result = await deleteContentService(section);
    res.json({ message: "Content deleted", data: result });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete content" });
  }
};
