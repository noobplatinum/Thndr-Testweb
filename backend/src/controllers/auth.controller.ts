import { Request, Response } from "express";
import { createUserService, loginUserService } from "../services/auth.service";

const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export const signupUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { username, email, password } = req.body;

    if (!username || typeof username !== "string" || username.trim().length < 2) {
      return res.status(400).json({ error: "Username must be at least 2 characters" });
    }

    if (!email || typeof email !== "string" || !isValidEmail(email)) {
      return res.status(400).json({ error: "A valid email is required" });
    }

    if (!password || typeof password !== "string" || password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    const user = await createUserService(username, email, password);
    return res.status(201).json({ message: "Signup successful", user });
  } catch (error) {
    if (error instanceof Error && error.message === "User already exists") {
      return res.status(409).json({ error: "User already exists" });
    }

    return res.status(500).json({ error: "Failed to create user" });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { login, password } = req.body;

    if (!login || typeof login !== "string") {
      return res.status(400).json({ error: "Email or username is required" });
    }

    if (!password || typeof password !== "string") {
      return res.status(400).json({ error: "Password is required" });
    }

    const user = await loginUserService(login, password);
    return res.json({ message: "Login successful", user });
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid credentials") {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    return res.status(500).json({ error: "Failed to login" });
  }
};
