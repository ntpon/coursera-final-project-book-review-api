import bookService from "./book.service";
import { ForbiddenError } from "../utils/httpError";
import { Review, CreateReviewInput } from "../types";

class ReviewService {
  // Task 8: Add or modify review
  async addOrModifyReview(
    isbn: string,
    userId: string,
    username: string,
    reviewData: CreateReviewInput
  ): Promise<Review> {
    return await bookService.addOrUpdateReview(
      isbn,
      userId,
      username,
      reviewData
    );
  }

  // Task 9: Delete review
  async deleteReview(
    isbn: string,
    userId: string,
    requestingUserId: string
  ): Promise<boolean> {
    // Check if user is trying to delete their own review
    if (userId !== requestingUserId) {
      throw new ForbiddenError("You can only delete your own reviews");
    }

    return await bookService.deleteReview(isbn, userId);
  }

  // Get reviews for a book
  async getReviewsForBook(isbn: string): Promise<Review[]> {
    return await bookService.getBookReviews(isbn);
  }
}

export default new ReviewService();
