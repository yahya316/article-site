import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: { type: Number, unique: true }, // Custom ID for compatibility
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ['Admin', 'User'] },
  status: { type: String, required: true, enum: ['Active', 'Banned'] },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  bio: { type: String, required: true },
  notifications: { type: Boolean, required: true },
}, {
  collection: 'users' // Explicitly set the collection name
});

export default mongoose.models.User || mongoose.model('User', userSchema);