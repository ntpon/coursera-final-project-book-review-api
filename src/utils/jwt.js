const jwt = require("jsonwebtoken");
const config = require("../config/env");

class JWTUtil {
  static sign(payload) {
    return jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });
  }

  static verify(token) {
    try {
      return jwt.verify(token, config.jwt.secret);
    } catch (error) {
      throw new Error("Invalid token");
    }
  }

  static decode(token) {
    return jwt.decode(token);
  }
}

module.exports = JWTUtil;
