const axios = require('axios');

const API = 'http://localhost:5000/api';

async function runTests() {
  console.log('Starting stress test: 100 iterations...');
  let errors = [];
  let stats = {
    register: 0,
    login: 0,
    profile: 0,
    startMission: 0,
    completeMission: 0,
    buyItem: 0,
    createGame: 0,
    joinGame: 0
  };

  for (let i = 1; i <= 100; i++) {
    try {
      const email = `testuser${i}_${Date.now()}@huntverse.gg`;
      const password = 'password123';
      const username = `Tester_${i}`;

      // 1. Register
      const regRes = await axios.post(`${API}/auth/register`, { email, password, username });
      const token = regRes.data.token;
      stats.register++;

      const headers = { 'x-auth-token': token };

      // 2. Login
      await axios.post(`${API}/auth/login`, { email, password });
      stats.login++;

      // 3. Profile
      await axios.get(`${API}/game/profile`, { headers });
      stats.profile++;

      // 4. Start & Complete Mission
      const missionsRes = await axios.get(`${API}/game/missions`, { headers });
      const missionId = missionsRes.data[0]._id;

      await axios.post(`${API}/game/missions/${missionId}/start`, {}, { headers });
      stats.startMission++;

      await axios.post(`${API}/game/missions/${missionId}/complete`, {}, { headers });
      stats.completeMission++;

      // 5. Buy Item
      await axios.post(`${API}/game/store/buy`, { item: { id: 'health_kit', name: 'Health Kit', price: 50, icon: 'Heart' } }, { headers });
      stats.buyItem++;

      // 6. Create Game
      const gameRes = await axios.post(`${API}/game/create`, { name: `Game ${i}`, mode: 'Battle', duration: '60' }, { headers });
      stats.createGame++;

      // 7. Join Game
      await axios.post(`${API}/game/join`, { code: gameRes.data.code }, { headers });
      stats.joinGame++;

    } catch (err) {
      errors.push(`Iteration ${i} failed: ${err.response ? JSON.stringify(err.response.data) : err.message}`);
    }
    process.stdout.write(`\rProgress: ${i}/100 `);
  }

  console.log('\n--- TEST RESULTS ---');
  console.log(stats);
  console.log('Errors:', errors.length);
  if (errors.length > 0) {
    console.log(errors.slice(0, 10)); // Show top 10 errors
  }
}

runTests();
