import "../styles/Reports.css";
import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

import {
  FaFilePdf,
  FaFileCsv,
  FaShieldAlt,
  FaBug,
  FaNetworkWired,
} from "react-icons/fa";

function Reports() {
  const [scans, setScans] = useState([]);

  useEffect(() => {
    loadScans();
  }, []);

  async function loadScans() {
    try {
      const res = await axios.get("https://wiguard-ai.onrender.com/api/scans");
      setScans(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  const totalScans = scans.length;

  const totalClients = scans.reduce((sum, scan) => sum + scan.clients, 0);

  const totalThreats = scans.reduce((sum, scan) => sum + scan.rogueAPs, 0);

  async function downloadCSV() {
    window.open("https://wiguard-ai.onrender.com/api/reports/csv");
  }

  async function downloadPDF() {
    window.open("https://wiguard-ai.onrender.com/api/reports/pdf");
  }

  return (
    <>
      <Sidebar />

      <div className="app">
        <Header />

        <h1 className="page-title">📑 Security Reports</h1>

        <div className="report-summary">
          <div className="summary-card">
            <FaShieldAlt />
            <h2>{totalScans}</h2>
            <p>Total Scans</p>
          </div>

          <div className="summary-card">
            <FaNetworkWired />
            <h2>{totalClients}</h2>
            <p>Total Clients</p>
          </div>

          <div className="summary-card">
            <FaBug />
            <h2>{totalThreats}</h2>
            <p>Threats Found</p>
          </div>
        </div>

        <div className="report-card">
          <h2>Generate Report</h2>

          <p>
            Download complete security reports using your real scan history.
          </p>

          <div className="buttons">
            <button className="pdf" onClick={downloadPDF}>
              <FaFilePdf />
              Download PDF
            </button>

            <button className="csv" onClick={downloadCSV}>
              <FaFileCsv />
              Export CSV
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Reports;
