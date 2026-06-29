require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const statusRoute = require("./routes/status");
const scansRoute = require("./routes/scans");
const reportRoutes = require("./routes/reports");
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
app.use("/api/scans", scansRoute);
app.use("/api/reports", reportRoutes);

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

  let packets = 120;
  let rogueAPs = 1;
  let clients = 8;

  const interval = setInterval(() => {
    packets += Math.floor(Math.random() * 10);

    if (Math.random() > 0.8) {
      clients++;
    }

    if (Math.random() > 0.95) {
      rogueAPs++;
    }

    socket.emit("dashboardData", {
      packets,
      rogueAPs,
      clients,
      alerts: rogueAPs,
      status: rogueAPs >= 3 ? "DANGER" : rogueAPs >= 1 ? "WARNING" : "SAFE",
    });
  }, 1000);

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

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
