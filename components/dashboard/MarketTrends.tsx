"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Users } from "lucide-react"
import { useCachedData } from "@/hooks/useCachedData"

interface MarketData {
  totalMarketCap: number
  totalVolume24h: number
  activeUsers: number
  trends: Array<{
    name: string
    value: number
    change: number
  }>
}

const mockMarketData: MarketData = {
  totalMarketCap: 2.1e12,
  totalVolume24h: 85.4e9,
  activeUsers: 1.2e6,
  trends: [
    { name: "Bitcoin", value: 43250, change: 5.2 },
    { name: "Ethereum", value: 2250, change: 3.8 },
    { name: "Solana", value: 98.5, change: -2.1 },
    { name: "Cardano", value: 0.45, change: 1.5 },
  ],
}

async function fetchMarketData(): Promise<MarketData> {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return mockMarketData
}

export const MarketTrends = () => {
  const { data, isLoading, error } = useCachedData<MarketData>(
    "market-trends",
    fetchMarketData,
    { ttl: 5 * 60 * 1000 }
  )

  if (isLoading) {
    return (
      <Card className="bg-card/50 backdrop-blur-xl border-border shadow-2xl">
        <CardHeader>
          <div className="h-6 w-32 bg-muted/50 rounded animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-muted/30 rounded-lg animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error || !data) {
    return null
  }

  const formatNumber = (num: number) =>
    new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(num)

  return (
    <Card className="bg-card/50 backdrop-blur-xl border-border shadow-2xl">
      <CardHeader>
        <CardTitle className="flex items-center text-foreground">
          <TrendingUp className="w-5 h-5 mr-2 text-amber-500" />
          Market Trends
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {data.trends.map((trend) => (
            <motion.div
              key={trend.name}
              whileHover={{ scale: 1.02 }}
              className="p-4 bg-muted/30 rounded-lg backdrop-blur-sm border border-border/30"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{trend.name}</span>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {trend.change >= 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                </motion.div>
              </div>
              <div className="text-2xl font-bold">
                ${formatNumber(trend.value)}
              </div>
              <div
                className={`text-sm ${
                  trend.change >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {trend.change >= 0 ? "+" : ""}
                {trend.change}%
              </div>
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="p-4 bg-muted/30 rounded-lg backdrop-blur-sm border border-border/30">
            <div className="flex items-center mb-2">
              <DollarSign className="w-4 h-4 mr-2 text-amber-500" />
              <span className="text-sm text-muted-foreground">Market Cap</span>
            </div>
            <div className="text-xl font-bold">${formatNumber(data.totalMarketCap)}</div>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg backdrop-blur-sm border border-border/30">
            <div className="flex items-center mb-2">
              <DollarSign className="w-4 h-4 mr-2 text-amber-500" />
              <span className="text-sm text-muted-foreground">24h Volume</span>
            </div>
            <div className="text-xl font-bold">${formatNumber(data.totalVolume24h)}</div>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg backdrop-blur-sm border border-border/30">
            <div className="flex items-center mb-2">
              <Users className="w-4 h-4 mr-2 text-amber-500" />
              <span className="text-sm text-muted-foreground">Active Users</span>
            </div>
            <div className="text-xl font-bold">{formatNumber(data.activeUsers)}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 