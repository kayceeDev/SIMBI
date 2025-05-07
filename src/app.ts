import express, { Express } from 'express';
import cors from 'cors';
import { connectDB } from './config/database';

const app: Express = express();

connectDB();



export default app;
