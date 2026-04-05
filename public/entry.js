const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({
  instagramUsername: { type: String, required: true },
  viewerName: { type: String, required: true },
  relationship: { type: String, required: true },
  selectedTimeRange: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Entry', EntrySchema);
