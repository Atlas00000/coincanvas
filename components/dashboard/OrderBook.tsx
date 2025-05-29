"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, ArrowUp, ArrowDown } from "lucide-react"

interface OrderBookEntry {
  price: number
  size: number
  total: number
  type: "bid" | "ask"
}

interface OrderBookData {
  bids: OrderBookEntry[]
  asks: OrderBookEntry[]
  spread: number
  lastPrice: number
}

const generateMockOrderBook = (): OrderBookData => {
  const basePrice = 43250
  const bids: OrderBookEntry[] = []
  const asks: OrderBookEntry[] = []

  // Generate bids
  for (let i = 0; i < 10; i++) {
    const price = basePrice - i * 10
    const size = Math.random() * 2 + 0.1
    bids.push({
      price,
      size,
      total: size,
      type: "bid",
    })
  }

  // Generate asks
  for (let i = 0; i < 10; i++) {
    const price = basePrice + i * 10
    const size = Math.random() * 2 + 0.1
    asks.push({
      price,
      size,
      total: size,
      type: "ask",
    })
  }

  // Calculate totals
  let runningTotal = 0
  for (const bid of bids) {
    runningTotal += bid.size
    bid.total = runningTotal
  }
  runningTotal = 0
  for (const ask of asks) {
    runningTotal += ask.size
    ask.total = runningTotal
  }

  return {
    bids,
    asks,
    spread: 20,
    lastPrice: basePrice,
  }
}

export const OrderBook = () => {
  const [data, setData] = useState<OrderBookData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setData(generateMockOrderBook())
      setIsLoading(false)
    }

    fetchData()
    const interval = setInterval(fetchData, 5000)
    return () => clearInterval(interval)
  }, [])

  if (isLoading || !data) {
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

  const formatNumber = (num: number) =>
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num)

  const maxTotal = Math.max(
    ...data.bids.map((b) => b.total),
    ...data.asks.map((a) => a.total)
  )

  return (
    <Card className="bg-card/50 backdrop-blur-xl border-border shadow-2xl">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-foreground">
            <BookOpen className="w-5 h-5 mr-2 text-amber-500" />
            Order Book
            <Badge className="ml-2 bg-green-500/20 text-green-400 border-green-500/30">
              LIVE
            </Badge>
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            Spread: ${formatNumber(data.spread)}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {/* Asks (Sell Orders) */}
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground mb-2">Asks</div>
            {data.asks.map((ask, index) => (
              <motion.div
                key={ask.price}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="relative h-8"
              >
                <div
                  className="absolute inset-0 bg-red-500/10"
                  style={{
                    width: `${(ask.total / maxTotal) * 100}%`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-between px-2 text-sm">
                  <span className="text-red-500">${formatNumber(ask.price)}</span>
                  <span>{formatNumber(ask.size)}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bids (Buy Orders) */}
          <div className="space-y-1">
            <div className="text-sm text-muted-foreground mb-2">Bids</div>
            {data.bids.map((bid, index) => (
              <motion.div
                key={bid.price}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="relative h-8"
              >
                <div
                  className="absolute inset-0 bg-green-500/10"
                  style={{
                    width: `${(bid.total / maxTotal) * 100}%`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-between px-2 text-sm">
                  <span className="text-green-500">${formatNumber(bid.price)}</span>
                  <span>{formatNumber(bid.size)}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Last Price */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-muted/30 rounded-lg backdrop-blur-sm border border-border/30"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Last Price</span>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold">${formatNumber(data.lastPrice)}</span>
              <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ArrowUp className="w-4 h-4 text-green-500" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
} 