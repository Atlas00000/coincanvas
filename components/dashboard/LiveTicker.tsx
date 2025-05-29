"use client"

import { motion } from "framer-motion"
import { FixedSizeList as List } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"

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

const CryptoItem = ({ index, style }: { index: number; style: React.CSSProperties }) => {
  const crypto = cryptos[index % cryptos.length]
  
  return (
    <motion.div
      style={style}
      whileHover={{ scale: 1.02 }}
      className="flex items-center space-x-3 whitespace-nowrap cursor-pointer group px-4"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        className="w-2 h-2 bg-amber-500 rounded-full"
      />
      <span className="font-bold text-foreground group-hover:text-amber-500 transition-colors">
        {crypto.symbol}
      </span>
      <span className="text-muted-foreground">{crypto.price}</span>
      <span
        className={`font-medium ${crypto.positive ? "text-green-500" : "text-red-500"}`}
      >
        {crypto.change}
      </span>
    </motion.div>
  )
}

export const LiveTicker = () => {
  return (
    <div className="overflow-hidden bg-background/50 backdrop-blur-xl border-y border-border relative">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-yellow-500/10 to-amber-500/5" />
      <div className="relative z-10 h-12">
        <AutoSizer>
          {({ width, height }) => (
            <List
              height={height}
              itemCount={cryptos.length * 2}
              itemSize={200}
              layout="horizontal"
              width={width}
              className="scrollbar-hide"
            >
              {CryptoItem}
            </List>
          )}
        </AutoSizer>
      </div>
    </div>
  )
} 