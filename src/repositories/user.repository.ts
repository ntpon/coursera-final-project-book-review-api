import { User } from "../models/user.model";
import { CreateUserInput, User as UserInterface } from "../types";

class UserRepository {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map(); // In-memory storage
  }

  // Create new user
  create(userData: CreateUserInput): Promise<User> {
    const user = new User(userData);
    this.users.set(user.username, user);
    return Promise.resolve(user);
  }

  // Find user by username
  findByUsername(username: string): Promise<User | null> {
    return Promise.resolve(this.users.get(username) || null);
  }

  // Find user by ID
  findById(id: string): Promise<User | null> {
    for (let user of this.users.values()) {
      if (user.id === id) {
        return Promise.resolve(user);
      }
    }
    return Promise.resolve(null);
  }

  // Update user
  update(
    username: string,
    userData: Partial<UserInterface>
  ): Promise<User | null> {
    const user = this.users.get(username);
    if (user) {
      Object.assign(user, userData, { updatedAt: new Date() });
      return Promise.resolve(user);
    }
    return Promise.resolve(null);
  }

  // Delete user
  delete(username: string): Promise<boolean> {
    return Promise.resolve(this.users.delete(username));
  }

  // Get all users (for admin purposes)
  findAll(): Promise<User[]> {
    return Promise.resolve(Array.from(this.users.values()));
  }
}

export default new UserRepository();
