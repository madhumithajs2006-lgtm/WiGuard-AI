const { calculateRisk } = require("./riskCalculator");
const { analyzeRSSI } = require("./rssiAnalysis");
const { analyzeTiming } = require("./timingAnalysis");
const { analyzeDeauthentication } = require("./deauthenticationAnalysis");
const { analyzeRogue } = require("./rogueAnalysis");
const { getHistory } = require("./historyService");

function analyzeNetworks(networks) {
  const history = getHistory();
  const previousNetworks = history.length > 0 ? history[0].networks || [] : [];

  const ssidMap = {};

  // Build SSID map
  networks.forEach((network) => {
    const ssid = network.ssid || "Hidden";

    if (!ssidMap[ssid]) {
      ssidMap[ssid] = [];
    }

    ssidMap[ssid].push(network);
  });

  return networks.map((network) => {
    let score = 0;
    const reasons = [];

    // ==========================
    // RSSI Analysis
    // ==========================

    const rssi = analyzeRSSI(network, previousNetworks);

    score += rssi.score;

    if (rssi.reason) {
      reasons.push(rssi.reason);
    }

    // ==========================
    // Timing Analysis
    // ==========================

    const timing = analyzeTiming(network, previousNetworks);

    score += timing.score;

    if (timing.reason) {
      reasons.push(timing.reason);
    }

    // ==========================
    // Behavior-based
    // Deauthentication Detection
    // ==========================

    const deauth = analyzeDeauthentication(network, history);

    score += deauth.score;

    if (deauth.reason) {
      reasons.push(deauth.reason);
    }

    // ==========================
    // Rogue AP Confidence
    // ==========================

    const rogue = analyzeRogue(network, networks, previousNetworks);

    score += Math.round(rogue.confidence / 4);

    reasons.push(...rogue.reasons);

    // ==========================
    // Hidden SSID
    // ==========================

    if (!network.ssid || network.ssid.trim() === "") {
      score += 20;
      reasons.push("Hidden SSID");
    }

    // ==========================
    // Open Authentication
    // ==========================

    if (
      network.authentication &&
      network.authentication.toLowerCase().includes("open")
    ) {
      score += 50;
      reasons.push("Open Authentication");
    }

    // ==========================
    // WEP Detection
    // ==========================

    if (
      network.authentication &&
      network.authentication.toUpperCase().includes("WEP")
    ) {
      score += 40;
      reasons.push("WEP Encryption");
    }

    // ==========================
    // Old WPA
    // ==========================

    if (
      network.authentication &&
      network.authentication.includes("WPA-Personal")
    ) {
      score += 20;
      reasons.push("Old WPA");
    }

    // ==========================
    // Weak Signal
    // ==========================

    if (network.signal < 30) {
      score += 10;
      reasons.push("Weak Signal");
    }

    // ==========================
    // Duplicate SSID
    // ==========================

    const ssid = network.ssid || "Hidden";

    if (ssidMap[ssid].length > 1) {
      score += 20;
      reasons.push("Duplicate SSID");
    }

    // ==========================
    // Suspicious SSID Names
    // ==========================

    const suspiciousWords = [
      "free",
      "wifi",
      "public",
      "guest",
      "airport",
      "hotel",
      "internet",
    ];

    if (
      network.ssid &&
      suspiciousWords.some((word) => network.ssid.toLowerCase().includes(word))
    ) {
      score += 20;
      reasons.push("Suspicious SSID Name");
    }

    // ==========================
    // Final Score
    // ==========================

    score = Math.min(score, 100);

    const risk = calculateRisk(score);

    return {
      ...network,

      score,
      risk,

      rogueConfidence: rogue.confidence,

      signalChange: rssi.signalChange || 0,

      appearances: deauth.appearances || 0,
      disappearances: deauth.disappearances || 0,

      reason:
        reasons.length > 0
          ? [...new Set(reasons)].join(", ")
          : "Secure Network",
    };
  });
}

module.exports = {
  analyzeNetworks,
};
