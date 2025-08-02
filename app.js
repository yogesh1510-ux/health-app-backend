const express = require("express");
const pool = require("./config/db");
const syncRoutes = require("./routes/syncRoutes");
const patientRoutes = require("./routes/patientRoutes");
const authRoutes = require("./routes/authRoutes");
const { generalLimiter } = require("./middlewares/rateLimiter");
const adminRoutes = require("./routes/adminRoutes");

app.use(generalLimiter);

const app = express();

require("dotenv").config();

app.use(express.json());
app.use(generalLimiter);
app.use("/patients", patientRoutes);
app.use("/sync", syncRoutes);
app.use("/admin", adminRoutes);

app.get("/", (req, res) => res.send("Health App Backend Running"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

app.use("/auth", authRoutes);
