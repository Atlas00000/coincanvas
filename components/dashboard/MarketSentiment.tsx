"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, MessageSquare, Share2, Heart, Zap, AlertTriangle } from "lucide-react"

interface NewsItem {
  title: string
  summary: string
  source: string
  time: string
  sentiment: "bullish" | "bearish" | "neutral"
  engagement: {
    likes: number
    shares: number
    comments: number
  }
}

const mockNews: NewsItem[] = [
  {
    title: "Bitcoin ETF Sees Record Inflows",
    summary: "Institutional adoption continues to drive market sentiment as Bitcoin ETF inflows reach new heights...",
    source: "CryptoNews",
    time: "2 hours ago",
    sentiment: "bullish",
    engagement: {
      likes: 1234,
      shares: 567,
      comments: 89
    }
  },
  {
    title: "Ethereum 2.0 Staking Reaches New Milestone",
    summary: "Over 32 million ETH now staked in the network, showing strong community confidence...",
    source: "ETHNews",
    time: "4 hours ago",
    sentiment: "bullish",
    engagement: {
      likes: 987,
      shares: 432,
      comments: 76
    }
  },
  {
    title: "Regulatory Clarity Expected in Q2",
    summary: "Major jurisdictions moving towards comprehensive frameworks for crypto regulation...",
    source: "CryptoReg",
    time: "6 hours ago",
    sentiment: "neutral",
    engagement: {
      likes: 654,
      shares: 321,
      comments: 54
    }
  }
]

export const MarketSentiment = () => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)
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
            <MessageSquare className="w-5 h-5 mr-2 text-amber-500" />
            Market Sentiment
            <Badge className="ml-2 bg-purple-500/20 text-purple-400 border-purple-500/30">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Market Sentiment Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg bg-muted/30 backdrop-blur-sm border border-border/30"
          >
            <h3 className="text-lg font-semibold mb-4">Overall Sentiment</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Bullish</span>
                <div className="flex items-center space-x-2">
                  <span className="text-green-500 font-bold">65%</span>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Bearish</span>
                <div className="flex items-center space-x-2">
                  <span className="text-red-500 font-bold">25%</span>
                  <TrendingDown className="w-4 h-4 text-red-500" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Neutral</span>
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-500 font-bold">10%</span>
                  <Zap className="w-4 h-4 text-yellow-500" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Social Media Trends */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4 rounded-lg bg-muted/30 backdrop-blur-sm border border-border/30"
          >
            <h3 className="text-lg font-semibold mb-4">Social Trends</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Twitter Mentions</span>
                <span className="font-bold">+45%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Reddit Activity</span>
                <span className="font-bold">+32%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">News Coverage</span>
                <span className="font-bold">+28%</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* News Feed */}
        <div className="mt-6 space-y-4">
          {mockNews.map((news, index) => (
            <motion.div
              key={news.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg backdrop-blur-sm border border-border/30 cursor-pointer ${
                selectedNews === news
                  ? "bg-amber-500/10 border-amber-500/30"
                  : "bg-muted/30"
              }`}
              onClick={() => setSelectedNews(news)}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold">{news.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{news.summary}</p>
                </div>
                <Badge
                  variant={
                    news.sentiment === "bullish"
                      ? "success"
                      : news.sentiment === "bearish"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {news.sentiment.toUpperCase()}
                </Badge>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>{news.source}</span>
                  <span>•</span>
                  <span>{news.time}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>{formatNumber(news.engagement.likes)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Share2 className="w-4 h-4" />
                    <span>{formatNumber(news.engagement.shares)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>{formatNumber(news.engagement.comments)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expanded News View */}
        <AnimatePresence>
          {isExpanded && selectedNews && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 bg-muted/30 rounded-lg backdrop-blur-sm border border-border/30"
            >
              <h3 className="text-lg font-semibold mb-2">Detailed Analysis</h3>
              <p className="text-muted-foreground mb-4">{selectedNews.summary}</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Market Impact</h4>
                  <p className="text-sm text-muted-foreground">
                    This news is expected to have a {selectedNews.sentiment} impact on the market...
                  </p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">Community Response</h4>
                  <p className="text-sm text-muted-foreground">
                    Community sentiment is trending {selectedNews.sentiment} with high engagement...
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