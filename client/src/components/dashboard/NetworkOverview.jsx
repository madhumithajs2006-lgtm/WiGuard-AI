import "../../styles/NetworkOverview.css";

import {
  FaGlobe,
  FaWifi,
  FaLaptop,
  FaExclamationTriangle,
} from "react-icons/fa";

function NetworkOverview({ clients, rogueAPs }) {
  return (
    <div className="network-card">
      <h3>🌐 Network Topology</h3>

      <div className="topology">
        <div className="node internet">
          <FaGlobe />
          <span>Internet</span>
        </div>

        <div className="line"></div>

        <div className="node router">
          <FaWifi />
          <span>Main Router</span>
        </div>

        <div className="devices">
          {Array.from({
            length: Math.max(clients, 1),
          }).map((_, i) => (
            <div className="device" key={i}>
              <FaLaptop />
              <span>Client {i + 1}</span>
            </div>
          ))}

          {Array.from({
            length: rogueAPs,
          }).map((_, i) => (
            <div className="rogue" key={i}>
              <FaExclamationTriangle />
              <span>Rogue AP</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NetworkOverview;
