class User {
  constructor({ username, password, email, firstName, lastName }) {
    this.id = Date.now() + Math.random(); // Simple ID generation
    this.username = username;
    this.password = password; // Will be hashed
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  toJSON() {
    // Don't include password in JSON representation
    const { password, ...userWithoutPassword } = this;
    return userWithoutPassword;
  }
}

module.exports = User;
