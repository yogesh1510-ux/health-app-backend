const catchAsyncErros = require("../middlewares/catchAsyncErros");
const { createCheckup, getAllCheckups } = require("../models/checkupModel");
const { addDiseases } = require("../models/diseaseModel");
const { addMedicines } = require("../models/medicineModel");

const addCheckup = catchAsyncErros(async (req, res) => {
  const { patient_id, nurse_id, date, notes, diseases, medicines } = req.body;

  // Input validation
  if (!patient_id || !nurse_id || !date) {
    return res.status(400).json({
      error: "patient_id, nurse_id, and date are required",
    });
  }

  // Debug log
  console.log("Incoming Checkup:", { patient_id, nurse_id, date, notes });

  // Create the checkup
  const checkupId = await createCheckup({
    patient_id,
    nurse_id,
    date,
    notes,
  });

  // Add diseases if provided
  if (Array.isArray(diseases) && diseases.length > 0) {
    await addDiseases(checkupId, diseases);
  }

  // Add medicines if provided
  if (Array.isArray(medicines) && medicines.length > 0) {
    await addMedicines(checkupId, medicines);
  }

  res.status(201).json({ message: "Checkup created successfully", checkupId });
});

const fetchCheckups = catchAsyncErros((req, res) => {
  getAllCheckups((err, results) => {
    if (err) return res.status(500).json({ error: "Error fetching checkups" });
    res.json(results);
  });
});

module.exports = { addCheckup, fetchCheckups };
