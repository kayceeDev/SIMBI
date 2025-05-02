import {OAuth2Client} from 'google-auth-library';
import dotenv from 'dotenv'; 
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';
import {Request, Response, NextFunction} from 'express';
import OpenAI from 'openai';
import quizGenerator from '../src/routes/quizGenerator.route'

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

// Endpoint to handle Google Sign in
/*app.post('api/auth/google', async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    //Extract the ID token from the request body
    const {idToken} = req.body;
    if (!idToken) {
        return res.status(400).json({error: 'ID token is required'});
    }
    try {
        //verify the ID token
        const ticket = await client.verifyIdToken({
            idToken,
            audience: CLIENT_ID,
        });

        const payload = ticket.getPayload(); //Get the user info from the token
        const userId = payload?.sub;
        const email = payload?.email;

        const user = await User.findorCreate({
            googleId: userId,
            email: email,
        });
        return res.status(200).json({
            message: 'User authenticated successfully',
            user: {
                id: user.id,
                email: user.email,
            },
        });
    } catch (error) {
        console.error('Error verifying ID token:', error);
        return res.status(401).json({error: 'Invalid ID token'});
    }
});*/

//Endpoint to handle quizGenerator
app.use('/api', quizGenerator);

//Endpoint for queries to OpenAI
app.post('/api/generate', async (req: Request, res: Response): Promise<void> => {
    const {prompt} = req.body;
    if (!prompt) {
        res.status(400).json({error: 'Prompt is required'});
    }
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful assistant.'
                },
                {
                    role: 'user',
                    content: prompt.trim()
                },
            ],
            temperature: 0.7,
        });
        const result = response.choices[0]?.message?.content;
        res.json({
            response: result
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Something went wrong while generating the response'
        })
    }
}); 

// DeepSeek Integration Service
class DeepSeekService {
  private readonly apiUrl: string;
  private readonly apiKey: string;

  constructor() {
    this.apiUrl = process.env.DEEPSEEK_API_URL!;
    this.apiKey = process.env.DEEPSEEK_API_KEY!;
  }

  async generateResponse(query: string): Promise<string> {
    try {
      const response = await axios.post(
        this.apiUrl,
        {
          query,
          mode: 'deepthink-r1',
          max_tokens: 1000
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.choices[0].text;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error(`DeepSeek API Error: ${error.response?.data?.error || error.message}`);
      }
      throw new Error('Unknown API error');
    }
  }
}
  
// API Endpoint for DeepSeek queries
app.post('/api/generate', async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    try {
      const { query } = req.body;
      
      if (!query) {
        res.status(400).json({ error: 'Query parameter is required' });
      }
  
      const deepseek = new DeepSeekService();
      const response = await deepseek.generateResponse(query);
      
      res.json({ response });
    } catch (error) {
      console.error('[API Error]', error);
      res.status(500).json({ error: error instanceof Error ? error.message : 'Internal server error' });
    }
});
  
 
//Start server
app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`)
});
import express, { Express } from 'express';
import { connectDB } from './config/database';


//const app: Express = express();


connectDB();



export default app;
