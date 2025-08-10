const axios = require("axios");

const BASE_URL = "http://localhost:5000/api";

// Task 10: Get all books using async/await
async function getAllBooksAsync() {
  try {
    console.log("📚 Task 10: Getting all books using async/await...");
    const response = await axios.get(`${BASE_URL}/books`);

    console.log("✅ Success! Found", response.data.count, "books");
    console.log(
      "Books:",
      response.data.data.map((book) => ({
        isbn: book.isbn,
        title: book.title,
        author: book.author,
      }))
    );

    return response.data;
  } catch (error) {
    console.error(
      "❌ Error getting all books:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
}

// Task 11: Search by ISBN using Promises
function searchByISBNPromise(isbn) {
  console.log(
    `📖 Task 11: Searching for book with ISBN ${isbn} using Promises...`
  );

  return axios
    .get(`${BASE_URL}/books/isbn/${isbn}`)
    .then((response) => {
      console.log("✅ Book found:", response.data.data);
      return response.data;
    })
    .catch((error) => {
      console.error(
        "❌ Error searching by ISBN:",
        error.response?.data?.message || error.message
      );
      throw error;
    });
}

// Task 12: Search by Author using async/await
async function searchByAuthorAsync(author) {
  try {
    console.log(
      `👤 Task 12: Searching for books by author "${author}" using async/await...`
    );
    const response = await axios.get(
      `${BASE_URL}/books/author/${encodeURIComponent(author)}`
    );

    console.log("✅ Success! Found", response.data.count, "books by", author);
    console.log(
      "Books:",
      response.data.data.map((book) => ({
        isbn: book.isbn,
        title: book.title,
      }))
    );

    return response.data;
  } catch (error) {
    console.error(
      "❌ Error searching by author:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
}

// Task 13: Search by Title using Promises
function searchByTitlePromise(title) {
  console.log(
    `📚 Task 13: Searching for books with title "${title}" using Promises...`
  );

  return axios
    .get(`${BASE_URL}/books/title/${encodeURIComponent(title)}`)
    .then((response) => {
      console.log(
        "✅ Success! Found",
        response.data.count,
        'books with title containing "' + title + '"'
      );
      console.log(
        "Books:",
        response.data.data.map((book) => ({
          isbn: book.isbn,
          title: book.title,
          author: book.author,
        }))
      );
      return response.data;
    })
    .catch((error) => {
      console.error(
        "❌ Error searching by title:",
        error.response?.data?.message || error.message
      );
      throw error;
    });
}

// Demo function to run all tasks
async function runAllTasks() {
  console.log("🚀 Starting Book Review API Client Demo...\n");

  try {
    // Task 10: Get all books (async/await)
    await getAllBooksAsync();
    console.log("\n" + "=".repeat(50) + "\n");

    // Task 11: Search by ISBN (Promises)
    await searchByISBNPromise("9780143127550");
    console.log("\n" + "=".repeat(50) + "\n");

    // Task 12: Search by Author (async/await)
    await searchByAuthorAsync("Jane Austen");
    console.log("\n" + "=".repeat(50) + "\n");

    // Task 13: Search by Title (Promises)
    await searchByTitlePromise("Pride");
    console.log("\n" + "=".repeat(50) + "\n");

    console.log("🎉 All tasks completed successfully!");
  } catch (error) {
    console.error("💥 Demo failed:", error.message);
  }
}

// Export functions for individual use
module.exports = {
  getAllBooksAsync,
  searchByISBNPromise,
  searchByAuthorAsync,
  searchByTitlePromise,
  runAllTasks,
};

// Run demo if this file is executed directly
if (require.main === module) {
  runAllTasks();
}
