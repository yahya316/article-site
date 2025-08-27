import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import connectDB from '../lib/mongoose';
import PendingQuote from '../models/PendingQuote';

async function migrateData() {
  try {
    // Connect to MongoDB
    await connectDB();

    // Read pendingQuotes.json
    const filePath = path.join(process.cwd(), 'data', 'pendingQuotes.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const quotesData = JSON.parse(jsonData);

    // Clear existing data in the pendingQuotes collection (optional, comment out to append)
    await PendingQuote.deleteMany({});

    // Insert data into the pendingQuotes collection
    await PendingQuote.insertMany(quotesData);

    console.log('Data successfully migrated to MongoDB pendingQuotes collection');
  } catch (error) {
    console.error('Error migrating data:', error);
  } finally {
    // Close the MongoDB connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

migrateData();