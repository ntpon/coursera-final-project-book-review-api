const bookService = require("./book.service");
const { ForbiddenError } = require("../utils/httpError");

class ReviewService {
  // Task 8: Add or modify review
  async addOrModifyReview(isbn, userId, reviewData) {
    return await bookService.addOrUpdateReview(isbn, userId, reviewData);
  }

  // Task 9: Delete review
  async deleteReview(isbn, userId, requestingUserId) {
    // Check if user is trying to delete their own review
    if (userId !== requestingUserId) {
      throw new ForbiddenError("You can only delete your own reviews");
    }

    return await bookService.deleteReview(isbn, userId);
  }

  // Get reviews for a book
  async getReviewsForBook(isbn) {
    return await bookService.getBookReviews(isbn);
  }
}

module.exports = new ReviewService();
