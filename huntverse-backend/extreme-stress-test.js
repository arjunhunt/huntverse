const axios = require('axios');
const http = require('http');

// Use custom agent to allow high concurrency without socket exhaustion
const httpAgent = new http.Agent({ keepAlive: true, maxSockets: 100 });
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  httpAgent
});

const TOTAL_ITERATIONS = 1000;
const CONCURRENCY = 50;

async function runWorker(workerId, iterations) {
  let errors = [];
  let stats = { register: 0, login: 0, profile: 0, startMission: 0, completeMission: 0, buyItem: 0, createGame: 0, joinGame: 0 };

  for (let i = 1; i <= iterations; i++) {
    try {
      const email = `stress_${workerId}_${i}_${Date.now()}@huntverse.gg`;
      const password = 'password123';
      const username = `Tester_${workerId}_${i}_${Date.now()}`;

      const regRes = await api.post(`/auth/register`, { email, password, username });
      const token = regRes.data.token;
      stats.register++;

      const headers = { 'x-auth-token': token };

      await api.post(`/auth/login`, { email, password });
      stats.login++;

      await api.get(`/game/profile`, { headers });
      stats.profile++;

      const missionsRes = await api.get(`/game/missions`, { headers });
      const missionId = missionsRes.data[0]._id;

      await api.post(`/game/missions/${missionId}/start`, {}, { headers });
      stats.startMission++;

      await api.post(`/game/missions/${missionId}/complete`, {}, { headers });
      stats.completeMission++;

      await api.post(`/game/store/buy`, { item: { id: 'health_kit', name: 'Health Kit', price: 50, icon: 'Heart' } }, { headers });
      stats.buyItem++;

      const gameRes = await api.post(`/game/create`, { name: `Game ${i}`, mode: 'Battle', duration: '60' }, { headers });
      stats.createGame++;

      await api.post(`/game/join`, { code: gameRes.data.code }, { headers });
      stats.joinGame++;

    } catch (err) {
      errors.push(`Worker ${workerId} Itr ${i} failed: ${err.response ? JSON.stringify(err.response.data) : err.message}`);
    }
  }
  return { stats, errors };
}

async function main() {
  console.log(`Starting MASSIVE stress test: ${TOTAL_ITERATIONS} iterations across ${CONCURRENCY} concurrent workers...`);
  console.log(`Total HTTP Requests to be made: ${TOTAL_ITERATIONS * 8}`);
  
  const iterationsPerWorker = Math.ceil(TOTAL_ITERATIONS / CONCURRENCY);
  const promises = [];
  
  const startTime = Date.now();

  for (let w = 1; w <= CONCURRENCY; w++) {
    promises.push(runWorker(w, iterationsPerWorker));
  }

  const results = await Promise.all(promises);
  
  const endTime = Date.now();
  const timeTaken = ((endTime - startTime) / 1000).toFixed(2);

  let totalErrors = [];
  let totalStats = { register: 0, login: 0, profile: 0, startMission: 0, completeMission: 0, buyItem: 0, createGame: 0, joinGame: 0 };

  for (const res of results) {
    totalErrors.push(...res.errors);
    for (const key in res.stats) {
      totalStats[key] += res.stats[key];
    }
  }

  console.log('\n--- EXTREME STRESS TEST RESULTS ---');
  console.log(`Time taken: ${timeTaken} seconds`);
  console.log(totalStats);
  console.log('Total Errors:', totalErrors.length);
  if (totalErrors.length > 0) {
    console.log(totalErrors.slice(0, 10));
  }
}

main();
