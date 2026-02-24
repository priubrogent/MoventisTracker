import { useStopData } from '../useStopData'
import { extractE3Buses, formatCountdown } from '../utils'
import { STOPS } from '../config'

const params = new URLSearchParams(window.location.search)
const stopId = params.get('stop') ?? 'cordoelles'
const size = params.get('size') === 'large' ? 'large' : 'medium'

const MAX_BUSES = size === 'large' ? 8 : 4
const stop = STOPS.find((s) => s.id === stopId) ?? STOPS[0]

export function WidgetPage() {
  const { data, loading } = useStopData(stop.url, 0)
  const buses = data ? extractE3Buses(data, MAX_BUSES).slice(0, MAX_BUSES) : []

  return (
    <div className={`widget ${size}`}>
      <div className="w-header">
        <span className="w-stop">{stop.name}</span>
        <span className="w-dir">{stop.direction === 'uab' ? '→ UAB' : '← BCN'}</span>
      </div>

      <div className="w-buses">
        {loading && !data && <div className="w-empty">carregant…</div>}
        {!loading && buses.length === 0 && <div className="w-empty">sense servei</div>}

        {buses.map((bus, i) => (
          <div key={i} className="w-row">
            <span className={`w-dot${bus.isLive ? ' live' : ''}`} />
            <span className="w-name">{bus.directionName}</span>
            <span className="w-time">{bus.arrivalTime}</span>
            <span className={`w-count${bus.isLive ? ' live' : ''}`}>
              {formatCountdown(bus.minutes, bus.seconds)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
