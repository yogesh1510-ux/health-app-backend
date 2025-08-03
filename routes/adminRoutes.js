const express = require("express");
const router = express.Router();

const { fetchNurses } = require("../controllers/adminController");
const { verifyToken } = require("../middlewares/authMiddleware");
const { checkRole } = require("../middlewares/checkRole");
const { dynamicLimiter } = require("../middlewares/rateLimiter");

router.get(
  "/nurses",
  verifyToken,
  dynamicLimiter,
  checkRole("Admin"),
  fetchNurses
);

module.exports = router;
