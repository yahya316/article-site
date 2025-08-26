import fs from "fs";
import path from "path";

const usersFile = path.join(process.cwd(), "data", "users.json");

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), { status: 400 });
    }

    const usersData = fs.readFileSync(usersFile, "utf-8");
    const users = JSON.parse(usersData);

    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!foundUser) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(foundUser), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch users" }), { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const usersData = fs.readFileSync(usersFile, "utf-8");
    const users = JSON.parse(usersData);

    const index = users.findIndex(u => u.email.toLowerCase() === body.email.toLowerCase());
    if (index === -1) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    users[index] = { ...users[index], ...body };

    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), "utf-8");

    return new Response(JSON.stringify(users[index]), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to update user" }), { status: 500 });
  }
}
