import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import tmdbRoutes from "./routes/tmdbRoutes.js";
import geminiRoutes from "./routes/geminiRoutes.js";

dotenv.config({quiet: true});

connectDB();

const app = express();
app.use(cors({
  origin: ["http://localhost:5173", "https://cine-mind-tau.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // ✅ allow all major methods
  credentials: true, // optional: if you need cookies or auth headers
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tmdb", tmdbRoutes);
app.use("/api/gemini", geminiRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
