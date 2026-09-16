const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
if (!process.env.JWT_SECRET) process.env.JWT_SECRET = 'supersecret_huntverse_key_2026';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

const seedDB = require('./seed');

const libDir = path.join(__dirname, 'lib');
process.env.LD_LIBRARY_PATH = process.env.LD_LIBRARY_PATH ? `${libDir}:${process.env.LD_LIBRARY_PATH}` : libDir;

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 2000 });
    console.log('MongoDB Connected to local/atlas URI');
    await seedDB();
  } catch (err) {
    console.log('Failed to connect to local MongoDB. Starting in-memory MongoDB...');
    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongoServer = await MongoMemoryServer.create({
      binary: {
        version: '4.4.18',
        os: { os: 'ubuntu', dist: 'Ubuntu 20.04' }
      }
    });
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected to In-Memory Server');
    await seedDB();
  }
};
connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/game', require('./routes/game'));

// Setup Socket.io
require('./socket')(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
