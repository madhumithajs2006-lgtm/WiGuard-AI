const { getAllScans } = require("./scanService");

const { Parser } = require("json2csv");

const PDFDocument = require("pdfkit");

// ================= CSV =================

const exportCSV = (req, res) => {
  const scans = getAllScans();

  const fields = ["timestamp", "packets", "clients", "rogueAPs", "status"];

  const parser = new Parser({ fields });

  const csv = parser.parse(scans);

  res.header("Content-Type", "text/csv");

  res.attachment("WiGuardAI_Report.csv");

  res.send(csv);
};

// ================= PDF =================

const exportPDF = (req, res) => {
  const scans = getAllScans();

  const doc = new PDFDocument({
    margin: 40,
  });

  res.setHeader("Content-Type", "application/pdf");

  res.setHeader(
    "Content-Disposition",
    "attachment; filename=WiGuardAI_Report.pdf",
  );

  doc.pipe(res);

  doc.fontSize(24).fillColor("#0F62FE").text("WiGuard AI Security Report", {
    align: "center",
  });

  doc.moveDown();

  doc
    .fontSize(12)
    .fillColor("black")
    .text(`Generated: ${new Date().toLocaleString()}`);

  doc.moveDown();

  doc.fontSize(16).text("Summary");

  doc.moveDown(0.5);

  doc.text(`Total Scans : ${scans.length}`);

  doc.text(`Total Clients : ${scans.reduce((s, x) => s + x.clients, 0)}`);

  doc.text(`Threats Found : ${scans.reduce((s, x) => s + x.rogueAPs, 0)}`);

  doc.moveDown();

  doc.fontSize(16).text("Recent Scans");

  doc.moveDown();

  scans.slice(0, 20).forEach((scan) => {
    doc.fontSize(11).text(
      `${scan.timestamp}
Packets: ${scan.packets}
Clients: ${scan.clients}
Rogue APs: ${scan.rogueAPs}
Status: ${scan.status}`,
    );

    doc.moveDown();
  });

  doc.end();
};

module.exports = {
  exportCSV,
  exportPDF,
};
