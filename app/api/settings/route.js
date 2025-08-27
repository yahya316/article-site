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

export async function PATCH(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { email, currentPassword, newPassword, updates } = body;

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Handle password update
    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return new Response(JSON.stringify({ error: "Current password is incorrect" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      await User.findOneAndUpdate(
        { email: email.toLowerCase() },
        { $set: { password: hashedPassword } },
        { runValidators: true }
      );
    } else if (updates && typeof updates.notifications === "boolean") {
      // Handle notifications update
      await User.findOneAndUpdate(
        { email: email.toLowerCase() },
        { $set: { notifications: updates.notifications } },
        { runValidators: true }
      );
    } else {
      return new Response(JSON.stringify({ error: "Invalid update request" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Fetch updated user
    const updatedUser = await User.findOne({ email: email.toLowerCase() }).lean();
    const { password, ...userWithoutPassword } = updatedUser;

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

export async function DELETE(req) {
  try {
    await connectDB();
    const { email } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const result = await User.deleteOne({ email: email.toLowerCase() });
    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: "User deleted successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error deleting user:", err);
    return new Response(JSON.stringify({ error: err.message || "Failed to delete user" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}