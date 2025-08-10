const express = require("express");
const bookController = require("../controllers/book.controller");
const {
  validate,
  isbnSchema,
  authorSchema,
  titleSchema,
} = require("../middleware/validate.middleware");

const router = express.Router();

// Task 1: Get all books
router.get("/", bookController.getAllBooks);

// Task 2: Get book by ISBN
router.get(
  "/isbn/:isbn",
  validate(isbnSchema, "params"),
  bookController.getBookByISBN
);

// Task 3: Get books by author
router.get(
  "/author/:author",
  validate(authorSchema, "params"),
  bookController.getBooksByAuthor
);

// Task 4: Get books by title
router.get(
  "/title/:title",
  validate(titleSchema, "params"),
  bookController.getBooksByTitle
);

// Task 5: Get book reviews
router.get(
  "/:isbn/reviews",
  validate(isbnSchema, "params"),
  bookController.getBookReviews
);

module.exports = router;
