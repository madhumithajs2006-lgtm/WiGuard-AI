function analyzeTiming(currentNetwork, previousNetworks = []) {
  const previous = previousNetworks.find(
    (network) =>
      network.ssid === currentNetwork.ssid &&
      network.bssid === currentNetwork.bssid,
  );

  // New network detected
  if (!previous) {
    return {
      score: 10,
      reason: "New Network Detected",
    };
  }

  let score = 0;
  const reasons = [];

  // Channel changed
  if (previous.channel !== currentNetwork.channel) {
    score += 20;
    reasons.push("Channel Changed");
  }

  // Authentication changed
  if (previous.authentication !== currentNetwork.authentication) {
    score += 30;
    reasons.push("Authentication Changed");
  }

  // Encryption changed
  if (previous.encryption !== currentNetwork.encryption) {
    score += 20;
    reasons.push("Encryption Changed");
  }

  return {
    score,
    reason: reasons.join(", "),
  };
}

module.exports = {
  analyzeTiming,
};
