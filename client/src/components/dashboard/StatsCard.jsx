import "../../styles/StatsCard.css";

function StatsCard({ title, value, icon, color }) {
  return (
    <div className="stats-card">
      <div
        className="stats-icon"
        style={{
          color: color,
        }}
      >
        {icon}
      </div>

      <div className="stats-info">
        <p>{title}</p>

        <h2>{value}</h2>

        <span className="stats-status">● LIVE</span>
      </div>

      <div
        className="stats-glow"
        style={{
          background: color,
        }}
      ></div>
    </div>
  );
}

export default StatsCard;
