const express = require("express");

module.exports = (io, detector) => {
  const router = express.Router();

  router.post("/start", (req, res) => {
    detector.startPythonDetector(io);

    res.json({
      success: true,
      message: "Detector started",
    });
  });

  router.post("/stop", (req, res) => {
    detector.stopPythonDetector();

    res.json({
      success: true,
      message: "Detector stopped",
    });
  });

  return router;
};
