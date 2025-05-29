"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/dashboard/ThemeToggle"
import { Home, BarChart3, Wallet, Settings, Menu, X, Activity, Crown } from "lucide-react"

export const Navbar = () => {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-16" /> // Placeholder to prevent layout shift
  }

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Market", href: "/market", icon: Activity },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Portfolio", href: "/portfolio", icon: Wallet },
    { name: "Elite", href: "/elite", icon: Crown },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center"
            >
              <span className="text-white font-bold">CC</span>
            </motion.div>
            <span className="font-bold text-xl bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
              CoinCanvas
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Right Side Items */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="hidden md:flex items-center space-x-2">
              <Link href="/login">
                <Button variant="ghost" className="hover:bg-muted">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="default" className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600">
                  Sign Up
                </Button>
              </Link>
            </div>
            <Button variant="default" className="hidden md:flex">
              Connect Wallet
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? "auto" : 0 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-2">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-muted/50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </motion.div>
              </Link>
            ))}
            <div className="space-y-2 px-4">
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full hover:bg-muted">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup" onClick={() => setIsOpen(false)}>
                <Button variant="default" className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600">
                  Sign Up
                </Button>
              </Link>
              <Button variant="default" className="w-full">
                Connect Wallet
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
} 