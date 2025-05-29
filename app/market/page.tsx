"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/Navbar"
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
  Sparkles,
  Zap,
  Rocket,
  Trophy,
  Users,
  Activity,
  LineChart,
  CandlestickChart,
  Coins,
  Wallet2,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Clock,
  Share,
  Calendar,
  Bell,
  List,
  Grid,
  Bookmark,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for market overview
const mockMarketData = {
  totalMarketCap: 2567890000000,
  totalVolume24h: 98765000000,
  btcDominance: 48.7,
  ethDominance: 29.2,
  marketTrend: "bullish",
  topGainers: [
    { symbol: "BTC", name: "Bitcoin", price: 50000, change: 15.67, volume: 25000000000 },
    { symbol: "ETH", name: "Ethereum", price: 3000, change: 8.92, volume: 15000000000 },
    { symbol: "SOL", name: "Solana", price: 100, change: 12.45, volume: 5000000000 },
  ],
  topLosers: [
    { symbol: "ADA", name: "Cardano", price: 0.435, change: -5.78, volume: 1000000000 },
    { symbol: "DOT", name: "Polkadot", price: 6.78, change: -3.45, volume: 800000000 },
    { symbol: "LINK", name: "Chainlink", price: 15.67, change: -2.89, volume: 1200000000 },
  ],
  trendingPairs: [
    { pair: "BTC/USDT", volume: 15000000000, change: 5.67, lastPrice: 50000 },
    { pair: "ETH/USDT", volume: 8000000000, change: 3.45, lastPrice: 3000 },
    { pair: "SOL/USDT", volume: 3000000000, change: 7.89, lastPrice: 100 },
  ],
  marketNews: [
    {
      title: "Bitcoin Surges Past $50,000 as Institutional Adoption Grows",
      source: "CryptoNews",
      time: "2h ago",
      sentiment: "bullish",
    },
    {
      title: "Ethereum 2.0 Upgrade Shows Promising Results",
      source: "BlockchainTimes",
      time: "4h ago",
      sentiment: "bullish",
    },
    {
      title: "New Regulatory Framework Proposed for Crypto Markets",
      source: "FinanceDaily",
      time: "6h ago",
      sentiment: "neutral",
    },
  ],
}

// Enhanced Market Overview Card Component
const MarketOverviewCard = () => {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [timeframe, setTimeframe] = useState("24h")

  const metrics = [
    {
      id: "marketCap",
      icon: DollarSign,
      label: "Total Market Cap",
      value: mockMarketData.totalMarketCap,
      change: 5.67,
      color: "amber",
      details: {
        btc: 48.7,
        eth: 29.2,
        others: 22.1,
      },
      breakdown: {
        large: 65,
        mid: 25,
        small: 10,
      },
      trend: {
        daily: 2.3,
        weekly: 5.67,
        monthly: 12.45,
      },
    },
    {
      id: "volume",
      icon: LineChart,
      label: "24h Volume",
      value: mockMarketData.totalVolume24h,
      change: 12.34,
      color: "blue",
      details: {
        spot: 65,
        derivatives: 35,
      },
      breakdown: {
        exchanges: {
          binance: 35,
          coinbase: 25,
          others: 40,
        },
        pairs: {
          btc: 45,
          eth: 30,
          others: 25,
        },
      },
      trend: {
        daily: 3.2,
        weekly: 8.45,
        monthly: 15.67,
      },
    },
    {
      id: "btcDominance",
      icon: PieChart,
      label: "BTC Dominance",
      value: mockMarketData.btcDominance,
      change: -0.5,
      color: "purple",
      details: {
        spot: 60,
        futures: 40,
      },
      breakdown: {
        marketCap: 48.7,
        volume: 52.3,
        liquidity: 49.8,
      },
      trend: {
        daily: -0.2,
        weekly: -0.5,
        monthly: -1.2,
      },
    },
    {
      id: "ethDominance",
      icon: PieChart,
      label: "ETH Dominance",
      value: mockMarketData.ethDominance,
      change: 0.8,
      color: "blue",
      details: {
        defi: 45,
        nft: 30,
        others: 25,
      },
      breakdown: {
        marketCap: 29.2,
        volume: 31.5,
        liquidity: 28.9,
      },
      trend: {
        daily: 0.3,
        weekly: 0.8,
        monthly: 2.1,
      },
    },
  ]

  return (
    <Card className="bg-card/50 backdrop-blur-xl border-border shadow-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-foreground">
            <Activity className="w-5 h-5 mr-2 text-amber-500" />
            Market Overview
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 bg-muted/30 rounded-lg cursor-pointer transition-all duration-300 ${
                selectedMetric === metric.id ? "ring-2 ring-amber-500" : ""
              }`}
              onClick={() => {
                setSelectedMetric(selectedMetric === metric.id ? null : metric.id)
                setShowDetails(selectedMetric !== metric.id)
              }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-2">
                <metric.icon className={`w-5 h-5 text-${metric.color}-500`} />
                <Badge variant="outline">{timeframe}</Badge>
              </div>
              <div className="text-2xl font-bold">
                {metric.id.includes("Dominance")
                  ? `${metric.value.toFixed(1)}%`
                  : `$${(metric.value / 1000000000).toFixed(2)}B`}
              </div>
              <div className="text-sm text-muted-foreground">{metric.label}</div>
              <div
                className={`text-sm mt-1 flex items-center ${
                  metric.change >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {metric.change >= 0 ? (
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 mr-1" />
                )}
                {metric.change > 0 ? "+" : ""}
                {metric.change.toFixed(2)}%
              </div>

              <AnimatePresence>
                {selectedMetric === metric.id && showDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-border"
                  >
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm font-medium mb-2">Breakdown</div>
                        <div className="space-y-2">
                          {Object.entries(metric.breakdown).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground capitalize">{key}</span>
                              <span className="text-sm font-medium">{value}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium mb-2">Trend Analysis</div>
                        <div className="space-y-2">
                          {Object.entries(metric.trend).map(([period, value]) => (
                            <div key={period} className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground capitalize">{period}</span>
                              <span
                                className={`text-sm font-medium ${
                                  value >= 0 ? "text-green-400" : "text-red-400"
                                }`}
                              >
                                {value >= 0 ? "+" : ""}
                                {value}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="h-24">
                        <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                          <path
                            d="M0 50 L10 45 L20 48 L30 40 L40 42 L50 35 L60 38 L70 32 L80 34 L90 30 L100 25"
                            fill="none"
                            stroke={metric.change >= 0 ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
                            strokeWidth="2"
                          />
                        </svg>
                      </div>
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

// Enhanced Market Movers Component
const MarketMovers = () => {
  const [activeTab, setActiveTab] = useState("gainers")
  const [selectedCoin, setSelectedCoin] = useState<string | null>(null)
  const [showChart, setShowChart] = useState(false)
  const [timeframe, setTimeframe] = useState("24h")
  const [view, setView] = useState("list")

  const enhancedData = {
    gainers: mockMarketData.topGainers.map((coin) => ({
      ...coin,
      marketCap: coin.price * 1000000,
      volume24h: coin.volume,
      high24h: coin.price * 1.1,
      low24h: coin.price * 0.9,
      circulatingSupply: 1000000,
      totalSupply: 2000000,
      rank: 1,
      socialMetrics: {
        twitter: { followers: 100000, sentiment: 75 },
        reddit: { subscribers: 50000, sentiment: 68 },
        telegram: { members: 75000, sentiment: 82 },
      },
      technicalIndicators: {
        rsi: 65,
        macd: 2.5,
        volumeMA: 1200000,
      },
    })),
    losers: mockMarketData.topLosers.map((coin) => ({
      ...coin,
      marketCap: coin.price * 1000000,
      volume24h: coin.volume,
      high24h: coin.price * 1.1,
      low24h: coin.price * 0.9,
      circulatingSupply: 1000000,
      totalSupply: 2000000,
      rank: 1,
      socialMetrics: {
        twitter: { followers: 100000, sentiment: 45 },
        reddit: { subscribers: 50000, sentiment: 42 },
        telegram: { members: 75000, sentiment: 48 },
      },
      technicalIndicators: {
        rsi: 35,
        macd: -2.5,
        volumeMA: 800000,
      },
    })),
  }

  return (
    <Card className="bg-card/50 backdrop-blur-xl border-border shadow-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-foreground">
            <TrendingUp className="w-5 h-5 mr-2 text-amber-500" />
            Market Movers
            <Badge className="ml-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30">
              LIVE
            </Badge>
          </CardTitle>
          <div className="flex space-x-2">
            <Button
              variant={activeTab === "gainers" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("gainers")}
            >
              Top Gainers
            </Button>
            <Button
              variant={activeTab === "losers" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab("losers")}
            >
              Top Losers
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-4 mt-4">
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
          <div className="flex space-x-2 ml-auto">
            <Button
              variant={view === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setView("list")}
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant={view === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setView("grid")}
            >
              <Grid className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className={view === "grid" ? "grid grid-cols-2 gap-4" : "space-y-4"}>
              {enhancedData[activeTab].map((coin, index) => (
                <motion.div
                  key={coin.symbol}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 bg-muted/30 rounded-lg transition-all duration-300 ${
                    selectedCoin === coin.symbol ? "ring-2 ring-amber-500" : ""
                  }`}
                  onClick={() => {
                    setSelectedCoin(selectedCoin === coin.symbol ? null : coin.symbol)
                    setShowChart(selectedCoin !== coin.symbol)
                  }}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center">
                        <span className="text-white font-bold">{coin.symbol[0]}</span>
                      </div>
                      <div>
                        <div className="font-semibold">{coin.symbol}</div>
                        <div className="text-sm text-muted-foreground">{coin.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${coin.price.toLocaleString()}</div>
                      <div
                        className={`text-sm ${
                          coin.change > 0 ? "text-green-400" : "text-red-400"
                        } flex items-center justify-end`}
                      >
                        {coin.change > 0 ? (
                          <ArrowUpRight className="w-3 h-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="w-3 h-3 mr-1" />
                        )}
                        {coin.change > 0 ? "+" : ""}
                        {coin.change.toFixed(2)}%
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {selectedCoin === coin.symbol && showChart && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-border"
                      >
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm font-medium mb-2">Market Data</div>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Market Cap</span>
                                <span className="text-sm font-medium">
                                  ${(coin.marketCap / 1000000).toFixed(2)}M
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">24h Volume</span>
                                <span className="text-sm font-medium">
                                  ${(coin.volume24h / 1000000).toFixed(2)}M
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Circulating Supply</span>
                                <span className="text-sm font-medium">
                                  {coin.circulatingSupply.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-medium mb-2">Technical Indicators</div>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">RSI</span>
                                <span className="text-sm font-medium">{coin.technicalIndicators.rsi}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">MACD</span>
                                <span className="text-sm font-medium">
                                  {coin.technicalIndicators.macd}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Volume MA</span>
                                <span className="text-sm font-medium">
                                  ${(coin.technicalIndicators.volumeMA / 1000).toFixed(0)}K
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="text-sm font-medium mb-2">Social Sentiment</div>
                          <div className="grid grid-cols-3 gap-4">
                            {Object.entries(coin.socialMetrics).map(([platform, data]) => (
                              <div key={platform} className="text-center">
                                <div className="text-sm text-muted-foreground capitalize mb-1">
                                  {platform}
                                </div>
                                <div className="text-lg font-bold">{data.sentiment}%</div>
                                <div className="text-xs text-muted-foreground">
                                  {data.followers?.toLocaleString() || data.subscribers?.toLocaleString() || data.members?.toLocaleString()}{" "}
                                  {platform === "twitter"
                                    ? "followers"
                                    : platform === "reddit"
                                    ? "subscribers"
                                    : "members"}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="h-32 mt-4">
                          <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                            <path
                              d="M0 50 L10 45 L20 48 L30 40 L40 42 L50 35 L60 38 L70 32 L80 34 L90 30 L100 25"
                              fill="none"
                              stroke={coin.change > 0 ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
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
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

// Enhanced Trending Pairs Component
const TrendingPairs = () => {
  const [selectedPair, setSelectedPair] = useState<string | null>(null)
  const [showOrderBook, setShowOrderBook] = useState(false)
  const [timeframe, setTimeframe] = useState("24h")
  const [view, setView] = useState("list")

  const enhancedPairs = mockMarketData.trendingPairs.map((pair) => ({
    ...pair,
    orderBook: {
      bids: [
        { price: pair.lastPrice * 0.99, amount: 1.5, total: pair.lastPrice * 0.99 * 1.5 },
        { price: pair.lastPrice * 0.98, amount: 2.3, total: pair.lastPrice * 0.98 * 2.3 },
        { price: pair.lastPrice * 0.97, amount: 3.1, total: pair.lastPrice * 0.97 * 3.1 },
      ],
      asks: [
        { price: pair.lastPrice * 1.01, amount: 1.2, total: pair.lastPrice * 1.01 * 1.2 },
        { price: pair.lastPrice * 1.02, amount: 2.1, total: pair.lastPrice * 1.02 * 2.1 },
        { price: pair.lastPrice * 1.03, amount: 2.8, total: pair.lastPrice * 1.03 * 2.8 },
      ],
    },
    recentTrades: [
      { time: "12:45:23", price: pair.lastPrice * 1.001, amount: 0.5, type: "buy" },
      { time: "12:45:20", price: pair.lastPrice * 0.999, amount: 1.2, type: "sell" },
      { time: "12:45:15", price: pair.lastPrice * 1.002, amount: 0.8, type: "buy" },
    ],
    technicalAnalysis: {
      rsi: 58,
      macd: 1.2,
      volumeMA: 1500000,
      support: pair.lastPrice * 0.95,
      resistance: pair.lastPrice * 1.05,
    },
    marketDepth: {
      bidVolume: 2500000,
      askVolume: 2300000,
      spread: 0.2,
    },
  }))

  return (
    <Card className="bg-card/50 backdrop-blur-xl border-border shadow-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-foreground">
            <CandlestickChart className="w-5 h-5 mr-2 text-amber-500" />
            Trending Pairs
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
        <div className="flex items-center space-x-4 mt-4">
          <div className="flex space-x-2">
            <Button
              variant={view === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setView("list")}
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant={view === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setView("grid")}
            >
              <Grid className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className={view === "grid" ? "grid grid-cols-2 gap-4" : "space-y-4"}>
          {enhancedPairs.map((pair, index) => (
            <motion.div
              key={pair.pair}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 bg-muted/30 rounded-lg transition-all duration-300 ${
                selectedPair === pair.pair ? "ring-2 ring-amber-500" : ""
              }`}
              onClick={() => {
                setSelectedPair(selectedPair === pair.pair ? null : pair.pair)
                setShowOrderBook(selectedPair !== pair.pair)
              }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{pair.pair}</div>
                  <div className="text-sm text-muted-foreground">
                    Vol: ${(pair.volume / 1000000).toFixed(0)}M
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${pair.lastPrice.toLocaleString()}</div>
                  <div
                    className={`text-sm ${
                      pair.change > 0 ? "text-green-400" : "text-red-400"
                    } flex items-center justify-end`}
                  >
                    {pair.change > 0 ? (
                      <ArrowUpRight className="w-3 h-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 mr-1" />
                    )}
                    {pair.change > 0 ? "+" : ""}
                    {pair.change.toFixed(2)}%
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {selectedPair === pair.pair && showOrderBook && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-border"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium mb-2">Order Book</div>
                        <div className="space-y-1">
                          {pair.orderBook.asks.reverse().map((ask, i) => (
                            <div key={i} className="flex justify-between text-sm">
                              <span className="text-red-400">${ask.price.toFixed(2)}</span>
                              <span className="text-muted-foreground">{ask.amount.toFixed(2)}</span>
                              <span className="text-muted-foreground">${ask.total.toFixed(2)}</span>
                            </div>
                          ))}
                          <div className="text-center text-sm font-medium my-2">
                            ${pair.lastPrice.toFixed(2)}
                          </div>
                          {pair.orderBook.bids.map((bid, i) => (
                            <div key={i} className="flex justify-between text-sm">
                              <span className="text-green-400">${bid.price.toFixed(2)}</span>
                              <span className="text-muted-foreground">{bid.amount.toFixed(2)}</span>
                              <span className="text-muted-foreground">${bid.total.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium mb-2">Recent Trades</div>
                        <div className="space-y-1">
                          {pair.recentTrades.map((trade, i) => (
                            <div key={i} className="flex justify-between text-sm">
                              <span className="text-muted-foreground">{trade.time}</span>
                              <span
                                className={
                                  trade.type === "buy" ? "text-green-400" : "text-red-400"
                                }
                              >
                                ${trade.price.toFixed(2)}
                              </span>
                              <span className="text-muted-foreground">{trade.amount.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-sm font-medium mb-2">Technical Analysis</div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">RSI</span>
                            <span className="text-sm font-medium">{pair.technicalAnalysis.rsi}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">MACD</span>
                            <span className="text-sm font-medium">
                              {pair.technicalAnalysis.macd}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Volume MA</span>
                            <span className="text-sm font-medium">
                              ${(pair.technicalAnalysis.volumeMA / 1000).toFixed(0)}K
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Support</span>
                            <span className="text-sm font-medium">
                              ${pair.technicalAnalysis.support.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Resistance</span>
                            <span className="text-sm font-medium">
                              ${pair.technicalAnalysis.resistance.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Spread</span>
                            <span className="text-sm font-medium">
                              {pair.marketDepth.spread}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="h-32 mt-4">
                      <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                        <path
                          d="M0 50 L10 45 L20 48 L30 40 L40 42 L50 35 L60 38 L70 32 L80 34 L90 30 L100 25"
                          fill="none"
                          stroke={pair.change > 0 ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
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

// Enhanced Market News Component
const MarketNews = () => {
  const [selectedNews, setSelectedNews] = useState<number | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [filter, setFilter] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  const enhancedNews = mockMarketData.marketNews.map((news) => ({
    ...news,
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    author: "John Doe",
    category: news.sentiment === "bullish" ? "Market Analysis" : "Regulation",
    tags: ["Bitcoin", "Ethereum", "Market Analysis"],
    relatedAssets: ["BTC", "ETH", "SOL"],
    impact: {
      shortTerm: news.sentiment === "bullish" ? "Positive" : "Neutral",
      longTerm: "Positive",
      confidence: 85,
    },
    metrics: {
      views: 15000,
      shares: 2500,
      comments: 450,
    },
  }))

  return (
    <Card className="bg-card/50 backdrop-blur-xl border-border shadow-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-foreground">
            <Sparkles className="w-5 h-5 mr-2 text-amber-500" />
            Market News
            <Badge className="ml-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30">
              LIVE
            </Badge>
          </CardTitle>
          <div className="flex space-x-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button
              variant={filter === "analysis" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("analysis")}
            >
              Analysis
            </Button>
            <Button
              variant={filter === "regulation" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("regulation")}
            >
              Regulation
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-4 mt-4">
          <div className="flex space-x-2">
            <Button
              variant={sortBy === "recent" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("recent")}
            >
              Recent
            </Button>
            <Button
              variant={sortBy === "popular" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("popular")}
            >
              Popular
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {enhancedNews.map((news, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 bg-muted/30 rounded-lg transition-all duration-300 ${
                selectedNews === index ? "ring-2 ring-amber-500" : ""
              }`}
              onClick={() => {
                setSelectedNews(selectedNews === index ? null : index)
                setShowDetails(selectedNews !== index)
              }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-semibold mb-1">{news.title}</div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{news.source}</span>
                    <span>•</span>
                    <span>{news.time}</span>
                    <span>•</span>
                    <span>{news.author}</span>
                  </div>
                </div>
                <Badge
                  className={
                    news.sentiment === "bullish"
                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                      : news.sentiment === "bearish"
                      ? "bg-red-500/20 text-red-400 border-red-500/30"
                      : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                  }
                >
                  {news.sentiment}
                </Badge>
              </div>

              <AnimatePresence>
                {selectedNews === index && showDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-border"
                  >
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <p className="text-muted-foreground">{news.content}</p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {news.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <div className="text-sm font-medium mb-2">Market Impact</div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Short Term</span>
                              <span
                                className={`text-sm font-medium ${
                                  news.impact.shortTerm === "Positive"
                                    ? "text-green-400"
                                    : "text-yellow-400"
                                }`}
                              >
                                {news.impact.shortTerm}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Long Term</span>
                              <span
                                className={`text-sm font-medium ${
                                  news.impact.longTerm === "Positive"
                                    ? "text-green-400"
                                    : "text-yellow-400"
                                }`}
                              >
                                {news.impact.longTerm}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Confidence</span>
                              <span className="text-sm font-medium">{news.impact.confidence}%</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium mb-2">Engagement</div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Views</span>
                              <span className="text-sm font-medium">
                                {news.metrics.views.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Shares</span>
                              <span className="text-sm font-medium">
                                {news.metrics.shares.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Comments</span>
                              <span className="text-sm font-medium">
                                {news.metrics.comments.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 mt-4">
                        <Button size="sm" variant="outline">
                          <ArrowRight className="w-4 h-4 mr-2" />
                          Read More
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                        <Button size="sm" variant="outline">
                          <Bookmark className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                      </div>
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

// Market Sentiment Component
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
        <CardTitle className="flex items-center text-foreground">
          <Zap className="w-5 h-5 mr-2 text-amber-500" />
          Market Sentiment
          <Badge className="ml-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30">
            LIVE
          </Badge>
        </CardTitle>
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

// Market Events Component
const MarketEvents = () => {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)

  const events = [
    {
      id: "eth-upgrade",
      title: "Ethereum Shanghai Upgrade",
      date: "2024-03-13",
      impact: "High",
      description: "Major network upgrade introducing new features and improvements",
      status: "upcoming",
    },
    {
      id: "btc-halving",
      title: "Bitcoin Halving",
      date: "2024-04-20",
      impact: "Critical",
      description: "Bitcoin block reward reduction event",
      status: "upcoming",
    },
    {
      id: "reg-update",
      title: "EU Crypto Regulation",
      date: "2024-05-15",
      impact: "Medium",
      description: "Implementation of new regulatory framework",
      status: "upcoming",
    },
  ]

  return (
    <Card className="bg-card/50 backdrop-blur-xl border-border shadow-2xl">
      <CardHeader>
        <CardTitle className="flex items-center text-foreground">
          <Calendar className="w-5 h-5 mr-2 text-amber-500" />
          Market Events
          <Badge className="ml-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30">
            UPCOMING
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className={`p-4 bg-muted/30 rounded-lg cursor-pointer transition-all duration-300 ${
                selectedEvent === event.id ? "ring-2 ring-amber-500" : ""
              }`}
              onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold mb-1">{event.title}</div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <Badge
                      className={
                        event.impact === "High" || event.impact === "Critical"
                          ? "bg-red-500/20 text-red-400 border-red-500/30"
                          : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                      }
                    >
                      {event.impact} Impact
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Add to Calendar
                </Button>
              </div>

              <AnimatePresence>
                {selectedEvent === event.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-border"
                  >
                    <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
                    <div className="flex items-center space-x-4">
                      <Button size="sm" variant="outline">
                        <Bell className="w-4 h-4 mr-2" />
                        Set Reminder
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

// Market Heatmap Component
const MarketHeatmap = () => {
  const [selectedSector, setSelectedSector] = useState<string | null>(null)

  const sectors = [
    { name: "DeFi", change: 5.2, volume: 2500000000, marketCap: 45000000000 },
    { name: "NFT", change: -2.1, volume: 1800000000, marketCap: 28000000000 },
    { name: "Layer 2", change: 8.4, volume: 3200000000, marketCap: 65000000000 },
    { name: "Gaming", change: 3.7, volume: 1500000000, marketCap: 22000000000 },
    { name: "Infrastructure", change: 6.9, volume: 2800000000, marketCap: 52000000000 },
  ]

  return (
    <Card className="bg-card/50 backdrop-blur-xl border-border shadow-2xl">
      <CardHeader>
        <CardTitle className="flex items-center text-foreground">
          <BarChart3 className="w-5 h-5 mr-2 text-amber-500" />
          Market Heatmap
          <Badge className="ml-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30">
            LIVE
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {sectors.map((sector) => (
              <motion.div
                key={sector.name}
                whileHover={{ scale: 1.02 }}
                className={`p-4 bg-muted/30 rounded-lg cursor-pointer transition-all duration-300 ${
                  selectedSector === sector.name ? "ring-2 ring-amber-500" : ""
                }`}
                onClick={() => setSelectedSector(selectedSector === sector.name ? null : sector.name)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{sector.name}</span>
                  <span
                    className={`text-sm ${
                      sector.change >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {sector.change >= 0 ? "+" : ""}
                    {sector.change}%
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      sector.change >= 0 ? "bg-green-500" : "bg-red-500"
                    }`}
                    style={{
                      width: `${Math.abs(sector.change) * 10}%`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-6">
            {selectedSector && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-muted/30 rounded-lg"
              >
                <h3 className="text-lg font-semibold mb-4">{selectedSector} Overview</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">24h Volume</div>
                    <div className="text-2xl font-bold">
                      ${(sectors.find((s) => s.name === selectedSector)?.volume || 0).toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Market Cap</div>
                    <div className="text-2xl font-bold">
                      $
                      {(sectors.find((s) => s.name === selectedSector)?.marketCap || 0).toLocaleString()}
                    </div>
                  </div>
                  <div className="h-32">
                    <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                      <path
                        d="M0 50 L10 45 L20 48 L30 40 L40 42 L50 35 L60 38 L70 32 L80 34 L90 30 L100 25"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function MarketPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 text-foreground">
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
                    <h1 className="text-4xl font-bold text-foreground mb-2">Market Analysis</h1>
                    <p className="text-muted-foreground">Real-time market data and insights</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Button variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
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
              </motion.div>

              {/* Market Overview */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
              >
                <MarketOverviewCard />
              </motion.div>

              {/* Market Sentiment and Heatmap */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <MarketSentiment />
                </motion.div>

                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <MarketHeatmap />
                </motion.div>
              </div>

              {/* Market Movers and Trending Pairs */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <MarketMovers />
                </motion.div>

                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <TrendingPairs />
                </motion.div>
              </div>

              {/* Market Events and News */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <MarketEvents />
                </motion.div>

                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <MarketNews />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 