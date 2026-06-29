import { saveAs } from "file-saver";

export function exportCSV(scans) {
  if (!scans.length) {
    alert("No scan history available.");
    return;
  }

  const headers = ["Time", "Status", "Packets", "Clients", "Rogue APs"];

  const rows = scans.map((scan) => [
    new Date(scan.timestamp).toLocaleString(),
    scan.status,
    scan.packets,
    scan.clients,
    scan.rogueAPs,
  ]);

  const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  saveAs(blob, "WiGuard_Scan_History.csv");
}
