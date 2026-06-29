import "../../styles/PacketChart.css";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function PacketChart({ data }) {
  const chartData = data.map((value, index) => ({
    time: index + 1,
    packets: value,
  }));

  return (
    <div className="chart-card">
      <h3>📈 Live Packet Traffic</h3>

      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2f3a4a" />

          <XAxis dataKey="time" stroke="#94a3b8" />

          <YAxis stroke="#94a3b8" />

          <Tooltip
            contentStyle={{
              background: "#111827",
              border: "1px solid #00E5FF",
              borderRadius: "10px",
            }}
          />

          <Line
            type="monotone"
            dataKey="packets"
            stroke="#00E5FF"
            strokeWidth={3}
            dot={false}
            isAnimationActive={true}
            animationDuration={500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PacketChart;
