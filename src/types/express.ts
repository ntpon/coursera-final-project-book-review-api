import { Request } from "express";
import { User } from "./index";

export interface AuthenticatedRequest extends Request {
  user?: Omit<User, "password">;
  session: Request["session"] & {
    user?: Omit<User, "password">;
  };
}

export interface JwtPayload {
  id: string;
  username: string;
  iat?: number;
  exp?: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: Omit<User, "password">;
    }
  }
}
