import express, { Express } from 'express';
import cors from 'cors';
import { connectDB } from './config/database';

const app: Express = express();

// CORS configuration - more permissive for development
app.use(cors({
  origin: '*',  // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  credentials: true
}));

// Parse JSON bodies
app.use(express.json());

connectDB();

export default app;