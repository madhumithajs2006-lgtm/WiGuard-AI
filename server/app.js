require("dotenv").config();
const analyticsRoutes = require("./routes/analytics");
const { analyzeNetworks } = require("./services/detectionService");
const { generateDashboard } = require("./services/dashboardService");
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const statusRoute = require("./routes/status");
console.log("✅ scans.js loaded");
const scansRoute = require("./routes/scans");
const reportRoutes = require("./routes/reports");
const historyRoute = require("./routes/history");
const startPythonDetector = require("./services/pythonService");

const app = express();

// ===============================
// CORS
// ===============================

app.use(
  cors({
    origin: ["http://localhost:5173", "https://wi-guard-ai.vercel.app"],
    credentials: true,
  }),
);

app.use(express.json());

// ===============================
// ROUTES
// ===============================

app.use("/api/status", statusRoute);
console.log("✅ registering /api/scans");
app.use("/api/scans", scansRoute);
app.use("/api/reports", reportRoutes);
app.use("/api/history", historyRoute);
app.use("/api/analytics", analyticsRoutes);
app.get("/", (req, res) => {
  res.send("🚀 WiGuard AI Backend Running");
});

// ===============================
// HTTP SERVER
// ===============================

const server = http.createServer(app);

// ===============================
// SOCKET.IO
// ===============================

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://wi-guard-ai.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// ===============================
// SOCKET CONNECTION
// ===============================

io.on("connection", (socket) => {
  console.log("🟢 Client Connected");

  const interval = setInterval(async () => {
    try {
      const wifi = await scanWifi();

      const analyzed = analyzeNetworks(wifi);

      const dashboard = generateDashboard(analyzed);

      socket.emit("dashboardData", dashboard);
    } catch (err) {
      console.error(err);
    }
  }, 5000);

  socket.on("disconnect", () => {
    console.log("🔴 Client Disconnected");
    clearInterval(interval);
  });
});

// ===============================
// REAL PYTHON DETECTOR
// Uncomment when using detector.py
// ===============================

// startPythonDetector(io);

// ===============================
// START SERVER
// ===============================
const { scanWifi } = require("./services/windowsWifiScanner");

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
