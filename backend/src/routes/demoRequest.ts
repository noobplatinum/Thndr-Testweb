import { Router, Request, Response } from "express";
import { z } from "zod";
import { db } from "../db/connection";
import { demoRequests } from "../db/schema";

const router = Router();

const demoRequestSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  email: z.string().email("Invalid email address").max(255),
  company: z.string().min(1, "Company is required").max(255),
  message: z.string().max(2000).optional(),
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const validated = demoRequestSchema.parse(req.body);

    const [result] = await db
      .insert(demoRequests)
      .values({
        name: validated.name,
        email: validated.email,
        company: validated.company,
        message: validated.message ?? null,
      })
      .returning({ id: demoRequests.id });

    res.status(201).json({
      message: "Demo request submitted successfully",
      id: result.id,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        error: "Validation failed",
        details: error.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      });
      return;
    }

    console.error("Failed to submit demo request:", error);
    res.status(500).json({ error: "Failed to submit demo request" });
  }
});

export default router;
