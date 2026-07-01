import { useMemo, useState } from "react";
import "../../styles/NetworkOverview.css";

function getRiskColor(risk) {
  switch (risk) {
    case "SAFE":
      return "#22c55e";

    case "MEDIUM":
    case "SUSPICIOUS":
      return "#facc15";

    case "HIGH":
      return "#f97316";

    case "POSSIBLE ROGUE AP":
      return "#ef4444";

    default:
      return "#94a3b8";
  }
}

function NetworkOverview({ networks = [] }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState("signal");

  const filteredNetworks = useMemo(() => {
    let data = [...networks];

    // Search
    if (search.trim()) {
      data = data.filter((network) =>
        (network.ssid || "Hidden Network")
          .toLowerCase()
          .includes(search.toLowerCase()),
      );
    }

    // Filter
    if (filter !== "ALL") {
      data = data.filter((network) => network.risk === filter);
    }

    // Sort
    switch (sortBy) {
      case "signal":
        data.sort((a, b) => b.signal - a.signal);
        break;

      case "ssid":
        data.sort((a, b) => (a.ssid || "").localeCompare(b.ssid || ""));
        break;

      case "risk": {
        const order = {
          "POSSIBLE ROGUE AP": 4,
          HIGH: 3,
          MEDIUM: 2,
          SUSPICIOUS: 2,
          SAFE: 1,
        };

        data.sort((a, b) => (order[b.risk] || 0) - (order[a.risk] || 0));
        break;
      }

      default:
        break;
    }

    return data;
  }, [networks, search, filter, sortBy]);

  return (
    <div className="network-section">
      <h2>📡 Detected Wi-Fi Networks</h2>

      <div className="network-toolbar">
        <input
          type="text"
          placeholder="🔍 Search SSID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="ALL">All Risks</option>
          <option value="SAFE">Safe</option>
          <option value="MEDIUM">Medium</option>
          <option value="SUSPICIOUS">Suspicious</option>
          <option value="HIGH">High</option>
          <option value="POSSIBLE ROGUE AP">Rogue AP</option>
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="signal">Sort by Signal</option>
          <option value="risk">Sort by Risk</option>
          <option value="ssid">Sort by SSID</option>
        </select>
      </div>

      {filteredNetworks.length === 0 ? (
        <p className="empty-network">No Wi-Fi networks found.</p>
      ) : (
        <div className="network-grid">
          {filteredNetworks.map((network, index) => (
            <NetworkCard key={network.bssid || index} network={network} />
          ))}
        </div>
      )}
    </div>
  );
}

function NetworkCard({ network }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="network-card-new">
      <div className="network-top">
        <h3>{network.ssid || "Hidden Network"}</h3>

        <span
          className="risk-pill"
          style={{
            background: getRiskColor(network.risk),
          }}
        >
          {network.risk}
        </span>
      </div>

      <div className="signal-label">Signal Strength</div>

      <div className="signal-row">
        <div className="signal-track">
          <div
            className="signal-fill"
            style={{
              width: `${network.signal || 0}%`,
            }}
          />
        </div>

        <span>{network.signal || 0}%</span>
      </div>

      <div className="network-info">
        <div>
          <small>Security</small>
          <p>{network.authentication}</p>
        </div>

        <div>
          <small>Channel</small>
          <p>{network.channel}</p>
        </div>
      </div>

      <div className="risk-score">
        <div>
          <span>Risk Score</span>
          <strong>{network.score ?? 0}/100</strong>
        </div>

        <div>
          <span>Rogue Confidence</span>
          <strong>{network.rogueConfidence ?? 0}%</strong>
        </div>
      </div>

      <button className="details-btn" onClick={() => setExpanded(!expanded)}>
        {expanded ? "Hide Details ▲" : "View Details ▼"}
      </button>

      {expanded && (
        <div className="details-panel">
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

          <p>
            <strong>Reason:</strong>
            <br />
            {network.reason}
          </p>
        </div>
      )}
    </div>
  );
}

export default NetworkOverview;
