const express = require("express");
const pool = require("./config/db");
const syncRoutes = require("./routes/syncRoutes");
const patientRoutes = require("./routes/patientRoutes");
const authRoutes = require("./routes/authRoutes");
const { baseLimiter } = require("./middlewares/rateLimiter");
const adminRoutes = require("./routes/adminRoutes");
const checkupRoutes = require("./routes/checkupRoutes");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(baseLimiter);

// Register routes
app.use("/auth", authRoutes);
app.use("/patients", patientRoutes);
app.use("/sync", syncRoutes);
app.use("/admin", adminRoutes);
app.use("/checkups", checkupRoutes);

// Health check route
app.get("/", (req, res) => res.send("Health App Backend Running"));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
