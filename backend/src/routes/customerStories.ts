import { Router } from "express";
import { getCustomerStories } from "../controllers/customerStories.controller";

const router = Router();
router.get("/", getCustomerStories);

export default router;
