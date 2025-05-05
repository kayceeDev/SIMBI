export interface IQuizInput {
    topic: string;
    academicLevel: 'secondary school' | 'university' | 'personal development';
    questionType: 'MCQ' | 'True/False' | 'Short Answer';
    numberOfQuestions: number;
    duration?: number; // in minutes
  }
  
  export interface IMCQQuestion {
    question: string;
    options: string[];
    correct_answer: string;
  }
  
  export interface IShortAnswerQuestion {
    question: string;
    correct_answer: string;
  }
  
  export interface ITrueFalseQuestion {
    question: string;
    correct_answer: 'True' | 'False';
  }
  
  export type QuizQuestion = IMCQQuestion | IShortAnswerQuestion | ITrueFalseQuestion;