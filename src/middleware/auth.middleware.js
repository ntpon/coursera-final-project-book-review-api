const JWTUtil = require("../utils/jwt");
const { UnauthorizedError } = require("../utils/httpError");
const userRepository = require("../repositories/user.repository");

// Session-based authentication middleware
const requireSession = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return next(new UnauthorizedError("Please log in to access this resource"));
  }

  req.user = req.session.user;
  next();
};

// JWT-based authentication middleware
const requireJWT = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return next(new UnauthorizedError("Access token is required"));
    }

    const decoded = JWTUtil.verify(token);
    const user = await userRepository.findById(decoded.userId);

    if (!user) {
      return next(new UnauthorizedError("User not found"));
    }

    req.user = user;
    next();
  } catch (error) {
    next(new UnauthorizedError("Invalid token"));
  }
};

// Optional authentication - doesn't fail if no auth provided
const optionalAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (token) {
      const decoded = JWTUtil.verify(token);
      const user = await userRepository.findById(decoded.userId);
      if (user) {
        req.user = user;
      }
    } else if (req.session && req.session.user) {
      req.user = req.session.user;
    }
  } catch (error) {
    // Ignore auth errors for optional auth
  }

  next();
};

module.exports = {
  requireSession,
  requireJWT,
  optionalAuth,
};
