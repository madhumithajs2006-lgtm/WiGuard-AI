function analyzeDeauthentication(currentNetwork, history = []) {
  // Use the latest 5 scans
  const recentScans = history.slice(0, 5);

  let appearances = 0;
  let disappearances = 0;
  let previousState = null;

  // Read scans from oldest → newest
  const scans = [...recentScans].reverse();

  for (const scan of scans) {
    const found = (scan.networks || []).find(
      (network) => network.bssid === currentNetwork.bssid,
    );

    const currentState = !!found;

    if (previousState !== null && previousState !== currentState) {
      if (currentState) {
        appearances++;
      } else {
        disappearances++;
      }
    }

    previousState = currentState;
  }

  let score = 0;
  let reason = "";

  // If network repeatedly disappears/reappears
  if (appearances >= 2 && disappearances >= 2) {
    score += 40;
    reason = "Possible Deauthentication Activity";
  }

  return {
    score,
    reason,
    appearances,
    disappearances,
  };
}

module.exports = {
  analyzeDeauthentication,
};
