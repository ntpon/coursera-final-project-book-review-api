import express, { Router } from "express";
import authController from "../controllers/auth.controller";
import { requireJWT } from "../middleware/auth.middleware";
import {
  validate,
  registerSchema,
  loginSchema,
} from "../middleware/validate.middleware";

const router: Router = express.Router();

// Task 6: Register new user
router.post("/register", validate(registerSchema), authController.register);

// Task 7: Login user
router.post("/login", validate(loginSchema), authController.login);

// Logout user
router.post("/logout", authController.logout);

// Get current user profile (protected route)
router.get("/profile", requireJWT, authController.getProfile);

export default router;
