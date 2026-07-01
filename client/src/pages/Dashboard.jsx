import "../styles/Dashboard.css";

import { useState, useEffect } from "react";
import api from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

import StatusCard from "../components/dashboard/StatusCard";
import StatsCard from "../components/dashboard/StatsCard";
import PacketChart from "../components/dashboard/PacketChart";
import NetworkOverview from "../components/dashboard/NetworkOverview";
import ThreatHistory from "../components/dashboard/ThreatHistory";
import Activity from "../components/dashboard/Activity";

import { FaWifi, FaShieldAlt, FaExclamationTriangle } from "react-icons/fa";

import { MdRouter } from "react-icons/md";

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    totalNetworks: 0,
    secureNetworks: 0,
    suspiciousNetworks: 0,
    highRiskNetworks: 0,
    rogueAPs: 0,
    status: "SAFE",
    networks: [],
  });

  const [backendConnected, setBackendConnected] = useState(false);
  const [activities, setActivities] = useState([]);
  const [threatHistory, setThreatHistory] = useState([]);
  const [signalHistory, setSignalHistory] = useState([]);
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    async function loadScan() {
      try {
        console.log("API Base URL:", api.defaults.baseURL);

        const url = api.defaults.baseURL + "/api/scans";
        console.log("Requesting:", url);

        const res = await api.get("/api/scans");

        const networks = res.data;

        console.log("Networks:", networks);

        const secureNetworks = networks.filter((n) => n.risk === "SAFE").length;

        const suspiciousNetworks = networks.filter(
          (n) => n.risk === "MEDIUM" || n.risk === "SUSPICIOUS",
        ).length;

        const highRiskNetworks = networks.filter(
          (n) => n.risk === "HIGH" || n.risk === "POSSIBLE ROGUE AP",
        ).length;

        const rogueAPs = networks.filter(
          (n) => n.risk === "POSSIBLE ROGUE AP",
        ).length;

        const avgSignal =
          networks.length > 0
            ? Math.round(
                networks.reduce((sum, n) => sum + n.signal, 0) /
                  networks.length,
              )
            : 0;

        setSignalHistory((prev) => [...prev.slice(-19), avgSignal]);
        setDashboard({
          totalNetworks: networks.length,
          secureNetworks,
          suspiciousNetworks,
          highRiskNetworks,
          rogueAPs,
          status:
            highRiskNetworks > 0
              ? "DANGER"
              : suspiciousNetworks > 0
                ? "WARNING"
                : "SAFE",
          networks,
        });

        setBackendConnected(true);

        const now = new Date().toLocaleTimeString();

        const newActivities = [
          `📶 ${now} Scan Completed`,
          `📡 ${networks.length} Networks Detected`,
        ];

        networks.forEach((network) => {
          if (network.risk !== "SAFE") {
            newActivities.push(
              `⚠ ${network.ssid || "Hidden Network"} → ${network.risk}`,
            );
          }
        });

        setActivities((prev) => [...newActivities, ...prev].slice(0, 20));

        networks.forEach((network) => {
          if (network.risk !== "SAFE") {
            setThreatHistory((prev) =>
              [
                {
                  time: now,
                  event: `${network.ssid || "Hidden Network"} (${network.reason})`,
                  level: network.risk,
                },
                ...prev,
              ].slice(0, 20),
            );
          }
        });
      } catch (err) {
        console.error(err);
        setBackendConnected(false);
      }
    }

    loadScan();

    const interval = setInterval(() => {
      if (isScanning) {
        loadScan();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isScanning]);

  async function toggleScan() {
    if (isScanning) {
      toast.info("Scanning Paused");
      setIsScanning(false);
    } else {
      toast.success("Scanning Started");
      setIsScanning(true);
    }
  }

  function resetDashboard() {
    setDashboard({
      totalNetworks: 0,
      secureNetworks: 0,
      suspiciousNetworks: 0,
      highRiskNetworks: 0,
      rogueAPs: 0,
      status: "SAFE",
      networks: [],
    });

    setActivities([]);
    setThreatHistory([]);
    setSignalHistory([]);
  }

  return (
    <>
      <Sidebar />

      <div className="app">
        <Header />

        <StatusCard
          status={dashboard.status}
          backendConnected={backendConnected}
          totalNetworks={dashboard.totalNetworks}
          secureNetworks={dashboard.secureNetworks}
          suspiciousNetworks={dashboard.suspiciousNetworks}
          highRiskNetworks={dashboard.highRiskNetworks}
        />

        <div className="cards">
          <StatsCard
            title="Networks Scanned"
            value={dashboard.totalNetworks}
            icon={<FaWifi />}
            color="#00E5FF"
          />

          <StatsCard
            title="Secure Networks"
            value={dashboard.secureNetworks}
            icon={<FaShieldAlt />}
            color="#00FF99"
          />

          <StatsCard
            title="Suspicious Networks"
            value={dashboard.suspiciousNetworks}
            icon={<FaExclamationTriangle />}
            color="#FFD700"
          />

          <StatsCard
            title="Rogue APs"
            value={dashboard.rogueAPs}
            icon={<MdRouter />}
            color="#FF4D4D"
          />
        </div>

        <PacketChart data={signalHistory} />

        <div className="dashboard-grid">
          <NetworkOverview networks={dashboard.networks} />

          <ThreatHistory history={threatHistory} />
        </div>

        <Activity activity={activities} />

        <div className="button-group">
          <button className="start-btn" onClick={toggleScan}>
            {isScanning ? "⏸ Pause Scan" : "▶ Resume Scan"}
          </button>

          <button className="reset-btn" onClick={resetDashboard}>
            🔄 Reset Dashboard
          </button>
        </div>
      </div>

      <ToastContainer theme="dark" newestOnTop />
    </>
  );
}

export default Dashboard;
