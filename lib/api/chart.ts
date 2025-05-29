export interface ChartData {
  price: number
  change24h: number
  volume: number
  history: Array<{
    timestamp: number
    price: number
  }>
}

const mockChartData: Record<string, ChartData> = {
  "24H": {
    price: 43250,
    change24h: 5.2,
    volume: 2.1,
    history: Array.from({ length: 24 }, (_, i) => ({
      timestamp: Date.now() - (23 - i) * 3600000,
      price: 40000 + Math.random() * 5000,
    })),
  },
  "7D": {
    price: 43250,
    change24h: 5.2,
    volume: 2.1,
    history: Array.from({ length: 7 }, (_, i) => ({
      timestamp: Date.now() - (6 - i) * 86400000,
      price: 40000 + Math.random() * 5000,
    })),
  },
  "30D": {
    price: 43250,
    change24h: 5.2,
    volume: 2.1,
    history: Array.from({ length: 30 }, (_, i) => ({
      timestamp: Date.now() - (29 - i) * 86400000,
      price: 40000 + Math.random() * 5000,
    })),
  },
}

export async function fetchChartData(timeframe: string): Promise<ChartData> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  
  if (!mockChartData[timeframe]) {
    throw new Error(`Invalid timeframe: ${timeframe}`)
  }
  
  return mockChartData[timeframe]
} 