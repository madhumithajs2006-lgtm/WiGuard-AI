const express = require("express");
const router = express.Router();

const { getAllScans, clearScans } = require("../services/scanService");

router.get("/", async (req, res) => {
  try {
    const scans = await getAllScans();
    res.json(scans);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to scan Wi-Fi",
    });
  }
});

router.delete("/", async (req, res) => {
  await clearScans();

  res.json({
    message: "History cleared",
  });
});

module.exports = router;
