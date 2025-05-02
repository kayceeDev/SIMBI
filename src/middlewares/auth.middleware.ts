import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend the Request type to include the authenticated user
export interface AuthenticatedRequest extends Request {
  user?: { userId: string; email?: string }; // Adapt as needed
}

const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const secret = process.env.JWT_SECRET || 'SIMBI_secret';
    const decoded = jwt.verify(token, secret) as { userId: string; email?: string };

    // Attach user info to request
    req.user = { userId: decoded.userId, email: decoded.email };
    next();
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

export default authMiddleware;
