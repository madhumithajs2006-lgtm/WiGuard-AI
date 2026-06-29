import "../../styles/ThreatHistory.css";

function ThreatHistory({ history }) {
  function getClass(level) {
    switch (level) {
      case "HIGH":
        return "high";

      case "MEDIUM":
        return "medium";

      default:
        return "info";
    }
  }

  return (
    <div className="history-card">
      <div className="history-header">
        <h3>🛡 Threat History</h3>

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
                No security threats detected
              </td>
            </tr>
          ) : (
            history.map((item, index) => (
              <tr key={index}>
                <td>{item.time}</td>

                <td>{item.event}</td>

                <td>
                  <span className={`badge ${getClass(item.level)}`}>
                    {item.level}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ThreatHistory;
