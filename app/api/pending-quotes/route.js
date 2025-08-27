import connectDB from '../../../lib/mongoose';
import PendingQuote from '../../../models/PendingQuote';

export async function DELETE(req) {
  try {
    await connectDB();
    const { id } = await req.json();
    const deletedQuote = await PendingQuote.findOneAndDelete({ id });
    if (!deletedQuote) {
      return new Response(JSON.stringify({ error: 'Pending quote not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error deleting pending quote:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}