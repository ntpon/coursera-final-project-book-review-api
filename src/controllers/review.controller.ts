import { Request, Response } from "express";
import reviewService from "../services/review.service";
import asyncHandler from "../middleware/async.middleware";
import { AuthenticatedRequest } from "../types/express";

class ReviewController {
  // Task 8: Add or modify book review
  addOrModifyReview = asyncHandler(
    async (req: AuthenticatedRequest, res: Response): Promise<void> => {
      const { isbn } = req.params;
      if (!isbn) {
        res.status(400).json({
          success: false,
          message: "ISBN parameter is required",
        });
        return;
      }

      if (!req.user) {
        res.status(401).json({
          success: false,
          message: "User not authenticated",
        });
        return;
      }

      const userId = req.user.id;
      const username = req.user.username;
      const reviewData = req.body;

      const review = await reviewService.addOrModifyReview(
        isbn,
        userId,
        username,
        reviewData
      );

      res.status(200).json({
        success: true,
        message: "Review added/updated successfully",
        data: review,
      });
    }
  );

  // Task 9: Delete book review
  deleteReview = asyncHandler(
    async (req: AuthenticatedRequest, res: Response): Promise<void> => {
      const { isbn } = req.params;
      if (!isbn) {
        res.status(400).json({
          success: false,
          message: "ISBN parameter is required",
        });
        return;
      }

      if (!req.user) {
        res.status(401).json({
          success: false,
          message: "User not authenticated",
        });
        return;
      }

      const userId = req.user.id;

      await reviewService.deleteReview(isbn, userId, userId);

      res.status(200).json({
        success: true,
        message: "Review deleted successfully",
      });
    }
  );

  // Get reviews for a specific book
  getReviewsForBook = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { isbn } = req.params;
      if (!isbn) {
        res.status(400).json({
          success: false,
          message: "ISBN parameter is required",
        });
        return;
      }

      const reviews = await reviewService.getReviewsForBook(isbn);

      res.status(200).json({
        success: true,
        count: reviews.length,
        data: reviews,
      });
    }
  );
}

export default new ReviewController();
