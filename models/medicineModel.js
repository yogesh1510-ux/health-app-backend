const pool = require("../config/db");

const addMedicines = (checkupId, medicines, callback) => {
  const sql = `INSERT INTO Medicines (checkup_id, name, dosage) VALUES ?`;
  const values = medicines.map((m) => [checkupId, m.name, m.dosage]);
  pool.query(sql, [values], callback);
};

module.exports = { addMedicines };
