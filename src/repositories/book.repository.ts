import { books } from "../data/seed";
import { Book } from "../models/book.model";

class BookRepository {
  // Get all books
  findAll(): Promise<Book[]> {
    return Promise.resolve(Object.values(books) as Book[]);
  }

  // Find book by ISBN
  findByISBN(isbn: string): Promise<Book | null> {
    const book = books[isbn] || null;
    return Promise.resolve(book as Book | null);
  }

  // Find books by author
  findByAuthor(author: string): Promise<Book[]> {
    const booksByAuthor = Object.values(books).filter((book) =>
      book.author.toLowerCase().includes(author.toLowerCase())
    );
    return Promise.resolve(booksByAuthor as Book[]);
  }

  // Find books by title
  findByTitle(title: string): Promise<Book[]> {
    const booksByTitle = Object.values(books).filter((book) =>
      book.title.toLowerCase().includes(title.toLowerCase())
    );
    return Promise.resolve(booksByTitle as Book[]);
  }

  // Update book (for adding/updating reviews)
  update(isbn: string, bookData: Partial<Book>): Promise<Book | null> {
    if (books[isbn]) {
      books[isbn] = { ...books[isbn], ...bookData } as Book;
      return Promise.resolve(books[isbn] as Book);
    }
    return Promise.resolve(null);
  }
}

export default new BookRepository();
