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
} from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"

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

// Enhanced market sentiment widget
const MarketSentiment = () => {
  const [sentiment] = useState(72)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group"
    >
      <Card className="bg-card/50 backdrop-blur-xl border-border shadow-2xl overflow-hidden relative">
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-amber-500/10"
        />
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center text-foreground">
            <motion.div
              animate={{ scale: isHovered ? 1.2 : 1, rotate: isHovered ? 180 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <Activity className="w-5 h-5 mr-2 text-amber-500" />
            </motion.div>
            Market Sentiment
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}>
              <Badge className="ml-2 bg-green-500/20 text-green-400 border-green-500/30">BULLISH</Badge>
            </motion.div>
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-muted opacity-20"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                stroke="url(#sentimentGradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: sentiment / 100 }}
                transition={{ duration: 2.5, ease: "easeOut" }}
                style={{
                  strokeDasharray: "251.2",
                  strokeDashoffset: "251.2",
                  filter: "drop-shadow(0 0 8px rgb(34, 197, 94))",
                }}
              />
              <defs>
                <linearGradient id="sentimentGradient">
                  <stop offset="0%" stopColor="rgb(34, 197, 94)" />
                  <stop offset="100%" stopColor="rgb(245, 158, 11)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.5, type: "spring", bounce: 0.5 }}
                  className="text-2xl font-bold text-foreground"
                >
                  {sentiment}%
                </motion.div>
                <div className="text-xs text-green-400 font-semibold">Bullish</div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { label: "Fear & Greed", value: "Greed", color: "green" },
              { label: "Social Volume", value: "High", color: "amber" },
              { label: "Market Cap", value: "$2.1T", color: "blue" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 2.5 + index * 0.15 }}
                whileHover={{ x: 5, scale: 1.02 }}
                className="flex justify-between text-sm p-3 bg-muted/20 rounded-lg border border-border/30 cursor-pointer"
              >
                <span className="text-muted-foreground">{item.label}</span>
                <span
                  className={`font-semibold ${
                    item.color === "green"
                      ? "text-green-400"
                      : item.color === "amber"
                        ? "text-amber-400"
                        : "text-blue-400"
                  }`}
                >
                  {item.value}
                </span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
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

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border"
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-lg flex items-center justify-center shadow-lg"
            >
              <Diamond className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
              CoinCanvas
            </span>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            {[
              { name: "Home", href: "/", icon: null },
              { name: "Analytics", href: "/analytics", icon: BarChart3 },
              { name: "Portfolio", href: "/portfolio", icon: PieChart },
              { name: "Markets", href: "#", icon: null },
              { name: "Elite Features", href: "#", icon: Crown },
            ].map((item, index) => (
              <Link key={item.name} href={item.href}>
                <motion.div
                  whileHover={{ y: -2, scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="text-muted-foreground hover:text-foreground transition-colors relative group flex items-center space-x-1"
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  <span>{item.name}</span>
                  {item.name === "Elite Features" && (
                    <Crown className="w-3 h-3 text-amber-500 absolute -top-1 -right-3" />
                  )}
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-500"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/login">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="border-border hover:bg-muted">
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </motion.div>
            </Link>
            <Link href="/signup">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white shadow-lg">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Sign Up
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Live Ticker */}
      <div className="fixed top-16 w-full z-40">
        <LiveTicker />
      </div>

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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Advanced Chart */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <AdvancedChart />
            </motion.div>

            {/* Market Sentiment */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <MarketSentiment />
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
