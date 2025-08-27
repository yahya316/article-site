// seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load env vars
dotenv.config({ path: ".env.local" });

// Import models
import Analytics from "./models/Analytics.js";
import Article from "./models/Article.js";
import HeroQuote from "./models/HeroQuote.js";
import MiniQuote from "./models/MiniQuote.js";
import PendingQuote from "./models/PendingQuotes.js";
import Quote from "./models/Quote.js";
import User from "./models/User.js";

// MongoDB connection
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: process.env.MONGODB_DB,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ Error connecting to MongoDB", err);
    process.exit(1);
  }
}

async function seed() {
  await connectDB();

  try {
    // Clear existing collections
    await Promise.all([
      Analytics.deleteMany({}),
      Article.deleteMany({}),
      HeroQuote.deleteMany({}),
      MiniQuote.deleteMany({}),
      PendingQuote.deleteMany({}),
      Quote.deleteMany({}),
      User.deleteMany({})
    ]);

    console.log("🧹 Old data cleared");

    // Insert Analytics
    await Analytics.create({
      trafficData: [
        { day: "Mon", visitors: 120 },
        { day: "Tue", visitors: 150 }
      ],
      popularPosts: [
        { name: "First Article", posts: 25 }
      ],
      trafficSources: [
        { name: "Google", value: 60 },
        { name: "Twitter", value: 40 }
      ],
      engagement: {
        sessionTime: "2m",
        bounceRate: "40%",
        users: "50"
      }
    });

    // Insert Articles
    await Article.insertMany([
      {
        id: 1,
        slug: "intro-to-nextjs",
        title: "Getting Started with Next.js",
        image: "/images/nextjs.png",
        intro: "A beginner’s guide to Next.js.",
        content: "Full article content goes here...",
        author: "Admin",
        date: "2023-12-01",
        category: "Web Development",
        readTime: "5 min",
        tags: ["nextjs", "react", "web"]
      },
      {
        id: 2,
        slug: "mongodb-basics",
        title: "MongoDB Basics",
        image: "/images/mongodb.png",
        intro: "Learn MongoDB fundamentals.",
        content: "Full article content goes here...",
        author: "Admin",
        date: "2023-12-05",
        category: "Database",
        readTime: "6 min",
        tags: ["mongodb", "database"]
      }
    ]);

    // Insert HeroQuotes
    await HeroQuote.insertMany([
      { id: 1, text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
      { id: 2, text: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" }
    ]);

    // Insert MiniQuotes
    await MiniQuote.insertMany([
      { id: 1, text: "Keep pushing forward.", author: "Anonymous", imageUrl: "/images/quote1.jpg", categories: ["motivation"] }
    ]);

    // Insert PendingQuotes
    await PendingQuote.insertMany([
      { id: 1, text: "Pending approval quote.", author: "Unknown", type: "hero", status: "pending" }
    ]);

    // Insert Quotes
    await Quote.insertMany([
      { id: "q1", text: "Knowledge is power.", author: "Francis Bacon", type: "hero" }
    ]);

    // Insert Users
    await User.insertMany([
      {
        id: 1,
        name: "Admin User",
        email: "admin@example.com",
        role: "Admin",
        status: "Active",
        password: "hashedpassword123", // 🔑 Replace with bcrypt hash in real app
        phone: "1234567890",
        location: "Earth",
        bio: "I am the admin.",
        notifications: true
      }
    ]);

    console.log("✅ Database seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding data:", err);
    process.exit(1);
  }
}

seed();
