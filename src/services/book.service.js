const bookRepository = require("../repositories/book.repository");
const { NotFoundError } = require("../utils/httpError");

class BookService {
  // Task 1: Get all books
  async getAllBooks() {
    return await bookRepository.findAll();
  }

  // Task 2: Get book by ISBN
  async getBookByISBN(isbn) {
    const book = await bookRepository.findByISBN(isbn);
    if (!book) {
      throw new NotFoundError(`Book with ISBN ${isbn} not found`);
    }
    return book;
  }

  // Task 3: Get books by author
  async getBooksByAuthor(author) {
    const books = await bookRepository.findByAuthor(author);
    return books;
  }

  // Task 4: Get books by title
  async getBooksByTitle(title) {
    const books = await bookRepository.findByTitle(title);
    return books;
  }

  // Task 5: Get book reviews
  async getBookReviews(isbn) {
    const book = await this.getBookByISBN(isbn);
    return book.getReviews();
  }

  // Add or update review
  async addOrUpdateReview(isbn, userId, reviewData) {
    const book = await this.getBookByISBN(isbn);

    if (book.reviews[userId]) {
      // Update existing review
      book.updateReview(userId, reviewData);
    } else {
      // Add new review
      book.addReview(userId, reviewData);
    }

    await bookRepository.update(isbn, book);
    return book.reviews[userId];
  }

  // Delete review
  async deleteReview(isbn, userId) {
    const book = await this.getBookByISBN(isbn);

    if (!book.reviews[userId]) {
      throw new NotFoundError("Review not found");
    }

    book.deleteReview(userId);
    await bookRepository.update(isbn, book);
    return true;
  }
}

module.exports = new BookService();
