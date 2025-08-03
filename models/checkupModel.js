// models/checkupModel.js
const pool = require("../config/db");

const createCheckup = ({ patient_id, nurse_id, date, notes }) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO Checkups (patient_id, nurse_id, date, notes) VALUES (?, ?, ?, ?)`;
    pool.query(sql, [patient_id, nurse_id, date, notes], (err, results) => {
      if (err) return reject(err);
      console.log("✅ Checkup inserted:", results); // debug
      resolve(results.insertId); // <- IMPORTANT
    });
  });
};

const getAllCheckups = (callback) => {
  const sql = `SELECT * FROM Checkups`;
  pool.query(sql, callback);
};

module.exports = { createCheckup, getAllCheckups };
