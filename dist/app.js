import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import express from 'express';
import OpenAI from 'openai';
import quizGenerator from '../src/routes/quizGenerator.route';
//Initialize OpenAI API Client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
//Initialize Google Auth Client
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET);
//Initialize Express App
const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();
app.use(bodyParser.json());
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
//Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
