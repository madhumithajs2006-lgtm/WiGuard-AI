const { PythonShell } = require("python-shell");
const { saveScan } = require("./scanService");

let pyshell = null;

function startPythonDetector(io) {
  if (pyshell) return;

  pyshell = new PythonShell("../detector/detector.py");

  console.log("✅ Python detector started");

  pyshell.on("message", (message) => {
    try {
      const data = JSON.parse(message);

      const scan = {
        timestamp: new Date().toISOString(),
        packets: data.packets,
        clients: data.clients,
        rogueAPs: data.rogueAPs,
        status:
          data.rogueAPs >= 3
            ? "DANGER"
            : data.rogueAPs >= 1
              ? "WARNING"
              : "SAFE",
      };

      saveScan(scan);

      io.emit("dashboardData", {
        ...scan,
        alerts: scan.rogueAPs,
      });
    } catch (err) {
      console.error(err);
    }
  });

  pyshell.end((err) => {
    if (err) console.error(err);
    pyshell = null;
  });
}

function stopPythonDetector() {
  if (!pyshell) return;

  pyshell.kill();
  pyshell = null;

  console.log("🛑 Python detector stopped");
}

module.exports = {
  startPythonDetector,
  stopPythonDetector,
};
