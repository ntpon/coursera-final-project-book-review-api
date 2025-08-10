# 📚 Book Review API - Coursera Final Project

A comprehensive RESTful API for managing book reviews built with Node.js and Express.js. This project demonstrates CRUD operations, authentication, session management, and asynchronous programming patterns.

## 🎯 Project Overview

This is the final project for the Coursera Node.js & Express.js course. The API serves as a backend for an online book review application where users can browse books, register accounts, login, and manage their book reviews.

## ✨ Features

### General Users (No Authentication Required)

- **Task 1**: Get all available books
- **Task 2**: Search books by ISBN
- **Task 3**: Search books by author
- **Task 4**: Search books by title
- **Task 5**: View book reviews

### User Management

- **Task 6**: User registration
- **Task 7**: User login with JWT and session authentication

### Authenticated Users Only

- **Task 8**: Add or modify book reviews
- **Task 9**: Delete own book reviews

### Advanced Features (Tasks 10-13)

- **Task 10**: Async/await implementation for getting all books
- **Task 11**: Promise-based ISBN search
- **Task 12**: Async/await author search
- **Task 13**: Promise-based title search

## 🏗️ Project Structure

```
book-review-api/
├─ src/
│  ├─ app.js                 # Express app configuration
│  ├─ server.js              # Server startup
│  ├─ config/
│  │  └─ env.js              # Environment configuration
│  ├─ routes/
│  │  ├─ index.js            # Main router
│  │  ├─ book.routes.js      # Book-related routes
│  │  ├─ review.routes.js    # Review-related routes
│  │  └─ auth.routes.js      # Authentication routes
│  ├─ controllers/
│  │  ├─ book.controller.js  # Book business logic
│  │  ├─ review.controller.js # Review business logic
│  │  └─ auth.controller.js  # Authentication logic
│  ├─ services/
│  │  ├─ book.service.js     # Book service layer
│  │  ├─ review.service.js   # Review service layer
│  │  └─ auth.service.js     # Authentication service
│  ├─ repositories/
│  │  ├─ book.repository.js  # Book data access
│  │  └─ user.repository.js  # User data access
│  ├─ models/
│  │  ├─ book.model.js       # Book entity model
│  │  └─ user.model.js       # User entity model
│  ├─ middleware/
│  │  ├─ auth.middleware.js  # Authentication guards
│  │  ├─ validate.middleware.js # Input validation
│  │  └─ async.middleware.js # Async error handling
│  ├─ utils/
│  │  ├─ jwt.js              # JWT utilities
│  │  └─ httpError.js        # Custom error classes
│  ├─ data/
│  │  └─ seed.js             # Pre-loaded book data
│  └─ docs/
│     └─ api.http            # API testing file
├─ client/                   # Axios client for Tasks 10-13
│  ├─ index.js              # Client implementation
│  └─ package.json          # Client dependencies
├─ .env.example              # Environment template
├─ .env                      # Environment variables
├─ package.json              # Project dependencies
└─ README.md                 # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd coursera-final-project-book-review-api
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup environment variables**

```bash
cp .env.example .env
# Edit .env file with your configurations
```

4. **Start the server**

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

The server will start at `http://localhost:5000`

### Testing the Client (Tasks 10-13)

1. **Install client dependencies**

```bash
cd client
npm install
```

2. **Run the client tests**

```bash
npm start
```

## 📋 API Endpoints

### Books (Public Access)

| Method | Endpoint                    | Description         | Task   |
| ------ | --------------------------- | ------------------- | ------ |
| GET    | `/api/books`                | Get all books       | Task 1 |
| GET    | `/api/books/isbn/:isbn`     | Get book by ISBN    | Task 2 |
| GET    | `/api/books/author/:author` | Get books by author | Task 3 |
| GET    | `/api/books/title/:title`   | Get books by title  | Task 4 |
| GET    | `/api/books/:isbn/reviews`  | Get book reviews    | Task 5 |

### Authentication

| Method | Endpoint             | Description       | Task   |
| ------ | -------------------- | ----------------- | ------ |
| POST   | `/api/auth/register` | Register new user | Task 6 |
| POST   | `/api/auth/login`    | Login user        | Task 7 |
| POST   | `/api/auth/logout`   | Logout user       | -      |
| GET    | `/api/auth/profile`  | Get user profile  | -      |

### Reviews (Authenticated)

| Method | Endpoint             | Description       | Task   |
| ------ | -------------------- | ----------------- | ------ |
| PUT    | `/api/reviews/:isbn` | Add/modify review | Task 8 |
| DELETE | `/api/reviews/:isbn` | Delete review     | Task 9 |
| GET    | `/api/reviews/:isbn` | Get book reviews  | -      |

### Utility

| Method | Endpoint      | Description       |
| ------ | ------------- | ----------------- |
| GET    | `/api/health` | Health check      |
| GET    | `/api`        | API documentation |
| GET    | `/`           | Welcome message   |

## 🔐 Authentication

The API supports both **JWT tokens** and **session-based** authentication:

### JWT Authentication

- Include JWT token in `Authorization` header: `Bearer <token>`
- Token expires in 24 hours (configurable)

### Session Authentication

- Session cookies are set automatically after login
- Sessions persist across requests

## 📝 API Usage Examples

### Register a New User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "password": "password123",
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "password": "password123"
  }'
```

### Get All Books

```bash
curl http://localhost:5000/api/books
```

### Add a Book Review (Authenticated)

```bash
curl -X PUT http://localhost:5000/api/reviews/9780143127550 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-jwt-token>" \
  -d '{
    "rating": 5,
    "comment": "Excellent book! Highly recommended."
  }'
```

## 🧪 Testing

### Manual Testing with VS Code REST Client

1. Install the "REST Client" extension in VS Code
2. Open `src/docs/api.http`
3. Click "Send Request" above each request

### Testing with Postman

Import the API endpoints into Postman:

- Base URL: `http://localhost:5000/api`
- Set up environment variables for testing

### Automated Client Testing

Run the client tests for Tasks 10-13:

```bash
cd client
npm start
```

## 🗃️ Pre-loaded Data

The application comes with 10 pre-loaded books including:

- Things Fall Apart - Chinua Achebe
- Pride and Prejudice - Jane Austen
- The Epic Of Gilgamesh - N.K. Sandars
- Ficciones - Jorge Luis Borges
- And more...

## 🔒 Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin request handling
- **Bcrypt**: Password hashing
- **JWT**: Secure token-based authentication
- **Session Management**: Express sessions
- **Input Validation**: Joi schema validation
- **Error Handling**: Centralized error management

## 🚀 Deployment

### Environment Variables

Set the following in production:

```env
NODE_ENV=production
PORT=5000
JWT_SECRET=your-super-secret-jwt-key
SESSION_SECRET=your-super-secret-session-key
```

### Docker Deployment (Optional)

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 📊 Evaluation Criteria Checklist

- [x] **Task 1**: Get the book list available in the shop (2 Points)
- [x] **Task 2**: Get books based on ISBN (2 Points)
- [x] **Task 3**: Get all books by Author (2 Points)
- [x] **Task 4**: Get all books based on Title (2 Points)
- [x] **Task 5**: Get book reviews (2 Points)
- [x] **Task 6**: Register new user (3 Points)
- [x] **Task 7**: Login as registered user (3 Points)
- [x] **Task 8**: Add/Modify book reviews (2 Points)
- [x] **Task 9**: Delete book review (2 Points)
- [x] **Task 10**: Get all books using async callback (2 Points)
- [x] **Task 11**: Search by ISBN using Promises (2 Points)
- [x] **Task 12**: Search by Author using async/await (2 Points)
- [x] **Task 13**: Search by Title using Promises (2 Points)
- [x] **Task 14**: GitHub submission (2 Points)

**Total: 30 Points**

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: JWT + Express Sessions
- **Validation**: Joi
- **Security**: Helmet, CORS, Bcrypt
- **HTTP Client**: Axios (for client testing)
- **Development**: Nodemon

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Useful Links

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [JWT Documentation](https://jwt.io/)
- [Postman Documentation](https://learning.postman.com/)

## ⚡ Quick Commands Reference

```bash
# Start development server
npm run dev

# Start production server
npm start

# Test client functionality
cd client && npm start

# Install dependencies
npm install

# Setup environment
cp .env.example .env
```

---

**Happy Coding! 🚀**
