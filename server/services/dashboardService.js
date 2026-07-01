function generateDashboard(networks) {
  const totalNetworks = networks.length;

  const secureNetworks = networks.filter((n) => n.risk === "SAFE").length;

  const suspiciousNetworks = networks.filter(
    (n) => n.risk === "SUSPICIOUS" || n.risk === "MEDIUM",
  ).length;

  const highRiskNetworks = networks.filter(
    (n) => n.risk === "HIGH" || n.risk === "POSSIBLE ROGUE AP",
  ).length;

  const rogueAPs = networks.filter(
    (n) => n.risk === "POSSIBLE ROGUE AP",
  ).length;

  let status = "SAFE";

  if (highRiskNetworks > 0) status = "DANGER";
  else if (suspiciousNetworks > 0) status = "WARNING";

  return {
    totalNetworks,
    secureNetworks,
    suspiciousNetworks,
    highRiskNetworks,
    rogueAPs,
    status,
    networks,
  };
}

module.exports = {
  generateDashboard,
};
