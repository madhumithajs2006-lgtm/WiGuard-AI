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

        <h1 className="page-title">⚙ Security Settings</h1>

        <div className="settings-grid">
          <div className="settings-card">
            <h2>Threat Notifications</h2>

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
            <h2>Scanning Engine</h2>

            <div className="setting-row">
              <span>Automatic Scanning</span>

              <input
                type="checkbox"
                checked={autoScan}
                onChange={() => setAutoScan(!autoScan)}
              />
            </div>

            <div className="setting-row">
              <span>Scan Interval (Seconds)</span>

              <input
                type="number"
                min="5"
                max="60"
                value={scanInterval}
                onChange={(e) => setScanInterval(e.target.value)}
              />
            </div>
          </div>

          <div className="settings-card">
            <h2>Backend Status</h2>

            <div className="status online">🟢 Secure Connection Active</div>
          </div>

          <div className="settings-card">
            <h2>About WiGuard AI</h2>

            <p>
              WiGuard AI is an AI-powered Wireless Intrusion Detection System
              designed to monitor Wi-Fi environments, detect rogue access
              points, analyze network risks, and generate security reports in
              real time.
            </p>

            <p>
              <strong>Version:</strong> 1.0.0
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
