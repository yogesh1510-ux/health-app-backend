const { getAllNurses } = require("../models/adminModel");
const catchAsyncErrors = require("../middlewares/catchAsyncErros");

const fetchNurses = catchAsyncErrors((req, res) => {
  getAllNurses((err, results) => {
    if (err) {
      console.error("Error fetching nurses:", err);
      return res.status(500).json({ error: "Server error" });
    }
    res.status(200).json(results);
  });
});

module.exports = { fetchNurses };
