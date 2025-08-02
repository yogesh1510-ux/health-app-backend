const pool = require("../config/db");

const createPatient = (data, callback) => {
  const { name, age, gender, address, registered_by } = data;
  const sql = `INSERT INTO Patient (name, age, gender, address, registered_by) VALUES (?, ?, ?, ?, ?)`;
  pool.query(sql, [name, age, gender, address, registered_by], callback);
};

module.exports = { createPatient };
