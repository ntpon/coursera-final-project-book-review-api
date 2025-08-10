import { Book as BookInterface, Review, CreateReviewInput } from "../types";

export class Book implements BookInterface {
  public isbn: string;
  public title: string;
  public author: string;
  public reviews: Review[];

  constructor({
    isbn,
    title,
    author,
    reviews = [],
  }: {
    isbn: string;
    title: string;
    author: string;
    reviews?: Review[];
  }) {
    this.isbn = isbn;
    this.title = title;
    this.author = author;
    this.reviews = reviews;
  }

  addReview(userId: string, username: string, review: CreateReviewInput): void {
    const newReview: Review = {
      id: (Date.now() + Math.random()).toString(),
      userId,
      username,
      rating: review.rating,
      comment: review.comment,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Remove existing review by this user if it exists
    this.reviews = this.reviews.filter((r) => r.userId !== userId);
    this.reviews.push(newReview);
  }

  updateReview(userId: string, review: Partial<CreateReviewInput>): boolean {
    const existingReviewIndex = this.reviews.findIndex(
      (r) => r.userId === userId
    );

    if (existingReviewIndex !== -1) {
      const existingReview = this.reviews[existingReviewIndex]!;
      this.reviews[existingReviewIndex] = {
        id: existingReview.id,
        userId: existingReview.userId,
        username: existingReview.username,
        rating: review.rating ?? existingReview.rating,
        comment: review.comment ?? existingReview.comment,
        createdAt: existingReview.createdAt,
        updatedAt: new Date(),
      };
      return true;
    }
    return false;
  }

  deleteReview(userId: string): boolean {
    const initialLength = this.reviews.length;
    this.reviews = this.reviews.filter((r) => r.userId !== userId);
    return this.reviews.length < initialLength;
  }

  getReviews(): Review[] {
    return this.reviews;
  }
}

export default Book;
