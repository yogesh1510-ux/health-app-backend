const express = require("express");
const { verifyToken } = require("../middlewares/authMiddleware");
const router = express.Router();
const {
  addPatient,
  fetchPatients,
} = require("../controllers/patientController");

router.post("/", verifyToken, addPatient);
router.get("/", verifyToken, fetchPatients);

module.exports = router;
