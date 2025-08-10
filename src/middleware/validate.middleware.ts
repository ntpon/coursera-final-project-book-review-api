import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../utils/httpError";

// User registration validation schema
export const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  firstName: Joi.string().min(1).max(50).required(),
  lastName: Joi.string().min(1).max(50).required(),
});

// User login validation schema
export const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

// Book review validation schema
export const reviewSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().min(1).max(1000).required(),
});

// ISBN validation schema
export const isbnSchema = Joi.object({
  isbn: Joi.string().required(),
});

// Author search validation schema
export const authorSchema = Joi.object({
  author: Joi.string().required(),
});

// Title search validation schema
export const titleSchema = Joi.object({
  title: Joi.string().required(),
});

// Generic validation middleware
export const validate = (
  schema: Joi.ObjectSchema,
  property: string = "body"
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate((req as any)[property]);

    if (error) {
      const errorMessage = error.details[0]?.message || "Validation error";
      return next(new BadRequestError(errorMessage));
    }

    next();
  };
};
