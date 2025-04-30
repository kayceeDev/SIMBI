import express from 'express';
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

export default router;