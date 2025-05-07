import { Router } from "express";
import { generateQuizHandler, submitAnswerHandler,
    getQuizHandler, getProgressHandler
 } from "../controllers/quiz.controller";

const router = Router();

router.post("/generate", generateQuizHandler);
router.post('/:quizId/answer', submitAnswerHandler);
router.get('/:quizId', getQuizHandler);
router.get('/:quizId/progress', getProgressHandler);

export default router;