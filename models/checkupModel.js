const pool = require("../config/db");

const createCheckup = (data, callback) => {
  const sql = `
    INSERT INTO Checkups (patient_id, nurse_id, date, notes)
    VALUES (?, ?, ?, ?)`;
  const values = [data.patient_id, data.nurse_id, data.date, data.notes];
  pool.query(sql, values, callback);
};

const getAllCheckups = (callback) => {
  const sql = `
    SELECT c.*, p.name AS patient_name, s.name AS nurse_name
    FROM Checkups c
    JOIN Patient p ON c.patient_id = p.id
    JOIN StaffNurse s ON c.nurse_id = s.id
    ORDER BY c.date DESC`;
  pool.query(sql, callback);
};

module.exports = { createCheckup, getAllCheckups };
