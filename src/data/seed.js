const Book = require("../models/book.model");

// Pre-loaded book data with ID as key
const booksData = {
  1: { author: "Chinua Achebe", title: "Things Fall Apart", reviews: {} },
  2: { author: "Hans Christian Andersen", title: "Fairy tales", reviews: {} },
  3: { author: "Dante Alighieri", title: "The Divine Comedy", reviews: {} },
  4: { author: "Unknown", title: "The Epic Of Gilgamesh", reviews: {} },
  5: { author: "Unknown", title: "The Book Of Job", reviews: {} },
  6: { author: "Unknown", title: "One Thousand and One Nights", reviews: {} },
  7: { author: "Unknown", title: "Njál's Saga", reviews: {} },
  8: { author: "Jane Austen", title: "Pride and Prejudice", reviews: {} },
  9: {
    author: "Honoré de Balzac",
    title: "Le Père Goriot",
    reviews: {},
  },
  10: {
    author: "Samuel Beckett",
    title: "Molloy, Malone Dies, The Unnamable, the trilogy",
    reviews: {},
  },
};

// Create books with sample reviews
const books = {};

Object.keys(booksData).forEach((id) => {
  const bookData = booksData[id];
  const book = new Book({
    isbn: id, // Using ID as ISBN for simplicity
    title: bookData.title,
    author: bookData.author,
    reviews: bookData.reviews,
  });

  // Add some sample reviews for demonstration
  if (id === "1") {
    book.addReview("user1", {
      rating: 5,
      comment:
        "A masterpiece of African literature. Achebe's portrayal of pre-colonial Nigeria is both beautiful and heartbreaking.",
    });
    book.addReview("user2", {
      rating: 4,
      comment:
        "Excellent exploration of cultural clash and colonialism. Highly recommended.",
    });
  }

  if (id === "8") {
    book.addReview("user1", {
      rating: 5,
      comment:
        "Jane Austen's wit and social commentary are unmatched. Elizabeth Bennet is an unforgettable character.",
    });
  }

  books[id] = book;
});

module.exports = { books };
