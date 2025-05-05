import { GoogleGenerativeAI, GenerationConfig } from "@google/generative-ai";
import * as dotenv from "dotenv";


dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-pro-preview-03-25'
});


export interface IQuizInput {
    topic: string;
    academicLevel: 'secondary school' | 'university' | 'personal development';
    questionType: 'MCQ' | 'True/False' | 'Short Answer';
    numberOfQuestions: number;
    duration?: number; // in minutes
}

//Interface for expected JSON output
export interface IMCQQuestion {
    question: string,
    options: string[],
    correct_answer: string
}

export interface IShortAnswerQuestion {
    question: string,
    correct_answer: string
}

export interface ITrueFalseQuestion {
    question: string,
    correct_answer: 'True' | 'False'
};

export type QuizQuestion = IMCQQuestion | IShortAnswerQuestion | ITrueFalseQuestion;

const generationConfig: GenerationConfig = {
    responseMimeType: 'application/json',
    temperature: 0.7
};

export async function generateQuiz(input : IQuizInput): Promise<QuizQuestion[]> {
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
    any introductory text, explanations or markdown.`
    ;
    console.log(`Generating quiz for ${topic}, ${academicLevel}...`);
    try {
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: userPrompt }] }],
            generationConfig: generationConfig
        });

        const response = result.response;
        if (!response ||!response.candidates || response.candidates.length === 0) {
        //Throe error to be caught by route handler
        throw new Error("API returned an empty or invalid response.");
        }

        const responseText = response.text();
        if (!responseText) {
            throw new Error("API response text is empty.")
        };

        //Clean and parse
        const cleanedText = responseText.trim().replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();

        try{
            const quizData: QuizQuestion[] =JSON.parse(cleanedText);
            console.log(`Successfully generated ${quizData.length} questions for topic: ${topic}`);
            return quizData;
        } catch (parseError) {
            console.error("Backend error: Failed to parse JSON from API response.", parseError);
            console.error("Cleaned response text was: ", cleanedText);
            //Throw a more specific error
            throw new Error("Failed to parse the quiz data received from AI model.");
        }
    

    } catch (error) {
        console.error("Backend Error: Failed to generate content via Gemini API.", error);
        if (error instanceof Error) {
            throw new Error(`Quiz generation failed: ${error.message}`);
        } else {
            throw new Error("An unknon error occurred during quiz generation.");
        }
    }
}





 