const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  coins: {
    type: Number,
    default: 500
  },
  xp: {
    type: Number,
    default: 0
  },
  points: {
    type: Number,
    default: 0
  },
  team: {
    type: String,
    default: null
  },
  inventory: [{
    id: String,
    name: String,
    qty: Number,
    icon: String
  }],
  powers: [{
    id: String,
    name: String,
    qty: Number,
    icon: String,
    activatedAt: Date
  }],
  achievements: [{
    id: String,
    unlocked: {
      type: Boolean,
      default: false
    },
    progress: {
      type: Number,
      default: 0
    }
  }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
