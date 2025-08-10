import { Request, Response, NextFunction } from "express";
import JWTUtil from "../utils/jwt";
import { UnauthorizedError } from "../utils/httpError";
import userRepository from "../repositories/user.repository";
import { AuthenticatedRequest } from "../types/express";

// Session-based authentication middleware
export const requireSession = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.session || !req.session.user) {
    return next(new UnauthorizedError("Please log in to access this resource"));
  }

  req.user = req.session.user;
  next();
};

// JWT-based authentication middleware
export const requireJWT = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return next(new UnauthorizedError("Access token is required"));
    }

    const decoded = JWTUtil.verify(token);
    const user = await userRepository.findById(decoded.id);

    if (!user) {
      return next(new UnauthorizedError("User not found"));
    }

    req.user = user;
    next();
  } catch (error) {
    next(new UnauthorizedError("Invalid token"));
  }
};

// Optional authentication - doesn't fail if no auth provided
export const optionalAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (token) {
      const decoded = JWTUtil.verify(token);
      const user = await userRepository.findById(decoded.id);
      if (user) {
        req.user = user;
      }
    } else if (req.session && req.session.user) {
      req.user = req.session.user;
    }
  } catch (error) {
    // Ignore auth errors for optional auth
  }

  next();
};
