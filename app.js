const express = require("express");
const pool = require("./config/db");
const syncRoutes = require("./routes/syncRoutes");
const patientRoutes = require("./routes/patientRoutes");
const authRoutes = require("./routes/authRoutes");
const { dynamicLimiter } = require("./middlewares/rateLimiter");
const adminRoutes = require("./routes/adminRoutes");
const checkupRoutes = require("./routes/checkupRoutes");
const errorMiddleware = require("./middlewares/error");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(dynamicLimiter);

// Register routes
app.use("/auth", authRoutes);
app.use("/patients", patientRoutes);
app.use("/sync", syncRoutes);
app.use("/admin", adminRoutes);
app.use("/checkups", checkupRoutes);
const cors = require("cors");

// Health check route
app.get("/", (req, res) => res.send("Health App Backend Running"));
app.use(cors());

app.use(errorMiddleware);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
