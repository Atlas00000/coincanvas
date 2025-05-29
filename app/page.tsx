"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { FloatingParticles } from "@/components/dashboard/FloatingParticles"
import { ThemeToggle } from "@/components/dashboard/ThemeToggle"
import { LiveTicker } from "@/components/dashboard/LiveTicker"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  Wallet,
  BarChart3,
  Zap,
  Shield,
  ArrowRight,
  Play,
  Sun,
  Moon,
  Monitor,
  Crown,
  Diamond,
  Sparkles,
  Globe,
  Activity,
  DollarSign,
  Bell,
  PieChart,
  LogIn,
  UserPlus,
  Target,
  Share,
} from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { AnimatePresence } from "framer-motion"

// Enhanced floating particles component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 1,
            height: Math.random() * 4 + 1,
            background: `linear-gradient(45deg, rgb(245, 158, 11), rgb(234, 179, 8))`,
          }}
          animate={{
            x: [0, Math.random() * 300 - 150],
            y: [0, Math.random() * -400 - 200],
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 10,
            ease: "easeInOut",
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  )
}

// Simplified theme toggle component
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const themes = [
    { value: "light", icon: Sun },
    { value: "dark", icon: Moon },
    { value: "system", icon: Monitor },
  ]

  const currentThemeIndex = themes.findIndex((t) => t.value === theme)
  const currentTheme = themes[currentThemeIndex] || themes[0]

  const cycleTheme = () => {
    const nextIndex = (currentThemeIndex + 1) % themes.length
    setTheme(themes[nextIndex].value)
  }

  return (
    <motion.button
      onClick={cycleTheme}
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.9 }}
      className="w-10 h-10 bg-background/80 backdrop-blur-xl border border-border rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <motion.div
        key={theme}
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 180, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <currentTheme.icon className="w-5 h-5 text-amber-500" />
      </motion.div>
    </motion.button>
  )
}

// Enhanced live ticker component
const LiveTicker = () => {
  const cryptos = [
    { symbol: "BTC", price: "$43,250.00", change: "+5.2%", positive: true },
    { symbol: "ETH", price: "$2,680.50", change: "+3.1%", positive: true },
    { symbol: "ADA", price: "$0.52", change: "-1.8%", positive: false },
    { symbol: "SOL", price: "$98.75", change: "+8.4%", positive: true },
    { symbol: "DOT", price: "$7.23", change: "+2.7%", positive: true },
    { symbol: "MATIC", price: "$0.89", change: "-0.5%", positive: false },
    { symbol: "AVAX", price: "$24.15", change: "+6.8%", positive: true },
    { symbol: "LINK", price: "$14.92", change: "+4.2%", positive: true },
  ]

  return (
    <div className="overflow-hidden bg-background/50 backdrop-blur-xl border-y border-border relative">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-yellow-500/10 to-amber-500/5" />
      <motion.div
        animate={{ x: [0, -100 * cryptos.length] }}
        transition={{ duration: 45, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="flex space-x-16 py-3 relative z-10"
      >
        {[...cryptos, ...cryptos, ...cryptos].map((crypto, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, y: -2 }}
            className="flex items-center space-x-3 whitespace-nowrap cursor-pointer group"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="w-2 h-2 bg-amber-500 rounded-full"
            />
            <span className="font-bold text-foreground group-hover:text-amber-500 transition-colors">
              {crypto.symbol}
            </span>
            <span className="text-muted-foreground">{crypto.price}</span>
            <motion.span
              whileHover={{ scale: 1.1 }}
              className={`font-medium ${crypto.positive ? "text-green-500" : "text-red-500"}`}
            >
              {crypto.change}
            </motion.span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

// Enhanced advanced chart widget
const AdvancedChart = () => {
  const [timeframe, setTimeframe] = useState("24H")
  const [isHovered, setIsHovered] = useState(false)
  const timeframes = ["1H", "24H", "7D", "30D", "1Y"]

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      <Card className="bg-card/50 backdrop-blur-xl border-border shadow-2xl overflow-hidden relative">
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-yellow-500/10"
        />
        <CardHeader className="pb-3 relative z-10">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-foreground">
              <motion.div animate={{ rotate: isHovered ? 360 : 0 }} transition={{ duration: 0.8, ease: "easeInOut" }}>
                <Crown className="w-5 h-5 mr-2 text-amber-500" />
              </motion.div>
              Premium Analytics
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Badge className="ml-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30">
                  LIVE
                </Badge>
              </motion.div>
            </CardTitle>
            <div className="flex space-x-1">
              {timeframes.map((tf) => (
                <motion.div key={tf} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
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
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="h-64 relative overflow-hidden rounded-lg bg-gradient-to-br from-background/50 to-muted/50 border border-border/50">
            <svg className="w-full h-full" viewBox="0 0 400 200">
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgb(245, 158, 11)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="rgb(245, 158, 11)" stopOpacity="0" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <motion.path
                d="M 0 150 Q 50 120 100 100 T 200 80 T 300 60 T 400 40"
                stroke="rgb(245, 158, 11)"
                strokeWidth="3"
                fill="none"
                filter="url(#glow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, ease: "easeInOut" }}
              />
              <motion.path
                d="M 0 150 Q 50 120 100 100 T 200 80 T 300 60 T 400 40 L 400 200 L 0 200 Z"
                fill="url(#chartGradient)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 1.5 }}
              />
            </svg>
            <motion.div
              animate={{
                x: [0, 350],
                y: [150, 40],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute w-4 h-4 bg-amber-500 rounded-full shadow-lg"
              style={{ filter: "drop-shadow(0 0 8px rgb(245, 158, 11))" }}
            />
          </div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 3 }}
            className="mt-4 grid grid-cols-3 gap-4 text-sm"
          >
            {[
              { label: "Current Price", value: "$43,250", color: "text-foreground" },
              { label: "24h Change", value: "+5.2%", color: "text-green-500" },
              { label: "Volume", value: "$2.1B", color: "text-foreground" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 3.2 + index * 0.2, type: "spring" }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-3 bg-muted/30 rounded-lg backdrop-blur-sm border border-border/30"
              >
                <div className={`text-2xl font-bold ${item.color}`}>{item.value}</div>
                <div className="text-muted-foreground">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Enhanced Premium Analytics Section
const PremiumAnalytics = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h")
  const [selectedMetric, setSelectedMetric] = useState("volume")

  const metrics = [
    { id: "volume", label: "Trading Volume", value: "$847.3M", change: "+24.7%", positive: true },
    { id: "trades", label: "Total Trades", value: "12,458", change: "+18.2%", positive: true },
    { id: "users", label: "Active Users", value: "8,923", change: "+12.5%", positive: true },
  ]

  return (
    <Card className="bg-card/50 backdrop-blur-xl border-border shadow-2xl overflow-hidden group relative">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-yellow-500/5"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <CardHeader className="relative z-10">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-foreground">
            <Activity className="w-5 h-5 mr-2 text-amber-500" />
            Premium Analytics
            <Badge className="ml-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30">
              LIVE
            </Badge>
          </CardTitle>
          <div className="flex space-x-2">
            {["24h", "7d", "30d"].map((t) => (
              <Button
                key={t}
                variant={selectedTimeframe === t ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTimeframe(t)}
              >
                {t}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 relative z-10">
        <div className="grid grid-cols-3 gap-4">
          {metrics.map((metric) => (
            <motion.div
              key={metric.id}
              whileHover={{ scale: 1.05 }}
              className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                selectedMetric === metric.id ? "bg-amber-500/10" : "bg-muted/50"
              }`}
              onClick={() => setSelectedMetric(metric.id)}
            >
              <div className="text-sm text-muted-foreground mb-1">{metric.label}</div>
              <div className="text-2xl font-bold text-foreground">{metric.value}</div>
              <div className={`text-sm ${metric.positive ? "text-green-400" : "text-red-400"}`}>
                {metric.change}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="h-64 bg-muted/30 rounded-lg p-4">
          <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
            <path
              d="M0 50 L10 45 L20 48 L30 40 L40 42 L50 35 L60 38 L70 32 L80 34 L90 30 L100 25"
              fill="none"
              stroke="rgb(245, 158, 11)"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-sm font-medium">Top Trading Pairs</div>
            {[
              { pair: "BTC/USDT", volume: "$245.2M", change: "+5.2%" },
              { pair: "ETH/USDT", volume: "$189.7M", change: "+3.8%" },
              { pair: "SOL/USDT", volume: "$98.4M", change: "+7.1%" },
            ].map((pair) => (
              <div key={pair.pair} className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">{pair.pair}</span>
                <div className="text-right">
                  <div className="font-medium">{pair.volume}</div>
                  <div className="text-green-400">{pair.change}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium">Market Distribution</div>
            <div className="h-24 relative">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="rgb(245, 158, 11)"
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset="62.8"
                  className="transform -rotate-90 origin-center"
                />
                <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" className="text-sm font-medium">
                  75%
                </text>
              </svg>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Enhanced Market Sentiment Section
const MarketSentiment = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h")
  const [showDetails, setShowDetails] = useState(false)

  const sentimentData = {
    overall: 65,
    fearGreedIndex: 72,
    socialMetrics: {
      twitter: { sentiment: 68, volume: 125000 },
      reddit: { sentiment: 62, volume: 45000 },
      telegram: { sentiment: 71, volume: 89000 },
    },
    marketMood: "Greed",
    trends: [
      { name: "DeFi", sentiment: 75, change: 5.2 },
      { name: "NFT", sentiment: 68, change: -2.1 },
      { name: "Layer 2", sentiment: 82, change: 8.4 },
    ],
  }

  return (
    <Card className="bg-card/50 backdrop-blur-xl border-border shadow-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-foreground">
            <Zap className="w-5 h-5 mr-2 text-amber-500" />
            Market Sentiment
            <Badge className="ml-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30">
              LIVE
            </Badge>
          </CardTitle>
          <div className="flex space-x-2">
            {["24h", "7d", "30d"].map((t) => (
              <Button
                key={t}
                variant={selectedTimeframe === t ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTimeframe(t)}
              >
                {t}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="relative h-48">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-muted"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="url(#sentimentGradient)"
                  strokeWidth="8"
                  strokeDasharray={`${sentimentData.overall * 2.51} 251.2`}
                  className="transform -rotate-90 origin-center"
                />
                <defs>
                  <linearGradient id="sentimentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#84cc16" />
                  </linearGradient>
                </defs>
                <text
                  x="50"
                  y="50"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-2xl font-bold fill-foreground"
                >
                  {sentimentData.overall}%
                </text>
              </svg>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Fear & Greed Index</span>
                <span className="text-sm font-medium">{sentimentData.fearGreedIndex}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                  style={{ width: `${sentimentData.fearGreedIndex}%` }}
                />
              </div>
              <div className="text-center text-sm font-medium">{sentimentData.marketMood}</div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(sentimentData.socialMetrics).map(([platform, data]) => (
                <motion.div
                  key={platform}
                  whileHover={{ scale: 1.05 }}
                  className="p-4 bg-muted/30 rounded-lg text-center"
                >
                  <div className="text-sm text-muted-foreground capitalize mb-1">{platform}</div>
                  <div className="text-xl font-bold">{data.sentiment}%</div>
                  <div className="text-xs text-muted-foreground">
                    {data.volume.toLocaleString()} mentions
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium">Trending Topics</div>
              {sentimentData.trends.map((trend, index) => (
                <motion.div
                  key={trend.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                >
                  <span className="font-medium">{trend.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">{trend.sentiment}%</span>
                    <span
                      className={`text-sm ${
                        trend.change >= 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {trend.change >= 0 ? "+" : ""}
                      {trend.change}%
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Enhanced Elite Signals Section
const EliteSignals = () => {
  const [selectedSignal, setSelectedSignal] = useState<string | null>(null)
  const [timeframe, setTimeframe] = useState("24h")

  const signals = [
    {
      id: "btc-breakout",
      asset: "BTC",
      type: "bullish",
      confidence: 85,
      entry: 48500,
      target: 52000,
      stopLoss: 47000,
      timeframe: "4h",
      description: "Strong breakout pattern with increasing volume",
    },
    {
      id: "eth-accumulation",
      asset: "ETH",
      type: "bullish",
      confidence: 78,
      entry: 2850,
      target: 3200,
      stopLoss: 2750,
      timeframe: "1d",
      description: "Accumulation phase with institutional buying",
    },
    {
      id: "sol-correction",
      asset: "SOL",
      type: "bearish",
      confidence: 65,
      entry: 95,
      target: 85,
      stopLoss: 100,
      timeframe: "12h",
      description: "Potential correction after strong rally",
    },
  ]

  return (
    <Card className="bg-card/50 backdrop-blur-xl border-border shadow-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-foreground">
            <Target className="w-5 h-5 mr-2 text-amber-500" />
            Elite Signals
            <Badge className="ml-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30">
              LIVE
            </Badge>
          </CardTitle>
          <div className="flex space-x-2">
            {["24h", "7d", "30d"].map((t) => (
              <Button
                key={t}
                variant={timeframe === t ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeframe(t)}
              >
                {t}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {signals.map((signal) => (
            <motion.div
              key={signal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className={`p-4 bg-muted/30 rounded-lg cursor-pointer transition-all duration-300 ${
                selectedSignal === signal.id ? "ring-2 ring-amber-500" : ""
              }`}
              onClick={() => setSelectedSignal(selectedSignal === signal.id ? null : signal.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center">
                    <span className="text-white font-bold">{signal.asset}</span>
                  </div>
                  <div>
                    <div className="font-semibold">{signal.asset}</div>
                    <div className="text-sm text-muted-foreground">{signal.timeframe}</div>
                  </div>
                </div>
                <Badge
                  className={
                    signal.type === "bullish"
                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                      : "bg-red-500/20 text-red-400 border-red-500/30"
                  }
                >
                  {signal.type}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-2">
                <div>
                  <div className="text-sm text-muted-foreground">Entry</div>
                  <div className="font-medium">${signal.entry.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Target</div>
                  <div className="font-medium">${signal.target.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Stop Loss</div>
                  <div className="font-medium">${signal.stopLoss.toLocaleString()}</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">{signal.description}</div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Confidence</span>
                  <Badge variant="outline">{signal.confidence}%</Badge>
                </div>
              </div>

              <AnimatePresence>
                {selectedSignal === signal.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-border"
                  >
                    <div className="h-32 bg-muted/30 rounded-lg p-4">
                      <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                        <path
                          d="M0 50 L10 45 L20 48 L30 40 L40 42 L50 35 L60 38 L70 32 L80 34 L90 30 L100 25"
                          fill="none"
                          stroke={signal.type === "bullish" ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                    <div className="flex items-center space-x-4 mt-4">
                      <Button size="sm" variant="outline">
                        <Bell className="w-4 h-4 mr-2" />
                        Set Alert
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Enhanced Global Markets Section
const GlobalMarkets = () => {
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null)
  const [timeframe, setTimeframe] = useState("24h")

  const markets = [
    {
      name: "DeFi",
      value: "$89.2B",
      change: "+12.4%",
      positive: true,
      volume: "$15.7B",
      dominance: 4.2,
      topProjects: [
        { name: "Uniswap", value: "$12.3B", change: "+8.5%" },
        { name: "Aave", value: "$8.9B", change: "+5.2%" },
        { name: "Curve", value: "$6.7B", change: "+3.8%" },
      ],
    },
    {
      name: "NFTs",
      value: "$15.7B",
      change: "+8.9%",
      positive: true,
      volume: "$2.3B",
      dominance: 0.8,
      topProjects: [
        { name: "Bored Ape", value: "$1.2B", change: "+12.3%" },
        { name: "CryptoPunks", value: "$0.9B", change: "+7.8%" },
        { name: "Art Blocks", value: "$0.7B", change: "+5.4%" },
      ],
    },
    {
      name: "Gaming",
      value: "$12.1B",
      change: "-2.1%",
      positive: false,
      volume: "$1.8B",
      dominance: 0.6,
      topProjects: [
        { name: "Axie Infinity", value: "$3.2B", change: "-5.6%" },
        { name: "The Sandbox", value: "$2.8B", change: "+2.3%" },
        { name: "Decentraland", value: "$1.9B", change: "+1.8%" },
      ],
    },
  ]

  return (
    <Card className="bg-card/50 backdrop-blur-xl border-border shadow-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-foreground">
            <Globe className="w-5 h-5 mr-2 text-amber-500" />
            Global Markets
            <Badge className="ml-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30">
              LIVE
            </Badge>
          </CardTitle>
          <div className="flex space-x-2">
            {["24h", "7d", "30d"].map((t) => (
              <Button
                key={t}
                variant={timeframe === t ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeframe(t)}
              >
                {t}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="text-center p-4 bg-muted/50 rounded-lg border border-border/30"
          >
            <div className="text-2xl font-bold text-green-400">$2.1T</div>
            <div className="text-sm text-muted-foreground">Total Market Cap</div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, rotate: -1 }}
            className="text-center p-4 bg-muted/50 rounded-lg border border-border/30"
          >
            <div className="text-2xl font-bold text-foreground">47.2%</div>
            <div className="text-sm text-muted-foreground">BTC Dominance</div>
          </motion.div>
        </div>

        <div className="space-y-4">
          {markets.map((market) => (
            <motion.div
              key={market.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className={`p-4 bg-muted/30 rounded-lg cursor-pointer transition-all duration-300 ${
                selectedMarket === market.name ? "ring-2 ring-amber-500" : ""
              }`}
              onClick={() => setSelectedMarket(selectedMarket === market.name ? null : market.name)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold">{market.name}</div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-medium">{market.value}</div>
                    <div
                      className={`text-sm ${
                        market.positive ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {market.change}
                    </div>
                  </div>
                  <Badge variant="outline">{market.dominance}%</Badge>
                </div>
              </div>

              <AnimatePresence>
                {selectedMarket === market.name && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-border"
                  >
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">24h Volume</div>
                        <div className="text-lg font-medium">{market.volume}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Market Dominance</div>
                        <div className="text-lg font-medium">{market.dominance}%</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium">Top Projects</div>
                      {market.topProjects.map((project) => (
                        <div
                          key={project.name}
                          className="flex items-center justify-between p-2 bg-muted/20 rounded-lg"
                        >
                          <span className="text-sm text-muted-foreground">{project.name}</span>
                          <div className="text-right">
                            <div className="text-sm font-medium">{project.value}</div>
                            <div
                              className={`text-xs ${
                                project.change.startsWith("+")
                                  ? "text-green-400"
                                  : "text-red-400"
                              }`}
                            >
                              {project.change}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="h-32 mt-4">
                      <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                        <path
                          d="M0 50 L10 45 L20 48 L30 40 L40 42 L50 35 L60 38 L70 32 L80 34 L90 30 L100 25"
                          fill="none"
                          stroke={market.positive ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 text-foreground overflow-hidden relative">
      <FloatingParticles />
      <LiveTicker />

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-yellow-500/5 blur-3xl"
        />

        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <Badge className="mb-6 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Sparkles className="w-3 h-3 mr-1" />
              </motion.div>
              Elite Trading Platform
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <motion.span
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: "100% 50%" }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
              className="bg-gradient-to-r from-foreground via-muted-foreground to-foreground bg-clip-text text-transparent bg-[length:200%_100%]"
            >
              Luxury Crypto
            </motion.span>
            <br />
            <motion.span
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: "100% 50%" }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 1.5 }}
              className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 bg-clip-text text-transparent bg-[length:200%_100%]"
            >
              Trading Suite
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Experience institutional-grade cryptocurrency trading with our premium platform. Advanced analytics,
            real-time insights, and elite-level portfolio management.
          </motion.p>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/analytics">
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="group">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-8 py-3 text-lg shadow-2xl relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                  <Crown className="mr-2 w-5 h-5 relative z-10" />
                  <span className="relative z-10">Start Elite Trading</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <ArrowRight className="ml-2 w-5 h-5 relative z-10" />
                  </motion.div>
                </Button>
              </motion.div>
            </Link>

            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-muted px-8 py-3 text-lg group backdrop-blur-xl relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <Play className="mr-2 w-5 h-5 relative z-10" />
                <span className="relative z-10">Watch Demo</span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { label: "Assets Under Management", value: "$2.4B+", icon: DollarSign },
              { label: "Elite Members", value: "50K+", icon: Crown },
              { label: "Trading Volume", value: "$180M", icon: BarChart3 },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05, y: -8 }}
                className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur-xl border border-border shadow-xl group cursor-pointer"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1.2 + index * 0.1, type: "spring", bounce: 0.5 }}
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  className="relative"
                >
                  <stat.icon className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                  <motion.div
                    className="absolute inset-0 bg-amber-500/20 rounded-full blur-lg"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.4 + index * 0.1 }}
                  className="text-3xl font-bold text-foreground mb-2"
                >
                  {stat.value}
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.6 + index * 0.1 }}
                  className="text-muted-foreground"
                >
                  {stat.label}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Advanced Widgets Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-foreground">Elite Trading Dashboard</h2>
            <p className="text-muted-foreground text-lg">Professional-grade tools for sophisticated investors</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <PremiumAnalytics />
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <MarketSentiment />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <EliteSignals />
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <GlobalMarkets />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Elite Portfolio Preview */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Link href="/portfolio">
                <Card className="bg-card/50 backdrop-blur-xl border-border shadow-2xl cursor-pointer group overflow-hidden relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <CardHeader className="relative z-10">
                    <CardTitle className="flex items-center text-foreground">
                      <Wallet className="w-5 h-5 mr-2 text-amber-500" />
                      Elite Portfolio
                      <motion.div
                        initial={{ x: 0, opacity: 0 }}
                        whileHover={{ x: 5, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="w-4 h-4 ml-auto" />
                      </motion.div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 relative z-10">
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
                        className="text-3xl font-bold text-foreground mb-2"
                      >
                        $847,320.45
                      </motion.div>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        +24.7%
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      {[
                        { name: "BTC", amount: "12.5", value: "$540,125.00", change: "+5.2%", positive: true },
                        { name: "ETH", amount: "85.3", value: "$228,604.00", change: "+3.1%", positive: true },
                        { name: "SOL", amount: "789.2", value: "$77,891.45", change: "+8.4%", positive: true },
                      ].map((coin, index) => (
                        <motion.div
                          key={coin.name}
                          initial={{ x: -20, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                          whileHover={{ x: 8, scale: 1.02 }}
                          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg backdrop-blur-sm border border-border/30"
                        >
                          <div>
                            <div className="font-semibold text-foreground">{coin.name}</div>
                            <div className="text-sm text-muted-foreground">{coin.amount}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-foreground">{coin.value}</div>
                            <div className={`text-sm ${coin.positive ? "text-green-400" : "text-red-400"}`}>
                              {coin.change}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            {/* Trading Signals */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Card className="bg-card/50 backdrop-blur-xl border-border shadow-2xl overflow-hidden group relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-amber-500/5"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center text-foreground">
                    <Bell className="w-5 h-5 mr-2 text-amber-500" />
                    Elite Signals
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <Badge className="ml-2 bg-amber-500/20 text-amber-400 border-amber-500/30">AI</Badge>
                    </motion.div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 relative z-10">
                  {[
                    { asset: "BTC/USD", signal: "STRONG BUY", confidence: 95, color: "green" },
                    { asset: "ETH/USD", signal: "BUY", confidence: 78, color: "green" },
                    { asset: "ADA/USD", signal: "HOLD", confidence: 65, color: "yellow" },
                  ].map((signal, index) => (
                    <motion.div
                      key={signal.asset}
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.05, x: 5 }}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg cursor-pointer border border-border/30"
                    >
                      <div>
                        <div className="font-semibold text-foreground">{signal.asset}</div>
                        <div
                          className={`text-sm font-medium ${
                            signal.color === "green"
                              ? "text-green-400"
                              : signal.color === "yellow"
                                ? "text-yellow-400"
                                : "text-red-400"
                          }`}
                        >
                          {signal.signal}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Confidence</div>
                        <div className="font-bold text-foreground">{signal.confidence}%</div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Market Overview */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Card className="bg-card/50 backdrop-blur-xl border-border shadow-2xl overflow-hidden group relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center text-foreground">
                    <Globe className="w-5 h-5 mr-2 text-amber-500" />
                    Global Markets
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 relative z-10">
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: 1 }}
                      className="text-center p-3 bg-muted/50 rounded-lg border border-border/30"
                    >
                      <div className="text-lg font-bold text-green-400">$2.1T</div>
                      <div className="text-xs text-muted-foreground">Market Cap</div>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: -1 }}
                      className="text-center p-3 bg-muted/50 rounded-lg border border-border/30"
                    >
                      <div className="text-lg font-bold text-foreground">47.2%</div>
                      <div className="text-xs text-muted-foreground">BTC Dominance</div>
                    </motion.div>
                  </div>

                  <div className="space-y-2">
                    {[
                      { market: "DeFi", value: "$89.2B", change: "+12.4%", positive: true },
                      { market: "NFTs", value: "$15.7B", change: "+8.9%", positive: true },
                      { market: "Gaming", value: "$12.1B", change: "-2.1%", positive: false },
                    ].map((market, index) => (
                      <motion.div
                        key={market.market}
                        initial={{ x: -10, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        whileHover={{ x: 8, scale: 1.02 }}
                        className="flex justify-between items-center p-2 bg-muted/20 rounded-lg cursor-pointer border border-border/20"
                      >
                        <span className="text-muted-foreground">{market.market}</span>
                        <div className="text-right">
                          <div className="font-semibold text-foreground">{market.value}</div>
                          <div className={`text-xs ${market.positive ? "text-green-400" : "text-red-400"}`}>
                            {market.change}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-muted/20 to-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-foreground">Elite Features</h2>
            <p className="text-muted-foreground text-lg">Institutional-grade tools for the sophisticated trader</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Lightning Execution",
                description:
                  "Sub-millisecond order execution with institutional-grade infrastructure and direct market access.",
                delay: 0.1,
                premium: true,
              },
              {
                icon: Shield,
                title: "Bank-Grade Security",
                description:
                  "Multi-signature cold storage, insurance coverage, and military-grade encryption protocols.",
                delay: 0.2,
                premium: true,
              },
              {
                icon: Crown,
                title: "Concierge Support",
                description: "24/7 dedicated account managers and priority support for elite members only.",
                delay: 0.3,
                premium: true,
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: feature.delay }}
                viewport={{ once: true }}
                whileHover={{ y: -12, scale: 1.05 }}
                className="text-center group relative"
              >
                <Card className="p-8 bg-card/50 backdrop-blur-xl border-border shadow-2xl h-full overflow-hidden relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-yellow-500/5"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.8 }}
                    className="w-16 h-16 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-2xl group-hover:shadow-amber-500/25 relative z-10"
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                    <motion.div
                      className="absolute inset-0 bg-white/20 rounded-2xl"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-4 text-foreground flex items-center justify-center relative z-10">
                    {feature.title}
                    {feature.premium && (
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <Crown className="w-4 h-4 text-amber-500 ml-2" />
                      </motion.div>
                    )}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed relative z-10">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Elite CTA Section */}
      <section className="py-20 px-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="container mx-auto text-center"
        >
          <Card className="bg-gradient-to-r from-card/50 to-muted/50 border-border backdrop-blur-xl p-12 shadow-2xl relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-yellow-500/5"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            />
            <CardContent className="relative z-10">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
                whileHover={{ scale: 1.1, rotate: 15 }}
              >
                <Crown className="w-16 h-16 text-amber-500 mx-auto mb-6" />
              </motion.div>
              <h2 className="text-4xl font-bold mb-4 text-foreground">Join the Elite</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Experience cryptocurrency trading at the highest level. Exclusive access, premium features, and
                institutional-grade tools await.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} className="group">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-12 py-4 text-lg shadow-2xl relative overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                      <Diamond className="mr-2 w-5 h-5 relative z-10" />
                      <span className="relative z-10">Become Elite Member</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <ArrowRight className="ml-2 w-5 h-5 relative z-10" />
                      </motion.div>
                    </Button>
                  </motion.div>
                </Link>
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-border text-foreground hover:bg-muted px-12 py-4 text-lg backdrop-blur-xl relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative z-10">Schedule Consultation</span>
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border bg-muted/20">
        <div className="container mx-auto text-center text-muted-foreground">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center justify-center space-x-2 mb-4">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="w-6 h-6 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-lg flex items-center justify-center"
            >
              <Diamond className="w-4 h-4 text-white" />
            </motion.div>
            <span className="font-bold text-foreground">CoinCanvas</span>
          </motion.div>
          <p>&copy; 2024 CoinCanvas. Crafted for the sophisticated investor.</p>
        </div>
      </footer>
    </div>
  )
}
