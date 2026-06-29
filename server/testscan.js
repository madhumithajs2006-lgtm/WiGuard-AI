const { saveScan, getAllScans } = require("./services/scanService");

saveScan({
  timestamp: new Date().toISOString(),
  packets: 1456,
  rogueAPs: 2,
  clients: 10,
  status: "WARNING",
});

console.log(getAllScans());
