# 📚 Book Review API

RESTful API for managing book reviews built with Node.js and Express.js for Coursera final project.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Start development server
npm run dev

# Start production server
npm start
```

Server runs at `http://localhost:5000`

## 📋 Key API Endpoints

### Public Endpoints

- `GET /api/books` - Get all books
- `GET /api/books/isbn/:isbn` - Get book by ISBN
- `GET /api/books/author/:author` - Get books by author
- `GET /api/books/title/:title` - Get books by title
- `GET /api/books/:isbn/reviews` - Get book reviews

### Authentication

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Authenticated Endpoints

- `PUT /api/reviews/:isbn` - Add/modify review
- `DELETE /api/reviews/:isbn` - Delete review

## 🔐 Authentication

Supports JWT tokens and session-based authentication:

- JWT: Include `Authorization: Bearer <token>` header
- Sessions: Automatic cookie-based authentication

## 🛠️ Tech Stack

- **Node.js** + **Express.js**
- **JWT** authentication
- **Bcrypt** password hashing
- **Joi** validation
- **Helmet** + **CORS** security

## 📊 Coursera Tasks Completed

✅ All 14 tasks completed (30/30 points)

- Tasks 1-5: Public book operations
- Tasks 6-7: User authentication
- Tasks 8-9: Review management
- Tasks 10-13: Async/Promise implementations
