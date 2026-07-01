const { scanWifi } = require("./windowsWifiScanner");
const { analyzeNetworks } = require("./detectionService");
const { saveScan } = require("./historyService");

async function getAllScans() {
  // Perform a real Wi-Fi scan
  const networks = await scanWifi();

  // Analyze detected networks
  const analyzed = analyzeNetworks(networks);

  // Calculate dashboard summary
  const totalNetworks = analyzed.length;

  const secureNetworks = analyzed.filter((n) => n.risk === "SAFE").length;

  const suspiciousNetworks = analyzed.filter(
    (n) => n.risk === "MEDIUM" || n.risk === "SUSPICIOUS",
  ).length;

  const highRiskNetworks = analyzed.filter(
    (n) => n.risk === "HIGH" || n.risk === "POSSIBLE ROGUE AP",
  ).length;

  const rogueAPs = analyzed.filter(
    (n) => n.risk === "POSSIBLE ROGUE AP",
  ).length;

  const status =
    rogueAPs > 0 ? "DANGER" : highRiskNetworks > 0 ? "WARNING" : "SAFE";

  // Save this scan into history
  saveScan({
    time: new Date().toISOString(),
    status,
    totalNetworks,
    secureNetworks,
    suspiciousNetworks,
    highRiskNetworks,
    rogueAPs,
    networks: analyzed,
  });

  // Return current scan to dashboard
  return analyzed;
}

module.exports = {
  getAllScans,
};
