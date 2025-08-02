const pool = require("../config/db");
const { encrypt } = require("../utils/encryption");

const syncData = async (req, res) => {
  const { patients = [] } = req.body;

  try {
    for (const p of patients) {
      const encryptedName = encrypt(p.name);
      const encryptedAddress = encrypt(p.address);

      const [existing] = await pool
        .promise()
        .query("SELECT id FROM Patient WHERE id = ?", [p.id]);

      if (existing.length > 0) {
        // Update
        await pool
          .promise()
          .query(
            `UPDATE Patient SET name=?, age=?, gender=?, address=?, registered_by=?, updated_at=? WHERE id=?`,
            [
              encryptedName,
              p.age,
              p.gender,
              encryptedAddress,
              p.registered_by,
              p.updated_at,
              p.id,
            ]
          );
      } else {
        // Insert
        await pool
          .promise()
          .query(
            `INSERT INTO Patient (id, name, age, gender, address, registered_by, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
              p.id,
              encryptedName,
              p.age,
              p.gender,
              encryptedAddress,
              p.registered_by,
              p.updated_at,
            ]
          );
      }
    }

    res.status(200).json({ message: "Sync completed successfully" });
  } catch (err) {
    console.error("Sync error:", err);
    res.status(500).json({ error: "Sync failed" });
  }
};

module.exports = { syncData };
