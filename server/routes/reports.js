const express = require("express");
const fs = require("fs");
const path = require("path");
const generatePDF = require("../services/pdfService");

const router = express.Router();

function buildReport() {
  const file = path.join(__dirname, "../data/scanHistory.json");

  let scans = [];

  if (fs.existsSync(file)) {
    scans = JSON.parse(fs.readFileSync(file, "utf8"));
  }

  const totalScans = scans.length;

  let totalNetworks = 0;
  let secureNetworks = 0;
  let suspiciousNetworks = 0;
  let rogueAPs = 0;

  const threats = [];

  scans.forEach((scan) => {
    totalNetworks += scan.totalNetworks || 0;
    secureNetworks += scan.secureNetworks || 0;
    suspiciousNetworks += scan.suspiciousNetworks || 0;
    rogueAPs += scan.rogueAPs || 0;

    (scan.networks || []).forEach((network) => {
      if (network.risk !== "SAFE") {
        threats.push({
          time: scan.time,
          ssid: network.ssid || "Hidden Network",
          risk: network.risk,
          signal: network.signal,
          reason: network.reason,
        });
      }
    });
  });

  return {
    totalScans,
    totalNetworks,
    secureNetworks,
    suspiciousNetworks,
    rogueAPs,
    overallStatus: rogueAPs > 0 ? "DANGER" : "SAFE",
    threats,
  };
}

// JSON Report
router.get("/", (req, res) => {
  try {
    res.json(buildReport());
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to generate report",
    });
  }
});

// PDF Report
router.get("/pdf", (req, res) => {
  try {
    const report = buildReport();
    generatePDF(report, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to generate PDF",
    });
  }
});

module.exports = router;
