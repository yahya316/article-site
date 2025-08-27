import mongoose from 'mongoose';

const heroQuoteSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  text: { type: String, required: true },
  author: { type: String, required: true },
}, {
  collection: 'heroQuotes'
});

export default mongoose.models.HeroQuote || mongoose.model('HeroQuote', heroQuoteSchema);