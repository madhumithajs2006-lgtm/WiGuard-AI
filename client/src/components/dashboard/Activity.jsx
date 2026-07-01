import "../../styles/Activity.css";

function Activity({ activity }) {
  return (
    <div className="activity-card">

      <div className="activity-header">

        <div>
          <h3>⚡ Live Monitoring Console</h3>
          <p>Real-time wireless security events</p>
        </div>

        <span className="live-tag">
          ● LIVE
        </span>

      </div>

      <div className="activity-terminal">

        {activity.length === 0 ? (
          <div className="empty-terminal">
            Waiting for scan activity...
          </div>
        ) : (
          activity.map((item, index) => (
            <div key={index} className="activity-line">

              <span className="terminal-arrow">
                &gt;
              </span>

              <span>{item}</span>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default Activity;