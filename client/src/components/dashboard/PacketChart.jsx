import "../../styles/PacketChart.css";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function PacketChart({ data }) {
  const chartData = data.map((value, index) => ({
    scan: index + 1,
    signal: value,
  }));

  const avgSignal =
    data.length > 0
      ? Math.round(data.reduce((a, b) => a + b, 0) / data.length)
      : 0;

  return (
    <div className="chart-card">
      <div className="chart-top">
        <div>
          <h2>📡 Live Signal Intelligence</h2>

          <p>Average Wi-Fi signal strength from recent scans</p>
        </div>

        <div className="chart-right">
          <div className="signal-box">
            <small>AVG SIGNAL</small>

            <h3>{avgSignal}%</h3>
          </div>

          <span className="live-badge">● LIVE</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={340}>
        <LineChart data={chartData}>
          <CartesianGrid stroke="#222" strokeDasharray="4 4" />

          <XAxis dataKey="scan" stroke="#666" />

          <YAxis domain={[0, 100]} stroke="#666" />

          <Tooltip
            contentStyle={{
              background: "#111",
              border: "1px solid #00ff9d",
              borderRadius: "12px",
              color: "#fff",
            }}
          />

          <Line
            type="monotone"
            dataKey="signal"
            stroke="#00ff9d"
            strokeWidth={4}
            dot={{
              r: 4,
              fill: "#00ff9d",
            }}
            activeDot={{
              r: 7,
              fill: "#00ff9d",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PacketChart;
