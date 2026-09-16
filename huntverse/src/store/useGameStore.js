import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import api from '../api'
import {
  currentUser, missions as mockMissions, inventory as mockInventory,
  powers as mockPowers, chatMessages as mockChat, zones as mockZones,
  notificationsFeed, gameHUD, leaderboard as mockLeaderboard, team as mockTeam
} from '../data/mockData'

let idCounter = 1000
const nextId = () => `id_${idCounter++}`

export const useGameStore = create(
  persist(
    (set, get) => ({
      // --- auth ---
      isAuthenticated: false,
      user: null,
      token: null,
      
      login: async (email, password) => {
        try {
          const res = await api.post('/auth/login', { email, password })
          localStorage.setItem('token', res.data.token)
          set({ 
            isAuthenticated: true, 
            user: res.data.user,
            token: res.data.token,
            coins: res.data.user.coins,
            xp: res.data.user.xp,
            points: res.data.user.points,
            inventory: res.data.user.inventory || [],
            powers: res.data.user.powers || []
          })
          return true
        } catch (error) {
          console.error('Login failed', error)
          return false
        }
      },
      
      register: async (username, email, password) => {
        try {
          const res = await api.post('/auth/register', { username, email, password })
          localStorage.setItem('token', res.data.token)
          set({ 
            isAuthenticated: true, 
            user: res.data.user,
            token: res.data.token,
            coins: res.data.user.coins,
            xp: res.data.user.xp,
            points: res.data.user.points,
            inventory: res.data.user.inventory || [],
            powers: res.data.user.powers || []
          })
          return true
        } catch (error) {
          console.error('Registration failed', error)
          return false
        }
      },

      logout: () => {
        localStorage.removeItem('token')
        set({ isAuthenticated: false, user: null, token: null })
      },

      fetchProfile: async () => {
        try {
          const res = await api.get('/game/profile')
          set({ 
            user: res.data,
            coins: res.data.coins,
            xp: res.data.xp,
            points: res.data.points,
            inventory: res.data.inventory || [],
            powers: res.data.powers || []
          })
        } catch (error) {
          console.error('Profile fetch failed', error)
        }
      },

      // --- currency / xp ---
      coins: 0,
      xp: 0,
      points: 0,

      // --- missions ---
      missions: mockMissions, // Initially mock, will fetch from API later
      fetchMissions: async () => {
        try {
          const res = await api.get('/game/missions')
          // If we actually have missions in DB, use them. Otherwise keep mock for visual demo
          if (res.data && res.data.length > 0) {
            set({ missions: res.data })
          }
        } catch (error) {
          console.error('Missions fetch failed', error)
        }
      },
      
      startMission: async (id) => {
        try {
          await api.post(`/game/missions/${id}/start`)
          set((s) => ({
            missions: s.missions.map(m => (m.id === id || m._id === id) ? { ...m, status: 'active', progress: Math.max(m.progress || 0, 5) } : m)
          }))
        } catch (error) {
          console.error('Start mission failed', error)
        }
      },

      completeMission: async (id) => {
        const m = get().missions.find(x => x.id === id || x._id === id)
        if (!m) return
        try {
          const res = await api.post(`/game/missions/${id}/complete`)
          set((s) => ({
            missions: s.missions.map(x => (x.id === id || x._id === id) ? { ...x, status: 'completed', progress: 100 } : x),
            points: res.data.user.points,
            xp: res.data.user.xp,
            user: res.data.user
          }))
          get().pushNotification('🎯', `Mission complete: ${m.title} (+${m.reward} pts)`)
        } catch (error) {
          console.error('Complete mission failed', error)
        }
      },

      // --- leaderboard ---
      leaderboard: mockLeaderboard?.global || [],
      fetchLeaderboard: async () => {
        try {
          const res = await api.get('/game/leaderboard')
          set({ leaderboard: res.data })
        } catch (error) {
          console.error('Leaderboard fetch failed', error)
        }
      },

      // --- store ---
      buyItem: async (item) => {
        try {
          const res = await api.post('/game/store/buy', { item })
          set({ 
            coins: res.data.coins,
            inventory: res.data.inventory,
            user: res.data
          })
          return true
        } catch (error) {
          console.error('Buy item failed', error)
          return false
        }
      },

      // --- inventory & powers ---
      inventory: [],
      powers: [],
      usePower: async (id) => {
        try {
          const res = await api.post('/game/power/use', { powerId: id })
          set({ powers: res.data.powers })
          get().pushNotification('⚡', `Power activated.`)
        } catch (error) {
          console.error('Use power failed', error)
        }
      },

      // --- zones ---
      zones: [],
      fetchZones: async () => {
        try {
          const res = await api.get('/game/zones')
          set({ zones: res.data })
        } catch (error) {
          console.error('Zones fetch failed', error)
        }
      },

      captureZone: async (id) => {
        try {
          const res = await api.post('/game/zone/capture', { zoneId: id })
          set((s) => ({
            zones: s.zones.map(z => (z.id === id || z._id === id) ? res.data.zone : z)
          }))
          get().pushNotification('🏆', `Team Alpha captured a zone.`)
        } catch (error) {
          console.error('Capture zone failed', error)
        }
      },

      // --- team ---
      team: mockTeam,
      fetchTeam: async () => {
        try {
          const res = await api.get('/game/team')
          set({ team: res.data })
        } catch (error) {
          console.error('Team fetch failed', error)
        }
      },

      // --- chat ---
      chat: [],
      fetchChat: async () => {
        try {
          const res = await api.get('/game/chat')
          set({ chat: res.data })
        } catch (error) {
          console.error('Chat fetch failed', error)
        }
      },
      addChatMessage: (msg) => set((s) => ({
        chat: [...s.chat, msg]
      })),

      // --- notifications (toasts) ---
      notifications: [],
      pushNotification: (icon, text) => {
        const id = nextId()
        set((s) => ({ notifications: [...s.notifications, { id, icon, text }] }))
        setTimeout(() => {
          set((s) => ({ notifications: s.notifications.filter(n => n.id !== id) }))
        }, 4500)
      },
      dismissNotification: (id) => set((s) => ({ notifications: s.notifications.filter(n => n.id !== id) })),

      // --- verification modal ---
      verifyPhoto: () => {
        get().pushNotification('🤖', 'AI verification complete — object confirmed.')
      },

      seedAmbientEvents: (() => {
        let started = false
        return () => {
          if (started) return
          started = true
          const lines = notificationsFeed
          let i = 0
          setInterval(() => {
            const n = lines[i % lines.length]
            get().pushNotification(n.icon, n.text)
            i++
          }, 25000)
        }
      })()
    }),
    { 
      name: 'huntverse-store', 
      partialize: (s) => ({ 
        isAuthenticated: s.isAuthenticated, 
        token: s.token,
        user: s.user,
        coins: s.coins, 
        xp: s.xp, 
        points: s.points, 
        inventory: s.inventory, 
        powers: s.powers, 
        zones: s.zones, 
        chat: s.chat 
      }) 
    }
  )
)
