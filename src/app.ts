import express, { Express } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import authRoutes from './routes/auth.route';
import mongoose from 'mongoose';
import errorHandler from './middlewares/auth.middleware';


dotenv.config();

const app: Express = express();
app.use(express.json());

connectDB();


app.use('/api/auth', authRoutes);


app.use(errorHandler);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

export default app;