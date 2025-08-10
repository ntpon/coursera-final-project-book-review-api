import { Response } from "express";
import authService from "../services/auth.service";
import asyncHandler from "../middleware/async.middleware";
import { AuthenticatedRequest } from "../types/express";

class AuthController {
  // Task 6: Register new user
  register = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userData = req.body;
    const user = await authService.register(userData);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  });

  // Task 7: Login user
  login = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
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
  logout = asyncHandler(
    async (req: AuthenticatedRequest, res: Response): Promise<void> => {
      return new Promise<void>((resolve) => {
        req.session.destroy((err?: Error) => {
          if (err) {
            res.status(500).json({
              success: false,
              message: "Could not log out",
            });
          } else {
            res.status(200).json({
              success: true,
              message: "Logout successful",
            });
          }
          resolve();
        });
      });
    }
  );

  // Get current user profile
  getProfile = asyncHandler(
    async (req: AuthenticatedRequest, res: Response): Promise<void> => {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: "User not authenticated",
        });
        return;
      }

      const user = await authService.getProfile(req.user.id);

      res.status(200).json({
        success: true,
        data: user,
      });
    }
  );
}

export default new AuthController();
