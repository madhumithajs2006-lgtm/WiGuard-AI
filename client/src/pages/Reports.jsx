import "../styles/Reports.css";
import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

import { FaShieldAlt, FaBug, FaNetworkWired } from "react-icons/fa";

function Reports() {
  const [report, setReport] = useState(null);

  useEffect(() => {
    loadReport();
  }, []);

  async function loadReport() {
    try {
      const res = await axios.get("http://localhost:5000/api/reports");
      setReport(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  function exportCSV() {
    if (!report) return;

    const rows = [
      ["Time", "SSID", "Risk", "Signal", "Reason"],
      ...report.threats.map((t) => [
        t.time,
        t.ssid,
        t.risk,
        t.signal,
        t.reason,
      ]),
    ];

    const csv = rows.map((r) => r.join(",")).join("\n");

    const blob = new Blob([csv], {
      type: "text/csv",
    });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "WiGuard_Report.csv";
    a.click();
  }

  if (!report)
    return (
      <>
        <Sidebar />
        <div className="app">
          <Header />
          <h2>Loading Report...</h2>
        </div>
      </>
    );

  return (
    <>
      <Sidebar />

      <div className="app">
        <Header />

        <h1 className="page-title">📄 Security Reports</h1>
        <p className="page-subtitle">
          Comprehensive wireless intrusion detection report generated from live
          scan history.
        </p>

        <div className="report-summary">
          <div className="summary-card">
            <FaShieldAlt size={40} />
            <h2>{report.totalScans}</h2>
            <p>Total Scans</p>
          </div>

          <div className="summary-card">
            <FaNetworkWired size={40} />
            <h2>{report.totalNetworks}</h2>
            <p>Networks Scanned</p>
          </div>

          <div className="summary-card danger">
            <FaBug size={40} />
            <h2>{report.rogueAPs}</h2>
            <p>Rogue APs</p>
          </div>
        </div>

        <div className="overall-status">
          <h2>
            Overall Security :
            <span
              className={report.overallStatus === "SAFE" ? "safe" : "danger"}
            >
              {" "}
              {report.overallStatus}
            </span>
          </h2>
        </div>

        <div className="threat-table">
          <h2>Detected Threats</h2>

          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>SSID</th>
                <th>Risk</th>
                <th>Signal</th>
                <th>Reason</th>
              </tr>
            </thead>

            <tbody>
              {report.threats.length === 0 ? (
                <tr>
                  <td colSpan="5">No threats detected</td>
                </tr>
              ) : (
                report.threats.map((threat, index) => (
                  <tr key={index}>
                    <td>{new Date(threat.time).toLocaleString()}</td>

                    <td>{threat.ssid}</td>

                    <td>
                      <span
                        className={
                          threat.risk === "SAFE"
                            ? "safe"
                            : threat.risk === "MEDIUM" ||
                                threat.risk === "SUSPICIOUS"
                              ? "warning"
                              : "danger"
                        }
                      >
                        {threat.risk}
                      </span>
                    </td>

                    <td>{threat.signal}%</td>

                    <td>{threat.reason}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="report-buttons">
          <button onClick={exportCSV}>Export CSV</button>

          <button
            onClick={() =>
              window.open("http://localhost:5000/api/reports/pdf", "_blank")
            }
          >
            Download PDF
          </button>
        </div>
      </div>
    </>
  );
}

export default Reports;
