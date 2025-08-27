import mongoose from 'mongoose';

const miniQuoteSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  text: { type: String, required: true },
  author: { type: String, required: true },
  imageUrl: { type: String, required: true },
  categories: [{ type: String }],
}, {
  collection: 'miniQuotes'
});

export default mongoose.models.MiniQuote || mongoose.model('MiniQuote', miniQuoteSchema);