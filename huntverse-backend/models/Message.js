const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: 'A'
  },
  time: {
    type: String
  },
  audio: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
