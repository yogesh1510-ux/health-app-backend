const express = require("express");
const pool = require("./config/db");
const app = express();

require("dotenv").config();

app.use(express.json());

const patientRoutes = require("./routes/patientRoutes");
app.use("/patients", patientRoutes);

app.get("/", (req, res) => res.send("Health App Backend Running"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
