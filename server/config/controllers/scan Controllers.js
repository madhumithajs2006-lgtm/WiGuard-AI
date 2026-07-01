const Scan = require("../../models/Scan");

exports.getAllScans = async (req, res) => {
  try {
    const scans = await Scan.find().sort({ timestamp: -1 });

    res.json(scans);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.clearScans = async (req, res) => {
  try {
    await Scan.deleteMany({});

    res.json({
      message: "History cleared",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
