const express = require("express");
const { verifyToken } = require("../middlewares/authMiddleware");
const { checkRole } = require("../middlewares/checkRole");
const router = express.Router();
const {
  addOrUpdatePatient,
  fetchPatients,
} = require("../controllers/patientController");

router.post("/", verifyToken, addOrUpdatePatient);
router.get("/", verifyToken, checkRole("Nurse"), fetchPatients);

module.exports = router;
