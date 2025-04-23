"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware here (bodyParser, routes, etc.)
(0, database_1.connectDB)();
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
