import "../../styles/Card.css";

function StatusCard({
  status,
  backendConnected,
  totalNetworks,
  secureNetworks,
  suspiciousNetworks,
  highRiskNetworks,
}) {
  const threatScore = Math.min(
    100,
    highRiskNetworks * 40 + suspiciousNetworks * 15,
  );

  const colors = {
    SAFE: "#00ff9d",
    WARNING: "#ffd93d",
    DANGER: "#ff4d4d",
  };

  return (
    <div className="status-card-new">
      <div className="status-left">
        <div className="status-title">
          <h2>Security Overview</h2>
          <p>Wireless Intrusion Detection Status</p>
        </div>

        <div className="backend-status">
          <span
            className={
              backendConnected ? "backend-dot online" : "backend-dot offline"
            }
          />

          {backendConnected ? "Backend Connected" : "Backend Offline"}
        </div>

        <div className="status-grid">
          <div className="status-box">
            <h3>{totalNetworks}</h3>
            <span>Networks</span>
          </div>

          <div className="status-box">
            <h3>{secureNetworks}</h3>
            <span>Secure</span>
          </div>

          <div className="status-box">
            <h3>{suspiciousNetworks}</h3>
            <span>Medium</span>
          </div>

          <div className="status-box">
            <h3>{highRiskNetworks}</h3>
            <span>High Risk</span>
          </div>
        </div>
      </div>

      <div className="status-right">
        <div
          className="threat-ring"
          style={{
            "--score": `${threatScore * 3.6}deg`,
            "--ring": colors[status],
          }}
        >
          <div className="ring-center">
            <span className="score">{threatScore}%</span>

            <small>Threat Score</small>
          </div>
        </div>

        <div
          className="security-pill"
          style={{
            color: colors[status],
          }}
        >
          {status}
        </div>
      </div>
    </div>
  );
}

export default StatusCard;
