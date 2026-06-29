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
} from "recharts";

function Analytics() {
  const [scans, setScans] = useState([]);

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    try {
      const res = await axios.get("https://wiguard-ai.onrender.com/api/scans");

      setScans(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Analytics Error:", err);
      setScans([]);
    }
  }

  const lineData = scans.map((scan, index) => ({
    name: `#${index + 1}`,
    packets: scan.packets,
  }));

  const pieData = [
    {
      name: "Safe",
      value: scans.filter((s) => s.status === "SAFE").length,
    },
    {
      name: "Warning",
      value: scans.filter((s) => s.status === "WARNING").length,
    },
    {
      name: "Danger",
      value: scans.filter((s) => s.status === "DANGER").length,
    },
  ];

  const COLORS = ["#22c55e", "#facc15", "#ef4444"];

  return (
    <>
      <Sidebar />

      <div className="app">
        <Header />

        <h1 className="page-title">📊 Analytics</h1>

        <div className="analytics-grid">
          <div className="chart-card">
            <h3>Packet Trend</h3>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid stroke="#2f3a4a" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line dataKey="packets" stroke="#00E5FF" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>Threat Distribution</h3>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} dataKey="value" outerRadius={100} label>
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card full-width">
            <h3>Packets Per Scan</h3>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={lineData}>
                <CartesianGrid stroke="#2f3a4a" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="packets" fill="#00E5FF" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}

export default Analytics;
