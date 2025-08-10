import bookRepository from "../repositories/book.repository";
import { NotFoundError } from "../utils/httpError";
import { Book } from "../models/book.model";
import { Review, CreateReviewInput } from "../types";

class BookService {
  // Task 1: Get all books
  async getAllBooks(): Promise<Book[]> {
    return await bookRepository.findAll();
  }

  // Task 2: Get book by ISBN
  async getBookByISBN(isbn: string): Promise<Book> {
    const book = await bookRepository.findByISBN(isbn);
    if (!book) {
      throw new NotFoundError(`Book with ISBN ${isbn} not found`);
    }
    return book;
  }

  // Task 3: Get books by author
  async getBooksByAuthor(author: string): Promise<Book[]> {
    const books = await bookRepository.findByAuthor(author);
    return books;
  }

  // Task 4: Get books by title
  async getBooksByTitle(title: string): Promise<Book[]> {
    const books = await bookRepository.findByTitle(title);
    return books;
  }

  // Task 5: Get book reviews
  async getBookReviews(isbn: string): Promise<Review[]> {
    const book = await this.getBookByISBN(isbn);
    return book.reviews;
  }

  // Add or update review
  async addOrUpdateReview(
    isbn: string,
    userId: string,
    username: string,
    reviewData: CreateReviewInput
  ): Promise<Review> {
    const book = await this.getBookByISBN(isbn);

    const existingReviewIndex = book.reviews.findIndex((r) => r.userId === userId);

    let updatedReviews = [...book.reviews];

    if (existingReviewIndex !== -1) {
      // Update existing review
      const existingReview = book.reviews[existingReviewIndex]!;
      updatedReviews[existingReviewIndex] = {
        id: existingReview.id,
        userId: existingReview.userId,
        username: existingReview.username,
        rating: reviewData.rating ?? existingReview.rating,
        comment: reviewData.comment ?? existingReview.comment,
        createdAt: existingReview.createdAt,
        updatedAt: new Date(),
      };
    } else {
      // Add new review
      const newReview: Review = {
        id: (Date.now() + Math.random()).toString(),
        userId,
        username,
        rating: reviewData.rating,
        comment: reviewData.comment,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      updatedReviews.push(newReview);
    }

    // Update the book with new reviews
    const updatedBook = { ...book, reviews: updatedReviews };
    await bookRepository.update(isbn, updatedBook);

    const finalReview = updatedReviews.find((r) => r.userId === userId);
    if (!finalReview) {
      throw new Error("Failed to add/update review");
    }

    return finalReview;
  }

  // Delete review
  async deleteReview(isbn: string, userId: string): Promise<boolean> {
    const book = await this.getBookByISBN(isbn);

    const reviewExists = book.reviews.some((r) => r.userId === userId);
    if (!reviewExists) {
      throw new NotFoundError("Review not found");
    }

    // Filter out the review instead of calling a method
    const updatedReviews = book.reviews.filter((r) => r.userId !== userId);
    
    // Update the book with the new reviews array
    const updatedBook = { ...book, reviews: updatedReviews };
    await bookRepository.update(isbn, updatedBook);
    
    return true;
  }
}

export default new BookService();
