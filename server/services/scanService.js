const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/scans.json");

// Get all scans
const getAllScans = () => {
  try {
    const data = fs.readFileSync(filePath, "utf8");

    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

// Save a new scan
const saveScan = (scan) => {
  const scans = getAllScans();

  scans.unshift(scan); // newest first

  fs.writeFileSync(filePath, JSON.stringify(scans, null, 2));
};

// Delete all scans
const clearScans = () => {
  fs.writeFileSync(filePath, JSON.stringify([], null, 2));
};

module.exports = {
  getAllScans,
  saveScan,
  clearScans,
};
