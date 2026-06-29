import "../../styles/Activity.css";

function Activity({ activity }) {
  return (
    <div className="activity-card">
      <div className="activity-header">
        <h3>🚨 Live Threat Feed</h3>
        <span>{activity.length} Events</span>
      </div>

      <div className="activity-list">
        {activity.length === 0 ? (
          <p className="empty">Waiting for network activity...</p>
        ) : (
          activity.map((item, index) => (
            <div key={index} className="activity-item">
              {item}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Activity;
