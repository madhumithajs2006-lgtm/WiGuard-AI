const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");

const historyFile = path.join(__dirname, "../data/scanHistory.json");

router.get("/", (req, res) => {
  try {
    let history = [];

    if (fs.existsSync(historyFile)) {
      history = JSON.parse(fs.readFileSync(historyFile));
    }

    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Unable to load analytics",
    });
  }
});

module.exports = router;
