import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportPDF(scans) {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("WiGuard AI Security Report", 14, 20);

  doc.setFontSize(11);

  doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 30);

  doc.text(`Total Scans: ${scans.length}`, 14, 38);

  const safe = scans.filter((s) => s.status === "SAFE").length;
  const warning = scans.filter((s) => s.status === "WARNING").length;
  const danger = scans.filter((s) => s.status === "DANGER").length;

  doc.text(`Safe: ${safe}`, 14, 46);
  doc.text(`Warning: ${warning}`, 14, 54);
  doc.text(`Danger: ${danger}`, 14, 62);

  autoTable(doc, {
    startY: 72,

    head: [["Time", "Status", "Packets", "Clients", "Rogue APs"]],

    body: scans.map((scan) => [
      new Date(scan.timestamp).toLocaleString(),
      scan.status,
      scan.packets,
      scan.clients,
      scan.rogueAPs,
    ]),
  });

  doc.save("WiGuard_Report.pdf");
}
