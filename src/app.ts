import {OAuth2Client} from 'google-auth-library';
import dotenv from 'dotenv'; 
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';
import {Request, Response, NextFunction} from 'express';
import OpenAI from 'openai';
import quizGenerator from '../src/routes/quizGenerator.route'
import { QuizQuestion, IMCQQuestion, IQuizInput, IShortAnswerQuestion, 
  ITrueFalseQuestion, generateQuiz } 
  from './middlewares/quizGenerator.middleware';

//Initialize OpenAI API Client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

//Initialize Google Auth Client
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET);

//Initialize Express App
const app : Express = express();
const PORT = process.env.PORT || 3000;
dotenv.config();
app.use(bodyParser.json());
app.use(cors());


//Start server
app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`)
});
import express, { Express } from 'express';
import { connectDB } from './config/database';
import { AnyARecord } from 'node:dns';


//const app: Express = express();


connectDB();



export default app;
