import bcrypt from "bcryptjs";
import userRepository from "../repositories/user.repository";
import JWTUtil from "../utils/jwt";
import {
  ConflictError,
  UnauthorizedError,
  BadRequestError,
} from "../utils/httpError";
import { CreateUserInput, LoginInput, AuthResponse, User } from "../types";

class AuthService {
  // Task 6: Register new user
  async register(userData: CreateUserInput): Promise<Omit<User, "password">> {
    const existingUser = await userRepository.findByUsername(userData.username);

    if (existingUser) {
      throw new ConflictError("Username already exists");
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    // Create user with hashed password
    const newUser = await userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    // Return user without password
    return newUser.toJSON();
  }

  // Task 7: Login user
  async login(
    username: string,
    password: string
  ): Promise<{ user: Omit<User, "password">; token: string }> {
    const user = await userRepository.findByUsername(username);

    if (!user) {
      throw new UnauthorizedError("Invalid username or password");
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid username or password");
    }

    // Generate JWT token
    const token = JWTUtil.sign({
      id: user.id,
      username: user.username,
    });

    return {
      user: user.toJSON(),
      token,
    };
  }

  // Get user profile
  async getProfile(userId: string): Promise<Omit<User, "password">> {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    return user.toJSON();
  }
}

export default new AuthService();
