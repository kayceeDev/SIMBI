import { Request, Response } from "express";
import { generateQuiz } from "../services/quiz.service";
import { IQuizInput } from "../types/quiz.types";

export const handleGenerateQuiz = async (req: Request, res: Response) => {
  try {
    const input: IQuizInput = req.body;
    const quiz = await generateQuiz(input);
    res.status(200).json({ success: true, data: quiz });
  } catch (error: any) {
    console.error("Controller error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};