const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const { syncData } = require("../controllers/syncController");
const { dynamicLimiter } = require("../middlewares/rateLimiter");

router.post("/", verifyToken, dynamicLimiter, syncData);

module.exports = router;
