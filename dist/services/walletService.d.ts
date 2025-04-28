import { EncryptedData } from '../interfaces/auth.interface';
export declare const generateWallet: () => {
    address: string;
    privateKey: string;
};
export declare const encryptPrivateKey: (privateKey: string) => EncryptedData;
export declare const decryptPrivateKey: (encrypted: EncryptedData) => string;
