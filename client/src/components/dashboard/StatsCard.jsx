import "../../styles/Card.css";

function StatsCard({ title, value, icon, color }) {
  return (
    <div
      className="stats-card"
      style={{
        borderTop: `4px solid ${color}`,
      }}
    >
      <div className="stats-icon">{icon}</div>

      <div className="stats-info">
        <h3>{title}</h3>
        <h2>{value}</h2>
      </div>
    </div>
  );
}

export default StatsCard;
