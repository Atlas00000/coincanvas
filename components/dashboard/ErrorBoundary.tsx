"use client"

import { Component, ErrorInfo, ReactNode } from "react"
import { motion } from "framer-motion"
import { AlertCircle } from "lucide-react"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />
    }

    return this.props.children
  }
}

export const ErrorFallback = ({ error }: { error: Error | null }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-card/50 backdrop-blur-xl border border-border rounded-lg shadow-lg"
    >
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <AlertCircle className="w-12 h-12 text-red-500" />
        </motion.div>
        <h3 className="text-lg font-semibold text-foreground">Something went wrong</h3>
        <p className="text-muted-foreground">
          {error?.message || "An unexpected error occurred. Please try again."}
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
        >
          Try Again
        </motion.button>
      </div>
    </motion.div>
  )
} 