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
} from "lucide-react"
import Link from "next/link"

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
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      value: 75000.00,
      amount: 25,
      change: 8.92,
      allocation: 29.2,
    },
    {
      name: "Solana",
      symbol: "SOL",
      value: 35000.00,
      amount: 350,
      change: -2.45,
      allocation: 13.6,
    },
    {
      name: "Cardano",
      symbol: "ADA",
      value: 21789.45,
      amount: 50000,
      change: 5.78,
      allocation: 8.5,
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
        <div className="relative w-48 h-48 mx-auto mb-6">
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
            </defs>

            {data.map((item, index) => {
              const startAngle = data.slice(0, index).reduce((sum, d) => sum + (d.allocation / 100) * 360, 0)
              const endAngle = startAngle + (item.allocation / 100) * 360
              const largeArcFlag = item.allocation > 50 ? 1 : 0

              const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180)
              const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180)
              const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180)
              const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180)

              return (
                <motion.path
                  key={item.symbol}
                  d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                  fill={`url(#gradient-${item.symbol})`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer"
                />
              )
            })}
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                ${(mockPortfolio.totalValue / 1000).toFixed(0)}K
              </div>
              <div className="text-sm text-muted-foreground">Total Value</div>
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
              whileHover={{ x: 5 }}
              className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
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

  return (
    <Card className="bg-card/50 backdrop-blur-xl border-border shadow-2xl">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-foreground">
            <TrendingUp className="w-5 h-5 mr-2 text-amber-500" />
            Performance Metrics
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
          {/* Placeholder for performance chart */}
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            Performance chart will be implemented here
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function PortfolioPage() {
  const [mounted, setMounted] = useState(false)
  const [showValues, setShowValues] = useState(true)
  const [selectedTimeframe, setSelectedTimeframe] = useState("1M")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

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
    }).format(num / 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 text-foreground">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border"
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2 cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-lg flex items-center justify-center shadow-lg">
                <Diamond className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
                CoinCanvas Elite
              </span>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/">
              <motion.div
                whileHover={{ y: -2 }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </motion.div>
            </Link>
            <Link href="/analytics">
              <motion.div
                whileHover={{ y: -2 }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Analytics
              </motion.div>
            </Link>
            <motion.div whileHover={{ y: -2 }} className="text-foreground font-medium flex items-center space-x-1">
              <Wallet className="w-4 h-4" />
              <span>Portfolio</span>
            </motion.div>
          </div>

          <Button className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white">
            <Crown className="w-4 h-4 mr-2" />
            Elite
          </Button>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="pt-20 px-6">
        <div className="container mx-auto">
          {/* Header */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">Elite Portfolio</h1>
                <p className="text-muted-foreground">Professional portfolio management and analytics</p>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Asset
                </Button>
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline">
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Portfolio Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="bg-card/50 backdrop-blur-xl border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <DollarSign className="w-8 h-8 text-amber-500" />
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        <TrendingUp className="w-3 h-3 mr-1" />+{mockPortfolio.totalChange.toFixed(1)}%
                      </Badge>
                    </div>
                    <div className="text-3xl font-bold text-foreground mb-2">
                      {showValues ? formatNumber(mockPortfolio.totalValue) : "****"}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Portfolio Value</div>
                    <div className="text-sm text-green-500 mt-1">
                      +${(mockPortfolio.totalValue * mockPortfolio.totalChange / 100).toLocaleString()} today
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="bg-card/50 backdrop-blur-xl border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Target className="w-8 h-8 text-blue-500" />
                      <Badge variant="outline">24H</Badge>
                    </div>
                    <div className="text-3xl font-bold text-foreground mb-2">+{mockPortfolio.totalChange.toFixed(1)}%</div>
                    <div className="text-sm text-muted-foreground">Daily Performance</div>
                    <div className="text-sm text-green-500 mt-1">Outperforming market</div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="bg-card/50 backdrop-blur-xl border-border shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Shield className="w-8 h-8 text-purple-500" />
                      <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">ELITE</Badge>
                    </div>
                    <div className="text-3xl font-bold text-foreground mb-2">A+</div>
                    <div className="text-sm text-muted-foreground">Risk Score</div>
                    <div className="text-sm text-amber-500 mt-1">Optimally balanced</div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="bg-card/50 backdrop-blur-xl border-border shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Star className="w-8 h-8 text-yellow-500" />
                      <Badge className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30">
                        PREMIUM
                      </Badge>
                    </div>
                    <div className="text-3xl font-bold text-foreground mb-2">9.8</div>
                    <div className="text-sm text-muted-foreground">Elite Rating</div>
                    <div className="text-sm text-yellow-500 mt-1">Top 1% performer</div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Performance Chart */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <PerformanceChart />
            </motion.div>

            {/* Allocation Chart */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <AllocationChart />
            </motion.div>
          </div>

          {/* Holdings and Transactions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Holdings */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="bg-card/50 backdrop-blur-xl border-border shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <Wallet className="w-5 h-5 mr-2 text-amber-500" />
                    Current Holdings
                    <Badge className="ml-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30">
                      LIVE
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockPortfolio.assets.map((asset, index) => (
                    <motion.div
                      key={asset.symbol}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ x: 5, scale: 1.02 }}
                      className="p-4 bg-muted/30 rounded-lg cursor-pointer border border-border/50"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="font-bold text-foreground text-lg">{asset.symbol}</div>
                          <div className="text-sm text-muted-foreground">{asset.name}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-foreground text-lg">
                            {showValues ? formatNumber(asset.value) : "****"}
                          </div>
                          <div
                            className={`text-sm flex items-center ${asset.change > 0 ? "text-green-400" : "text-red-400"}`}
                          >
                            {asset.change > 0 ? (
                              <ArrowUpRight className="w-3 h-3 mr-1" />
                            ) : (
                              <ArrowDownRight className="w-3 h-3 mr-1" />
                            )}
                            {asset.change > 0 ? "+" : ""}
                            {formatPercentage(asset.change)}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Amount</div>
                          <div className="font-semibold text-foreground">{asset.amount}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Price</div>
                          <div className="font-semibold text-foreground">${asset.price.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Allocation</div>
                          <div className="font-semibold text-foreground">{asset.allocation.toFixed(1)}%</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Transactions */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="bg-card/50 backdrop-blur-xl border-border shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <BarChart3 className="w-5 h-5 mr-2 text-amber-500" />
                    Recent Transactions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockPortfolio.recentTransactions.map((tx, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      whileHover={{ x: 5, scale: 1.02 }}
                      className="p-4 bg-muted/30 rounded-lg border border-border/50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <Badge
                            className={
                              tx.type === "buy"
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : "bg-red-500/20 text-red-400 border-red-500/30"
                            }
                          >
                            {tx.type.toUpperCase()}
                          </Badge>
                          <div>
                            <div className="font-semibold text-foreground">{tx.asset}</div>
                            <div className="text-sm text-muted-foreground">{new Date(tx.date).toLocaleDateString()}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-foreground">${tx.total.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">
                            {tx.amount} @ {formatNumber(tx.price)}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
