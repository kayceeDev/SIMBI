// src/routes/aiPlan.routes.ts
import { Router } from "express";
import AIPlanController from "../controllers/aiPlan.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

// Protect the AI plan generation route with authentication
router.post("/ask-simbi", authMiddleware, AIPlanController.generate);

export default router;
