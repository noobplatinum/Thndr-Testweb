import { Request, Response } from "express";
import { createDemoRequestService } from "../services/demoRequest.service";

export const submitDemoRequest = async (req: Request, res: Response) => {
  try {
    const { email, name, company, message } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    const result = await createDemoRequestService(email, name, company, message);
    res.status(201).json({ message: "Demo request received", data: result[0] });
  } catch (error) {
    console.error("Failed to process demo request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
