import { Router } from "express";
import { SignupUser, loginUser } from "../controllers/authController.js";
import { authenticateToken, requireAdmin } from "../middleware/authMiddleware.js";
import { validateSignup, validateLogin } from "../middleware/inputValidation.js";


const router = Router();

// Register a new user
router.post("/signup",validateSignup, SignupUser);

// Login a user
router.post("/login", validateLogin, loginUser);

export default router;
