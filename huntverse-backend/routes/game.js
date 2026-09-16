const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Mission = require('../models/Mission');
const Zone = require('../models/Zone');
const Message = require('../models/Message');

// Get current user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get Leaderboard
router.get('/leaderboard', auth, async (req, res) => {
  try {
    const users = await User.find().sort({ points: -1 }).select('username points xp avatar');
    res.json(users);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Get all missions
router.get('/missions', auth, async (req, res) => {
  try {
    const missions = await Mission.find();
    res.json(missions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Start a mission
router.post('/missions/:id/start', auth, async (req, res) => {
  res.json({ message: 'Mission started', missionId: req.params.id });
});

// Complete a mission
router.post('/missions/:id/complete', auth, async (req, res) => {
  try {
    const mission = await Mission.findById(req.params.id);
    if (!mission) {
      return res.status(404).json({ message: 'Mission not found' });
    }
    const user = await User.findById(req.user.id);
    user.points += mission.reward;
    user.xp += Math.round(mission.reward * 0.6);
    await user.save();
    res.json({ message: 'Mission completed', user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Store Buy
router.post('/store/buy', auth, async (req, res) => {
  try {
    const { item } = req.body;
    const user = await User.findById(req.user.id);
    if (user.coins < item.price) {
      return res.status(400).json({ message: 'Not enough coins' });
    }
    user.coins -= item.price;
    // For simplicity, we just dump it into inventory.
    user.inventory.push({ id: item.id, name: item.name, qty: 1, icon: item.icon });
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Use a power
router.post('/power/use', auth, async (req, res) => {
  try {
    const { powerId } = req.body;
    const user = await User.findById(req.user.id);
    const powerIndex = user.powers.findIndex(p => p.id === powerId);
    if (powerIndex > -1 && user.powers[powerIndex].qty > 0) {
      user.powers[powerIndex].qty -= 1;
      await user.save();
      return res.json({ message: 'Power used', powerId, powers: user.powers });
    }
    res.status(400).json({ message: 'Power not available' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Zones
router.get('/zones', auth, async (req, res) => {
  try {
    const zones = await Zone.find();
    res.json(zones);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.post('/zone/capture', auth, async (req, res) => {
  try {
    const { zoneId } = req.body;
    const zone = await Zone.findById(zoneId);
    if (!zone || zone.type === 'safe') return res.status(400).json({ message: 'Cannot capture this zone' });
    zone.owner = 'Team Alpha'; // In a real app, this would be user.team
    await zone.save();
    res.json({ message: 'Zone captured', zone });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Chat History
router.get('/chat', auth, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 }).limit(50);
    res.json(messages);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Team
router.get('/team', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.team) return res.json({ name: 'No Team', score: 0, rank: 0, members: [] });
    const members = await User.find({ team: user.team }).select('username points avatar');
    res.json({
      name: user.team,
      score: members.reduce((a, c) => a + c.points, 0),
      rank: 3,
      members: members.map(m => ({ id: m._id, name: m.username, role: 'Member', points: m.points, avatar: m.avatar }))
    });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

const GameModel = require('../models/Game');

// Create Game
router.post('/create', auth, async (req, res) => {
  try {
    const { name, mode, duration } = req.body;
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const game = new GameModel({
      name,
      host: req.user.id,
      code,
      mode,
      players: [req.user.id]
    });
    await game.save();
    res.json(game);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Join Game
router.post('/join', auth, async (req, res) => {
  try {
    const { code } = req.body;
    const game = await GameModel.findOne({ code: code.toUpperCase() });
    if (!game) return res.status(404).json({ msg: 'Game not found' });
    if (!game.players.includes(req.user.id)) {
      game.players.push(req.user.id);
      await game.save();
    }
    res.json(game);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
