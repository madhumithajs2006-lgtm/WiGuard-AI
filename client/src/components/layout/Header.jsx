import "../../styles/Header.css";
import { useEffect, useState } from "react";
import { FaBell, FaUserCircle, FaCircle } from "react-icons/fa";

function Header() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleString("en-IN", {
          weekday: "short",
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
        <h1>🛡 WiGuard AI</h1>
        <p>Wireless Intrusion Detection System</p>
      </div>

      <div className="header-right">
        <div className="server-status">
          <FaCircle className="status-dot" />
          <span>Backend Online</span>
        </div>

        <span className="clock">{time}</span>

        <FaBell className="icon" />

        <FaUserCircle className="avatar" />
      </div>
    </header>
  );
}

export default Header;
