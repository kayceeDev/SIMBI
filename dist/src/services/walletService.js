"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptPrivateKey = exports.encryptPrivateKey = exports.generateWallet = void 0;
const ethers_1 = require("ethers");
const crypto_1 = require("crypto");
const algorithm = 'aes-256-cbc';
const encryptionKey = process.env.ENCRYPTION_KEY;
if (!encryptionKey) {
    throw new Error('ENCRYPTION_KEY not set');
}
// Convert the key to a Buffer of exactly 32 bytes
const keyBuffer = Buffer.alloc(32);
const keyBytes = Buffer.from(encryptionKey);
keyBytes.copy(keyBuffer);
const generateWallet = () => {
    try {
        const wallet = ethers_1.ethers.Wallet.createRandom();
        return {
            address: wallet.address,
            privateKey: wallet.privateKey,
        };
    }
    catch (error) {
        console.error('Error generating wallet:', error);
        throw new Error('Failed to generate wallet');
    }
};
exports.generateWallet = generateWallet;
const encryptPrivateKey = (privateKey) => {
    try {
        const iv = (0, crypto_1.randomBytes)(16);
        const cipher = (0, crypto_1.createCipheriv)(algorithm, keyBuffer, iv);
        let encrypted = cipher.update(privateKey, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return {
            iv: iv.toString('hex'),
            encryptedData: encrypted,
        };
    }
    catch (error) {
        console.error('Error encrypting private key:', error);
        throw new Error('Failed to encrypt private key');
    }
};
exports.encryptPrivateKey = encryptPrivateKey;
const decryptPrivateKey = (encrypted) => {
    try {
        const iv = Buffer.from(encrypted.iv, 'hex');
        const decipher = (0, crypto_1.createDecipheriv)(algorithm, keyBuffer, iv);
        let decrypted = decipher.update(encrypted.encryptedData, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
    catch (error) {
        console.error('Error decrypting private key:', error);
        throw new Error('Failed to decrypt private key');
    }
};
exports.decryptPrivateKey = decryptPrivateKey;
//# sourceMappingURL=walletService.js.map