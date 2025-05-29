"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Activity } from "lucide-react"
import { useCachedData } from "@/hooks/useCachedData"

interface VolumeData {
  daily: number[]
  weekly: number[]
  monthly: number[]
  total: number
  change: number
}

const mockVolumeData: VolumeData = {
  daily: Array.from({ length: 24 }, () => Math.random() * 100),
  weekly: Array.from({ length: 7 }, () => Math.random() * 1000),
  monthly: Array.from({ length: 30 }, () => Math.random() * 5000),
  total: 1.2e9,
  change: 12.5,
}

async function fetchVolumeData(): Promise<VolumeData> {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return mockVolumeData
}

export const TradingVolume = () => {
  const { data, isLoading, error } = useCachedData<VolumeData>(
    "trading-volume",
    fetchVolumeData,
    { ttl: 5 * 60 * 1000 }
  )

  if (isLoading) {
    return (
      <Card className="bg-card/50 backdrop-blur-xl border-border shadow-2xl">
        <CardHeader>
          <div className="h-6 w-32 bg-muted/50 rounded animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted/30 rounded-lg animate-pulse" />
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
          <BarChart className="w-5 h-5 mr-2 text-amber-500" />
          Trading Volume
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 relative overflow-hidden rounded-lg bg-gradient-to-br from-background/50 to-muted/50 border border-border/50">
          <svg className="w-full h-full" viewBox="0 0 400 200">
            <defs>
              <linearGradient id="volumeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(245, 158, 11)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="rgb(245, 158, 11)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {data.daily.map((value, i) => {
              const x = (i / (data.daily.length - 1)) * 400
              const height = (value / 100) * 200
              return (
                <motion.rect
                  key={i}
                  x={x - 5}
                  y={200 - height}
                  width="10"
                  height={height}
                  fill="rgb(245, 158, 11)"
                  initial={{ height: 0, y: 200 }}
                  animate={{ height, y: 200 - height }}
                  transition={{ duration: 1, delay: i * 0.02 }}
                />
              )
            })}
          </svg>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="p-4 bg-muted/30 rounded-lg backdrop-blur-sm border border-border/30">
            <div className="flex items-center mb-2">
              <Activity className="w-4 h-4 mr-2 text-amber-500" />
              <span className="text-sm text-muted-foreground">Total Volume</span>
            </div>
            <div className="text-2xl font-bold">${formatNumber(data.total)}</div>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg backdrop-blur-sm border border-border/30">
            <div className="flex items-center mb-2">
              <Activity className="w-4 h-4 mr-2 text-amber-500" />
              <span className="text-sm text-muted-foreground">24h Change</span>
            </div>
            <div className="text-2xl font-bold text-green-500">
              +{data.change}%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 