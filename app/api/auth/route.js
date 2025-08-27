import connectDB from '../../../lib/mongoose';
import User from '../../../models/User';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export async function POST(req) {
  try {
    await connectDB();
    const { action, user } = await req.json();

    if (action === "login") {
      const foundUser = await User.findOne({ email: user.email }).lean();
      if (!foundUser) {
        return new Response(JSON.stringify({ success: false, message: "Invalid email or password." }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const isPasswordValid = await bcrypt.compare(user.password, foundUser.password);
      if (!isPasswordValid) {
        return new Response(JSON.stringify({ success: false, message: "Invalid email or password." }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // Remove password from response for security
      const { password, ...userWithoutPassword } = foundUser;
      return new Response(JSON.stringify({ success: true, user: userWithoutPassword }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (action === "register") {
      const existingUser = await User.findOne({ email: user.email }).lean();
      if (existingUser) {
        return new Response(JSON.stringify({ success: false, message: "Email already exists." }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);

      // Generate custom ID
      const maxIdUser = await User.findOne().sort({ id: -1 }).lean();
      const newId = maxIdUser ? maxIdUser.id + 1 : 1;

      const newUser = {
        id: newId,
        name: user.name,
        email: user.email,
        password: hashedPassword,
        role: user.role || "User",
        status: user.status || "Active",
        phone: user.phone || "",
        location: user.location || "",
        bio: user.bio || "",
        notifications: user.notifications !== undefined ? user.notifications : false,
      };

      const createdUser = await User.create(newUser);
      // Remove password from response
      const { password, ...userWithoutPassword } = createdUser.toObject();
      return new Response(JSON.stringify({ success: true, user: userWithoutPassword }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: false, message: "Invalid action" }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(`Error during ${action}:`, error);
    return new Response(JSON.stringify({ success: false, message: "Server error. Please try again." }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}