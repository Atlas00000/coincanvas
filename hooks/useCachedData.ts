import { useState, useEffect } from "react"

interface CacheOptions {
  ttl?: number // Time to live in milliseconds
  storage?: "session" | "local"
}

export function useCachedData<T>(
  key: string,
  fetchFn: () => Promise<T>,
  options: CacheOptions = {}
) {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const storage = options.storage === "local" ? localStorage : sessionStorage
  const ttl = options.ttl || 5 * 60 * 1000 // Default 5 minutes

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const cached = storage.getItem(key)
        
        if (cached) {
          const { data: cachedData, timestamp } = JSON.parse(cached)
          const isExpired = Date.now() - timestamp > ttl
          
          if (!isExpired) {
            setData(cachedData)
            setIsLoading(false)
            return
          }
        }

        const result = await fetchFn()
        setData(result)
        storage.setItem(
          key,
          JSON.stringify({
            data: result,
            timestamp: Date.now(),
          })
        )
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [key, fetchFn, storage, ttl])

  const clearCache = () => {
    storage.removeItem(key)
    setData(null)
  }

  return { data, isLoading, error, clearCache }
} 