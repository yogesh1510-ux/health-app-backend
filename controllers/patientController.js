const catchAsyncErros = require("../middlewares/catchAsyncErros");
const {
  createPatient,
  getAllPatients,
  findPatientByNameAndAddress,
  updatePatient,
} = require("../models/patientModel");

const addOrUpdatePatient = catchAsyncErros((req, res) => {
  const {
    name,
    age,
    gender,
    address,
    diseases = "",
    medicines = "",
    registered_by,
  } = req.body;

  if (!name || !age || !gender || !address || !registered_by) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  findPatientByNameAndAddress(name, address, (err, existingPatient) => {
    if (err) {
      console.error("Error checking existing patient:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (existingPatient) {
      // Update the existing patient
      updatePatient(
        existingPatient.id,
        {
          age,
          gender,
          diseases,
          medicines,
          registered_by,
        },
        (err, result) => {
          if (err) {
            console.error("Error updating patient:", err);
            return res.status(500).json({ error: "Internal server error" });
          }
          return res.status(200).json({
            message: "Patient updated",
            patientId: existingPatient.id,
          });
        }
      );
    } else {
      // Create a new patient
      createPatient(
        {
          name,
          age,
          gender,
          address,
          diseases,
          medicines,
          registered_by,
        },
        (err, result) => {
          if (err) {
            console.error("Error creating patient:", err);
            return res.status(500).json({ error: "Internal server error" });
          }
          return res
            .status(201)
            .json({ message: "Patient created", patientId: result.insertId });
        }
      );
    }
  });
});

const fetchPatients = catchAsyncErros((req, res) => {
  getAllPatients((err, results) => {
    if (err) {
      console.error("Error fetching patients:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json(results);
  });
});

module.exports = { addOrUpdatePatient, fetchPatients };
