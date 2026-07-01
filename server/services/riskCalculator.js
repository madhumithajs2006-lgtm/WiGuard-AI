function calculateRisk(score) {
  if (score >= 60) {
    return "POSSIBLE ROGUE AP";
  }

  if (score >= 40) {
    return "HIGH";
  }

  if (score >= 20) {
    return "MEDIUM";
  }

  return "SAFE";
}

module.exports = {
  calculateRisk,
};
