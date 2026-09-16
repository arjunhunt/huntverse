// Central mock dataset for HUNTVERSE. No backend — this simulates a live game world.

export const currentUser = {
  id: 'u1',
  name: 'Vikas',
  handle: '@vikas_hunts',
  title: 'Rookie Hunter',
  level: 1,
  xp: 0,
  xpToNext: 1000,
  rank: 0,
  huntRating: 0,
  role: 'Captain',
  team: 'Team Alpha',
  avatar: 'V',
  color: 'signal.green',
  stats: {
    missionsCompleted: 0,
    successfulHunts: 0,
    accuracy: 100,
    avgTime: '0.0 min',
    zonesCaptured: 0,
    winRate: 0
  }
}

export const team = {
  name: 'Team Alpha',
  score: 0,
  rank: 0,
  color: '#39FF88',
  inviteCode: 'HUNT-XYZ-2026', // Added invite code for sharing
  members: [
    { id: 'u1', name: 'Vikas', role: 'Captain', online: true, points: 0, distance: '0m (You)', mission: 'Idle', avatar: 'V' }
  ]
}

export const gameHUD = {
  gameName: 'Campus Hunt 2026',
  live: true,
  timeLeft: '04:32',
  players: 1,
  teamPoints: 0,
  rank: 0
}

export const currentMission = {
  id: 'm1',
  title: 'Find the Red Fire Extinguisher',
  type: 'Find Object',
  difficulty: 'MEDIUM',
  distance: '200m',
  direction: 'North-East',
  time: '04:32',
  reward: 150,
  description: 'A red fire extinguisher is mounted near a high-traffic corridor. Locate it and upload photographic proof to claim your reward.',
  hint: 'Look near stairwells and emergency exits — safety equipment is never far from an escape route.'
}

export const missions = [
  { id: 'm1', title: 'Find the Red Fire Extinguisher', type: 'Find Object', difficulty: 'MEDIUM', distance: '200m', time: '04:32', reward: 150, status: 'active', progress: 40 },
  { id: 'm2', title: 'Scan the Library QR', type: 'QR Hunt', difficulty: 'EASY', distance: '450m', time: '08:00', reward: 90, status: 'active', progress: 10 },
  { id: 'm3', title: 'Capture Zone C', type: 'Zone Capture', difficulty: 'HARD', distance: '600m', time: '12:00', reward: 300, status: 'available', progress: 0 },
  { id: 'm4', title: 'Photo: Campus Mural', type: 'Photo Challenge', difficulty: 'EASY', distance: '120m', time: '05:00', reward: 80, status: 'available', progress: 0 },
  { id: 'm5', title: 'The Silent Keeper Riddle', type: 'Riddle', difficulty: 'HARD', distance: '300m', time: '10:00', reward: 220, status: 'available', progress: 0 },
  { id: 'm6', title: 'Checkpoint Bravo', type: 'Checkpoint', difficulty: 'EASY', distance: '85m', time: '03:00', reward: 60, status: 'completed', progress: 100 },
  { id: 'm7', title: 'Team Relay: Courtyard', type: 'Team Challenge', difficulty: 'MEDIUM', distance: '400m', time: '15:00', reward: 250, status: 'completed', progress: 100 },
  { id: 'm8', title: 'Boss Mission: The Vault', type: 'Boss Mission', difficulty: 'EXTREME', distance: '900m', time: '20:00', reward: 500, status: 'failed', progress: 62 },
  { id: 'm9', title: 'Timed Sprint: East Gate', type: 'Timed Mission', difficulty: 'MEDIUM', distance: '250m', time: '02:00', reward: 130, status: 'failed', progress: 40 },
  { id: 'm10', title: '2X Bonus: Golden Hour', type: 'AI Mission', difficulty: 'EASY', distance: '150m', time: '06:00', reward: 100, status: 'bonus', progress: 0 }
]

export const zones = [
  { id: 'z1', name: 'Connaught Place - Inner Circle', type: 'safe', lat: 28.6315, lng: 77.2167, owner: 'Team Alpha' },
  { id: 'z2', name: 'Palika Bazaar', type: 'bonus', lat: 28.6300, lng: 77.2170, owner: null, multiplier: '2X' },
  { id: 'z3', name: 'India Gate', type: 'capturable', lat: 28.6129, lng: 77.2295, owner: 'Team Omega' },
  { id: 'z4', name: 'Red Fort', type: 'danger', lat: 28.6562, lng: 77.2410, owner: null },
  { id: 'z5', name: 'Lodhi Gardens', type: 'secret', lat: 28.5933, lng: 77.2197, owner: null }
]

export const mapMarkers = {
  player: { id: 'p', name: 'Vikas', label: 'You', lat: 28.6304, lng: 77.2177 },
  team: [],
  missions: [
    { id: 'mk1', name: 'Red Fire Extinguisher', lat: 28.6310, lng: 77.2160 },
    { id: 'mk2', name: 'Metro Station QR', lat: 28.6325, lng: 77.2180 },
    { id: 'mk3', name: 'Central Park Mural', lat: 28.6300, lng: 77.2175 }
  ],
  checkpoints: [
    { id: 'c1', lat: 28.6315, lng: 77.2155 },
    { id: 'c2', lat: 28.6295, lng: 77.2190 }
  ],
  coins: [
    { id: 'coin1', value: 50, lat: 28.6305, lng: 77.2185 },
    { id: 'coin2', value: 100, lat: 28.6298, lng: 77.2160 },
    { id: 'coin3', value: 20, lat: 28.6312, lng: 77.2190 },
    { id: 'coin4', value: 50, lat: 28.6322, lng: 77.2165 },
    { id: 'coin5', value: 10, lat: 28.6300, lng: 77.2195 }
  ]
}

export const leaderboard = {
  global: [
    { rank: 1, team: 'Nightfall Nine', players: 8, score: 3120, missions: 88, winRate: 81 },
    { rank: 2, team: 'Team Omega', players: 10, score: 1890, missions: 61, winRate: 68 },
    { rank: 3, team: 'Team Alpha', players: 5, score: 1250, missions: 44, winRate: 72, isUser: true },
    { rank: 4, team: 'Ghost Protocol', players: 6, score: 1180, missions: 39, winRate: 55 },
    { rank: 5, team: 'Delta Runners', players: 9, score: 990, missions: 33, winRate: 49 }
  ],
  campus: [
    { rank: 1, team: 'Team Omega', players: 10, score: 1890, missions: 61, winRate: 68 },
    { rank: 2, team: 'Team Alpha', players: 5, score: 1250, missions: 44, winRate: 72, isUser: true },
    { rank: 3, team: 'Delta Runners', players: 9, score: 990, missions: 33, winRate: 49 }
  ],
  city: [
    { rank: 1, team: 'Nightfall Nine', players: 8, score: 3120, missions: 88, winRate: 81 },
    { rank: 2, team: 'Team Alpha', players: 5, score: 1250, missions: 44, winRate: 72, isUser: true }
  ],
  friends: [
    { rank: 1, team: 'Team Alpha', players: 5, score: 1250, missions: 44, winRate: 72, isUser: true },
    { rank: 2, team: 'Ghost Protocol', players: 6, score: 1180, missions: 39, winRate: 55 }
  ],
  team: [
    { rank: 1, team: 'Vikas', players: 1, score: 420, missions: 12, winRate: 91 },
    { rank: 2, team: 'Rohit', players: 1, score: 310, missions: 9, winRate: 70 },
    { rank: 3, team: 'Aman', players: 1, score: 260, missions: 8, winRate: 65 }
  ]
}

export const inventory = [
  { id: 'i1', name: 'Scanner', qty: 3, icon: 'ScanLine', desc: 'Reveals nearby hidden objectives within 50m.' },
  { id: 'i2', name: 'Extra Hint', qty: 5, icon: 'Lightbulb', desc: 'Unlocks an additional clue for your active mission.' },
  { id: 'i3', name: 'Shield', qty: 2, icon: 'Shield', desc: 'Protects your zone from capture for 5 minutes.' },
  { id: 'i4', name: '2X Points', qty: 1, icon: 'Sparkles', desc: 'Doubles points earned for the next 10 minutes.' },
  { id: 'i5', name: 'Compass', qty: 4, icon: 'Compass', desc: 'Points directly toward your active mission target.' },
  { id: 'i6', name: 'Radar', qty: 2, icon: 'Radar', desc: 'Displays all nearby enemy team positions for 30s.' },
  { id: 'i7', name: 'Speed Boost', qty: 3, icon: 'Zap', desc: 'Reduces mission cooldowns by 50% for 5 minutes.' },
  { id: 'i8', name: 'Spy', qty: 1, icon: 'Eye', desc: "Reveals a rival team's current mission for 60s." }
]

export const powers = [
  { id: 'p1', name: 'Scanner', icon: 'ScanLine', qty: 3, cooldown: 0, desc: 'Reveals nearby hidden objectives within 50m.', color: 'blue' },
  { id: 'p2', name: 'Compass', icon: 'Compass', qty: 4, cooldown: 0, desc: 'Points directly toward your active mission target.', color: 'green' },
  { id: 'p3', name: 'Radar', icon: 'Radar', qty: 2, cooldown: 45, desc: 'Displays all nearby enemy team positions for 30s.', color: 'purple' },
  { id: 'p4', name: 'Shield', icon: 'Shield', qty: 2, cooldown: 0, desc: 'Protects your zone from capture for 5 minutes.', color: 'blue' },
  { id: 'p5', name: 'Speed Boost', icon: 'Zap', qty: 3, cooldown: 0, desc: 'Reduces mission cooldowns by 50% for 5 minutes.', color: 'gold' },
  { id: 'p6', name: 'Spy', icon: 'Eye', qty: 1, cooldown: 120, desc: "Reveals a rival team's current mission for 60s.", color: 'red' },
  { id: 'p7', name: '2X Points', icon: 'Sparkles', qty: 1, cooldown: 0, desc: 'Doubles points earned for the next 10 minutes.', color: 'gold' }
]

export const achievements = [
  { id: 'a1', name: 'First Hunt', desc: 'Complete your first mission.', unlocked: true, progress: 100, icon: 'Footprints' },
  { id: 'a2', name: 'Master Hunter', desc: 'Complete 100 missions.', unlocked: true, progress: 100, icon: 'Trophy' },
  { id: 'a3', name: 'Zone King', desc: 'Capture 25 zones.', unlocked: false, progress: 92, icon: 'Flag' },
  { id: 'a4', name: 'Speed Runner', desc: 'Complete 10 timed missions.', unlocked: false, progress: 60, icon: 'Timer' },
  { id: 'a5', name: 'Team Player', desc: 'Help teammates complete 50 missions.', unlocked: false, progress: 74, icon: 'Users' },
  { id: 'a6', name: 'Ghost Walker', desc: 'Complete a mission undetected by rival scanners.', unlocked: true, progress: 100, icon: 'Ghost' }
]

export const storeCategories = {
  'Power Ups': [
    { id: 's1', name: '2X Points', price: 300, icon: 'Sparkles' },
    { id: 's2', name: 'Scanner', price: 150, icon: 'ScanLine' },
    { id: 's3', name: 'Shield', price: 250, icon: 'Shield' },
    { id: 's4', name: 'Radar', price: 280, icon: 'Radar' }
  ],
  Cosmetics: [
    { id: 's5', name: 'Neon Trail Effect', price: 400, icon: 'Sparkle' },
    { id: 's6', name: 'Holo Pin', price: 220, icon: 'MapPin' }
  ],
  Badges: [
    { id: 's7', name: 'Founder Badge', price: 500, icon: 'BadgeCheck' },
    { id: 's8', name: 'Night Owl Badge', price: 180, icon: 'Moon' }
  ],
  Avatars: [
    { id: 's9', name: 'Cyber Runner Avatar', price: 350, icon: 'UserRound' },
    { id: 's10', name: 'Stealth Fox Avatar', price: 350, icon: 'UserRound' }
  ],
  'Team Themes': [
    { id: 's11', name: 'Voidfire Theme', price: 600, icon: 'Palette' },
    { id: 's12', name: 'Arctic Ops Theme', price: 600, icon: 'Palette' }
  ],
  'Game Passes': [
    { id: 's13', name: 'Season Pass — Vol. 4', price: 900, icon: 'Ticket' }
  ]
}

export const chatMessages = [
  { id: 'c1', user: 'Rohit', avatar: 'R', text: 'Heading to checkpoint bravo now', time: '10:42', self: false },
  { id: 'c2', user: 'Aman', avatar: 'A', text: 'Target found near the east stairwell 👀', time: '10:44', self: false },
  { id: 'c3', user: 'Vikas', avatar: 'V', text: 'Nice, uploading proof now', time: '10:45', self: true },
  { id: 'c4', user: 'Priya', avatar: 'P', text: 'Enemy nearby — Zone C, be careful', time: '10:47', self: false },
  { id: 'c5', user: 'Sneha', avatar: 'S', text: 'Need help with the riddle, anyone free?', time: '10:49', self: false }
]

export const quickCommands = ['Come here', 'Target found', 'Need help', 'Move to checkpoint', 'Enemy nearby']

export const aiAdvisorFeed = [
  { id: 'ai1', text: 'Team Alpha is currently 120 points behind Team Omega.' },
  { id: 'ai2', text: 'Bonus mission detected 180m to your North-East.' },
  { id: 'ai3', text: 'Zone C will become a 2X zone in 30 seconds.' }
]

export const notificationsFeed = [
  { id: 'n1', icon: '🏆', text: 'Team Alpha captured Zone C.' },
  { id: 'n2', icon: '🎯', text: 'New mission available nearby.' },
  { id: 'n3', icon: '⚡', text: '2X Points activated.' },
  { id: 'n4', icon: '🚨', text: 'Suspicious GPS activity detected.' },
  { id: 'n5', icon: '🤖', text: 'AI Game Master generated a new mission.' },
  { id: 'n6', icon: '🏅', text: 'You reached Rank #3.' }
]

export const weeklyPerformance = [
  { day: 'Mon', points: 210 }, { day: 'Tue', points: 340 }, { day: 'Wed', points: 180 },
  { day: 'Thu', points: 420 }, { day: 'Fri', points: 390 }, { day: 'Sat', points: 510 }, { day: 'Sun', points: 300 }
]

export const missionCompletionData = [
  { name: 'Completed', value: 142 }, { name: 'Failed', value: 21 }, { name: 'Active', value: 6 }
]

export const winRateTrend = [
  { month: 'Mar', rate: 58 }, { month: 'Apr', rate: 62 }, { month: 'May', rate: 65 },
  { month: 'Jun', rate: 69 }, { month: 'Jul', rate: 71 }, { month: 'Aug', rate: 72 }
]

export const gameModes = [
  { id: 'classic', name: 'Classic Hunt', desc: 'Free-for-all mission hunting across the map.' },
  { id: 'battle', name: 'Team Battle', desc: 'Two teams race to out-score each other.' },
  { id: 'capture', name: 'Capture Zone', desc: 'Control territory to earn points over time.' },
  { id: 'survival', name: 'Survival', desc: 'Last team with points remaining wins.' },
  { id: 'mystery', name: 'Mystery Hunt', desc: 'Riddle-driven exploration with hidden objectives.' },
  { id: 'campus_war', name: 'Campus War', desc: 'Large-scale inter-department competition.' }
]

export const hostStats = {
  activePlayers: 42,
  teams: 8,
  currentMissions: 14,
  gameTime: '01:24:10',
  totalPoints: 18420,
  suspiciousActivity: 2,
  zones: 5,
  completionRate: 78
}

export const antiCheatAlerts = [
  { id: 'ac1', player: 'Karan_09', violation: 'GPS Spoofing', time: '2 min ago', severity: 'high' },
  { id: 'ac2', player: 'MayaX', violation: 'Impossible Speed', time: '6 min ago', severity: 'medium' },
  { id: 'ac3', player: 'ghost_r', violation: 'Duplicate Photo', time: '11 min ago', severity: 'low' },
  { id: 'ac4', player: 'DevP', violation: 'Outside Zone', time: '18 min ago', severity: 'medium' }
]

export const liveGameStats = { hunters: 12482, missions: 3291, games: 847 }
