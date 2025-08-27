import connectDB from '../../../lib/mongoose';
import User from '../../../models/User';

export async function GET() {
  try {
    await connectDB();
    const users = await User.find({}).lean();
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch users' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const newUser = await req.json();
    // Generate custom ID if not provided
    if (!newUser.id) {
      const maxIdUser = await User.findOne().sort({ id: -1 }).lean();
      newUser.id = maxIdUser ? maxIdUser.id + 1 : 1;
    }
    const user = await User.create(newUser);
    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return new Response(JSON.stringify({ error: 'Failed to create user' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(req) {
  try {
    await connectDB();
    const updatedUser = await req.json();
    const user = await User.findOneAndUpdate({ id: updatedUser.id }, updatedUser, {
      new: true,
      runValidators: true,
    }).lean();
    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return new Response(JSON.stringify({ error: 'Failed to update user' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const { id } = await req.json();
    const user = await User.findOneAndDelete({ id }).lean();
    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete user' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}