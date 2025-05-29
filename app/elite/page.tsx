"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/Navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Crown,
  Diamond,
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
  Sparkles,
  Shield,
  Target,
  Star,
  BarChart3,
  Settings,
  Bell,
  MessageSquare,
  HelpCircle,
  BookOpen,
  Video,
  Headphones,
  Calendar,
  Clock,
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
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for elite features
const mockEliteData = {
  features: [
    {
      title: "Advanced Trading Tools",
      description: "Access to professional-grade trading tools and indicators",
      icon: CandlestickChart,
      color: "amber",
      benefits: [
        "Real-time market analysis",
        "Advanced charting capabilities",
        "Custom indicators",
        "Automated trading strategies",
      ],
    },
    {
      title: "Priority Support",
      description: "24/7 dedicated support from our expert team",
      icon: Headphones,
      color: "blue",
      benefits: [
        "Direct access to senior analysts",
        "Priority ticket resolution",
        "Personal account manager",
        "Weekly strategy calls",
      ],
    },
    {
      title: "Exclusive Research",
      description: "In-depth market research and analysis reports",
      icon: BookOpen,
      color: "purple",
      benefits: [
        "Daily market insights",
        "Institutional-grade research",
        "Early access to reports",
        "Custom research requests",
      ],
    },
    {
      title: "Portfolio Management",
      description: "Professional portfolio management tools",
      icon: PieChart,
      color: "green",
      benefits: [
        "Portfolio optimization",
        "Risk management tools",
        "Performance analytics",
        "Rebalancing automation",
      ],
    },
  ],
  testimonials: [
    {
      name: "John Smith",
      role: "Professional Trader",
      content: "CoinCanvas Elite has transformed my trading experience. The advanced tools and insights are invaluable.",
      avatar: "JS",
    },
    {
      name: "Sarah Johnson",
      role: "Investment Manager",
      content: "The research quality and support team are exceptional. Worth every penny for serious traders.",
      avatar: "SJ",
    },
    {
      name: "Michael Chen",
      role: "Crypto Enthusiast",
      content: "The automated trading features and market analysis have significantly improved my returns.",
      avatar: "MC",
    },
  ],
  upcomingEvents: [
    {
      title: "Market Analysis Webinar",
      date: "2024-03-20T15:00:00Z",
      type: "webinar",
      speaker: "Dr. Emily Brown",
    },
    {
      title: "Trading Strategy Workshop",
      date: "2024-03-22T14:00:00Z",
      type: "workshop",
      speaker: "James Wilson",
    },
    {
      title: "Q1 Portfolio Review",
      date: "2024-03-25T16:00:00Z",
      type: "review",
      speaker: "Sarah Johnson",
    },
  ],
}

// Feature Card Component
const FeatureCard = ({ feature, index }) => {
  const Icon = feature.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="bg-card/50 backdrop-blur-xl border-border shadow-2xl hover:shadow-amber-500/10 transition-all duration-300">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-lg bg-${feature.color}-500/20 flex items-center justify-center`}>
              <Icon className={`w-6 h-6 text-${feature.color}-500`} />
            </div>
            <div>
              <CardTitle className="text-foreground">{feature.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {feature.benefits.map((benefit, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center space-x-2 text-sm"
              >
                <Sparkles className={`w-4 h-4 text-${feature.color}-500`} />
                <span>{benefit}</span>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Testimonial Card Component
const TestimonialCard = ({ testimonial, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="bg-card/50 backdrop-blur-xl border-border shadow-2xl">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center">
              <span className="text-white font-bold">{testimonial.avatar}</span>
            </div>
            <div>
              <div className="font-semibold">{testimonial.name}</div>
              <div className="text-sm text-muted-foreground mb-2">{testimonial.role}</div>
              <p className="text-sm">{testimonial.content}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Event Card Component
const EventCard = ({ event, index }) => {
  const getEventIcon = (type) => {
    switch (type) {
      case "webinar":
        return Video
      case "workshop":
        return BookOpen
      case "review":
        return BarChart3
      default:
        return Calendar
    }
  }

  const Icon = getEventIcon(event.type)
  const eventDate = new Date(event.date)

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="bg-card/50 backdrop-blur-xl border-border shadow-2xl">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <Icon className="w-6 h-6 text-amber-500" />
            </div>
            <div className="flex-1">
              <div className="font-semibold mb-1">{event.title}</div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {eventDate.toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {eventDate.toLocaleTimeString()}
                </div>
              </div>
              <div className="text-sm text-muted-foreground mt-1">Speaker: {event.speaker}</div>
            </div>
            <Button variant="outline" size="sm">
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function ElitePage() {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("features")

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
        {/* Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Elite Features</h1>
              <p className="text-muted-foreground">Unlock premium trading tools and exclusive benefits</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <HelpCircle className="w-4 h-4 mr-2" />
                Support
              </Button>
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white">
                <Crown className="w-4 h-4 mr-2" />
                Upgrade Now
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex space-x-4 border-b border-border">
            {["features", "testimonials", "events"].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  activeSection === section
                    ? "text-amber-500 border-b-2 border-amber-500"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content Sections */}
        <AnimatePresence mode="wait">
          {activeSection === "features" && (
            <motion.div
              key="features"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
            >
              {mockEliteData.features.map((feature, index) => (
                <FeatureCard key={index} feature={feature} index={index} />
              ))}
            </motion.div>
          )}

          {activeSection === "testimonials" && (
            <motion.div
              key="testimonials"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            >
              {mockEliteData.testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} index={index} />
              ))}
            </motion.div>
          )}

          {activeSection === "events" && (
            <motion.div
              key="events"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4 mb-8"
            >
              {mockEliteData.upcomingEvents.map((event, index) => (
                <EventCard key={index} event={event} index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mb-8"
        >
          <Card className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border-amber-500/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Ready to Elevate Your Trading?</h2>
              <p className="text-muted-foreground mb-6">
                Join our elite community and gain access to premium features and exclusive benefits.
              </p>
              <Button size="lg" className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white">
                <Crown className="w-5 h-5 mr-2" />
                Upgrade to Elite
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
} 