const authService = require("../services/auth.service");
const asyncHandler = require("../middleware/async.middleware");

class AuthController {
  // Task 6: Register new user
  register = asyncHandler(async (req, res) => {
    const userData = req.body;
    const user = await authService.register(userData);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  });

  // Task 7: Login user
  login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const result = await authService.login(username, password);

    // Set session
    req.session.user = result.user;

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: result.user,
        token: result.token,
      },
    });
  });

  // Logout user
  logout = asyncHandler(async (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Could not log out",
        });
      }

      res.status(200).json({
        success: true,
        message: "Logout successful",
      });
    });
  });

  // Get current user profile
  getProfile = asyncHandler(async (req, res) => {
    const user = await authService.getProfile(req.user.id);

    res.status(200).json({
      success: true,
      data: user,
    });
  });
}

module.exports = new AuthController();
