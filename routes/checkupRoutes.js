const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const { checkRole } = require("../middlewares/checkRole");
const {
  addCheckup,
  fetchCheckups,
} = require("../controllers/checkupController");

router.post("/", verifyToken, checkRole("Nurse"), addCheckup);
router.get("/", verifyToken, fetchCheckups);

module.exports = router;
