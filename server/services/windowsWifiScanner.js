const { exec } = require("child_process");

function scanWifi() {
  return new Promise((resolve, reject) => {
    exec("netsh wlan show networks mode=bssid", (err, stdout) => {
      if (err) {
        reject(err);
        return;
      }

      const lines = stdout.split("\n").map((line) => line.trim());

      const networks = [];
      let current = null;

      for (const line of lines) {
        if (line.startsWith("SSID ")) {
          if (current) {
            networks.push(current);
          }

          const ssid = line.split(":").slice(1).join(":").trim();

          current = {
            ssid,
            authentication: "",
            encryption: "",
            bssid: "",
            signal: 0,
            band: "",
            channel: 0,
          };
        }

        if (!current) continue;

        if (line.startsWith("Authentication")) {
          current.authentication = line.split(":")[1].trim();
        }

        if (line.startsWith("Encryption")) {
          current.encryption = line.split(":")[1].trim();
        }

        if (line.startsWith("BSSID")) {
          current.bssid = line.split(":").slice(1).join(":").trim();
        }

        if (line.startsWith("Signal")) {
          current.signal = parseInt(line.match(/\d+/)[0]);
        }

        if (line.startsWith("Band")) {
          current.band = line.split(":")[1].trim();
        }

        if (line.startsWith("Channel")) {
          current.channel = parseInt(line.split(":")[1]);
        }
      }

      if (current) {
        networks.push(current);
      }

      resolve(networks);
    });
  });
}

module.exports = {
  scanWifi,
};
