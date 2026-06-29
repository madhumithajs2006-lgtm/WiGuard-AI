const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: "SAFE",
    packets: 124,
    rogueAPs: 1,
    clients: 8,
    alerts: 1,
  });
});

module.exports = router;
