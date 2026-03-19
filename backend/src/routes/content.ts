import { Router } from "express";
import { getAllContent, updateContent, deleteContent } from "../controllers/content.controller";

const router = Router();
router.get("/", getAllContent);
router.post("/", updateContent);
router.delete("/:section", deleteContent);

export default router;
