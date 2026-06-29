import "../styles/Dashboard.css";

import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
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

import { FaWifi, FaNetworkWired, FaExclamationTriangle } from "react-icons/fa";

import { MdRouter } from "react-icons/md";

const socket = io("https://wiguard-ai.onrender.com");

function Dashboard() {
  const [packets, setPackets] = useState(0);
  const [clients, setClients] = useState(0);
  const [rogueAPs, setRogueAPs] = useState(0);

  const [packetHistory, setPacketHistory] = useState(
    Array.from({ length: 20 }, () => 0),
  );

  const [activities, setActivities] = useState([]);
  const [threatHistory, setThreatHistory] = useState([]);

  const [backendConnected, setBackendConnected] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const previousRogueAPs = useRef(0);

  const status = rogueAPs >= 3 ? "DANGER" : rogueAPs >= 1 ? "WARNING" : "SAFE";

  // ===========================
  // SOCKET EVENTS
  // ===========================

  useEffect(() => {
    socket.on("connect", () => {
      setBackendConnected(true);
    });

    socket.on("disconnect", () => {
      setBackendConnected(false);
    });

    socket.on("dashboardData", (data) => {
      setPackets(data.packets);
      setClients(data.clients);
      setRogueAPs(data.rogueAPs);

      setPacketHistory((prev) => [...prev.slice(1), data.packets]);

      const currentTime = new Date().toLocaleTimeString();
      setActivities((prev) => {
        const updated = [...prev];

        updated.unshift(`📡 ${currentTime} • Monitoring network`);

        if (data.clients > clients) {
          updated.unshift(`🟢 ${currentTime} • Client Connected`);
        }

        if (data.rogueAPs > previousRogueAPs.current) {
          updated.unshift(`🔴 ${currentTime} • Rogue AP Detected`);
        }

        if (data.packets > packets) {
          updated.unshift(`📦 ${currentTime} • Packet Captured`);
        }

        return updated.slice(0, 20);
      });

      if (data.rogueAPs > previousRogueAPs.current) {
        toast.warning("⚠ Rogue Access Point Detected!", {
          position: "top-right",
          autoClose: 3000,
        });

        setActivities((prev) => [
          `🔴 ${currentTime} • Rogue AP Detected`,
          ...prev.slice(0, 11),
        ]);

        setThreatHistory((prev) => [
          {
            time: currentTime,
            event: "Rogue Access Point Detected",
            level: data.rogueAPs >= 3 ? "HIGH" : "MEDIUM",
          },
          ...prev.slice(0, 19),
        ]);
      }

      if (data.clients > clients) {
        setActivities((prev) => [
          `🟢 ${currentTime} • New Client Connected`,
          ...prev.slice(0, 11),
        ]);
      }

      previousRogueAPs.current = data.rogueAPs;
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("dashboardData");
    };
  }, [clients]);

  // ===========================
  // ANIMATE CHART
  // ===========================

  useEffect(() => {
    const interval = setInterval(() => {
      setPacketHistory((prev) => {
        const next = packets + Math.floor(Math.random() * 25) - 12;

        return [...prev.slice(1), Math.max(next, 0)];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [packets]);

  // ===========================
  // BUTTONS
  // ===========================

  async function toggleScan() {
    try {
      if (!isScanning) {
        await axios.post("https://wiguard-ai.onrender.com/api/detector/start");

        toast.success("Scan Started");

        setIsScanning(true);
      } else {
        await axios.post("https://wiguard-ai.onrender.com/api/detector/stop");

        toast.info("Scan Stopped");

        setIsScanning(false);
      }
    } catch (err) {
      console.error(err);

      toast.error("Unable to control detector");
    }
  }

  function resetDashboard() {
    setPackets(0);
    setClients(0);
    setRogueAPs(0);

    setPacketHistory(Array.from({ length: 20 }, () => 0));

    setActivities([]);
    setThreatHistory([]);

    previousRogueAPs.current = 0;

    setIsScanning(false);
  }

  return (
    <>
      <Sidebar />

      <div className="app">
        <Header />

        <StatusCard
          status={status}
          backendConnected={backendConnected}
          packets={packets}
          clients={clients}
          rogueAPs={rogueAPs}
        />

        <div className="cards">
          <StatsCard
            title="Packets Captured"
            value={packets}
            icon={<FaWifi />}
            color="#00E5FF"
          />

          <StatsCard
            title="Connected Clients"
            value={clients}
            icon={<FaNetworkWired />}
            color="#00FF99"
          />

          <StatsCard
            title="Rogue APs"
            value={rogueAPs}
            icon={<MdRouter />}
            color="#FF4D4D"
          />

          <StatsCard
            title="Alerts"
            value={rogueAPs}
            icon={<FaExclamationTriangle />}
            color="#FFD700"
          />
        </div>

        <PacketChart data={packetHistory} />

        <div className="dashboard-grid">
          <NetworkOverview clients={clients} rogueAPs={rogueAPs} />

          <ThreatHistory history={threatHistory} />
        </div>

        <Activity activity={activities} />

        <div
          style={{
            display: "flex",
            gap: "15px",
            marginTop: "25px",
          }}
        >
          <button onClick={toggleScan}>
            {isScanning ? "⏹ Stop Scan" : "▶ Start Scan"}
          </button>

          <button onClick={resetDashboard}>🔄 Reset Dashboard</button>
        </div>
      </div>

      <ToastContainer theme="dark" newestOnTop />
    </>
  );
}

export default Dashboard;
