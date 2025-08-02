const express = require("express");
const router = express.Router();
const {
  addPatient,
  fetchPatients,
} = require("../controllers/patientController");

router.post("/", addPatient);
router.get("/", fetchPatients);

module.exports = router;
