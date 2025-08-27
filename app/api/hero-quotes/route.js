import connectDB from '../../../lib/mongoose';
import HeroQuote from '../../../models/HeroQuote';

export async function GET() {
  try {
    await connectDB();
    const quotes = await HeroQuote.find().lean();
    return new Response(JSON.stringify(quotes), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error fetching hero quotes:', err);
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
    const maxIdQuote = await HeroQuote.findOne().sort({ id: -1 }).lean();
    const newId = maxIdQuote ? maxIdQuote.id + 1 : 1;
    const newQuote = {
      id: newId,
      text: body.text,
      author: body.author,
    };
    const createdQuote = await HeroQuote.create(newQuote);
    return new Response(JSON.stringify(createdQuote), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error creating hero quote:', err);
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
    const updatedQuote = await HeroQuote.findOneAndUpdate(
      { id },
      updateData,
      { new: true, runValidators: true }
    );
    if (!updatedQuote) {
      return new Response(JSON.stringify({ error: 'Hero quote not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify(updatedQuote), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error updating hero quote:', err);
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
    const deletedQuote = await HeroQuote.findOneAndDelete({ id });
    if (!deletedQuote) {
      return new Response(JSON.stringify({ error: 'Hero quote not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error deleting hero quote:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}