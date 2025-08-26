import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data/articles.json");

export async function GET() {
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST(req) {
  const newArticle = await req.json();
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  newArticle.id = Date.now();
  data.push(newArticle);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return new Response(JSON.stringify(newArticle), { status: 201 });
}

export async function PUT(req) {
  const updated = await req.json();
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const idx = data.findIndex((a) => a.id === updated.id);
  if (idx !== -1) data[idx] = updated;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return new Response(JSON.stringify(updated), { status: 200 });
}

export async function DELETE(req) {
  const { id } = await req.json();
  let data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  data = data.filter((a) => a.id !== id);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return new Response(JSON.stringify({ id }), { status: 200 });
}
