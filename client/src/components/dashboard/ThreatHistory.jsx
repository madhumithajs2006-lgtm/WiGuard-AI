import "../../styles/ThreatHistory.css";
import { FaExclamationTriangle, FaShieldAlt, FaBug } from "react-icons/fa";

function getSeverity(level) {
  switch (level) {
    case "HIGH":
    case "POSSIBLE ROGUE AP":
      return {
        class: "high",
        icon: <FaBug />,
      };

    case "MEDIUM":
    case "SUSPICIOUS":
      return {
        class: "medium",
        icon: <FaExclamationTriangle />,
      };

    default:
      return {
        class: "info",
        icon: <FaShieldAlt />,
      };
  }
}

function ThreatHistory({ history }) {
  return (
    <div className="history-card">
      <div className="history-header">
        <h3>🚨 Security Event Log</h3>

        <span>{history.length} Events</span>
      </div>

      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Event</th>
            <th>Severity</th>
          </tr>
        </thead>

        <tbody>
          {history.length === 0 ? (
            <tr>
              <td colSpan="3" className="empty">
                ✅ No security threats detected
              </td>
            </tr>
          ) : (
            history.map((item, index) => {
              const severity = getSeverity(item.level);

              return (
                <tr key={index}>
                  <td>{item.time}</td>

                  <td>{item.event}</td>

                  <td>
                    <span className={`badge ${severity.class}`}>
                      {severity.icon}
                      <span style={{ marginLeft: "6px" }}>{item.level}</span>
                    </span>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ThreatHistory;
