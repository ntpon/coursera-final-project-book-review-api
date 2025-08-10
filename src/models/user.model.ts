import { CreateUserInput, User as UserInterface } from "../types";

export class User implements UserInterface {
  public id: string;
  public username: string;
  public password: string;
  public email: string;
  public firstName: string;
  public lastName: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor({
    username,
    password,
    email,
    firstName,
    lastName,
  }: CreateUserInput) {
    this.id = (Date.now() + Math.random()).toString(); // Simple ID generation
    this.username = username;
    this.password = password; // Will be hashed
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  toJSON(): Omit<UserInterface, "password"> {
    // Don't include password in JSON representation
    const { password, ...userWithoutPassword } = this;
    return userWithoutPassword;
  }
}

export default User;
