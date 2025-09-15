import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./expressRoutes/authRoutes.js";
import taskRoutes from "./expressRoutes/taskRoutes.js";

dotenv.config(); // loads .env

const app = express();

// Middleware
app.use(express.json());

// ✅ CORS setup (important for withCredentials)
app.use(
  cors({
    origin: "http://localhost:5173", // frontend dev server
    credentials: true,               // allow cookies/headers
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// MongoDB connection
const MONGO_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
