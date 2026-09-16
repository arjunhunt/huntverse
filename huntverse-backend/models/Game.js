const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  code: { type: String, required: true, unique: true },
  status: { type: String, enum: ['waiting', 'active', 'finished'], default: 'waiting' },
  mode: { type: String, default: 'classic' },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Game', gameSchema);
