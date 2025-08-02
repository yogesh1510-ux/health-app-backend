const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const { syncData } = require("../controllers/syncController");

router.post("/", verifyToken, syncData);

module.exports = router;
