import "../../styles/Header.css";

import { useEffect, useState } from "react";

import {
  FaBell,
  FaUserCircle,
  FaServer,
  FaWifi,
  FaRobot,
} from "react-icons/fa";

function Header() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleString("en-IN", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <h1>Security Operations Center</h1>

        <p>Wireless Intrusion Detection & Rogue Access Point Monitoring</p>
      </div>

      <div className="header-right">
        <div className="status-box">
          <FaServer />

          <span>Backend</span>

          <div className="live-dot"></div>
        </div>

        <div className="status-box">
          <FaWifi />

          <span>Scanner</span>

          <div className="live-dot"></div>
        </div>

        <div className="status-box">
          <FaRobot />

          <span>AI Engine</span>

          <div className="live-dot"></div>
        </div>

        <div className="clock-box">{time}</div>

        <FaBell className="header-icon" />

        <FaUserCircle className="profile-icon" />
      </div>
    </header>
  );
}

export default Header;
