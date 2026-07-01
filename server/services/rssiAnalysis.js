function analyzeRSSI(currentNetwork, previousNetworks = []) {
  const previous = previousNetworks.find(
    (network) =>
      network.ssid === currentNetwork.ssid &&
      network.bssid === currentNetwork.bssid,
  );

  if (!previous) {
    return {
      score: 0,
      reason: "",
      signalChange: 0,
    };
  }

  const signalChange = currentNetwork.signal - previous.signal;

  let score = 0;
  let reason = "";

  if (Math.abs(signalChange) >= 30) {
    score = 25;

    if (signalChange > 0) {
      reason = `RSSI increased by ${signalChange}%`;
    } else {
      reason = `RSSI dropped by ${Math.abs(signalChange)}%`;
    }
  }

  return {
    score,
    reason,
    signalChange,
  };
}

module.exports = {
  analyzeRSSI,
};
