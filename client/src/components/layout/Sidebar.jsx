import "../../styles/Sidebar.css";

import { NavLink } from "react-router-dom";

import {
  FaHome,
  FaHistory,
  FaChartPie,
  FaFileAlt,
  FaCog,
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>🛡 WiGuard AI</h2>

      <small>Cyber Security Dashboard</small>

      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <FaHome />
            Dashboard
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
            History
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
            Analytics
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
            Reports
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
            Settings
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
