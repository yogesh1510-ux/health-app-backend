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

module.exports = { createPatient, getAllPatients };
