"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Moon, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

const themes = [
  { value: "light", icon: Sun, label: "Light" },
  { value: "dark", icon: Moon, label: "Dark" },
  { value: "system", icon: Monitor, label: "System" },
]

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-10 h-10" /> // Placeholder to prevent layout shift
  }

  const currentTheme = themes.find((t) => t.value === theme) || themes[0]

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-background/80 backdrop-blur-xl border border-border rounded-lg shadow-xl overflow-hidden z-50"
          >
            {themes.map((t) => (
              <motion.button
                key={t.value}
                onClick={() => {
                  setTheme(t.value)
                  setIsOpen(false)
                }}
                whileHover={{ backgroundColor: "rgba(245, 158, 11, 0.1)" }}
                className={`w-full px-4 py-2 flex items-center space-x-2 text-left ${
                  theme === t.value ? "text-amber-500" : "text-foreground"
                }`}
              >
                <t.icon className="w-4 h-4" />
                <span>{t.label}</span>
                {theme === t.value && (
                  <motion.div
                    layoutId="activeTheme"
                    className="w-1 h-1 bg-amber-500 rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 