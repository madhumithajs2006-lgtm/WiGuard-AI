import "../../styles/Sidebar.css";

import { NavLink } from "react-router-dom";

import {
  FaHome,
  FaHistory,
  FaChartPie,
  FaFileAlt,
  FaCog,
  FaServer,
  FaWifi,
  FaRobot,
  FaShieldAlt,
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <FaShieldAlt />
        </div>

        <div>
          <h2>WiGuard AI</h2>
          <small>Wireless Intrusion Detection</small>
        </div>
      </div>

      <div className="sidebar-divider"></div>

      <ul className="sidebar-menu">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <FaHome />
            <span>Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <FaChartPie />
            <span>Analytics</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/history"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <FaHistory />
            <span>History</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/reports"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <FaFileAlt />
            <span>Reports</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <FaCog />
            <span>Settings</span>
          </NavLink>
        </li>
      </ul>

      <div className="sidebar-status">
        <h4>System Status</h4>

        <div className="status-item">
          <FaServer />
          <span>Backend</span>
          <div className="status-dot online"></div>
        </div>

        <div className="status-item">
          <FaWifi />
          <span>Scanner</span>
          <div className="status-dot online"></div>
        </div>

        <div className="status-item">
          <FaRobot />
          <span>AI Engine</span>
          <div className="status-dot online"></div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
