const express = require("express");
const router = express.Router();

const { fetchNurses } = require("../controllers/adminController");
const { verifyToken } = require("../middlewares/authMiddleware");
const { checkRole } = require("../middlewares/checkRole");

router.get("/nurses", verifyToken, checkRole("Admin"), fetchNurses);

module.exports = router;
