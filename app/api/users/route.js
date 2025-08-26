import fs from "fs";
import path from "path";

const usersFile = path.join(process.cwd(), "data/users.json");

const readUsers = () => {
  const data = fs.readFileSync(usersFile, "utf-8");
  return JSON.parse(data);
};

const writeUsers = (data) => {
  fs.writeFileSync(usersFile, JSON.stringify(data, null, 2), "utf-8");
};

export async function GET() {
  const users = readUsers();
  return new Response(JSON.stringify(users), { status: 200 });
}

export async function POST(req) {
  const newUser = await req.json();
  const users = readUsers();
  newUser.id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
  users.push(newUser);
  writeUsers(users);
  return new Response(JSON.stringify(newUser), { status: 201 });
}

export async function PUT(req) {
  const updatedUser = await req.json();
  const users = readUsers();
  const index = users.findIndex(u => u.id === updatedUser.id);
  if (index === -1) return new Response("User not found", { status: 404 });
  users[index] = updatedUser;
  writeUsers(users);
  return new Response(JSON.stringify(updatedUser), { status: 200 });
}

export async function DELETE(req) {
  const { id } = await req.json();
  let users = readUsers();
  users = users.filter(u => u.id !== id);
  writeUsers(users);
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
