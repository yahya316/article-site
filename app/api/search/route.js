import connectDB from '../../../lib/mongoose';
import User from '../../../models/User';
import Article from '../../../models/Article';
import MiniQuote from '../../../models/MiniQuote';
import HeroQuote from '../../../models/HeroQuote';

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    if (!query) {
      return new Response(JSON.stringify({ error: "Search query is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Case-insensitive regex search
    const regex = new RegExp(query, 'i');

    // Search users by name or email
    const users = await User.find({
      $or: [
        { name: regex },
        { email: regex },
      ],
    })
      .select('-password') // Exclude password
      .lean()
      .limit(10); // Limit for performance

    // Search articles by title or content
    const articles = await Article.find({
      $or: [
        { title: regex },
        { content: regex },
      ],
    })
      .lean()
      .limit(10);

    // Search miniQuotes and heroQuotes by text or author
    const miniQuotes = await MiniQuote.find({
      $or: [
        { text: regex },
        { author: regex },
      ],
    })
      .lean()
      .limit(10);

    const heroQuotes = await HeroQuote.find({
      $or: [
        { text: regex },
        { author: regex },
      ],
    })
      .lean()
      .limit(10);

    // Combine miniQuotes and heroQuotes into quotes array
    const quotes = [
      ...miniQuotes.map((q) => ({ ...q, type: 'MiniQuote' })),
      ...heroQuotes.map((q) => ({ ...q, type: 'HeroQuote' })),
    ];

    return new Response(
      JSON.stringify({ users, articles, quotes }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Error performing search:", err);
    return new Response(JSON.stringify({ error: "Failed to perform search" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}