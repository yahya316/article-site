import { promises as fs } from "fs";
import path from "path";

const pendingQuotesPath = path.join(process.cwd(), "data", "pendingQuotes.json");
const quotesPath = path.join(process.cwd(), "data", "quotes.json");

export async function POST(req) {
  try {
    const { id, action } = await req.json();

    // Load files
    const pendingData = JSON.parse(await fs.readFile(pendingQuotesPath, "utf-8"));
    const quotesData = JSON.parse(await fs.readFile(quotesPath, "utf-8"));

    const quoteIndex = pendingData.findIndex((q) => q.id == id);
    if (quoteIndex === -1) {
      return new Response(JSON.stringify({ error: "Quote not found" }), { status: 404 });
    }

    const quote = pendingData[quoteIndex];

    if (action === "approve") {
      // Remove from pending
      pendingData.splice(quoteIndex, 1);

      // Ensure miniQuotes exists
      if (!quotesData.miniQuotes) quotesData.miniQuotes = [];

      // Add to miniQuotes
      quotesData.miniQuotes.push({
        id: quote.id,
        text: quote.text,
        author: quote.author,
        categories: quote.categories,
      });

      // Save both files
      await fs.writeFile(pendingQuotesPath, JSON.stringify(pendingData, null, 2));
      await fs.writeFile(quotesPath, JSON.stringify(quotesData, null, 2));

      return new Response(JSON.stringify({ message: "Quote approved" }), { status: 200 });
    }

    if (action === "reject") {
      // Just remove from pending
      pendingData.splice(quoteIndex, 1);
      await fs.writeFile(pendingQuotesPath, JSON.stringify(pendingData, null, 2));

      return new Response(JSON.stringify({ message: "Quote rejected" }), { status: 200 });
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), { status: 400 });
  } catch (err) {
    console.error("Error in /api/manage-quote:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
