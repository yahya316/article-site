import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  trafficData: [{
    day: { type: String, required: true },
    visitors: { type: Number, required: true }
  }],
  popularPosts: [{
    name: { type: String, required: true },
    posts: { type: Number, required: true }
  }],
  trafficSources: [{
    name: { type: String, required: true },
    value: { type: Number, required: true }
  }],
  engagement: {
    sessionTime: { type: String, required: true },
    bounceRate: { type: String, required: true },
    users: { type: String, required: true }
  }
}, {
  collection: 'analytics' 
});

export default mongoose.models.Analytics || mongoose.model('Analytics', analyticsSchema);