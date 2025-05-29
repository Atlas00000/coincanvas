"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Crown,
  Diamond,
  Activity,
  DollarSign,
  Globe,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Bell,
  Filter,
  Search,
  Calendar,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"
import { AdvancedChart } from "@/components/dashboard/AdvancedChart"
import { MarketTrends } from "@/components/dashboard/MarketTrends"
import { TradingVolume } from "@/components/dashboard/TradingVolume"
import { TechnicalIndicators } from "@/components/dashboard/TechnicalIndicators"
import { OrderBook } from "@/components/dashboard/OrderBook"
import { MarketSentiment } from "@/components/dashboard/MarketSentiment"
import { MarketSectors } from "@/components/dashboard/MarketSectors"

// Mock data for analytics
const mockData = {
  marketOverview: {
    totalMarketCap: "$2.14T",
    totalVolume: "$89.2B",
    btcDominance: "47.2%",
    ethDominance: "18.9%",
    fearGreedIndex: 72,
    activeCoins: "2,847",
  },
  topPerformers: [
    { symbol: "SOL", name: "Solana", price: "$98.75", change: "+18.4%", volume: "$2.1B", positive: true },
    { symbol: "AVAX", name: "Avalanche", price: "$24.15", change: "+15.2%", volume: "$890M", positive: true },
    { symbol: "MATIC", name: "Polygon", price: "$0.89", change: "+12.8%", volume: "$456M", positive: true },
    { symbol: "DOT", name: "Polkadot", price: "$7.23", change: "+11.5%", volume: "$234M", positive: true },
  ],
  topLosers: [
    { symbol: "ADA", name: "Cardano", price: "$0.52", change: "-8.2%", volume: "$123M", positive: false },
    { symbol: "XRP", name: "Ripple", price: "$0.61", change: "-5.7%", volume: "$567M", positive: false },
    { symbol: "DOGE", name: "Dogecoin", price: "$0.08", change: "-4.3%", volume: "$234M", positive: false },
  ],
  sectors: [
    { name: "DeFi", value: "$89.2B", change: "+12.4%", positive: true },
    { name: "Layer 1", value: "$456.7B", change: "+8.9%", positive: true },
    { name: "NFTs", value: "$15.7B", change: "+6.2%", positive: true },
    { name: "Gaming", value: "$12.1B", change: "-2.1%", positive: false },
    { name: "Metaverse", value: "$8.9B", change: "-1.5%", positive: false },
  ],
  news: [
    {
      title: "Bitcoin ETF Sees Record Inflows",
      summary: "Institutional adoption continues to drive market sentiment...",
      time: "2 hours ago",
      impact: "bullish",
    },
    {
      title: "Ethereum 2.0 Staking Reaches New Milestone",
      summary: "Over 32 million ETH now staked in the network...",
      time: "4 hours ago",
      impact: "bullish",
    },
    {
      title: "Regulatory Clarity Expected in Q2",
      summary: "Major jurisdictions moving towards comprehensive frameworks...",
      time: "6 hours ago",
      impact: "neutral",
    },
  ],
}

// Advanced chart component
const AdvancedTradingChart = () => {
  const [timeframe, setTimeframe] = useState("1D")
  const [chartType, setChartType] = useState("candlestick")
  const timeframes = ["1H", "4H", "1D", "1W", "1M"]
  const chartTypes = ["line", "candlestick", "volume"]

  return (
    <Card className="bg-card/50 backdrop-blur-xl border-border shadow-2xl">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-foreground">
            <Crown className="w-5 h-5 mr-2 text-amber-500" />
            Advanced Trading Chart
            <Badge className="ml-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30">
              REAL-TIME
            </Badge>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              {timeframes.map((tf) => (
                <Button
                  key={tf}
                  variant={timeframe === tf ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setTimeframe(tf)}
                  className={
                    timeframe === tf
                      ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-white"
                      : "hover:bg-amber-500/10"
                  }
                >
                  {tf}
                </Button>
              ))}
            </div>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-96 relative overflow-hidden rounded-lg bg-gradient-to-br from-background/50 to-muted/50 border border-border/50">
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

            {/* Candlestick chart simulation */}
            {[...Array(20)].map((_, i) => {
              const x = i * 40 + 20
              const high = 100 + Math.random() * 200
              const low = high - Math.random() * 100
              const open = low + Math.random() * (high - low)
              const close = low + Math.random() * (high - low)
              const isGreen = close > open

              return (
                <g key={i}>
                  {/* Wick */}
                  <line
                    x1={x}
                    y1={high}
                    x2={x}
                    y2={low}
                    stroke={isGreen ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
                    strokeWidth="1"
                  />
                  {/* Body */}
                  <rect
                    x={x - 8}
                    y={Math.min(open, close)}
                    width="16"
                    height={Math.abs(close - open)}
                    fill={isGreen ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
                    opacity="0.8"
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
          <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm rounded-lg p-3 border border-border">
            <div className="text-2xl font-bold text-foreground">$43,250.00</div>
            <div className="text-green-500 text-sm font-medium">+$1,234.56 (+2.94%)</div>
          </div>

          {/* Volume indicator */}
          <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm rounded-lg p-3 border border-border">
            <div className="text-sm text-muted-foreground">24h Volume</div>
            <div className="text-lg font-bold text-foreground">$2.1B</div>
          </div>
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
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-1" />
              Indicators
            </Button>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-1" />
              Watchlist
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Market heatmap component
const MarketHeatmap = () => {
  const heatmapData = [
    { symbol: "BTC", change: 5.2, size: "large" },
    { symbol: "ETH", change: 3.1, size: "large" },
    { symbol: "SOL", change: 18.4, size: "medium" },
    { symbol: "ADA", change: -8.2, size: "medium" },
    { symbol: "AVAX", change: 15.2, size: "medium" },
    { symbol: "DOT", change: 11.5, size: "small" },
    { symbol: "MATIC", change: 12.8, size: "small" },
    { symbol: "LINK", change: 4.2, size: "small" },
    { symbol: "UNI", change: -2.1, size: "small" },
    { symbol: "ATOM", change: 7.8, size: "small" },
    { symbol: "FTM", change: -1.5, size: "small" },
    { symbol: "ALGO", change: 9.3, size: "small" },
  ]

  return (
    <Card className="bg-card/50 backdrop-blur-xl border-border shadow-2xl">
      <CardHeader>
        <CardTitle className="flex items-center text-foreground">
          <Activity className="w-5 h-5 mr-2 text-amber-500" />
          Market Heatmap
          <Badge className="ml-2 bg-blue-500/20 text-blue-400 border-blue-500/30">LIVE</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-2 h-64">
          {heatmapData.map((item, index) => {
            const isPositive = item.change > 0
            const intensity = Math.abs(item.change) / 20
            const size = item.size === "large" ? "col-span-2 row-span-2" : item.size === "medium" ? "col-span-2" : ""

            return (
              <motion.div
                key={item.symbol}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                className={`${size} rounded-lg flex flex-col items-center justify-center text-white font-bold cursor-pointer relative overflow-hidden`}
                style={{
                  backgroundColor: isPositive
                    ? `rgba(34, 197, 94, ${0.3 + intensity * 0.7})`
                    : `rgba(239, 68, 68, ${0.3 + intensity * 0.7})`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <div className="text-lg font-bold">{item.symbol}</div>
                <div className="text-sm">
                  {isPositive ? "+" : ""}
                  {item.change.toFixed(1)}%
                </div>
              </motion.div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default function AnalyticsPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="container mx-auto p-4 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
          Market Analytics
        </h1>
        <p className="text-muted-foreground mt-2">
          Real-time market data and trading insights
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <AdvancedChart />
        </motion.div>

        {/* Market Overview */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <MarketTrends />
        </motion.div>

        {/* Technical Indicators */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <TechnicalIndicators />
        </motion.div>

        {/* Market Sectors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="lg:col-span-2"
        >
          <MarketSectors />
        </motion.div>

        {/* Market Sentiment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="lg:col-span-2"
        >
          <MarketSentiment />
        </motion.div>

        {/* Trading Volume */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="lg:col-span-2"
        >
          <TradingVolume />
        </motion.div>

        {/* Order Book */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="lg:col-span-2"
        >
          <OrderBook />
        </motion.div>
      </div>
    </div>
  )
}
