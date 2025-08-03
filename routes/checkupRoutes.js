const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const { checkRole } = require("../middlewares/checkRole");
const {
  addCheckup,
  fetchCheckups,
} = require("../controllers/checkupController");
const { dynamicLimiter } = require("../middlewares/rateLimiter");

router.post("/", verifyToken, dynamicLimiter, checkRole("Nurse"), addCheckup);
router.get("/", verifyToken, dynamicLimiter, fetchCheckups);

module.exports = router;
