const express = require("express");
const authController = require("../controllers/auth.controller");
const { requireJWT } = require("../middleware/auth.middleware");
const {
  validate,
  registerSchema,
  loginSchema,
} = require("../middleware/validate.middleware");

const router = express.Router();

// Task 6: Register new user
router.post("/register", validate(registerSchema), authController.register);

// Task 7: Login user
router.post("/login", validate(loginSchema), authController.login);

// Logout user
router.post("/logout", authController.logout);

// Get current user profile (protected route)
router.get("/profile", requireJWT, authController.getProfile);

module.exports = router;
