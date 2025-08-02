const { createPatient } = require("../models/patientModel");

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

module.exports = { addPatient };
