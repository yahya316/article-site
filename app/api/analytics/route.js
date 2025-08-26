import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "data", "analytics.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(jsonData);

  return Response.json(data);
}
