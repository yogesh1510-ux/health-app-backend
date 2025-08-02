const pool = require("../config/db");

const getAllNurses = (callback) => {
  const sql =
    'SELECT id, name, institution_id, role FROM StaffNurse WHERE role = "Nurse"';
  pool.query(sql, callback);
};

module.exports = { getAllNurses };
