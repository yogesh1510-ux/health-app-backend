const pool = require("../config/db");

const addDiseases = (checkupId, diseases, callback) => {
  const sql = `INSERT INTO Diseases (checkup_id, name) VALUES ?`;
  const values = diseases.map((name) => [checkupId, name]);
  pool.query(sql, [values], callback);
};

module.exports = { addDiseases };
