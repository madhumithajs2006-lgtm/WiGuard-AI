import "../../styles/NetworkCards.css";

function NetworkCards({ network }) {
  function getBadgeClass(risk) {
    switch (risk) {
      case "POSSIBLE ROGUE AP":
        return "rogue";

      case "HIGH":
        return "high";

      case "MEDIUM":
        return "medium";

      default:
        return "safe";
    }
  }

  return (
    <div className={`network-card ${getBadgeClass(network.risk)}`}>
      <div className="network-header">
        <h3>{network.ssid || "Hidden Network"}</h3>

        <span className={`risk-badge ${getBadgeClass(network.risk)}`}>
          {network.risk}
        </span>
      </div>

      <div className="network-details">
        <div className="signal-section">
          <span>Signal</span>

          <div className="signal-bar">
            <div
              className="signal-fill"
              style={{
                width: `${network.signal}%`,
              }}
            ></div>
          </div>

          <span>{network.signal}%</span>
        </div>

        <p>
          <strong>Risk Score:</strong> {network.score}/100
        </p>

        <p>
          <strong>Authentication:</strong> {network.authentication}
        </p>

        <p>
          <strong>Encryption:</strong> {network.encryption}
        </p>

        <p>
          <strong>Band:</strong> {network.band}
        </p>

        <p>
          <strong>Channel:</strong> {network.channel}
        </p>

        <p>
          <strong>BSSID:</strong>
          <br />
          {network.bssid}
        </p>

        <div className="reason-box">⚠ {network.reason}</div>
      </div>
    </div>
  );
}

export default NetworkCards;
