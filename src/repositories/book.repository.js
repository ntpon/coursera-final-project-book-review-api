const { books } = require("../data/seed");

class BookRepository {
  // Get all books
  findAll() {
    return Promise.resolve(Object.values(books));
  }

  // Find book by ISBN
  findByISBN(isbn) {
    return Promise.resolve(books[isbn] || null);
  }

  // Find books by author
  findByAuthor(author) {
    const booksByAuthor = Object.values(books).filter((book) =>
      book.author.toLowerCase().includes(author.toLowerCase())
    );
    return Promise.resolve(booksByAuthor);
  }

  // Find books by title
  findByTitle(title) {
    const booksByTitle = Object.values(books).filter((book) =>
      book.title.toLowerCase().includes(title.toLowerCase())
    );
    return Promise.resolve(booksByTitle);
  }

  // Update book (for adding/updating reviews)
  update(isbn, bookData) {
    if (books[isbn]) {
      books[isbn] = { ...books[isbn], ...bookData };
      return Promise.resolve(books[isbn]);
    }
    return Promise.resolve(null);
  }
}

module.exports = new BookRepository();
