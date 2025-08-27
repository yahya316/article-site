import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  id: { type: String, unique: true }, // Changed to String to match provided IDs
  text: { type: String, required: true },
  author: { type: String, required: true },
  imageUrl: { type: String, required: false },
  categories: [{ type: String, required: false }, { default: [] }],
  type: { type: String, required: true, enum: ['mini', 'hero'] }, // Added type field
}, {
  collection: 'quotes' // Explicitly set the collection name
});

export default mongoose.models.Quote || mongoose.model('Quote', quoteSchema);