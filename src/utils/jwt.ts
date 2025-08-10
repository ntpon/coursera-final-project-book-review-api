import jwt from "jsonwebtoken";
import config from "../config/env";
import { JwtPayload } from "../types/express";

class JWTUtil {
  static sign(payload: object): string {
    return jwt.sign(payload, config.jwt.secret, {
      expiresIn: "24h", // Use a literal string instead of config value for now
    });
  }

  static verify(token: string): JwtPayload {
    try {
      return jwt.verify(token, config.jwt.secret) as JwtPayload;
    } catch (error) {
      throw new Error("Invalid token");
    }
  }

  static decode(token: string): JwtPayload | null {
    return jwt.decode(token) as JwtPayload | null;
  }
}

export default JWTUtil;
