const express = require("express");
const router = express.Router();

const { getHistory, clearHistory } = require("../services/historyService");

// Get scan history
router.get("/", (req, res) => {
  res.json(getHistory());
});

// Clear history
router.delete("/", (req, res) => {
  clearHistory();

  res.json({
    message: "History cleared successfully",
  });
});

module.exports = router;
