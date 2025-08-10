import express, { Router } from "express";
import reviewController from "../controllers/review.controller";
import { requireJWT } from "../middleware/auth.middleware";
import {
  validate,
  reviewSchema,
  isbnSchema,
} from "../middleware/validate.middleware";

const router: Router = express.Router();

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

export default router;
