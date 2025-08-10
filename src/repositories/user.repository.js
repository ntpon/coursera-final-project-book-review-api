const User = require("../models/user.model");

class UserRepository {
  constructor() {
    this.users = new Map(); // In-memory storage
  }

  // Create new user
  create(userData) {
    const user = new User(userData);
    this.users.set(user.username, user);
    return Promise.resolve(user);
  }

  // Find user by username
  findByUsername(username) {
    return Promise.resolve(this.users.get(username) || null);
  }

  // Find user by ID
  findById(id) {
    for (let user of this.users.values()) {
      if (user.id === id) {
        return Promise.resolve(user);
      }
    }
    return Promise.resolve(null);
  }

  // Update user
  update(username, userData) {
    const user = this.users.get(username);
    if (user) {
      Object.assign(user, userData, { updatedAt: new Date() });
      return Promise.resolve(user);
    }
    return Promise.resolve(null);
  }

  // Delete user
  delete(username) {
    return Promise.resolve(this.users.delete(username));
  }

  // Get all users (for admin purposes)
  findAll() {
    return Promise.resolve(Array.from(this.users.values()));
  }
}

module.exports = new UserRepository();
