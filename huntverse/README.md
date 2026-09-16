# HUNTVERSE

**"The Real World Is Your Game Map."**

A complete frontend for a futuristic real-world multiplayer GPS hunting game — built as a premium AAA game dashboard combined with a modern GPS/navigation app. No backend required; everything runs on mock data and a client-side mock game engine.

---

## 1. Install dependencies

```bash
npm install
```

## 2. Run the project

```bash
npm run dev
```

Open the printed local URL (typically `http://localhost:5173`). Log in with any email/password (the login form is pre-filled and accepts anything) to enter the dashboard.

To build for production:

```bash
npm run build
npm run preview
```

---

## 3. Project structure

```
src/
  components/   Reusable UI: Sidebar, TopBar, BottomNav, MapView, GameHUD,
                MissionCard, MissionModal, TeamCard, ChatPanel, Leaderboard,
                PowerCard/InventoryCard, StatCard/AchievementCard, AIAdvisor,
                Notification (toasts), ui.jsx (Button/Badge/ProgressBar/Modal/Tabs)
  layouts/      AuthLayout (login/register shell), DashboardLayout (sidebar + topbar + routes)
  pages/        One file per route (see section 5)
  data/         mockData.js — all mock game content in one place
  store/        useGameStore.js — Zustand store simulating the real-time game engine,
                persisted to localStorage
  index.css     Global styles, design tokens, glass/hex-grid utility classes
  App.jsx       Route table
  main.jsx      Entry point
```

## 4. Main components

- **MapView** — CSS/SVG tactical map simulation with animated player marker, teammate markers, mission pins, zones (safe/bonus/danger/secret/capturable), a radar sweep, compass, and zoom controls. Capturable zones can be captured directly from the map.
- **GameHUD** — Live game name, LIVE indicator, time left, player count, team points, rank.
- **MissionCard / CurrentMissionCard / MissionModal / VerificationModal** — Full mission lifecycle: browse, start, view details, upload proof, get AI photo verification, earn points.
- **AIAdvisor / AIClueModal** — The AI Game Master panel (strategy callouts, accept mission, ask for hint) and the AI clue generator (regenerate / make harder / make easier).
- **ChatPanel** — Team chat with quick commands, mock messages, and a working send flow.
- **Leaderboard** — Tabbed (Global/Campus/City/Friends/Team) ranking table with the current user's team highlighted.
- **PowerCard / InventoryCard** — Activate powers (with cooldown/quantity) and use inventory items; both update shared state.
- **HostDashboard** — Organizer view: live stats, map, start/pause/end game, and an Anti-Cheat Monitor with review/warn/penalize/disqualify actions.
- **CreateGame** — 9-step wizard (name → location → boundary → mode → duration → teams → missions → scoring → launch).

## 5. Routes

`/login` `/register` `/dashboard` `/game` `/map` `/missions` `/team` `/chat`
`/leaderboard` `/inventory` `/powers` `/profile` `/achievements` `/store`
`/settings` `/create-game` `/join-game` `/host-dashboard`

State (missions, inventory, powers, zones, chat, coins, points, XP) lives in
`src/store/useGameStore.js` (Zustand + localStorage persistence), so actions
taken on one page (e.g. completing a mission in Missions) are reflected
everywhere else (Dashboard, Profile XP bar, top bar points, etc).

## 6. How to replace mock GPS with real GPS

Currently, `mapMarkers.player` in `src/data/mockData.js` holds a static
`{ x, y }` percentage position rendered inside `MapView.jsx`. To wire up real
GPS:

1. In a new `src/hooks/useGeolocation.js`, wrap the browser's
   `navigator.geolocation.watchPosition()` API and expose `{ latitude, longitude, accuracy }`.
2. Replace the static `mapMarkers` positions with real lat/lng, and swap the
   percentage-based CSS positioning in `MapView.jsx` for a real map library
   (e.g. `react-leaflet`, already listed as an optional dependency in the
   original brief) using `<MapContainer center={[lat, lng]}>` and
   `<Marker position={[lat, lng]}>`.
3. Replace the mocked "distance to target" and "direction" fields in
   `currentMission` with a haversine-distance + bearing calculation between
   the player's live coordinates and the mission target's coordinates.
4. Team member positions would come from your backend's real-time layer (see
   below) instead of `mapMarkers.team`.

## 7. How to connect a backend later

The entire app talks to `src/data/mockData.js` and `src/store/useGameStore.js`
— nothing else references mock data directly. To connect a real backend:

1. Replace the static exports in `mockData.js` with API calls (e.g. React
   Query or plain `fetch`) inside the Zustand store's actions
   (`startMission`, `completeMission`, `usePower`, `sendMessage`, etc.), so
   each action calls your API and then updates local state from the response.
2. Add a WebSocket (or similar) connection for real-time updates — teammate
   positions, chat messages, zone captures, leaderboard changes, and AI Game
   Master callouts — and push incoming events into the same store actions
   (e.g. `sendMessage`, `pushNotification`) so the UI updates automatically.
3. Swap the mock login/register handlers in `pages/Login.jsx` and
   `pages/Register.jsx` for real auth calls, and store the returned session
   token instead of the current `isAuthenticated` boolean.
4. Replace `AIClueModal`'s static clue text and `AIAdvisor`'s static feed with
   calls to your AI service.

## 8. Tech stack

React 18 · Vite 5 · Tailwind CSS 3 · React Router 6 · Framer Motion ·
Recharts · Lucide React · Zustand (state + localStorage persistence)
