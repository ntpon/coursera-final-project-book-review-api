const app = require("./app");
const config = require("./config/env");

const PORT = config.port;

const server = app.listen(PORT, () => {
  console.log(`
🚀 Server is running in ${config.nodeEnv} mode
📍 Port: ${PORT}
🌐 URL: http://localhost:${PORT}
📚 API Documentation: http://localhost:${PORT}/api
🏥 Health Check: http://localhost:${PORT}/api/health
  `);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Unhandled Rejection: ${err.message}`);
  // Close server & exit process
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  server.close(() => {
    console.log("Process terminated");
  });
});

module.exports = server;
