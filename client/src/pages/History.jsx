import "../styles/History.css";
import { useEffect, useState } from "react";
import api from "../services/api";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

function History() {
  const [history, setHistory] = useState([]);

  async function loadHistory() {
    try {
      const res = await api.get("/api/history");

      setHistory(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function clearHistory() {
    try {
      await api.delete("/api/history");

      loadHistory();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadHistory();

    const interval = setInterval(loadHistory, 5000);

    return () => clearInterval(interval);
  }, []);

  const totalScans = history.length;

  const rogueCount = history.reduce((a, b) => a + b.rogueAPs, 0);

  const safeCount = history.filter((h) => h.status === "SAFE").length;

  const dangerCount = history.filter((h) => h.status === "DANGER").length;

  return (
    <>
      <Sidebar />

      <div className="app">
        <Header />

        <h1 className="page-title">📜 Scan History</h1>

        <p className="page-subtitle">
          Historical wireless security scan records
        </p>

        <div className="history-summary">
          <div className="summary-box">
            <h2>{totalScans}</h2>
            <p>Total Scans</p>
          </div>

          <div className="summary-box">
            <h2>{safeCount}</h2>
            <p>Safe Scans</p>
          </div>

          <div className="summary-box">
            <h2>{dangerCount}</h2>
            <p>Danger Scans</p>
          </div>

          <div className="summary-box">
            <h2>{rogueCount}</h2>
            <p>Rogue APs Found</p>
          </div>
        </div>

        <div className="history-header">
          <h2 style={{ color: "#fff" }}>Recent Scan Logs</h2>

          <button className="clear-btn" onClick={clearHistory}>
            Clear History
          </button>
        </div>

        <div className="table-container">
          <table className="history-table">
            <thead>
              <tr>
                <th>Time</th>

                <th>Networks</th>

                <th>Secure</th>

                <th>Rogue APs</th>

                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {history.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty">
                    No Scan History Available
                  </td>
                </tr>
              ) : (
                history.map((scan, index) => (
                  <tr key={index}>
                    <td>{new Date(scan.time).toLocaleString()}</td>

                    <td>{scan.totalNetworks}</td>

                    <td>{scan.secureNetworks}</td>

                    <td>{scan.rogueAPs}</td>

                    <td>
                      <span className={`status ${scan.status.toLowerCase()}`}>
                        {scan.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default History;
