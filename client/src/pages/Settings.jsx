import "../styles/Settings.css";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

import { useState } from "react";

function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [autoScan, setAutoScan] = useState(true);
  const [scanInterval, setScanInterval] = useState(10);

  return (
    <>
      <Sidebar />

      <div className="app">
        <Header />

        <h1 className="page-title">⚙ Settings</h1>

        <div className="settings-card">
          <h2>Notifications</h2>

          <div className="setting-row">
            <span>Enable Threat Notifications</span>

            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
            />
          </div>
        </div>

        <div className="settings-card">
          <h2>Scanning</h2>

          <div className="setting-row">
            <span>Automatic Scanning</span>

            <input
              type="checkbox"
              checked={autoScan}
              onChange={() => setAutoScan(!autoScan)}
            />
          </div>

          <div className="setting-row">
            <span>Scan Interval (seconds)</span>

            <input
              type="number"
              value={scanInterval}
              min="5"
              max="60"
              onChange={(e) => setScanInterval(e.target.value)}
            />
          </div>
        </div>

        <div className="settings-card">
          <h2>Backend Status</h2>

          <div className="status online">🟢 Connected</div>
        </div>

        <div className="settings-card">
          <h2>About WiGuard AI</h2>

          <p>
            WiGuard AI is a wireless intrusion detection dashboard built using
            React, Node.js, Socket.IO, MongoDB and Python.
          </p>

          <p>Version 1.0</p>
        </div>
      </div>
    </>
  );
}

export default Settings;
