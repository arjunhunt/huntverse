import { motion } from 'framer-motion'
import { Compass, MapPin, Navigation } from 'lucide-react'
import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, LayersControl } from 'react-leaflet'
import L from 'leaflet'
import { mapMarkers } from '../data/mockData'
import { useGameStore } from '../store/useGameStore'

const zoneStyles = {
  safe: { color: '#00F0FF', fillColor: '#00F0FF', label: 'SAFE ZONE' },
  bonus: { color: '#FFD700', fillColor: '#FFD700', label: 'BONUS ZONE — 2X' },
  capturable: { color: '#FF3366', fillColor: '#FF3366', label: 'CONTESTED' },
  danger: { color: '#FF3366', fillColor: '#FF3366', label: 'DANGER ZONE' },
  secret: { color: '#B026FF', fillColor: '#B026FF', label: 'SECRET ZONE' }
}

// Custom icons
const createCustomIcon = (html) => L.divIcon({
  html,
  className: 'custom-leaflet-icon',
  iconSize: [30, 30],
  iconAnchor: [15, 15]
})

const playerIcon = createCustomIcon(`
  <div class="relative flex h-8 w-8 items-center justify-center rounded-full bg-signal-green text-void-950 shadow-glow">
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="rotate-45"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
  </div>
`)

const teamIcon = (initial) => createCustomIcon(`
  <div class="flex h-6 w-6 items-center justify-center rounded-full border border-signal-blue bg-void-900 text-[9px] font-bold text-signal-blue">
    ${initial}
  </div>
`)

const missionIcon = createCustomIcon(`
  <div class="relative flex h-7 w-7 items-center justify-center rounded-full bg-signal-gold text-void-950 shadow-glow-gold">
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
  </div>
`)

const checkpointIcon = createCustomIcon(`
  <div class="h-3 w-3 rotate-45 border border-signal-purple bg-signal-purple/30"></div>
`)

const coinIcon = createCustomIcon(`
  <div class="relative flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-yellow-900 shadow-[0_0_8px_rgba(250,204,21,0.8)] border border-yellow-200">
    <span class="font-bold text-[11px] leading-none">₹</span>
  </div>
`)

function RecenterMap({ lat, lng }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) map.setView([lat, lng]);
  }, [lat, lng, map]);
  return null;
}

export default function MapView({ height = 'h-[420px]' }) {
  const [gps, setGps] = useState({ lat: null, lng: null, acc: null })
  
  useEffect(() => {
    if (!navigator.geolocation) return;
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setGps({ lat: pos.coords.latitude, lng: pos.coords.longitude, acc: pos.coords.accuracy })
      },
      (err) => console.log('GPS error:', err),
      { enableHighAccuracy: true }
    )
    return () => navigator.geolocation.clearWatch(watchId)
  }, [])

  const zones = useGameStore((s) => s.zones)
  const captureZone = useGameStore((s) => s.captureZone)

  const defaultCenter = [mapMarkers.player.lat, mapMarkers.player.lng]
  const center = gps.lat ? [gps.lat, gps.lng] : defaultCenter

  return (
    <div className={`relative w-full ${height} overflow-hidden rounded-2xl border border-white/10 hex-grid-bg bg-void-850 z-0`}>
      <MapContainer center={defaultCenter} zoom={16} zoomControl={false} className="h-full w-full bg-void-900">
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Real Map (Standard)">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Sci-Fi Map (Dark Mode)">
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; OpenStreetMap contributors &copy; CARTO'
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satellite Map">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution='Tiles &copy; Esri'
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        
        {gps.lat && <RecenterMap lat={gps.lat} lng={gps.lng} />}

        {/* Zones */}
        {(zones || []).map((z) => {
          if (!z.lat || !z.lng) return null;
          const style = zoneStyles[z.type] || zoneStyles.safe
          return (
            <Circle 
              key={z.id} 
              center={[z.lat, z.lng]} 
              pathOptions={{ color: style.color, fillColor: style.fillColor, fillOpacity: 0.2 }} 
              radius={100}
            >
              <Popup className="bg-void-950 text-white border-none rounded-lg">
                <div className="font-bold text-sm text-center">{z.name}</div>
                <div className="text-[10px] text-center text-slate-400">{style.label}</div>
                {z.type === 'capturable' && (
                  <button onClick={() => captureZone(z.id)} className="w-full mt-2 bg-signal-red/20 text-signal-red text-xs py-1 rounded">
                    CAPTURE
                  </button>
                )}
              </Popup>
            </Circle>
          )
        })}

        {/* Coins */}
        {(mapMarkers.coins || []).map((coin) => (
          <Marker key={coin.id} position={[coin.lat, coin.lng]} icon={coinIcon}>
            <Popup className="custom-popup"><span className="text-yellow-400 font-bold">+{coin.value} Coins</span></Popup>
          </Marker>
        ))}

        {/* Checkpoints */}
        {mapMarkers.checkpoints.map((c) => (
          <Marker key={c.id} position={[c.lat, c.lng]} icon={checkpointIcon} />
        ))}

        {/* Missions */}
        {mapMarkers.missions.map((m) => (
          <Marker key={m.id} position={[m.lat, m.lng]} icon={missionIcon}>
            <Popup className="custom-popup">{m.name}</Popup>
          </Marker>
        ))}

        {/* Teammates */}
        {mapMarkers.team.map((t) => (
          <Marker key={t.id} position={[t.lat, t.lng]} icon={teamIcon(t.name[0])}>
            <Popup className="custom-popup">{t.name} — {t.distance}</Popup>
          </Marker>
        ))}

        {/* Player */}
        <Marker position={center} icon={playerIcon}>
          <Popup className="custom-popup">You</Popup>
        </Marker>
      </MapContainer>

      {/* compass */}
      <div className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-void-950/80 text-slate-300 z-[400]">
        <Compass size={18} />
      </div>

      <div className="absolute bottom-3 left-3 flex flex-col gap-1 z-[400]">
        <div className="glass rounded-lg px-3 py-1.5 text-[11px] text-slate-300">
          Target: <span className="font-semibold text-signal-gold">200m · North-East</span>
        </div>
        {gps.lat && (
          <div className="glass flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[10px] font-mono text-signal-green">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal-green" />
            GPS: {gps.lat.toFixed(5)}, {gps.lng.toFixed(5)} (±{Math.round(gps.acc)}m)
          </div>
        )}
      </div>
    </div>
  )
}
