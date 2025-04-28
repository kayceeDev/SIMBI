"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const auth_middleware_1 = __importDefault(require("./middlewares/auth.middleware"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, database_1.connectDB)();
app.use('/api/auth', auth_route_1.default);
app.use(auth_middleware_1.default);
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
exports.default = app;
//# sourceMappingURL=app.js.map