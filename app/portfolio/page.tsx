"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  History,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Minus,
  RefreshCw,
  Filter,
  Download,
  Eye,
  EyeOff,
  Diamond,
  Wallet,
  Target,
  Shield,
  Star,
  BarChart3,
  Settings,
  Crown,
  Home,
  Activity,
} from "lucide-react"
import Link from "next/link"

// Utility functions for formatting
const formatNumber = (num: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num)

const formatPercentage = (num: number) =>
  new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: "always",
  }).format(num / 100)

// Mock data for portfolio
const mockPortfolio = {
  totalValue: 256789.45,
  totalChange: 12.34,
  assets: [
    {
      name: "Bitcoin",
      symbol: "BTC",
      value: 125000.00,
      amount: 2.5,
      change: 15.67,
      allocation: 48.7,
      price: 50000.00,
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      value: 75000.00,
      amount: 25,
      change: 8.92,
      allocation: 29.2,
      price: 3000.00,
    },
    {
      name: "Solana",
      symbol: "SOL",
      value: 35000.00,
      amount: 350,
      change: -2.45,
      allocation: 13.6,
      price: 100.00,
    },
    {
      name: "Cardano",
      symbol: "ADA",
      value: 21789.45,
      amount: 50000,
      change: 5.78,
      allocation: 8.5,
      price: 0.435,
    },
  ],
  recentTransactions: [
    {
      type: "buy",
      asset: "BTC",
      amount: 0.5,
      price: 43250.00,
      total: 21625.00,
      date: "2024-03-15T10:30:00Z",
    },
    {
      type: "sell",
      asset: "ETH",
      amount: 5,
      price: 2850.00,
      total: 14250.00,
      date: "2024-03-14T15:45:00Z",
    },
    {
      type: "buy",
      asset: "SOL",
      amount: 100,
      price: 95.00,
      total: 9500.00,
      date: "2024-03-13T09:15:00Z",
    },
  ],
}

// Portfolio allocation chart
const AllocationChart = () => {
  const data = mockPortfolio.assets
  const [hoveredAsset, setHoveredAsset] = useState<string | null>(null)
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null)

  return (
    <Card className="bg-card/50 backdrop-blur-xl border-border shadow-2xl">
      <CardHeader>
        <CardTitle className="flex items-center text-foreground">
          <PieChart className="w-5 h-5 mr-2 text-amber-500" />
          Asset Allocation
          <Badge className="ml-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30">
            LIVE
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-72 h-72 mx-auto mb-6">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <defs>
              {data.map((item, index) => (
                <linearGradient key={item.symbol} id={`gradient-${item.symbol}`}>
                  <stop
                    offset="0%"
                    stopColor={
                      index === 0
                        ? "rgb(245, 158, 11)"
                        : index === 1
                          ? "rgb(59, 130, 246)"
                          : index === 2
                            ? "rgb(139, 92, 246)"
                            : "rgb(34, 197, 94)"
                    }
                  />
                  <stop
                    offset="100%"
                    stopColor={
                      index === 0
                        ? "rgb(234, 179, 8)"
                        : index === 1
                          ? "rgb(37, 99, 235)"
                          : index === 2
                            ? "rgb(124, 58, 237)"
                            : "rgb(22, 163, 74)"
                    }
                  />
                </linearGradient>
              ))}
              <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {data.map((item, index) => {
              const startAngle = data.slice(0, index).reduce((sum, d) => sum + (d.allocation / 100) * 360, 0)
              const endAngle = startAngle + (item.allocation / 100) * 360
              const largeArcFlag = item.allocation > 50 ? 1 : 0

              const x1 = 50 + 45 * Math.cos((startAngle * Math.PI) / 180)
              const y1 = 50 + 45 * Math.sin((startAngle * Math.PI) / 180)
              const x2 = 50 + 45 * Math.cos((endAngle * Math.PI) / 180)
              const y2 = 50 + 45 * Math.sin((endAngle * Math.PI) / 180)

              const isHovered = hoveredAsset === item.symbol
              const isSelected = selectedAsset === item.symbol

              return (
                <motion.path
                  key={item.symbol}
                  d={`M 50 50 L ${x1} ${y1} A 45 45 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                  fill={`url(#gradient-${item.symbol})`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: isHovered || isSelected ? 1.05 : 1,
                    filter: isHovered || isSelected ? "brightness(1.2)" : "brightness(1)"
                  }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  whileHover={{ scale: 1.05, filter: "brightness(1.2)" }}
                  className="cursor-pointer transition-all duration-300"
                  onMouseEnter={() => setHoveredAsset(item.symbol)}
                  onMouseLeave={() => setHoveredAsset(null)}
                  onClick={() => setSelectedAsset(selectedAsset === item.symbol ? null : item.symbol)}
                  style={{
                    filter: isHovered || isSelected ? "url(#glow)" : "none"
                  }}
                >
                  <title>{`${item.symbol}: ${item.allocation.toFixed(1)}% ($${item.value.toLocaleString()})`}</title>
                </motion.path>
              )
            })}

            {/* Center circle with gradient */}
            <circle cx="50" cy="50" r="15" fill="url(#centerGradient)" className="text-background" />
            <defs>
              <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="rgba(245, 158, 11, 0.2)" />
                <stop offset="100%" stopColor="rgba(245, 158, 11, 0.1)" />
              </radialGradient>
            </defs>
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">
                ${(mockPortfolio.totalValue / 1000).toFixed(0)}K
              </div>
              <div className="text-sm text-muted-foreground">Total Value</div>
              {selectedAsset && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-xs text-amber-500"
                >
                  {data.find(a => a.symbol === selectedAsset)?.name}
                </motion.div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {data.map((item, index) => (
            <motion.div
              key={item.symbol}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ x: 5, backgroundColor: "rgba(var(--muted), 0.5)" }}
              className={`flex items-center justify-between p-3 bg-muted/30 rounded-lg transition-colors duration-300 ${
                selectedAsset === item.symbol ? "ring-2 ring-amber-500" : ""
              }`}
              onClick={() => setSelectedAsset(selectedAsset === item.symbol ? null : item.symbol)}
            >
              <div className="flex items-center space-x-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{
                    background:
                      index === 0
                        ? "linear-gradient(to right, rgb(245, 158, 11), rgb(234, 179, 8))"
                        : index === 1
                          ? "linear-gradient(to right, rgb(59, 130, 246), rgb(37, 99, 235))"
                          : index === 2
                            ? "linear-gradient(to right, rgb(139, 92, 246), rgb(124, 58, 237))"
                            : "linear-gradient(to right, rgb(34, 197, 94), rgb(22, 163, 74))",
                  }}
                />
                <div>
                  <div className="font-semibold text-foreground">{item.symbol}</div>
                  <div className="text-sm text-muted-foreground">{item.allocation.toFixed(1)}%</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-foreground">${item.value.toLocaleString()}</div>
                <div className={`text-sm ${item.change > 0 ? "text-green-400" : "text-red-400"}`}>
                  {item.change > 0 ? "+" : ""}
                  {item.change.toFixed(1)}%
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Performance chart
const PerformanceChart = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1M")
  const [showIndicators, setShowIndicators] = useState(false)

  // Mock performance data
  const performanceData = {
    "1W": [
      { date: "2024-03-10", value: 245000 },
      { date: "2024-03-11", value: 248000 },
      { date: "2024-03-12", value: 252000 },
      { date: "2024-03-13", value: 249000 },
      { date: "2024-03-14", value: 251000 },
      { date: "2024-03-15", value: 253000 },
      { date: "2024-03-16", value: 256789.45 },
    ],
    "1M": [
      { date: "2024-02-16", value: 228000 },
      { date: "2024-02-23", value: 235000 },
      { date: "2024-03-01", value: 242000 },
      { date: "2024-03-08", value: 248000 },
      { date: "2024-03-16", value: 256789.45 },
    ],
    "3M": [
      { date: "2023-12-16", value: 210000 },
      { date: "2024-01-16", value: 218000 },
      { date: "2024-02-16", value: 228000 },
      { date: "2024-03-16", value: 256789.45 },
    ],
    "1Y": [
      { date: "2023-03-16", value: 180000 },
      { date: "2023-06-16", value: 195000 },
      { date: "2023-09-16", value: 210000 },
      { date: "2023-12-16", value: 210000 },
      { date: "2024-03-16", value: 256789.45 },
    ],
    "ALL": [
      { date: "2022-03-16", value: 150000 },
      { date: "2022-09-16", value: 165000 },
      { date: "2023-03-16", value: 180000 },
      { date: "2023-09-16", value: 210000 },
      { date: "2024-03-16", value: 256789.45 },
    ],
  }

  const currentData = performanceData[selectedTimeframe as keyof typeof performanceData]
  const startValue = currentData[0].value
  const endValue = currentData[currentData.length - 1].value
  const totalChange = ((endValue - startValue) / startValue) * 100

  return (
    <Card className="bg-card/50 backdrop-blur-xl border-border shadow-2xl">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-foreground">
            <TrendingUp className="w-5 h-5 mr-2 text-amber-500" />
            Performance Metrics
            <Badge className="ml-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30">
              {totalChange > 0 ? "+" : ""}{totalChange.toFixed(2)}%
            </Badge>
          </CardTitle>
          <div className="flex items-center space-x-2">
            {["1W", "1M", "3M", "1Y", "ALL"].map((tf) => (
              <Button
                key={tf}
                variant={selectedTimeframe === tf ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTimeframe(tf)}
              >
                {tf}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] relative">
          <svg className="w-full h-full" viewBox="0 0 1000 300" preserveAspectRatio="none">
            <defs>
              <linearGradient id="performanceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(245, 158, 11, 0.2)" />
                <stop offset="100%" stopColor="rgba(245, 158, 11, 0)" />
              </linearGradient>
            </defs>

            {/* Area chart */}
            <path
              d={`M 0 ${300 - (currentData[0].value / endValue) * 300} ${currentData
                .map(
                  (point, i) =>
                    `L ${(i / (currentData.length - 1)) * 1000} ${
                      300 - (point.value / endValue) * 300
                    }`
                )
                .join(" ")} L 1000 300 L 0 300 Z`}
              fill="url(#performanceGradient)"
              className="transition-all duration-500"
            />

            {/* Line chart */}
            <path
              d={`M 0 ${300 - (currentData[0].value / endValue) * 300} ${currentData
                .map(
                  (point, i) =>
                    `L ${(i / (currentData.length - 1)) * 1000} ${
                      300 - (point.value / endValue) * 300
                    }`
                )
                .join(" ")}`}
              fill="none"
              stroke="rgb(245, 158, 11)"
              strokeWidth="2"
              className="transition-all duration-500"
            />

            {/* Data points */}
            {currentData.map((point, i) => (
              <circle
                key={point.date}
                cx={(i / (currentData.length - 1)) * 1000}
                cy={300 - (point.value / endValue) * 300}
                r="4"
                fill="rgb(245, 158, 11)"
                className="transition-all duration-500"
              />
            ))}
          </svg>

          {/* Performance metrics */}
          <div className="absolute bottom-0 left-0 right-0 grid grid-cols-3 gap-4 p-4 bg-background/50 backdrop-blur-sm">
            <div>
              <div className="text-sm text-muted-foreground">Start Value</div>
              <div className="text-lg font-bold">${startValue.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Current Value</div>
              <div className="text-lg font-bold">${endValue.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Total Change</div>
              <div className={`text-lg font-bold ${totalChange >= 0 ? "text-green-400" : "text-red-400"}`}>
                {totalChange > 0 ? "+" : ""}{totalChange.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Portfolio Health Score Component
const PortfolioHealthScore = () => {
  const healthScore = 85 // Mock score
  const healthMetrics = [
    { name: "Diversification", score: 90, icon: PieChart, description: "Well-balanced across different assets" },
    { name: "Risk Level", score: 75, icon: Shield, description: "Moderate risk exposure" },
    { name: "Growth Potential", score: 88, icon: TrendingUp, description: "Strong growth indicators" },
    { name: "Stability", score: 82, icon: Target, description: "Good price stability" },
    { name: "Liquidity", score: 95, icon: DollarSign, description: "High trading volume" },
    { name: "Volatility", score: 78, icon: Activity, description: "Controlled price swings" },
  ]

  const riskMetrics = [
    { name: "Sharpe Ratio", value: 2.4, change: "+0.3", positive: true },
    { name: "Beta", value: 1.2, change: "-0.1", positive: true },
    { name: "Max Drawdown", value: "12.5%", change: "-2.3%", positive: true },
  ]

  return (
    <Card className="bg-card/50 backdrop-blur-xl border-border shadow-2xl">
      <CardHeader>
        <CardTitle className="flex items-center text-foreground">
          <Shield className="w-5 h-5 mr-2 text-amber-500" />
          Portfolio Health
          <Badge className="ml-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-600 dark:text-green-400 border-green-500/30">
            HEALTHY
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                className="text-muted"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#healthGradient)"
                strokeWidth="5"
                strokeDasharray={`${healthScore * 2.83} 283`}
                initial={{ strokeDashoffset: 283 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(34, 197, 94)" />
                  <stop offset="100%" stopColor="rgb(245, 158, 11)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">{healthScore}</div>
                <div className="text-sm text-muted-foreground">Health Score</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {healthMetrics.map((metric, index) => (
            <motion.div
              key={metric.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-muted/30 rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <metric.icon className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-medium">{metric.name}</span>
                </div>
                <span className="text-sm font-bold">{metric.score}%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 to-yellow-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.score}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold mb-3">Risk Metrics</h3>
          <div className="grid grid-cols-3 gap-3">
            {riskMetrics.map((metric, index) => (
              <motion.div
                key={metric.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="p-3 bg-muted/30 rounded-lg"
              >
                <div className="text-xs text-muted-foreground mb-1">{metric.name}</div>
                <div className="text-lg font-bold">{metric.value}</div>
                <div className={`text-xs ${metric.positive ? "text-green-400" : "text-red-400"}`}>
                  {metric.change}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Investment Goals Component
const InvestmentGoals = () => {
  const goals = [
    {
      name: "Retirement Fund",
      target: 1000000,
      current: 256789.45,
      deadline: "2040",
      icon: Target,
    },
    {
      name: "House Down Payment",
      target: 100000,
      current: 45000,
      deadline: "2025",
      icon: Home,
    },
    {
      name: "Emergency Fund",
      target: 50000,
      current: 35000,
      deadline: "2024",
      icon: Shield,
    },
  ]

  return (
    <Card className="bg-card/50 backdrop-blur-xl border-border shadow-2xl">
      <CardHeader>
        <CardTitle className="flex items-center text-foreground">
          <Target className="w-5 h-5 mr-2 text-amber-500" />
          Investment Goals
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goals.map((goal, index) => {
            const progress = (goal.current / goal.target) * 100
            return (
              <motion.div
                key={goal.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-muted/30 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <goal.icon className="w-4 h-4 text-amber-500" />
                    <span className="font-medium">{goal.name}</span>
                  </div>
                  <Badge variant="outline">Target: {goal.deadline}</Badge>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-muted-foreground">
                    ${formatNumber(goal.current)} / ${formatNumber(goal.target)}
                  </div>
                  <div className="text-sm font-medium">{progress.toFixed(1)}%</div>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-500 to-yellow-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

// Market Insights Component
const MarketInsights = () => {
  const insights = [
    {
      title: "Bitcoin Dominance",
      value: "48.7%",
      change: "+2.3%",
      trend: "up",
      description: "BTC dominance continues to grow as institutional adoption increases",
      icon: Crown,
    },
    {
      title: "Market Sentiment",
      value: "Bullish",
      change: "High",
      trend: "up",
      description: "Overall market sentiment remains positive with strong buying pressure",
      icon: TrendingUp,
    },
    {
      title: "Trading Volume",
      value: "$98.7B",
      change: "+15.4%",
      trend: "up",
      description: "24h trading volume shows increased market activity",
      icon: BarChart3,
    },
  ]

  const marketTrends = [
    {
      title: "DeFi TVL",
      value: "$89.2B",
      change: "+12.4%",
      trend: "up",
      description: "Total Value Locked in DeFi protocols",
    },
    {
      title: "NFT Volume",
      value: "$15.7B",
      change: "+6.2%",
      trend: "up",
      description: "30-day NFT trading volume",
    },
    {
      title: "Stablecoin Supply",
      value: "$156.3B",
      change: "+3.8%",
      trend: "up",
      description: "Total stablecoin market cap",
    },
  ]

  const marketEvents = [
    {
      title: "ETH Upgrade",
      date: "2024-04-15",
      impact: "high",
      description: "Ethereum network upgrade expected",
    },
    {
      title: "BTC Halving",
      date: "2024-05-12",
      impact: "high",
      description: "Bitcoin block reward halving event",
    },
    {
      title: "Regulatory Update",
      date: "2024-04-01",
      impact: "medium",
      description: "New crypto regulations to be announced",
    },
  ]

  return (
    <Card className="bg-card/50 backdrop-blur-xl border-border shadow-2xl">
      <CardHeader>
        <CardTitle className="flex items-center text-foreground">
          <BarChart3 className="w-5 h-5 mr-2 text-amber-500" />
          Market Insights
          <Badge className="ml-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30">
            LIVE
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-muted/30 rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <insight.icon className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-medium">{insight.title}</span>
                </div>
                <Badge
                  variant={insight.trend === "up" ? "default" : "destructive"}
                  className="flex items-center"
                >
                  {insight.trend === "up" ? (
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 mr-1" />
                  )}
                  {insight.change}
                </Badge>
              </div>
              <div className="text-2xl font-bold mb-2">{insight.value}</div>
              <p className="text-sm text-muted-foreground">{insight.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="text-sm font-semibold mb-3">Market Trends</h3>
            <div className="space-y-3">
              {marketTrends.map((trend, index) => (
                <motion.div
                  key={trend.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="p-3 bg-muted/30 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{trend.title}</span>
                    <Badge
                      variant={trend.trend === "up" ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {trend.change}
                    </Badge>
                  </div>
                  <div className="text-lg font-bold">{trend.value}</div>
                  <p className="text-xs text-muted-foreground">{trend.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Upcoming Events</h3>
            <div className="space-y-3">
              {marketEvents.map((event, index) => (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="p-3 bg-muted/30 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{event.title}</span>
                    <Badge
                      variant={event.impact === "high" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {event.impact.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mb-1">{event.date}</div>
                  <p className="text-xs text-muted-foreground">{event.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Enhanced Portfolio Page Layout
export default function PortfolioPage() {
  const [mounted, setMounted] = useState(false)
  const [showBalance, setShowBalance] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Portfolio Overview</h1>
              <p className="text-muted-foreground">Track and manage your crypto investments</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => setShowBalance(!showBalance)}>
                {showBalance ? (
                  <EyeOff className="w-4 h-4 mr-2" />
                ) : (
                  <Eye className="w-4 h-4 mr-2" />
                )}
                {showBalance ? "Hide Balance" : "Show Balance"}
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Asset
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Portfolio Value and Health Score */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <AllocationChart />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <PortfolioHealthScore />
          </motion.div>
        </div>

        {/* Investment Goals and Market Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <InvestmentGoals />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <MarketInsights />
          </motion.div>
        </div>

        {/* Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <PerformanceChart />
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="bg-card/50 backdrop-blur-xl border-border shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <History className="w-5 h-5 mr-2 text-amber-500" />
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPortfolio.recentTransactions.map((transaction, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === "buy"
                            ? "bg-green-500/20 text-green-500"
                            : "bg-red-500/20 text-red-500"
                        }`}
                      >
                        {transaction.type === "buy" ? (
                          <Plus className="w-5 h-5" />
                        ) : (
                          <Minus className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">
                          {transaction.type === "buy" ? "Bought" : "Sold"} {transaction.asset}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${formatNumber(transaction.total)}</div>
                      <div className="text-sm text-muted-foreground">
                        {transaction.amount} {transaction.asset} @ ${formatNumber(transaction.price)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
