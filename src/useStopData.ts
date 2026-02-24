import { useState, useEffect, useCallback, useRef } from 'react'
import type { ApiLine } from './types'
import { REFRESH_INTERVAL_MS } from './config'

interface UseStopDataResult {
  data: ApiLine[] | null
  loading: boolean
  error: string | null
  lastUpdated: Date | null
  refresh: () => void
}

export function useStopData(url: string, externalTick: number): UseStopDataResult {
  const [data, setData] = useState<ApiLine[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const fetchData = useCallback(async () => {
    if (abortRef.current) abortRef.current.abort()
    abortRef.current = new AbortController()
    try {
      const res = await fetch(url, { signal: abortRef.current.signal })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json: ApiLine[] = await res.json()
      setData(json)
      setError(null)
      setLastUpdated(new Date())
    } catch (err) {
      if ((err as Error).name === 'AbortError') return
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }, [url])

  // Auto-refresh every 5s
  useEffect(() => {
    setLoading(true)
    fetchData()
    const id = setInterval(fetchData, REFRESH_INTERVAL_MS)
    return () => {
      clearInterval(id)
      abortRef.current?.abort()
    }
  }, [fetchData])

  // Respond to external manual refresh trigger (skip on mount tick=0)
  const isFirstTick = useRef(true)
  useEffect(() => {
    if (isFirstTick.current) { isFirstTick.current = false; return }
    fetchData()
  }, [externalTick, fetchData])

  return { data, loading, error, lastUpdated, refresh: fetchData }
}
