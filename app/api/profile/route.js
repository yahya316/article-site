import connectDB from '../../../lib/mongoose';
import User from '../../../models/User';
import bcrypt from 'bcrypt';

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).lean();
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Exclude password from response
    const { password, ...userWithoutPassword } = user;
    return new Response(JSON.stringify(userWithoutPassword), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching user:", err);
    return new Response(JSON.stringify({ error: "Failed to fetch user" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PUT(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { email, name, phone, location, bio, role, status, notifications, password } = body;

    // Validate required fields
    if (!email || !name || !phone || !location || !bio || !role || !status || typeof notifications !== "boolean") {
      return new Response(JSON.stringify({ error: "All fields except password are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Validate enums
    if (!["Admin", "User"].includes(role)) {
      return new Response(JSON.stringify({ error: "Role must be 'Admin' or 'User'" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (!["Active", "Banned"].includes(status)) {
      return new Response(JSON.stringify({ error: "Status must be 'Active' or 'Banned'" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const updateData = {
      name,
      phone,
      location,
      bio,
      role,
      status,
      notifications,
    };

    // Hash password if provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Exclude password from response
    const { password: _, ...userWithoutPassword } = updatedUser.toObject();
    return new Response(JSON.stringify(userWithoutPassword), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error updating user:", err);
    return new Response(JSON.stringify({ error: err.message || "Failed to update user" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}