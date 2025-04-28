import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  verificationToken?: string;
  isVerified: boolean;
  walletAddress: string;
  privateKey: string;
}

export interface EncryptedData {
  iv: string;
  encryptedData: string;
}

export interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
}

export interface VerifyRequestBody {
  email: string;
  verificationToken: string;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}