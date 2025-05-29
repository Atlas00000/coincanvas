"use client"

import { motion } from "framer-motion"

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full"
      />
    </div>
  )
}

export const LoadingCard = () => {
  return (
    <div className="p-6 bg-card/50 backdrop-blur-xl border border-border rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="h-6 w-32 bg-muted/50 rounded animate-pulse" />
        <div className="h-6 w-24 bg-muted/50 rounded animate-pulse" />
      </div>
      <div className="h-64 bg-muted/30 rounded-lg animate-pulse" />
      <div className="grid grid-cols-3 gap-4 mt-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-muted/30 rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  )
} 