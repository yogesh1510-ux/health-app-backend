const pool = require("../config/db");

const { encrypt, decrypt } = require("../utils/encryption");
const createPatient = (data, callback) => {
  const encryptedName = encrypt(data.name);
  const encryptedAddress = encrypt(data.address);

  const sql = `INSERT INTO Patient (name, age, gender, address, diseases, medicines, registered_by) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  pool.query(
    sql,
    [
      encryptedName,
      data.age,
      data.gender,
      encryptedAddress,
      data.diseases || "",
      data.medicines || "",
      data.registered_by,
    ],
    callback
  );
};

const isHex = (str) => /^[0-9a-fA-F]+$/.test(str);

const getAllPatients = (callback) => {
  const sql = "SELECT * FROM Patient";
  pool.query(sql, (err, results) => {
    if (err) return callback(err);

    const decrypted = results.map((patient) => ({
      ...patient,
      name: isHex(patient.name) ? decrypt(patient.name) : patient.name,
      address: isHex(patient.address)
        ? decrypt(patient.address)
        : patient.address,
      diseases: patient.diseases,
      medicines: patient.medicines,
    }));

    callback(null, decrypted);
  });
};

const findPatientByNameAndAddress = (name, address, callback) => {
  const encryptedName = encrypt(name);
  const encryptedAddress = encrypt(address);

  const sql = `
    SELECT * FROM Patient
    WHERE name = ? AND address = ?
    LIMIT 1
  `;
  pool.query(sql, [encryptedName, encryptedAddress], (err, results) => {
    if (err) return callback(err);
    if (results.length > 0) return callback(null, results[0]);
    return callback(null, null);
  });
};

const updatePatient = (id, data, callback) => {
  const sql = `
    UPDATE Patient
    SET age = ?, gender = ?, diseases = ?, medicines = ?, registered_by = ?
    WHERE id = ?
  `;
  const values = [
    data.age,
    data.gender,
    data.diseases,
    data.medicines,
    data.registered_by,
    id,
  ];
  pool.query(sql, values, callback);
};

module.exports = {
  createPatient,
  getAllPatients,
  findPatientByNameAndAddress,
  updatePatient,
};
