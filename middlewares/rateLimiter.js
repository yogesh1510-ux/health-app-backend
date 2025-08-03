const rateLimit = require("express-rate-limit");
const { RedisStore } = require("rate-limit-redis");
const redisClient = require("../config/redis");

const commonOptions = {
  windowMs: 1 * 60 * 1000, // 1 minute window
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({
    sendCommand: (command, ...args) =>
      redisClient.sendCommand([command, ...args]),
  }),
};

// Nurse limiter: 100 req/min
const nurseLimiter = rateLimit({
  ...commonOptions,
  max: 100,
});

// Admin limiter: 1000 req/min
const adminLimiter = rateLimit({
  ...commonOptions,
  max: 1000,
});

// Dynamic limiter based on role and bypass header
const dynamicLimiter = (req, res, next) => {
  if (
    req.headers["x-bypass-ratelimit"] === "true" &&
    req.user?.role === "Admin"
  ) {
    return next(); // bypass for Admins only
  }

  if (req.user?.role === "Admin") {
    return adminLimiter(req, res, next);
  } else {
    return nurseLimiter(req, res, next);
  }
};

module.exports = { dynamicLimiter };
