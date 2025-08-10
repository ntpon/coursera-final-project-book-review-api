const express = require("express");
const session = require("express-session");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const config = require("./config/env");
const routes = require("./routes");

const app = express();

// Security middleware
app.use(helmet());

// CORS middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://your-frontend-domain.com"]
        : ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);

// Logging middleware
if (config.nodeEnv === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session(config.session));

// Routes
app.use("/api", routes);

// Root endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Book Review API",
    version: "1.0.0",
    documentation: "/api",
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Global error handling middleware
app.use((error, req, res, next) => {
  console.error("Error:", error);

  // Default error
  let statusCode = error.statusCode || 500;
  let message = error.message || "Internal Server Error";

  // Validation errors
  if (error.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(error.errors)
      .map((err) => err.message)
      .join(", ");
  }

  // JWT errors
  if (error.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  if (error.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(config.nodeEnv === "development" && { stack: error.stack }),
  });
});

module.exports = app;
