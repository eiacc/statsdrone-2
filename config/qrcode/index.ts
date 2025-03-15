// QR Checks if NGROK is running
import 'dotenv/config'
import * as qrcode from "qrcode-terminal"

(async() => {
  try {
    // Fetch tunnel info from ngrok's local API
    const res = await fetch(String(process.env.NGROK_WEB_INTERFACE));
    if (!res.ok) throw new Error(`Failed to fetch tunnels: ${res.statusText}`);

    const data = await res.json();

    if (!data.tunnels || data.tunnels.length === 0) {
      throw new Error('No active tunnels found.');
    }

    const url = data.tunnels[0].public_url;
    console.log(`🌐 Ngrok tunnel active: ${url}`);

    if (url) {
      console.log(`✅ Ngrok tunnel started: ${url}`);
      console.log(`Scan here to view on mobile \n`);
      qrcode.generate(url, { small: true });
    } else {
      throw new Error('❌ No tunnels found.');
    }

    return
  } catch (error) {
    console.error(`❌ Error fetching ngrok tunnel: ${error}`);
  }
})()