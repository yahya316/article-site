import connectDB from '../../../lib/mongoose';
import PendingQuote from '../../../models/PendingQuote';

export async function GET() {
  try {
    await connectDB();
    const quotes = await PendingQuote.find().lean();
    return new Response(JSON.stringify(quotes), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error fetching pending quotes:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}