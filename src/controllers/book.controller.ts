import { Request, Response } from "express";
import bookService from "../services/book.service";
import asyncHandler from "../middleware/async.middleware";

class BookController {
  // Task 1: Get all books
  getAllBooks = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const books = await bookService.getAllBooks();

      res.status(200).json({
        success: true,
        count: books.length,
        data: books,
      });
    }
  );

  // Task 2: Get book by ISBN
  getBookByISBN = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { isbn } = req.params;
      if (!isbn) {
        res.status(400).json({
          success: false,
          message: "ISBN parameter is required",
        });
        return;
      }
      const book = await bookService.getBookByISBN(isbn);

      res.status(200).json({
        success: true,
        data: book,
      });
    }
  );

  // Task 3: Get books by author
  getBooksByAuthor = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { author } = req.params;
      if (!author) {
        res.status(400).json({
          success: false,
          message: "Author parameter is required",
        });
        return;
      }
      const books = await bookService.getBooksByAuthor(author);

      res.status(200).json({
        success: true,
        count: books.length,
        data: books,
      });
    }
  );

  // Task 4: Get books by title
  getBooksByTitle = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { title } = req.params;
      if (!title) {
        res.status(400).json({
          success: false,
          message: "Title parameter is required",
        });
        return;
      }
      const books = await bookService.getBooksByTitle(title);

      res.status(200).json({
        success: true,
        count: books.length,
        data: books,
      });
    }
  );

  // Task 5: Get book reviews
  getBookReviews = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { isbn } = req.params;
      if (!isbn) {
        res.status(400).json({
          success: false,
          message: "ISBN parameter is required",
        });
        return;
      }
      const reviews = await bookService.getBookReviews(isbn);

      res.status(200).json({
        success: true,
        count: reviews.length,
        data: reviews,
      });
    }
  );
}

export default new BookController();
