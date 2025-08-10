require("dotenv").config();

const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  jwt: {
    secret: process.env.JWT_SECRET || "fallback-secret-key",
    expiresIn: process.env.JWT_EXPIRES_IN || "24h",
  },
  session: {
    secret: process.env.SESSION_SECRET || "fallback-session-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  },
};

module.exports = config;
