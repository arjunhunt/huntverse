import { Routes, Route, Navigate } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import DashboardLayout from './layouts/DashboardLayout'

import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Game from './pages/Game'
import MapPage from './pages/MapPage'
import Missions from './pages/Missions'
import Team from './pages/Team'
import Chat from './pages/Chat'
import Leaderboard from './pages/Leaderboard'
import Inventory from './pages/Inventory'
import Powers from './pages/Powers'
import Profile from './pages/Profile'
import Achievements from './pages/Achievements'
import Store from './pages/Store'
import Settings from './pages/Settings'
import CreateGame from './pages/CreateGame'
import JoinGame from './pages/JoinGame'
import HostDashboard from './pages/HostDashboard'

export default function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/game" element={<Game />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/team" element={<Team />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/powers" element={<Powers />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/store" element={<Store />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/create-game" element={<CreateGame />} />
        <Route path="/join-game" element={<JoinGame />} />
        <Route path="/host-dashboard" element={<HostDashboard />} />
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
