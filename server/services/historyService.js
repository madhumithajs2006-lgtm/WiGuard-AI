const fs = require("fs");
const path = require("path");

const HISTORY_FILE = path.join(__dirname, "../data/scanHistory.json");

// Read history
function getHistory() {
  try {
    if (!fs.existsSync(HISTORY_FILE)) {
      fs.writeFileSync(HISTORY_FILE, "[]");
    }

    const data = fs.readFileSync(HISTORY_FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Failed to read history:", err);
    return [];
  }
}

// Save a new scan
function saveScan(scan) {
  try {
    const history = getHistory();

    history.unshift(scan);

    // Keep only the latest 100 scans
    if (history.length > 100) {
      history.length = 100;
    }

    fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
  } catch (err) {
    console.error("Failed to save history:", err);
  }
}

// Clear history
function clearHistory() {
  fs.writeFileSync(HISTORY_FILE, "[]");
}

module.exports = {
  getHistory,
  saveScan,
  clearHistory,
};
