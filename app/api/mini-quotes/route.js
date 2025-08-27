import connectDB from '../../../lib/mongoose';
import MiniQuote from '../../../models/MiniQuote';

export async function GET() {
  try {
    await connectDB();
    const quotes = await MiniQuote.find().lean();
    return new Response(JSON.stringify(quotes), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error fetching mini quotes:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    // Always generate a new id, ignoring any id in the body
    const maxIdQuote = await MiniQuote.findOne().sort({ id: -1 }).lean();
    const newId = maxIdQuote ? maxIdQuote.id + 1 : 1;
    const newQuote = {
      id: newId,
      text: body.text,
      author: body.author,
      imageUrl: body.imageUrl,
      categories: body.categories || [],
    };
    const createdQuote = await MiniQuote.create(newQuote);
    return new Response(JSON.stringify(createdQuote), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error creating mini quote:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { id, ...updateData } = body;
    const updatedQuote = await MiniQuote.findOneAndUpdate(
      { id },
      updateData,
      { new: true, runValidators: true }
    );
    if (!updatedQuote) {
      return new Response(JSON.stringify({ error: 'Mini quote not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify(updatedQuote), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error updating mini quote:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const { id } = await req.json();
    const deletedQuote = await MiniQuote.findOneAndDelete({ id });
    if (!deletedQuote) {
      return new Response(JSON.stringify({ error: 'Mini quote not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error deleting mini quote:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}