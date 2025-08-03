const express = require("express");
const { verifyToken } = require("../middlewares/authMiddleware");
const { checkRole } = require("../middlewares/checkRole");
const router = express.Router();
const {
  addOrUpdatePatient,
  fetchPatients,
} = require("../controllers/patientController");
const { dynamicLimiter } = require("../middlewares/rateLimiter");

router.post("/", verifyToken, dynamicLimiter, addOrUpdatePatient);

router.get("/", verifyToken, dynamicLimiter, checkRole("Nurse"), fetchPatients);

module.exports = router;
