const express = require("express");
const { verifyToken } = require("../middlewares/authMiddleware");
const { checkRole } = require("../middlewares/checkRole");
const router = express.Router();
const {
  addPatient,
  fetchPatients,
} = require("../controllers/patientController");

router.post("/", verifyToken, addPatient);
router.get("/", verifyToken, checkRole("Nurse"), fetchPatients);

module.exports = router;
