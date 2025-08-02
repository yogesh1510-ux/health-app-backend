const express = require("express");
const router = express.Router();
const { addPatient } = require("../controllers/patientController");

router.post("/", addPatient);

module.exports = router;
