var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import { generateQuiz } from '../middlewares/quizGenerator.middleware';
const router = express.Router();
router.post('/generate-quiz', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const input = req.body;
        const quiz = yield generateQuiz(input);
        res.json(quiz);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to generate quiz' });
    }
}));
export default router;
