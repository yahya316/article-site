import connectDB from '../../../lib/mongoose';
import MiniQuote from '../../../models/MiniQuote';
import PendingQuote from '../../../models/PendingQuote';

export async function POST(req) {
  try {
    await connectDB();
    const { id, action } = await req.json();

    if (!id || !["approve", "reject"].includes(action)) {
      return new Response(JSON.stringify({ error: 'Invalid request' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const pendingQuote = await PendingQuote.findOne({ id }).lean();
    if (!pendingQuote) {
      return new Response(JSON.stringify({ error: 'Pending quote not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (action === "approve") {
      const newQuote = {
        id: pendingQuote.id,
        text: pendingQuote.text,
        author: pendingQuote.author,
        imageUrl: pendingQuote.imageUrl || null,
        categories: Array.isArray(pendingQuote.categories) ? pendingQuote.categories : [],
      };
      await MiniQuote.create(newQuote);
    }

    await PendingQuote.findOneAndDelete({ id });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error managing quote:', error);
    return new Response(JSON.stringify({ error: 'Failed to manage quote' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}