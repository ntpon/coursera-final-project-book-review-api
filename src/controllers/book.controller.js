const bookService = require("../services/book.service");
const asyncHandler = require("../middleware/async.middleware");

class BookController {
  // Task 1: Get all books
  getAllBooks = asyncHandler(async (req, res) => {
    const books = await bookService.getAllBooks();

    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  });

  // Task 2: Get book by ISBN
  getBookByISBN = asyncHandler(async (req, res) => {
    const { isbn } = req.params;
    const book = await bookService.getBookByISBN(isbn);

    res.status(200).json({
      success: true,
      data: book,
    });
  });

  // Task 3: Get books by author
  getBooksByAuthor = asyncHandler(async (req, res) => {
    const { author } = req.params;
    const books = await bookService.getBooksByAuthor(author);

    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  });

  // Task 4: Get books by title
  getBooksByTitle = asyncHandler(async (req, res) => {
    const { title } = req.params;
    const books = await bookService.getBooksByTitle(title);

    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  });

  // Task 5: Get book reviews
  getBookReviews = asyncHandler(async (req, res) => {
    const { isbn } = req.params;
    const reviews = await bookService.getBookReviews(isbn);

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  });
}

module.exports = new BookController();
