import express from 'express';
import { connectDB } from './config/database';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware here (bodyParser, routes, etc.)

connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
