function analyzeRogue(network, networks = [], previousNetworks = []) {
  let confidence = 0;
  const reasons = [];

  // ----------------------------
  // Find duplicate SSIDs
  // ----------------------------

  const duplicates = networks.filter(
    (n) =>
      (n.ssid || "").trim() !== "" &&
      n.ssid === network.ssid &&
      n.bssid !== network.bssid
  );

  if (duplicates.length === 0) {
    return {
      confidence: 0,
      reasons: [],
    };
  }

  confidence += 20;
  reasons.push("Duplicate SSID");

  const other = duplicates[0];

  // ----------------------------
  // Authentication mismatch
  // ----------------------------

  if (network.authentication !== other.authentication) {
    confidence += 20;
    reasons.push("Authentication Mismatch");
  }

  // ----------------------------
  // Encryption mismatch
  // ----------------------------

  if (network.encryption !== other.encryption) {
    confidence += 15;
    reasons.push("Encryption Mismatch");
  }

  // ----------------------------
  // Channel mismatch
  // ----------------------------

  if (network.channel !== other.channel) {
    confidence += 15;
    reasons.push("Different Channel");
  }

  // ----------------------------
  // Large RSSI Difference
  // ----------------------------

  const diff = Math.abs(network.signal - other.signal);

  if (diff >= 40) {
    confidence += 15;
    reasons.push("Large RSSI Difference");
  }

  // ----------------------------
  // Appeared Suddenly
  // ----------------------------

  const existed = previousNetworks.find(
    (n) => n.bssid === network.bssid
  );

  if (!existed) {
    confidence += 15;
    reasons.push("Sudden Appearance");
  }

  return {
    confidence,
    reasons,
  };
}

module.exports = {
  analyzeRogue,
};