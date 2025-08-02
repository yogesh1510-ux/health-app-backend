const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { findUserByName } = require("../models/userModel");

const login = (req, res) => {
  const { username } = req.body;

  findUserByName(username, (err, results) => {
    if (err) return res.status(500).json({ error: "Server error" });
    if (results.length === 0)
      return res.status(401).json({ error: "Invalid user" });

    const user = results[0];

    const token = jwt.sign(
      { id: user.id, name: user.name, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res.status(200).json({ token });
  });
};

module.exports = { login };
