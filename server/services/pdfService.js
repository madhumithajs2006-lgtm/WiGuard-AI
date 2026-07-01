const PDFDocument = require("pdfkit");

function generateReport(report, res) {
  const doc = new PDFDocument({
    margin: 40,
    size: "A4",
  });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=WiGuard_Report.pdf",
  );

  doc.pipe(res);

  doc.fontSize(24).fillColor("#00AEEF").text("WiGuard AI", {
    align: "center",
  });

  doc
    .fontSize(14)
    .fillColor("black")
    .text("Wireless Intrusion Detection Report", {
      align: "center",
    });

  doc.moveDown();

  doc.fontSize(12);

  doc.text(`Generated : ${new Date().toLocaleString()}`);

  doc.text(`Total Scans : ${report.totalScans}`);

  doc.text(`Networks Scanned : ${report.totalNetworks}`);

  doc.text(`Rogue APs : ${report.rogueAPs}`);

  doc.text(`Overall Status : ${report.overallStatus}`);

  doc.moveDown();

  doc.fontSize(18).fillColor("red").text("Detected Threats");

  doc.moveDown();

  report.threats.forEach((t, i) => {
    doc
      .fontSize(12)
      .fillColor("black")
      .text(`${i + 1}. ${t.ssid}`);

    doc.text(`Risk : ${t.risk}`);

    doc.text(`Signal : ${t.signal}%`);

    doc.text(`Reason : ${t.reason}`);

    doc.moveDown();
  });

  doc.moveDown();

  doc.fontSize(16).fillColor("#00AEEF").text("Recommendations");

  doc.fontSize(12);

  doc.text("• Avoid connecting to open Wi-Fi.");

  doc.text("• Verify SSID before connecting.");

  doc.text("• Prefer WPA3 networks.");

  doc.text("• Monitor rogue access points.");

  doc.text("• Perform periodic Wi-Fi scans.");

  doc.end();
}

module.exports = generateReport;
