const Joi = require("joi");
const { BadRequestError } = require("../utils/httpError");

// User registration validation schema
const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  firstName: Joi.string().min(1).max(50).required(),
  lastName: Joi.string().min(1).max(50).required(),
});

// User login validation schema
const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

// Book review validation schema
const reviewSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().min(1).max(1000).required(),
});

// ISBN validation schema
const isbnSchema = Joi.object({
  isbn: Joi.string().required(),
});

// Author search validation schema
const authorSchema = Joi.object({
  author: Joi.string().required(),
});

// Title search validation schema
const titleSchema = Joi.object({
  title: Joi.string().required(),
});

// Generic validation middleware
const validate = (schema, property = "body") => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);

    if (error) {
      const errorMessage = error.details[0].message;
      return next(new BadRequestError(errorMessage));
    }

    next();
  };
};

module.exports = {
  validate,
  registerSchema,
  loginSchema,
  reviewSchema,
  isbnSchema,
  authorSchema,
  titleSchema,
};
