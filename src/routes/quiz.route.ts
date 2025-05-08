//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODFjMWU2Y2NkYWU3NjEyY2VjNjlmYWEiLCJpYXQiOjE3NDY2NzMzMTQsImV4cCI6MTc0NjY3NjkxNH0.K3UWALZbISsd6eV0t7mlCwMLaocnG3tSUee-yiMY8Vw"


import { Router } from "express";
import { generateQuizHandler, submitAnswerHandler, getQuizHandler, getProgressHandler } from "../controllers/quiz.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

// Apply auth middleware to all quiz routes
router.use(authMiddleware);

router.post("/generate", generateQuizHandler);
router.post('/:quizId/answer', submitAnswerHandler);
router.get('/:quizId', getQuizHandler);
router.get('/:quizId/progress', getProgressHandler);

export default router;