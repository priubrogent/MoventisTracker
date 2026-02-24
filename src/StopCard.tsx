import { useStopData } from './useStopData'
import type { StopConfig } from './types'
import { extractE3Buses, formatCountdown, formatTime } from './utils'

interface Props {
  stop: StopConfig
  refreshTick: number
}

export function StopCard({ stop, refreshTick }: Props) {
  const { data, loading, error, lastUpdated } = useStopData(stop.url, refreshTick)

  const buses = data ? extractE3Buses(data) : []
  const incidencias = data?.find((l) => l.selected === 1)?.incidencias

  return (
    <div className="bus-list">
      {loading && !data && <div className="stop-status">carregant…</div>}
      {error && <div className="stop-status stop-error">error: {error}</div>}
      {incidencias && <div className="stop-status stop-error">⚠ {incidencias}</div>}

      {buses.map((bus, i) => (
        <div key={i} className="bus-row">
          <span className={`indicator ${bus.isLive ? 'live' : ''}`} />
          <span className="direction">{bus.directionName}</span>
          <span className="arrival">{bus.arrivalTime}</span>
          <span className={`countdown ${bus.isLive ? 'live' : ''}`}>
            {formatCountdown(bus.minutes, bus.seconds)}
          </span>
        </div>
      ))}

      {!loading && !error && buses.length === 0 && (
        <div className="stop-status">sense serveis</div>
      )}

      {lastUpdated && (
        <div className="updated">{formatTime(lastUpdated)}</div>
      )}
    </div>
  )
}
