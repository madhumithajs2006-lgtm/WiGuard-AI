import "../../styles/Card.css";

function StatusCard({ status, backendConnected, packets, clients, rogueAPs }) {
  return (
    <div className={`status-card ${status.toLowerCase()}`}>
      <div className="status-header">
        <div>
          <h2>System Status</h2>
          <h1>{status}</h1>
        </div>

        <div className="backend-status">
          <span
            className={`status-indicator ${
              backendConnected ? "online" : "offline"
            }`}
          ></span>

          {backendConnected ? "Backend Online" : "Backend Offline"}
        </div>
      </div>

      <div className="status-grid">
        <div className="status-box">
          <h4>Packets</h4>
          <p>{packets}</p>
        </div>

        <div className="status-box">
          <h4>Clients</h4>
          <p>{clients}</p>
        </div>

        <div className="status-box">
          <h4>Rogue APs</h4>
          <p>{rogueAPs}</p>
        </div>

        <div className="status-box">
          <h4>Alerts</h4>
          <p>{rogueAPs}</p>
        </div>
      </div>
    </div>
  );
}

export default StatusCard;
