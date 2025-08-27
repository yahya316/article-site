import connectDB from '../../../lib/mongoose';
import Analytics from '../../../models/Analytics';

export async function GET() {
  try {
    await connectDB();
    const data = await Analytics.find({}).lean();
    return Response.json(data);
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch analytics data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}