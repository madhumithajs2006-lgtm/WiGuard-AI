import "../styles/History.css";

import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

function History() {
  const [history, setHistory] = useState([]);

  async function loadHistory() {
    try {
      const res = await axios.get("https://wiguard-ai.onrender.com/api/scans");
      setHistory(res.data.reverse());
    } catch (err) {
      console.error(err);
    }
  }

  async function clearHistory() {
    try {
      await axios.delete("https://wiguard-ai.onrender.com/api/scans");
      loadHistory();
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <>
      <Sidebar />

      <div className="app">
        <Header />

        <div className="history-header">
          <h1>📜 Scan History</h1>

          <button onClick={clearHistory}>Clear History</button>
        </div>

        <table className="history-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Packets</th>
              <th>Clients</th>
              <th>Rogue APs</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {history.length === 0 ? (
              <tr>
                <td colSpan="5">No Scan History</td>
              </tr>
            ) : (
              history.map((scan, index) => (
                <tr key={index}>
                  <td>{new Date(scan.timestamp).toLocaleString()}</td>

                  <td>{scan.packets}</td>

                  <td>{scan.clients}</td>

                  <td>{scan.rogueAPs}</td>

                  <td className={scan.status.toLowerCase()}>{scan.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default History;
