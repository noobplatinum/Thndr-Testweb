import { Router } from "express";
import { submitDemoRequest } from "../controllers/demoRequest.controller";

const router = Router();
router.post("/", submitDemoRequest);

export default router;
