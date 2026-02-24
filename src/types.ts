export interface RealTimeBus {
  minutos: string // "22 min 12.93 s"
  adaptada: null
  real: 'S'
}

export interface ScheduledBus {
  minutos: string // "45' 00''"
  adaptada: null
  real: 'N'
  hora: string   // "12:03"
  tiempo: string // "00 h 45 min"
}

export type TrayectoEntry = RealTimeBus[] | Record<string, ScheduledBus>

export interface ApiLine {
  idLinea: number
  desc_linea: string
  trayectos: Record<string, TrayectoEntry>
  incidencias: string | null
  selected: number
}

export interface ParsedBus {
  minutes: number
  seconds?: number     // live only — raw seconds component (0–59)
  arrivalTime: string  // "12:03" — computed for live, hora for scheduled
  isLive: boolean
  directionName: string
}

export type StopDirection = 'uab' | 'bcn'

export interface StopConfig {
  id: string
  name: string
  direction: StopDirection
  url: string
}
