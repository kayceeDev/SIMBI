import OpenAI from "openai";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";


dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
//const openai = new OpenAIApi(configuration);

export interface IQuizInput {
    topic: string;
    academicLevel: 'secondary school' | 'university' | 'personal development';
    questionType: 'MCQ' | 'True/False' | 'Short Answer';
    numberOfQuestions: number;
    duration?: number; // in minutes
}

export async function generateQuiz(input : IQuizInput) {
    const { topic, academicLevel, questionType, numberOfQuestions, duration } = input;
    const durationLine = duration ? `The quiz should last for ${duration} minutes.` : '';

    const userPrompt = `
    Generate a quiz on the topic ${topic} for ${academicLevel} students.
    The quiz should contain ${numberOfQuestions} questions of type ${questionType}.
    ${durationLine}.
    Provide each question with options (if applicable), and clearly mark the correct answer.
    Format the output as a JSON array of questions with fields: question, options, correct_answer.`;


    const response = await openai.chat.completions.create({
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

    const result = response.choices[0].message?.content;
    if (!result) {
        throw new Error('No response from GPT-4');
    }
    try {
        //Attempt to parse if response is valid
        const parsed = JSON.parse(result);
        return {
            title: `${academicLevel} Quiz on ${topic}`,
            duration,
            questions : parsed,
        };
    } catch {
        //Return raw content if JSON parsing fails
        return {
            title: `${academicLevel} Quiz on ${topic}`,
            duration,
            raw: result
        };
    }
};