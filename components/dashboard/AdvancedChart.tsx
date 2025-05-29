"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Crown,
  TrendingUp,
  TrendingDown,
  LineChart,
  BarChart3,
  Activity,
  Settings,
  Eye,
  Bell,
  Filter,
  Search,
  Calendar,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Info,
  AlertCircle,
} from "lucide-react"
import { useCachedData } from "@/hooks/useCachedData"

interface ChartData {
  price: number
  change: number
  volume: number
  high: number
  low: number
  data: Array<{
    timestamp: number
    open: number
    high: number
    low: number
    close: number
    volume: number
  }>
}

const mockChartData: ChartData = {
  price: 43250.75,
  change: 2.94,
  volume: 2.1e9,
  high: 43500,
  low: 42800,
  data: Array.from({ length: 100 }, (_, i) => ({
    timestamp: Date.now() - (100 - i) * 3600000,
    open: 43000 + Math.random() * 1000 - 500,
    high: 43500 + Math.random() * 500,
    low: 42500 + Math.random() * 500,
    close: 43000 + Math.random() * 1000 - 500,
    volume: 1e8 + Math.random() * 1e8,
  })),
}

async function fetchChartData(): Promise<ChartData> {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return mockChartData
}

export const AdvancedChart = () => {
  const [timeframe, setTimeframe] = useState("1D")
  const [chartType, setChartType] = useState("candlestick")
  const [isExpanded, setIsExpanded] = useState(false)
  const [showIndicators, setShowIndicators] = useState(false)
  const [selectedIndicator, setSelectedIndicator] = useState<string | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  const { data, isLoading, error } = useCachedData<ChartData>(
    "chart-data",
    fetchChartData,
    { ttl: 5 * 60 * 1000 }
  )

  const timeframes = ["1H", "4H", "1D", "1W", "1M"]
  const chartTypes = ["line", "candlestick", "volume"]
  const indicators = ["MA", "EMA", "RSI", "MACD", "Bollinger Bands"]

  if (isLoading) {
    return (
      <Card className="bg-card/50 backdrop-blur-xl border-border shadow-2xl">
        <CardHeader>
          <div className="h-6 w-32 bg-muted/50 rounded animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-muted/30 rounded-lg animate-pulse" />
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
    <motion.div
      initial={false}
      animate={{ height: isExpanded ? "auto" : "auto" }}
      className="relative"
    >
      <Card className="bg-card/50 backdrop-blur-xl border-border shadow-2xl overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-foreground">
              <motion.div
                animate={{ rotate: isHovered ? 360 : 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <Crown className="w-5 h-5 mr-2 text-amber-500" />
              </motion.div>
              Advanced Trading Chart
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Badge className="ml-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30">
                  REAL-TIME
                </Badge>
              </motion.div>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {timeframes.map((tf) => (
                  <motion.div key={tf} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant={timeframe === tf ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setTimeframe(tf)}
                      className={
                        timeframe === tf
                          ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-lg"
                          : "hover:bg-amber-500/10 hover:text-amber-500"
                      }
                    >
                      {tf}
                    </Button>
                  </motion.div>
                ))}
              </div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="outline" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </motion.div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div
            className="h-96 relative overflow-hidden rounded-lg bg-gradient-to-br from-background/50 to-muted/50 border border-border/50"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <svg className="w-full h-full" viewBox="0 0 800 400">
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgb(245, 158, 11)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="rgb(245, 158, 11)" stopOpacity="0" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Grid lines */}
              {[...Array(10)].map((_, i) => (
                <line
                  key={i}
                  x1="0"
                  y1={i * 40}
                  x2="800"
                  y2={i * 40}
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-muted opacity-20"
                />
              ))}
              {[...Array(20)].map((_, i) => (
                <line
                  key={i}
                  x1={i * 40}
                  y1="0"
                  x2={i * 40}
                  y2="400"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-muted opacity-20"
                />
              ))}

              {/* Candlestick chart */}
              {data.data.map((candle, i) => {
                const x = (i / (data.data.length - 1)) * 800
                const isGreen = candle.close > candle.open
                const height = Math.abs(candle.close - candle.open)
                const y = Math.min(candle.open, candle.close)

                return (
                  <g key={i}>
                    {/* Wick */}
                    <motion.line
                      x1={x}
                      y1={candle.high}
                      x2={x}
                      y2={candle.low}
                      stroke={isGreen ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
                      strokeWidth="1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: i * 0.02 }}
                    />
                    {/* Body */}
                    <motion.rect
                      x={x - 4}
                      y={y}
                      width="8"
                      height={height}
                      fill={isGreen ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
                      opacity="0.8"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.5, delay: i * 0.02 }}
                    />
                  </g>
                )
              })}

              {/* Moving average line */}
              <motion.path
                d="M 20 200 Q 100 180 200 160 T 400 140 T 600 120 T 800 100"
                stroke="rgb(245, 158, 11)"
                strokeWidth="2"
                fill="none"
                filter="url(#glow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </svg>

            {/* Price indicator */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm rounded-lg p-3 border border-border"
            >
              <div className="text-2xl font-bold text-foreground">
                ${formatNumber(data.price)}
              </div>
              <div className={`text-sm font-medium ${data.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                {data.change >= 0 ? "+" : ""}
                {data.change}%
              </div>
            </motion.div>

            {/* Volume indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm rounded-lg p-3 border border-border"
            >
              <div className="text-sm text-muted-foreground">24h Volume</div>
              <div className="text-lg font-bold text-foreground">
                ${formatNumber(data.volume)}
              </div>
            </motion.div>
          </div>

          {/* Chart controls */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span className="text-sm text-muted-foreground">MA(20)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-muted-foreground">Bullish</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-muted-foreground">Bearish</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowIndicators(!showIndicators)}
                >
                  <Filter className="w-4 h-4 mr-1" />
                  Indicators
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-1" />
                  Watchlist
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Indicators panel */}
          <AnimatePresence>
            {showIndicators && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 overflow-hidden"
              >
                <div className="grid grid-cols-5 gap-2">
                  {indicators.map((indicator) => (
                    <motion.div
                      key={indicator}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant={selectedIndicator === indicator ? "default" : "outline"}
                        size="sm"
                        className="w-full"
                        onClick={() => setSelectedIndicator(indicator === selectedIndicator ? null : indicator)}
                      >
                        {indicator}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  )
} 