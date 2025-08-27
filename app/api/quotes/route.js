import connectDB from '../../../lib/mongoose';
import Quote from '../../../models/Quote';

export async function GET() {
  try {
    await connectDB();
    const quotes = await Quote.find({}).lean();
    return new Response(JSON.stringify(quotes), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch quotes' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const newQuote = await req.json();
    // Generate custom ID
    const maxIdQuote = await Quote.findOne().sort({ id: -1 }).lean();
    newQuote.id = maxIdQuote ? maxIdQuote.id + 1 : 1;
    // Ensure categories is an array
    newQuote.categories = Array.isArray(newQuote.categories) ? newQuote.categories : [];
    const quote = await Quote.create(newQuote);
    return new Response(JSON.stringify(quote), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating quote:', error);
    return new Response(JSON.stringify({ error: 'Failed to create quote' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(req) {
  try {
    await connectDB();
    const updatedQuote = await req.json();
    // Ensure categories is an array
    updatedQuote.categories = Array.isArray(updatedQuote.categories) ? updatedQuote.categories : [];
    const quote = await Quote.findOneAndUpdate(
      { id: updatedQuote.id },
      updatedQuote,
      { new: true, runValidators: true }
    ).lean();
    if (!quote) {
      return new Response(JSON.stringify({ error: 'Quote not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify(quote), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating quote:', error);
    return new Response(JSON.stringify({ error: 'Failed to update quote' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const { id } = await req.json();
    const quote = await Quote.findOneAndDelete({ id }).lean();
    if (!quote) {
      return new Response(JSON.stringify({ error: 'Quote not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error deleting quote:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete quote' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}