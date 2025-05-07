import { generationConfig, model } from "../config/geminiquiz";
import { IQuizInput, QuizQuestion } from "../interfaces/quiz.types";
import { QuizModel, IQuiz } from "../models/quiz.model";

export async function generateQuiz(input: IQuizInput): Promise<QuizQuestion[]> {
  if (!input) {
    throw new Error("Input is required");
  }

  const { topic, academicLevel, numberOfQuestions, duration, difficulty } = input;
  const durationLine = duration ? `The quiz should last for ${duration} minutes.` : "";

  const userPrompt = `
    Generate a quiz on the topic "${topic}" for ${academicLevel} students.
    The quiz should contain ${numberOfQuestions} questions of type MCQ.
    ${durationLine}. It should be of ${difficulty} difficulty.
    Provide each question with options (if applicable), and clearly mark the correct answer.
    Format the output as a JSON array of questions with fields: question, options, correct_answer where applicable and without
    any introductory text, explanations or markdown.
  `;

  console.log(`Generating quiz for ${topic}, ${academicLevel}...`);

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      generationConfig
    });

    const response = result.response;
    if (!response || !response.candidates || response.candidates.length === 0) {
      throw new Error("API returned an empty or invalid response.");
    }

    const responseText = response.text();
    if (!responseText) {
      throw new Error("API response text is empty.");
    }

    const cleanedText = responseText.trim().replace(/^json\s*/, '').trim();

    try {
      const quizData: QuizQuestion[] = JSON.parse(cleanedText);
      console.log(`Successfully generated ${quizData.length} questions for topic: ${topic}`);
      return quizData;
    } catch (parseError) {
      console.error("Failed to parse JSON from API response.", parseError);
      console.error("Cleaned response text was: ", cleanedText);
      throw new Error("Failed to parse the quiz data received from AI model.");
    }

  } catch (error) {
    console.error("Failed to generate content via Gemini API.", error);
    if (error instanceof Error) {
      throw new Error(`Quiz generation failed: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred during quiz generation.");
    }
  }
}

// Create and save a new quiz
export async function createQuiz(userId: string, input: IQuizInput): Promise<IQuiz> {
  const questions = await generateQuiz(input);

  const newQuiz = new QuizModel({
    userId,
    topic: input.topic,
    academicLevel: input.academicLevel,
    difficulty: input.difficulty,
    numberOfQuestions: input.numberOfQuestions,
    duration: input.duration,
    questions,
    answers: Array(input.numberOfQuestions).fill(null),
    progress: 0
  });

  return await newQuiz.save();
}

// Submit an answer and update progress
export async function submitAnswer(userId: string, quizId: string, questionIndex: number, answer: string): Promise<IQuiz> {
  const quiz = await QuizModel.findById(quizId || { userId });
  if (!quiz) throw new Error('Quiz not found');

  quiz.answers[questionIndex] = answer;

  const answeredCount = quiz.answers.filter(ans => ans !== null).length;
  quiz.progress = answeredCount / quiz.numberOfQuestions;

  return await quiz.save();
}

// Get quiz by ID
export async function getQuizById(quizId: string): Promise<IQuiz | null> {
  return await QuizModel.findById(quizId);
}

// Get user progress
export async function getQuizProgress(quizId: string, userId: string): Promise<number> {
  const quiz = await QuizModel.findById(quizId || { userId });
  if (!quiz) throw new Error('Quiz not found');
  return quiz.progress;
}
