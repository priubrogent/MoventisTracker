import { useState, useCallback } from 'react'
import { StopCard } from './StopCard'
import { STOPS } from './config'
import type { StopDirection } from './types'
import './App.css'

export default function App() {
  const [dir, setDir] = useState<StopDirection>('uab')
  const [refreshTick, setRefreshTick] = useState(0)
  const [collapsed, setCollapsed] = useState<Set<string>>(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem('collapsed-stops') ?? '[]'))
    } catch {
      return new Set()
    }
  })

  const handleRefresh = useCallback(() => setRefreshTick((t) => t + 1), [])

  function toggleCollapsed(id: string) {
    setCollapsed((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      localStorage.setItem('collapsed-stops', JSON.stringify([...next]))
      return next
    })
  }

  const stops = STOPS.filter((s) => s.direction === dir)

  return (
    <div className="app">
      <div className="topbar">
        <div className="tabs">
          <button
            className={`tab${dir === 'uab' ? ' active' : ''}`}
            onClick={() => setDir('uab')}
          >
            → UAB
          </button>
          <button
            className={`tab${dir === 'bcn' ? ' active' : ''}`}
            onClick={() => setDir('bcn')}
          >
            ← BCN
          </button>
        </div>
        <button className="refresh-btn" onClick={handleRefresh} title="Actualitza ara">
          ↺
        </button>
      </div>

      {stops.map((stop) => {
        const isCollapsed = collapsed.has(stop.id)
        return (
          <div key={stop.id} className="stop-section">
            <div className="stop-header" onClick={() => toggleCollapsed(stop.id)}>
              <span className="stop-header-name">{stop.name}</span>
              <span className="stop-header-toggle">{isCollapsed ? '+' : '−'}</span>
            </div>
            {!isCollapsed && <StopCard stop={stop} refreshTick={refreshTick} />}
          </div>
        )
      })}
    </div>
  )
}
