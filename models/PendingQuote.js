import mongoose from 'mongoose';

const pendingQuoteSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  text: { type: String, required: true },
  author: { type: String, required: true },
  imageUrl: { type: String },
  categories: [{ type: String }],
  type: { type: String, enum: ['mini', 'hero'], required: true },
  status: { type: String, default: 'pending' },
}, {
  collection: 'pendingQuotes'
});

export default mongoose.models.PendingQuote || mongoose.model('PendingQuote', pendingQuoteSchema);