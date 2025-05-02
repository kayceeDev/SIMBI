"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQuiz = generateQuiz;
const openai_1 = __importDefault(require("openai"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
function generateQuiz(input) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const { topic, academicLevel, questionType, numberOfQuestions, duration } = input;
        const durationLine = duration ? `The quiz should last for ${duration} minutes.` : '';
        const userPrompt = `
    Generate a quiz on the topic ${topic} for ${academicLevel} students.
    The quiz should contain ${numberOfQuestions} questions of type ${questionType}.
    ${durationLine}.
    Provide each question with options (if applicable), and clearly mark the correct answer.
    Format the output as a JSON array of questions with fields: question, options, correct_answer.`;
        const response = yield openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: 'You are a test generator. You return quiz questions in JSON format.'
                },
                {
                    role: 'user',
                    content: userPrompt.trim()
                }
            ],
            temperature: 0.7
        });
        const result = (_a = response.choices[0].message) === null || _a === void 0 ? void 0 : _a.content;
        if (!result) {
            throw new Error('No response from GPT-4');
        }
        try {
            //Attempt to parse if response is valid
            const parsed = JSON.parse(result);
            return {
                title: `${academicLevel} Quiz on ${topic}`,
                duration,
                questions: parsed,
            };
        }
        catch (_b) {
            //Return raw content if JSON parsing fails
            return {
                title: `${academicLevel} Quiz on ${topic}`,
                duration,
                raw: result
            };
        }
    });
}
;
