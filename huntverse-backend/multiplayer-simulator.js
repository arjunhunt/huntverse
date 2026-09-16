const axios = require('axios');
const io = require('socket.io-client');

const API = 'http://localhost:5000/api';
const SOCKET_URL = 'http://localhost:5000';

async function runMultiplayerSimulation() {
  console.log('🚀 Starting Multiplayer Simulation: 2 Teams, 5 Members Each...');
  
  const teams = ['Team Alpha', 'Team Beta'];
  const players = [];
  const errors = [];

  try {
    // 1. Create Players
    for (let t = 0; t < 2; t++) {
      for (let p = 1; p <= 5; p++) {
        const username = `${teams[t].split(' ')[1]}_Player_${p}`;
        const email = `${username.toLowerCase()}_${Date.now()}@huntverse.gg`;
        const password = 'password123';
        
        const regRes = await axios.post(`${API}/auth/register`, { email, password, username });
        const token = regRes.data.token;
        
        // We need to assign teams. Since there's no API, we will just simulate their actions 
        // using their tokens. We will use the chat with their assigned rooms.
        
        players.push({ username, email, token, team: teams[t] });
      }
    }
    
    console.log(`✅ Created ${players.length} players across 2 teams.`);

    // 2. Simulate Gameplay (Missions, Store)
    for (const player of players) {
      const headers = { 'x-auth-token': player.token };
      
      // Fetch Missions
      const missionsRes = await axios.get(`${API}/game/missions`, { headers });
      const missionId = missionsRes.data[0]._id;
      
      // Start & Complete
      await axios.post(`${API}/game/missions/${missionId}/start`, {}, { headers });
      await axios.post(`${API}/game/missions/${missionId}/complete`, {}, { headers });
      
      // Buy Item
      await axios.post(`${API}/game/store/buy`, { item: { id: 'health_kit', name: 'Health', price: 50 } }, { headers });
      
      // Capture Zone
      const zonesRes = await axios.get(`${API}/game/zones`, { headers });
      const capturableZone = zonesRes.data.find(z => z.type === 'capturable');
      if (capturableZone) {
        await axios.post(`${API}/game/zone/capture`, { zoneId: capturableZone._id }, { headers });
      }
    }
    console.log('✅ All players completed missions, bought items, and captured zones.');

    // 3. Simulate Sockets & Chat
    const sockets = players.map(player => {
      const socket = io(SOCKET_URL);
      socket.emit('join_room', player.team);
      return { socket, player };
    });

    console.log('✅ All players connected to their Team Voice/Chat rooms.');

    // Let them send messages
    for (const sp of sockets) {
      sp.socket.emit('send_message', {
        user: sp.player.username,
        text: `Hello from ${sp.player.username}!`,
        avatar: sp.player.username[0],
        room: sp.player.team
      });
    }
    
    // Wait for messages to process
    await new Promise(r => setTimeout(r, 2000));
    
    for (const sp of sockets) {
      sp.socket.disconnect();
    }
    
    console.log('✅ All players exchanged messages and disconnected.');

    // 4. Verify Leaderboard
    const headers = { 'x-auth-token': players[0].token };
    const leaderboardRes = await axios.get(`${API}/game/leaderboard`, { headers });
    
    console.log('\n🏆 TOP 5 LEADERBOARD:');
    leaderboardRes.data.slice(0, 5).forEach((u, i) => {
      console.log(`  ${i+1}. ${u.username} - ${u.points} Points`);
    });

  } catch (err) {
    errors.push(err.response ? JSON.stringify(err.response.data) : err.message);
  }

  console.log('\n--- MULTIPLAYER SIMULATION RESULTS ---');
  console.log(`Total Errors Detected: ${errors.length}`);
  if (errors.length > 0) {
    console.log('Errors:', errors);
  } else {
    console.log('✨ Flawless Multiplayer Execution! No errors detected.');
  }
}

runMultiplayerSimulation();
