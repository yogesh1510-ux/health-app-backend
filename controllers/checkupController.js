const { createCheckup, getAllCheckups } = require("../models/checkupModel");
const { addDiseases } = require("../models/diseaseModel");
const { addMedicines } = require("../models/medicineModel");

const addCheckup = (req, res) => {
  const { patient_id, nurse_id, date, notes, diseases, medicines } = req.body;

  createCheckup({ patient_id, nurse_id, date, notes }, (err, result) => {
    if (err) return res.status(500).json({ error: "Error creating checkup" });

    const checkupId = result.insertId;

    addDiseases(checkupId, diseases || [], (err1) => {
      if (err1) console.error("Disease insert error:", err1);
      addMedicines(checkupId, medicines || [], (err2) => {
        if (err2) console.error("Medicine insert error:", err2);

        res.status(201).json({ message: "Checkup recorded", checkupId });
      });
    });
  });
};

const fetchCheckups = (req, res) => {
  getAllCheckups((err, results) => {
    if (err) return res.status(500).json({ error: "Error fetching checkups" });
    res.json(results);
  });
};

module.exports = { addCheckup, fetchCheckups };
