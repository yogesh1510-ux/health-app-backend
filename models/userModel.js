const pool = require("../config/db");

const findUserByName = (username, callback) => {
  const sql = "SELECT * FROM StaffNurse WHERE name = ?";
  pool.query(sql, [username], callback);
};

module.exports = { findUserByName };
