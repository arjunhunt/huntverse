import { useEffect, useState } from 'react'
import { Outlet, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Sidebar from '../components/Sidebar'
import BottomNav from '../components/BottomNav'
import TopBar from '../components/TopBar'
import NotificationStack from '../components/Notification'
import { useGameStore } from '../store/useGameStore'

const titles = {
  '/dashboard': ['Command Center', 'Live overview of your game world'],
  '/game': ['Quick Play', 'Campus Hunt 2026'],
  '/map': ['Live Tactical Map', 'Real-time positions & zones'],
  '/missions': ['Missions', 'Track every objective'],
  '/team': ['My Team', 'Team Alpha'],
  '/chat': ['Team Chat', 'Team Alpha — private channel'],
  '/leaderboard': ['Leaderboard', 'See how you stack up'],
  '/inventory': ['Inventory', 'Your hunting gear'],
  '/powers': ['Powers', 'Activate your edge'],
  '/profile': ['Profile', 'Your hunter record'],
  '/achievements': ['Achievements', 'Milestones & trophies'],
  '/store': ['Store', 'Spend your coins'],
  '/settings': ['Settings', 'Account & preferences'],
  '/create-game': ['Create Game', 'Launch a new hunt'],
  '/join-game': ['Join Game', 'Enter a game code'],
  '/host-dashboard': ['Host Dashboard', 'Organizer command center']
}

export default function DashboardLayout() {
  const isAuthenticated = useGameStore((s) => s.isAuthenticated)
  const seedAmbientEvents = useGameStore((s) => s.seedAmbientEvents)
  const fetchProfile = useGameStore((s) => s.fetchProfile)
  const fetchMissions = useGameStore((s) => s.fetchMissions)
  const fetchLeaderboard = useGameStore((s) => s.fetchLeaderboard)
  const fetchZones = useGameStore((s) => s.fetchZones)
  const fetchChat = useGameStore((s) => s.fetchChat)
  const fetchTeam = useGameStore((s) => s.fetchTeam)
  
  const location = useLocation()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => { 
    if (isAuthenticated) {
      seedAmbientEvents() 
      fetchProfile()
      fetchMissions()
      fetchLeaderboard()
      fetchZones()
      fetchChat()
      fetchTeam()
    }
  }, [isAuthenticated, seedAmbientEvents, fetchProfile, fetchMissions, fetchLeaderboard, fetchZones, fetchChat, fetchTeam])

  if (!isAuthenticated) return <Navigate to="/login" replace />

  const [title, subtitle] = titles[location.pathname] || ['HUNTVERSE', '']

  return (
    <div className="flex min-h-screen bg-void-900">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col pb-16 lg:pb-0">
        <TopBar title={title} subtitle={subtitle} onMenu={() => setMobileNavOpen(true)} />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="p-4 lg:p-6"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <BottomNav />
      <NotificationStack />

      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 lg:hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setMobileNavOpen(false)}
          >
            <motion.div
              initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }}
              transition={{ type: 'spring', damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="h-full w-64 bg-void-950"
            >
              <Sidebar mobile />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
