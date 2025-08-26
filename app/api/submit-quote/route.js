import { promises as fs } from "fs";
import path from "path";

export async function POST(req) {
  try {
    const body = await req.json();

    const filePath = path.join(process.cwd(), "data", "pendingQuotes.json");
    let existing = [];

    try {
      const file = await fs.readFile(filePath, "utf-8");
      existing = JSON.parse(file);
    } catch {
      existing = [];
    }

    const newQuote = {
      id: Date.now(),
      text: body.text,
      author: body.author,
      categories: body.categories,
      status: "pending",
    };

    existing.push(newQuote);

    await fs.writeFile(filePath, JSON.stringify(existing, null, 2));

    return new Response(JSON.stringify({ success: true, quote: newQuote }), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
    });
  }
}
