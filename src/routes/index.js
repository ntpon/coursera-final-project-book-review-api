const express = require("express");
const bookRoutes = require("./book.routes");
const authRoutes = require("./auth.routes");
const reviewRoutes = require("./review.routes");

const router = express.Router();

// API Routes
router.use("/books", bookRoutes);
router.use("/auth", authRoutes);
router.use("/reviews", reviewRoutes);

// Health check endpoint
router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// API Documentation endpoint
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Book Review API",
    version: "1.0.0",
    endpoints: {
      books: {
        "GET /api/books": "Get all books",
        "GET /api/books/isbn/:isbn": "Get book by ISBN",
        "GET /api/books/author/:author": "Get books by author",
        "GET /api/books/title/:title": "Get books by title",
        "GET /api/books/:isbn/reviews": "Get book reviews",
      },
      auth: {
        "POST /api/auth/register": "Register new user",
        "POST /api/auth/login": "Login user",
        "POST /api/auth/logout": "Logout user",
        "GET /api/auth/profile": "Get user profile (requires auth)",
      },
      reviews: {
        "PUT /api/reviews/:isbn": "Add/modify book review (requires auth)",
        "DELETE /api/reviews/:isbn": "Delete book review (requires auth)",
        "GET /api/reviews/:isbn": "Get reviews for a book",
      },
    },
  });
});

module.exports = router;
