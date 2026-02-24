import type { ApiLine, ParsedBus, ScheduledBus } from './types'
import { MAX_SCHEDULED } from './config'

// "22 min 12.929 s" → { mins: 22, secs: 12 }
function parseRealTime(str: string): { mins: number; secs: number } {
  const match = str.match(/(\d+)\s*min\s*([\d.]+)\s*s/)
  if (!match) return { mins: 0, secs: 0 }
  return {
    mins: parseInt(match[1], 10),
    secs: Math.floor(parseFloat(match[2])),
  }
}

// "01 h 45 min" → 105
function parseTiempoMinutes(tiempo: string): number {
  const h = tiempo.match(/(\d+)\s*h/)
  const m = tiempo.match(/(\d+)\s*min/)
  return (h ? parseInt(h[1], 10) * 60 : 0) + (m ? parseInt(m[1], 10) : 0)
}

function computeArrival(mins: number, secs: number): string {
  const ms = (mins * 60 + secs) * 1000
  return new Date(Date.now() + ms).toLocaleTimeString('ca-ES', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function extractE3Buses(lines: ApiLine[], maxScheduled = MAX_SCHEDULED): ParsedBus[] {
  const e3 = lines.find((l) => l.selected === 1)
  if (!e3) return []

  const live: ParsedBus[] = []
  const scheduled: ParsedBus[] = []

  for (const [directionName, value] of Object.entries(e3.trayectos)) {
    if (Array.isArray(value)) {
      for (const bus of value) {
        const { mins, secs } = parseRealTime(bus.minutos)
        live.push({
          minutes: mins,
          seconds: secs,
          arrivalTime: computeArrival(mins, secs),
          isLive: true,
          directionName,
        })
      }
    } else {
      const entries = (Object.values(value) as ScheduledBus[])
        .sort((a, b) => parseTiempoMinutes(a.tiempo) - parseTiempoMinutes(b.tiempo))
        .slice(0, maxScheduled)

      for (const bus of entries) {
        scheduled.push({
          minutes: parseTiempoMinutes(bus.tiempo),
          arrivalTime: bus.hora,
          isLive: false,
          directionName,
        })
      }
    }
  }

  live.sort((a, b) => a.minutes - b.minutes || (a.seconds ?? 0) - (b.seconds ?? 0))
  scheduled.sort((a, b) => a.minutes - b.minutes)

  return [...live, ...scheduled.slice(0, maxScheduled)]
}

// "22'12"" for live,  "22 min" for scheduled
export function formatCountdown(minutes: number, seconds?: number): string {
  if (seconds !== undefined) {
    if (minutes === 0 && seconds < 20) return 'ara'
    return `${minutes}'${String(seconds).padStart(2, '0')}"`
  }
  if (minutes === 0) return 'ara'
  if (minutes >= 60) {
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    return m === 0 ? `${h}h` : `${h}h${m}'`
  }
  return `${minutes} min`
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('ca-ES', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}
