import express from "express";
import { createRoadmap } from "../controllers/roadmapController";
import protect from "../middleware/auth.middleware";

const router = express.Router();
router.post("/", protect,createRoadmap);

export default router;