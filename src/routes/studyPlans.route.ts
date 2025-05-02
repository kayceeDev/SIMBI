import { Router } from 'express';
import StudySessionController from '../controllers/studyPlan.controller';
import authMiddleware from '../middlewares/auth.middleware'; // Import the authentication middleware

const router = Router();

// Apply the authentication middleware to all study session routes
router.use(authMiddleware);

// Route to create a new study session
router.post('/sessions', StudySessionController.createSession);

// Route to get all study sessions for the user (optionally filtered by status)
router.get('/sessions', StudySessionController.getUserSessions);

// Route to get a specific study session by ID
router.get('/sessions/:id', StudySessionController.getSessionById);

// Route to update a specific study session by ID
router.put('/sessions/:id', StudySessionController.updateSession);

// Route to delete a specific study session by ID
router.delete('/sessions/:id', StudySessionController.deleteSession);

export default router;
