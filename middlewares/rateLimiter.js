const rateLimit = require("express-rate-limit");
const RedisStore = require("rate-limit-redis");
const redisClient = require("../config/redis");

const baseLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({
    sendCommand: (...args) => redisClient.call(...args),
  }),
  skip: (req, res) => {
    return (
      req.headers["x-bypass-ratelimit"] === "true" && req.user?.role === "Admin"
    );
  },
});

module.exports = { baseLimiter };
