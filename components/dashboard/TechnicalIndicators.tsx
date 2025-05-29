"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LineChart, BarChart3, Activity, Settings } from "lucide-react"

interface IndicatorData {
  name: string
  value: number
  change: number
  signal: "buy" | "sell" | "neutral"
  description: string
}

const mockIndicators: IndicatorData[] = [
  {
    name: "RSI",
    value: 65.4,
    change: 2.3,
    signal: "buy",
    description: "Relative Strength Index showing bullish momentum",
  },
  {
    name: "MACD",
    value: 1.2,
    change: 0.5,
    signal: "buy",
    description: "Moving Average Convergence Divergence indicating upward trend",
  },
  {
    name: "Bollinger Bands",
    value: 0.8,
    change: -0.2,
    signal: "neutral",
    description: "Price trading within normal volatility range",
  },
  {
    name: "Volume",
    value: 2.1e9,
    change: 15.4,
    signal: "buy",
    description: "Above average trading volume supporting price action",
  },
]

export const TechnicalIndicators = () => {
  const [selectedIndicator, setSelectedIndicator] = useState<string | null>(null)
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
            <LineChart className="w-5 h-5 mr-2 text-amber-500" />
            Technical Indicators
            <Badge className="ml-2 bg-blue-500/20 text-blue-400 border-blue-500/30">
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
        <div className="grid grid-cols-2 gap-4">
          {mockIndicators.map((indicator) => (
            <motion.div
              key={indicator.name}
              whileHover={{ scale: 1.02 }}
              className={`p-4 rounded-lg backdrop-blur-sm border border-border/30 cursor-pointer ${
                selectedIndicator === indicator.name
                  ? "bg-amber-500/10 border-amber-500/30"
                  : "bg-muted/30"
              }`}
              onClick={() => setSelectedIndicator(indicator.name)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{indicator.name}</span>
                <Badge
                  variant={
                    indicator.signal === "buy"
                      ? "success"
                      : indicator.signal === "sell"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {indicator.signal.toUpperCase()}
                </Badge>
              </div>
              <div className="text-2xl font-bold">
                {formatNumber(indicator.value)}
              </div>
              <div
                className={`text-sm ${
                  indicator.change >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {indicator.change >= 0 ? "+" : ""}
                {indicator.change}%
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {isExpanded && selectedIndicator && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 bg-muted/30 rounded-lg backdrop-blur-sm border border-border/30"
            >
              <h3 className="text-lg font-semibold mb-2">
                {selectedIndicator} Analysis
              </h3>
              <p className="text-muted-foreground">
                {mockIndicators.find((i) => i.name === selectedIndicator)?.description}
              </p>
              <div className="mt-4 h-32 bg-muted/50 rounded-lg animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
} 