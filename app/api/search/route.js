import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");

function readIfExists(file) {
  const p = path.join(dataDir, file);
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf8")) : null;
}

function loadArray(candidates) {
  for (const f of candidates) {
    const data = readIfExists(f);
    if (Array.isArray(data)) return data;
  }
  return []; // fallback
}

function loadObject(candidates) {
  for (const f of candidates) {
    const data = readIfExists(f);
    if (data && typeof data === "object") return data;
  }
  return { heroQuotes: [], miniQuotes: [] }; // fallback
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim();
  if (!q) {
    return NextResponse.json({ message: "Query is required" }, { status: 400 });
  }
  const query = q.toLowerCase();

  // tolerate user.json / users.json and article.json / articles.json
  const users = loadArray(["users.json", "user.json"]);
  const articles = loadArray(["articles.json", "article.json"]);
  const quotesObj = loadObject(["quotes.json"]);

  const matchedUsers = users.filter(
    (u) =>
      (u.name && u.name.toLowerCase().includes(query)) ||
      (u.email && u.email.toLowerCase().includes(query)) ||
      (u.location && u.location.toLowerCase().includes(query)) ||
      (u.role && u.role.toLowerCase().includes(query))
  );

  const matchedArticles = articles.filter(
    (a) =>
      (a.title && a.title.toLowerCase().includes(query)) ||
      (a.author && a.author.toLowerCase().includes(query)) || // ✅ include author so "yahya" hits
      (a.content && a.content.toLowerCase().includes(query)) ||
      (Array.isArray(a.tags) && a.tags.some((t) => (t || "").toLowerCase().includes(query))) ||
      (a.category && a.category.toLowerCase().includes(query))
  );

  const matchedHeroQuotes = (quotesObj.heroQuotes || []).filter(
    (qObj) =>
      (qObj.text && qObj.text.toLowerCase().includes(query)) ||
      (qObj.author && qObj.author.toLowerCase().includes(query))
  );

  const matchedMiniQuotes = (quotesObj.miniQuotes || []).filter(
    (qObj) =>
      (qObj.text && qObj.text.toLowerCase().includes(query)) ||
      (qObj.author && qObj.author.toLowerCase().includes(query)) ||
      (Array.isArray(qObj.categories) &&
        qObj.categories.some((c) => (c || "").toLowerCase().includes(query)))
  );

  return NextResponse.json({
    users: matchedUsers,
    articles: matchedArticles,
    quotes: [...matchedHeroQuotes, ...matchedMiniQuotes],
  });
}
