const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ["International", "Sports", "Cinema", "Technology", "Business", "Politics"],
    required: true,
  },
  imageUrl: String,
  source: String,
  publishedAt: {
    type: Date,
    default: Date.now,
  },
  views: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Article", articleSchema);