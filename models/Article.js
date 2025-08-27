import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  id: { type: Number, unique: true }, // Custom ID for compatibility
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  intro: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: String, required: true },
  category: { type: String, required: true },
  readTime: { type: String, required: true },
  tags: [{ type: String, required: true }],
}, {
  collection: 'articles' // Explicitly set the collection name
});

export default mongoose.models.Article || mongoose.model('Article', articleSchema);