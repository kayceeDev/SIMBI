import { Request, Response } from 'express';
import { RegisterRequestBody, VerifyRequestBody, LoginRequestBody } from '../interfaces/auth.interface';
export declare const register: (req: Request<{}, {}, RegisterRequestBody>, res: Response) => Promise<void>;
export declare const verify: (req: Request<{}, {}, VerifyRequestBody>, res: Response) => Promise<void>;
export declare const login: (req: Request<{}, {}, LoginRequestBody>, res: Response) => Promise<void>;
