import { Router } from "express";
import { getQuizHistoryHandler } from "../controllers/quizHistory.controller";

const router = Router();

router.get("/:userId/history", getQuizHistoryHandler);

export default router;