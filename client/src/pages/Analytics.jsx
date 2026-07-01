import "../styles/Analytics.css";
import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  Legend,
} from "recharts";

import {
  FaWifi,
  FaShieldAlt,
  FaBroadcastTower,
  FaExclamationTriangle,
} from "react-icons/fa";

function Analytics() {
  const [scans, setScans] = useState([]);

  useEffect(() => {
    loadAnalytics();

    const interval = setInterval(loadAnalytics, 5000);

    return () => clearInterval(interval);
  }, []);

  async function loadAnalytics() {
    try {
      const res = await axios.get("http://localhost:5000/api/analytics");

      setScans(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setScans([]);
    }
  }

  // ==========================
  // Average Signal
  // ==========================

  const signalTrend = scans.map((scan, index) => {
    const avgSignal =
      scan.networks && scan.networks.length
        ? Math.round(
            scan.networks.reduce((sum, n) => sum + n.signal, 0) /
              scan.networks.length,
          )
        : 0;

    return {
      name: `Scan ${index + 1}`,
      signal: avgSignal,
    };
  });

  // ==========================
  // Networks
  // ==========================

  const networkTrend = scans.map((scan, index) => ({
    name: `Scan ${index + 1}`,
    networks: scan.totalNetworks,
  }));

  // ==========================
  // Rogue AP
  // ==========================

  const rogueTrend = scans.map((scan, index) => ({
    name: `Scan ${index + 1}`,
    rogue: scan.rogueAPs,
  }));

  // ==========================
  // Threat Distribution
  // ==========================

  const pieData = [
    {
      name: "Safe",
      value: scans.reduce((sum, scan) => sum + scan.secureNetworks, 0),
    },
    {
      name: "Suspicious",
      value: scans.reduce((sum, scan) => sum + scan.suspiciousNetworks, 0),
    },
    {
      name: "High Risk",
      value: scans.reduce((sum, scan) => sum + scan.highRiskNetworks, 0),
    },
  ];

  const COLORS = ["#00FF88", "#FFB000", "#FF3B5C"];

  // ==========================
  // Summary Cards
  // ==========================

  const totalNetworks = scans.reduce(
    (sum, scan) => sum + (scan.totalNetworks || 0),
    0,
  );

  const totalThreats = scans.reduce(
    (sum, scan) =>
      sum + (scan.suspiciousNetworks || 0) + (scan.highRiskNetworks || 0),
    0,
  );

  const totalRogue = scans.reduce((sum, scan) => sum + (scan.rogueAPs || 0), 0);

  const avgSignal =
    signalTrend.length > 0
      ? Math.round(
          signalTrend.reduce((sum, item) => sum + item.signal, 0) /
            signalTrend.length,
        )
      : 0;

  return (
    <>
      <Sidebar />

      <div className="app">
        <Header />

        <div className="analytics-title">
          <h1>📊 Security Analytics</h1>
          <p>AI-powered Wireless Intrusion Detection Dashboard</p>
        </div>

        {/* Summary Cards */}

        <div className="analytics-summary">
          <div className="analytics-stat">
            <FaWifi className="stat-icon cyan" />

            <div>
              <h2>{totalNetworks}</h2>
              <span>Total Networks</span>
            </div>
          </div>

          <div className="analytics-stat">
            <FaShieldAlt className="stat-icon green" />

            <div>
              <h2>{avgSignal}%</h2>
              <span>Average Signal</span>
            </div>
          </div>

          <div className="analytics-stat">
            <FaExclamationTriangle className="stat-icon orange" />

            <div>
              <h2>{totalThreats}</h2>
              <span>Threats Detected</span>
            </div>
          </div>

          <div className="analytics-stat">
            <FaBroadcastTower className="stat-icon red" />

            <div>
              <h2>{totalRogue}</h2>
              <span>Rogue APs</span>
            </div>
          </div>
        </div>

        {/* Charts */}

        <div className="analytics-grid">
          <div className="chart-card">
            <h3>📡 Average Signal Strength</h3>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={signalTrend}>
                <CartesianGrid stroke="#1c2837" />

                <XAxis dataKey="name" />

                <YAxis domain={[0, 100]} />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="signal"
                  stroke="#00FF88"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>🛡 Threat Distribution</h3>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} dataKey="value" outerRadius={100} label>
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>

                <Legend />

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>📶 Networks Detected Per Scan</h3>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={networkTrend}>
                <CartesianGrid stroke="#1c2837" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="networks"
                  stroke="#00F5FF"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>🚨 Rogue APs Per Scan</h3>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={rogueTrend}>
                <CartesianGrid stroke="#1c2837" />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar dataKey="rogue" fill="#FF3B5C" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}

export default Analytics;
