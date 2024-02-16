const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  image: { type: String, required: false },
  heading: { type: String, required: true },
  body: { type: String, required: true },
  postedDate: { type: Date, default: Date.now },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Blog', blogSchema);
