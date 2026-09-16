const mongoose = require('mongoose');

const zoneSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: String, default: null },
  type: { type: String, enum: ['capturable', 'safe'], required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Zone', zoneSchema);
