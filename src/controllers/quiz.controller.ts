import { Request, Response } from "express";
import { IQuizInput } from "../interfaces/quiz.types";
import * as quizService from "../services/quiz.service";

export const generateQuizHandler = async (req: Request, res: Response) => {
  try {
    const input: IQuizInput = req.body;
    const quiz = await quizService.generateQuiz(input);
    res.status(200).json({ success: true, data: quiz });
  } catch (error: any) {
    console.error("Controller error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const submitAnswerHandler = async (req: Request, res: Response) => {
  try {
    const { userId, quizId } = req.params;
    const { questionIndex, answer } = req.body;
    const quiz = await quizService.submitAnswer(userId, quizId, questionIndex, answer);
    res.status(200).json({ progress: quiz.progress });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getQuizHandler = async (req: Request, res: Response) => {
  const quiz = await quizService.getQuizById(req.params.quizId);
  quiz ? res.json(quiz) : res.status(404).json({ error: 'Quiz not found' });
};

export const getProgressHandler = async (req: Request, res: Response) => {
  try {
    const progress = await quizService.getQuizProgress(req.params.quizId, req.params.userId);
    res.json({ progress });
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};