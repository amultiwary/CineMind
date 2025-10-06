import express from "express";
import { register, login, authme } from "../controllers/authController.js";
import auth from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, authme);

export default router;
