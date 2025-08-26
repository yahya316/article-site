import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "users.json");

export async function GET() {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const users = JSON.parse(data);
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Error reading users", { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const { email, updates } = await req.json();
    const data = fs.readFileSync(filePath, "utf-8");
    const users = JSON.parse(data);

    const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
    if (userIndex === -1) return new Response("User not found", { status: 404 });

    users[userIndex] = { ...users[userIndex], ...updates };

    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    return new Response(JSON.stringify(users[userIndex]), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Error updating user", { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { email } = await req.json();
    const data = fs.readFileSync(filePath, "utf-8");
    let users = JSON.parse(data);

    const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
    if (userIndex === -1) return new Response("User not found", { status: 404 });

    users.splice(userIndex, 1);

    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    return new Response("User deleted successfully", { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Error deleting user", { status: 500 });
  }
}
