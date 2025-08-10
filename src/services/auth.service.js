const bcrypt = require("bcryptjs");
const userRepository = require("../repositories/user.repository");
const JWTUtil = require("../utils/jwt");
const {
  ConflictError,
  UnauthorizedError,
  BadRequestError,
} = require("../utils/httpError");

class AuthService {
  // Task 6: Register new user
  async register(userData) {
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
  async login(username, password) {
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
      userId: user.id,
      username: user.username,
    });

    return {
      user: user.toJSON(),
      token,
    };
  }

  // Get user profile
  async getProfile(userId) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    return user.toJSON();
  }
}

module.exports = new AuthService();
