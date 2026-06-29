const express = require("express");
const router = express.Router();

const { exportCSV, exportPDF } = require("../services/reportService");

router.get("/csv", exportCSV);
router.get("/pdf", exportPDF);

module.exports = router;
