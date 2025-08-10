const reviewService = require("../services/review.service");
const asyncHandler = require("../middleware/async.middleware");

class ReviewController {
  // Task 8: Add or modify book review
  addOrModifyReview = asyncHandler(async (req, res) => {
    const { isbn } = req.params;
    const userId = req.user.id;
    const reviewData = req.body;

    const review = await reviewService.addOrModifyReview(
      isbn,
      userId,
      reviewData
    );

    res.status(200).json({
      success: true,
      message: "Review added/updated successfully",
      data: review,
    });
  });

  // Task 9: Delete book review
  deleteReview = asyncHandler(async (req, res) => {
    const { isbn } = req.params;
    const userId = req.user.id;

    await reviewService.deleteReview(isbn, userId, userId);

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  });

  // Get reviews for a specific book
  getReviewsForBook = asyncHandler(async (req, res) => {
    const { isbn } = req.params;
    const reviews = await reviewService.getReviewsForBook(isbn);

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  });
}

module.exports = new ReviewController();
