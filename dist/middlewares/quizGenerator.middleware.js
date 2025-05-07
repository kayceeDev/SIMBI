"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQuiz = generateQuiz;
const generative_ai_1 = require("@google/generative-ai");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-pro-preview-03-25'
});
;
const generationConfig = {
    responseMimeType: 'application/json',
    temperature: 0.7
};
function generateQuiz(input) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!input) {
            throw new Error('Input is required');
        }
        const { topic, academicLevel, questionType, numberOfQuestions, duration } = input;
        const durationLine = duration ? `The quiz should last for ${duration} minutes.` : '';
        const userPrompt = `
    Generate a quiz on the topic ${topic} for ${academicLevel} students.
    The quiz should contain ${numberOfQuestions} questions of type ${questionType}.
    ${durationLine}.
    Provide each question with options (if applicable), and clearly mark the correct answer.
    Format the output as a JSON array of questions with fields: question, options, correct_answer where applicable and without
    any introductory text, explanations or markdown.`;
        console.log(`Generating quiz for ${topic}, ${academicLevel}...`);
        try {
            const result = yield model.generateContent({
                contents: [{ role: "user", parts: [{ text: userPrompt }] }],
                generationConfig: generationConfig
            });
            const response = result.response;
            if (!response || !response.candidates || response.candidates.length === 0) {
                //Throe error to be caught by route handler
                throw new Error("API returned an empty or invalid response.");
            }
            const responseText = response.text();
            if (!responseText) {
                throw new Error("API response text is empty.");
            }
            ;
            //Clean and parse
            const cleanedText = responseText.trim().replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();
            try {
                const quizData = JSON.parse(cleanedText);
                console.log(`Successfully generated ${quizData.length} questions for topic: ${topic}`);
                return quizData;
            }
            catch (parseError) {
                console.error("Backend error: Failed to parse JSON from API response.", parseError);
                console.error("Cleaned response text was: ", cleanedText);
                //Throw a more specific error
                throw new Error("Failed to parse the quiz data received from AI model.");
            }
        }
        catch (error) {
            console.error("Backend Error: Failed to generate content via Gemini API.", error);
            if (error instanceof Error) {
                throw new Error(`Quiz generation failed: ${error.message}`);
            }
            else {
                throw new Error("An unknon error occurred during quiz generation.");
            }
        }
    });
}
