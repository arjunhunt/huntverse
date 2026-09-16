const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  reward: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['gps', 'photo', 'qr'],
    required: true
  },
  difficulty: {
    type: String,
    default: 'MEDIUM'
  },
  time: {
    type: String,
    default: '10:00'
  },
  distance: {
    type: String,
    default: '200m'
  },
  direction: {
    type: String,
    default: 'North-East'
  },
  hint: {
    type: String,
    default: 'Look around carefully.'
  },
  status: {
    type: String,
    enum: ['locked', 'active', 'completed'],
    default: 'locked'
  },
  progress: {
    type: Number,
    default: 0
  },
  distance: String,
  timeLimit: String,
  location: {
    lat: Number,
    lng: Number
  }
}, { timestamps: true });

module.exports = mongoose.model('Mission', missionSchema);
