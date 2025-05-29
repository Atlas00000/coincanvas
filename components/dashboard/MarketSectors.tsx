"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Layers, Coins, GamepadIcon, Image, Globe, Zap } from "lucide-react"

interface SectorData {
  name: string
  value: number
  change: number
  volume: number
  topCoins: string[]
  icon: any
}

const mockSectors: SectorData[] = [
  {
    name: "DeFi",
    value: 89.2e9,
    change: 12.4,
    volume: 15.6e9,
    topCoins: ["UNI", "AAVE", "MKR"],
    icon: Coins
  },
  {
    name: "Layer 1",
    value: 456.7e9,
    change: 8.9,
    volume: 45.2e9,
    topCoins: ["ETH", "SOL", "AVAX"],
    icon: Layers
  },
  {
    name: "NFTs",
    value: 15.7e9,
    change: 6.2,
    volume: 2.1e9,
    topCoins: ["APE", "SAND", "MANA"],
    icon: Image
  },
  {
    name: "Gaming",
    value: 12.1e9,
    change: -2.1,
    volume: 1.8e9,
    topCoins: ["AXS", "ENJ", "GALA"],
    icon: GamepadIcon
  },
  {
    name: "Metaverse",
    value: 8.9e9,
    change: -1.5,
    volume: 1.2e9,
    topCoins: ["SAND", "MANA", "ENJ"],
    icon: Globe
  }
]

export const MarketSectors = () => {
  const [selectedSector, setSelectedSector] = useState<SectorData | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  const formatNumber = (num: number) =>
    new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(num)

  return (
    <Card className="bg-card/50 backdrop-blur-xl border-border shadow-2xl">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-foreground">
            <Layers className="w-5 h-5 mr-2 text-amber-500" />
            Market Sectors
            <Badge className="ml-2 bg-indigo-500/20 text-indigo-400 border-indigo-500/30">
              LIVE
            </Badge>
          </CardTitle>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Show Less" : "Show More"}
            </Button>
          </motion.div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockSectors.map((sector, index) => (
            <motion.div
              key={sector.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg backdrop-blur-sm border border-border/30 cursor-pointer ${
                selectedSector === sector
                  ? "bg-amber-500/10 border-amber-500/30"
                  : "bg-muted/30"
              }`}
              onClick={() => setSelectedSector(sector)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <sector.icon className="w-5 h-5 text-amber-500" />
                  <h3 className="font-semibold">{sector.name}</h3>
                </div>
                <Badge
                  variant={sector.change >= 0 ? "success" : "destructive"}
                >
                  {sector.change >= 0 ? "+" : ""}
                  {sector.change}%
                </Badge>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Market Cap</span>
                  <span className="font-medium">${formatNumber(sector.value)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">24h Volume</span>
                  <span className="font-medium">${formatNumber(sector.volume)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Top Coins</span>
                  <div className="flex items-center space-x-1">
                    {sector.topCoins.map((coin) => (
                      <span key={coin} className="font-medium">{coin}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sector Details */}
        <AnimatePresence>
          {isExpanded && selectedSector && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 p-4 bg-muted/30 rounded-lg backdrop-blur-sm border border-border/30"
            >
              <h3 className="text-lg font-semibold mb-4">{selectedSector.name} Sector Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Performance Metrics</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Market Dominance</span>
                      <span className="font-medium">{(selectedSector.value / 1000e9 * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Volume/Market Cap</span>
                      <span className="font-medium">{(selectedSector.volume / selectedSector.value * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Active Projects</span>
                      <span className="font-medium">150+</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Trend Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    The {selectedSector.name} sector is showing {selectedSector.change >= 0 ? "strong" : "weak"} momentum with
                    {selectedSector.change >= 0 ? " increasing" : " decreasing"} adoption and development activity.
                    Key metrics indicate {selectedSector.change >= 0 ? "positive" : "negative"} market sentiment.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
} 