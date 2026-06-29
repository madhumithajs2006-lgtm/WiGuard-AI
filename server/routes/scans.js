const express = require("express");
const router = express.Router();

const { getAllScans, clearScans } = require("../services/scanService");

// GET all scans
router.get("/", (req, res) => {
  res.json(getAllScans());
});

// DELETE all scans
router.delete("/", (req, res) => {
  clearScans();
  res.json({
    message: "History cleared",
  });
});

module.exports = router;
