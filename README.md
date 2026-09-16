# 🎮 HUNTVERSE

> **"The Real World Is Your Game Map."**

Huntverse is a real-world multiplayer GPS scavenger hunting and tactical territory game — featuring an AAA-styled sci-fi cyberpunk HUD, interactive GPS map, real-time multiplayer socket events, and cross-platform web & Android mobile support.

---

## 📁 Repository Structure

```
huntverse/
├── huntverse/              # Web & Mobile Frontend (React + Vite + Leaflet + Capacitor)
│   ├── android/            # Native Android Capacitor Project (Gradle)
│   ├── src/                # UI Components, Pages, State Store (Zustand), Map Views
│   └── package.json
├── huntverse-backend/      # Backend API & Realtime Server (Express + Socket.io + MongoDB)
│   ├── models/             # Mongoose Schemas (User, Game, Mission, Zone, Message)
│   ├── routes/             # REST Endpoints (Auth, Game, Missions, Zones)
│   ├── socket/             # Socket.io Real-time Chat & Zone Capture Events
│   ├── seed.js             # Initial database seeder
│   └── package.json
└── README.md
```

---

## 🚀 Quick Start

### 1. Backend Setup

```bash
cd huntverse-backend
npm install
cp .env.example .env
npm run dev
```

*Note: If local MongoDB is not running, the backend automatically boots an in-memory MongoDB server and seeds initial test data.*

### 2. Frontend Setup

```bash
cd huntverse
npm install
npm run dev
```

Visit `http://localhost:5173` in your browser.

Default Test Accounts (from seeder):
- `vikas@huntverse.gg` / `huntverse123`
- Or register any new account on the register page.

### 3. Android Mobile App (Capacitor)

```bash
cd huntverse
npm run build
npx cap sync
npx cap open android
```

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite 5, Tailwind CSS 3, Zustand, Framer Motion, Recharts, Lucide React
- **Maps & Location**: Leaflet, React-Leaflet, Geolocation API
- **Mobile**: Capacitor 8.5 (Android)
- **Backend**: Node.js, Express 5, MongoDB / Mongoose, In-Memory Mongo, JWT, Bcrypt
- **Real-Time**: Socket.io (chat rooms, live audio notes, contested zone captures)
