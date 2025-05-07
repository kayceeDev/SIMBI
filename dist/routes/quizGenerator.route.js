"use strict";
/*import express from 'express';
import { Request, Response } from 'express';
import { generateQuiz, IQuizInput } from '../middlewares/quizGenerator.middleware';

const router = express.Router();

router.post('/generate-quiz', async (req: Request, res: Response) : Promise<void> => {
    try {
    const input: IQuizInput = req.body;
    const quiz = await generateQuiz(input);
    res.json(quiz);
    } catch (error) {
        res.status(500).json({error: 'Failed to generate quiz'})
    }
});
// Quiz generator api
app.post('/api/quiz', async (req: Request, res: Response):Promise<any> => {
    const { topic, academicLevel, questionType, numberOfQuestions, duration } = req.body;
  
    // Basic validation
    if (!topic || !academicLevel || !numberOfQuestions || !questionType) {
        res.status(400).json({ error: 'Missing required parameters: topic, academicLevel, numQuestions, questionType' });
    }
    if (typeof numberOfQuestions !== 'number' || numberOfQuestions <= 0) {
        res.status(400).json({ error: 'numQuestions must be a positive number' });
    }
     if (questionType !== 'MCQ' && questionType !== 'Short Answer') {
        res.status(400).json({ error: 'questionType must be either "MCQ" or "Short Answer"' });
     }
  
    const params: IQuizInput = {
        topic,
        academicLevel,
        numberOfQuestions,
        questionType,
        duration // Pass optional duration if provided
    };
  
    try {
        // --- Call the Generation Function ---
        const quizJson: QuizQuestion[] = await generateQuiz(params);
  
        // --- Send Successful Response ---
        res.status(200).json(quizJson);
  
    } catch (error) {
        // --- Handle Errors from Generation ---
        console.error(`API Route Error generating quiz for topic "${topic}":`, error);
  
        // Send an appropriate server error response
        const message = (error instanceof Error) ? error.message : 'An internal server error occurred while generating the quiz.';
        res.status(500).json({ error: 'Quiz generation failed', details: message });
    }
  });

export default router;*/ 
