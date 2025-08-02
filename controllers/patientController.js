const { createPatient, getAllPatients } = require("../models/patientModel");

const addPatient = (req, res) => {
  createPatient(req.body, (err, results) => {
    if (err) {
      console.error("Error creating patient:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(201).json({
      message: "Patient added successfully",
      patientId: results.insertId,
    });
  });
};

const fetchPatients = (req, res) => {
  getAllPatients((err, results) => {
    if (err) {
      console.error("Error fetching patients:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json(results);
  });
};

module.exports = { addPatient, fetchPatients };
