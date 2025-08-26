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

export async function POST(req) {
  const { action, user } = await req.json();
  const users = readUsers();

  if (action === "login") {
    const found = users.find(u => u.email === user.email && u.password === user.password);
    if (found) {
      return new Response(JSON.stringify({ success: true, user: found }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ success: false, message: "Invalid email or password." }), { status: 401 });
    }
  }

  if (action === "register") {
    if (users.some(u => u.email === user.email)) {
      return new Response(JSON.stringify({ success: false, message: "Email already exists." }), { status: 400 });
    }

    const newUser = {
      id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
      name: user.name,
      email: user.email,
      password: user.password,
      role: "User",
      status: "Active",
    };

    users.push(newUser);
    writeUsers(users);
    return new Response(JSON.stringify({ success: true, user: newUser }), { status: 201 });
  }

  return new Response("Invalid action", { status: 400 });
}
