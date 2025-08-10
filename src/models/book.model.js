class Book {
  constructor({ isbn, title, author, reviews = {} }) {
    this.isbn = isbn;
    this.title = title;
    this.author = author;
    this.reviews = reviews; // Object with userId as key and review object as value
  }

  addReview(userId, review) {
    this.reviews[userId] = {
      ...review,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  updateReview(userId, review) {
    if (this.reviews[userId]) {
      this.reviews[userId] = {
        ...this.reviews[userId],
        ...review,
        updatedAt: new Date(),
      };
      return true;
    }
    return false;
  }

  deleteReview(userId) {
    if (this.reviews[userId]) {
      delete this.reviews[userId];
      return true;
    }
    return false;
  }

  getReviews() {
    return Object.values(this.reviews);
  }
}

module.exports = Book;
