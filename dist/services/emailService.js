"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendVerificationEmail = async (email, verificationToken) => {
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER || 'your@gmail.com',
            pass: process.env.EMAIL_PASS || 'yourpassword',
        },
    });
    const mailOptions = {
        from: process.env.EMAIL_USER || 'your@gmail.com',
        to: email,
        subject: 'Verify your email',
        text: `Your verification code is ${verificationToken}`,
    };
    await transporter.sendMail(mailOptions);
};
exports.sendVerificationEmail = sendVerificationEmail;
//# sourceMappingURL=emailService.js.map