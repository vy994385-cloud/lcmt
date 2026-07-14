"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
}));
app.use(express_1.default.json());
app.use("/api/auth", authRoutes_1.default);
app.get("/api/status", (req, res) => {
    res.json({
        message: "LCMT Backend Running ❤️",
        database: "Connected",
    });
});
async function startServer() {
    await (0, database_1.connectDatabase)();
    app.listen(PORT, () => {
        console.log(`🚀 LCMT Backend running on port ${PORT}`);
    });
}
startServer();
