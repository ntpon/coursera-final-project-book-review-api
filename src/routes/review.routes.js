const express = require("express");
const reviewController = require("../controllers/review.controller");
const { requireJWT } = require("../middleware/auth.middleware");
const {
  validate,
  reviewSchema,
  isbnSchema,
} = require("../middleware/validate.middleware");

const router = express.Router();

// Task 8: Add or modify book review (protected route)
router.put(
  "/:isbn",
  requireJWT,
  validate(isbnSchema, "params"),
  validate(reviewSchema),
  reviewController.addOrModifyReview
);

// Task 9: Delete book review (protected route)
router.delete(
  "/:isbn",
  requireJWT,
  validate(isbnSchema, "params"),
  reviewController.deleteReview
);

// Get reviews for a book
router.get(
  "/:isbn",
  validate(isbnSchema, "params"),
  reviewController.getReviewsForBook
);

module.exports = router;
