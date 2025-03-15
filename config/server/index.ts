import { serve }        from "bun";
import { readFile }     from "fs/promises";
import { existsSync }   from "fs";
import { extname }      from "path";
import mimes            from "./mimes";
import {
  destination,
  port
} from "./env";

serve({
  port,
  async fetch(req) {
    let url = new URL(req.url);
    let filePath = `${destination}${url.pathname}`;

    // Serve index.html for root and directory requests
    if (url.pathname === "/" || url.pathname.endsWith("/")) filePath += "index.html";

    // Check if file exists
    if (!existsSync(filePath)) return new Response("404 Not Found", { status: 404 });

    try {
      const file = await readFile(filePath);
      const ext = extname(filePath);
      const contentType = mimes[ext] || "application/octet-stream";
      return new Response(file, { headers: { "Content-Type": contentType } });
    } catch (err) {
      return new Response("500 Internal Server Error", { status: 500 });
    }
  },
});

console.log(`running on http://localhost:${port}`);