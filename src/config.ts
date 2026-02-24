import type { StopConfig } from './types'

export const STOPS: StopConfig[] = [
  {
    id: 'cordoelles',
    name: 'Passeig Cordoelles',
    direction: 'uab',
    url: '/moventis/api/json/GetTiemposParada/es/5315/299/0',
  },
  {
    id: 'sagrera',
    name: 'Sagrera (Meridiana)',
    direction: 'uab',
    url: '/moventis/api/json/GetTiemposParada/es/13870/299/0',
  },
  {
    id: 'fabra',
    name: 'Fabra i Puig',
    direction: 'uab',
    url: '/moventis/api/json/GetTiemposParada/es/12512/299/0',
  },
  {
    id: 'mercat',
    name: 'Mercat Casimir',
    direction: 'bcn',
    url: '/moventis/api/json/GetTiemposParada/es/439/299/0',
  },
  {
    id: 'ciencies',
    name: 'UAB Ciències',
    direction: 'bcn',
    url: '/moventis/api/json/GetTiemposParada/es/13861/299/0',
  },
  {
    id: 'postgrau',
    name: 'Postgrau',
    direction: 'bcn',
    url: '/moventis/api/json/GetTiemposParada/es/21660/299/0',
  },
]

export const REFRESH_INTERVAL_MS = 5000
export const MAX_SCHEDULED = 4
