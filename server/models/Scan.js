const mongoose = require("mongoose");

const ScanSchema = new mongoose.Schema(
  {
    packets: {
      type: Number,
      required: true,
    },

    clients: {
      type: Number,
      required: true,
    },

    rogueAPs: {
      type: Number,
      required: true,
    },

    alerts: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["SAFE", "WARNING", "DANGER"],
      required: true,
    },

    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Scan", ScanSchema);