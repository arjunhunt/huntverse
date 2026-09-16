const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Mission = require('./models/Mission');
const Zone = require('./models/Zone');

const seedDB = async () => {
  const userCount = await User.countDocuments();
  if (userCount === 0) {
    console.log('Database empty. Seeding mock data...');
    
    // Create test user
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('huntverse123', salt);
    
    await User.create([
      {
        username: 'Vikas',
        email: 'vikas@huntverse.gg',
        password,
        coins: 2500,
        xp: 1500,
        points: 800,
        team: 'Team Alpha',
        inventory: [
          { id: '1', name: 'EMP Grenade', qty: 2, icon: '💥' }
        ],
        powers: [
          { id: '1', name: 'Invisibility', qty: 1, icon: '👻' }
        ],
        achievements: [
          { id: 'a1', unlocked: true, progress: 100 },
          { id: 'a2', unlocked: false, progress: 45 }
        ]
      },
      {
        username: 'HunterPro',
        email: 'hunter@huntverse.gg',
        password,
        coins: 1000,
        xp: 500,
        points: 600,
        inventory: [],
        powers: []
      },
      {
        username: 'Ninja',
        email: 'ninja@huntverse.gg',
        password,
        coins: 4000,
        xp: 3000,
        points: 1200,
        inventory: [],
        powers: []
      }
    ]);
    
    // Create some missions
    await Mission.create([
      { title: 'Infiltrate Library', description: 'Scan the QR code at the library entrance.', reward: 150, type: 'qr', status: 'active', progress: 40 },
      { title: 'Find the hidden cache', description: 'Go to coordinates 24.3, 56.1', reward: 300, type: 'gps', status: 'locked' },
      { title: 'Snap the mascot', description: 'Take a photo of the college mascot.', reward: 200, type: 'photo', status: 'locked' }
    ]);

    // Create zones
    await Zone.create([
      { name: 'North Campus', type: 'capturable', owner: null, lat: 28.7, lng: 77.2 },
      { name: 'South Campus', type: 'capturable', owner: 'Team Beta', lat: 28.6, lng: 77.1 },
      { name: 'Library', type: 'safe', owner: null, lat: 28.65, lng: 77.15 }
    ]);
    
    console.log('Seeding complete.');
  }
};

module.exports = seedDB;
