import { Router } from "express";
import { handleGenerateQuiz } from "../controllers/quiz.controller";

const router = Router();

router.post("/generate", handleGenerateQuiz);

export default router;