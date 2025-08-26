// app/api/get-pending-quotes/route.js
import { promises as fs } from "fs";
import path from "path";

const pendingQuotesPath = path.join(process.cwd(), "data", "pendingQuotes.json");

export async function GET() {
  try {
    const pendingData = JSON.parse(await fs.readFile(pendingQuotesPath, "utf-8"));

    // pendingQuotes.json is just an array []
    return new Response(JSON.stringify(pendingData), { status: 200 });
  } catch (err) {
    console.error("Error reading pendingQuotes.json:", err);
    return new Response(JSON.stringify({ error: "Failed to load pending quotes" }), { status: 500 });
  }
}
