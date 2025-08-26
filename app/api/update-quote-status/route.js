// pages/api/update-quote-status.js
import fs from "fs";
import path from "path";

const pendingPath = path.join(process.cwd(), "data", "pendingQuotes.json");
const quotesPath = path.join(process.cwd(), "data", "quotes.json");

function readJSON(filePath, fallback) {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    const raw = fs.readFileSync(filePath, "utf8");
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(filePath, data) {
  // atomic-ish write
  const tmp = `${filePath}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2), "utf8");
  fs.renameSync(tmp, filePath);
}

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { id, status } = req.body || {};
    if (typeof id === "undefined" || !["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid payload" });
    }

    // Normalize id to compare reliably
    const idNorm = String(id);

    const pending = readJSON(pendingPath, []);
    const idx = pending.findIndex((q) => String(q.id) === idNorm);

    if (idx === -1) {
      return res.status(404).json({ message: "Quote not found in pending" });
    }

    const quote = pending[idx];

    // Remove from pending first
    pending.splice(idx, 1);
    writeJSON(pendingPath, pending);

    let addedToQuotes = false;

    // If approved, push into quotes.json -> miniQuotes[]
    if (status === "approved") {
      const quotes = readJSON(quotesPath, { heroQuotes: [], miniQuotes: [] });

      const mini = {
        text: quote.text?.trim() || "",
        author: quote.author?.trim() || "Unknown",
        imageUrl: quote.imageUrl || "/images/img-9.jpg",
        categories: Array.isArray(quote.categories) ? quote.categories : [],
      };

      if (!Array.isArray(quotes.miniQuotes)) quotes.miniQuotes = [];
      quotes.miniQuotes.push(mini);
      writeJSON(quotesPath, quotes);
      addedToQuotes = true;
    }

    return res.status(200).json({
      ok: true,
      removedFromPending: true,
      addedToQuotes,
    });
  } catch (e) {
    console.error("update-quote-status error:", e);
    return res.status(500).json({ message: "Failed to update quote status" });
  }
}
