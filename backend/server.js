import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import taskRoutes from "./routes/task.route.js";
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());// so that req.body is not undefined
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'], // frontend origins
  credentials: true, // allow cookies to be sent or accept from frontend
}));
app.use(cookieParser());// to parse cookies from requests
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start", error);
    process.exit(1);
  }
};

startServer();
