import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data/quotes.json");

export async function GET() {
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return new Response(JSON.stringify(data.miniQuotes), { status: 200 });
}

export async function POST(req) {
  const newQuote = await req.json();
  const fileData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  newQuote.id = Date.now();
  fileData.miniQuotes.push(newQuote);
  fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2));
  return new Response(JSON.stringify(newQuote), { status: 201 });
}

export async function PUT(req) {
  const updated = await req.json();
  const fileData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const idx = fileData.miniQuotes.findIndex((q) => q.id === updated.id);
  if (idx !== -1) fileData.miniQuotes[idx] = updated;
  fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2));
  return new Response(JSON.stringify(updated), { status: 200 });
}

export async function DELETE(req) {
  const { id } = await req.json();
  const fileData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  fileData.miniQuotes = fileData.miniQuotes.filter((q) => q.id !== id);
  fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2));
  return new Response(JSON.stringify({ id }), { status: 200 });
}
