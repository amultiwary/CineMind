import express from "express";
import { gptSearch } from "../controllers/geminiController.js";

const router = express.Router();

router.post("/gpt-search", gptSearch);

export default router;
