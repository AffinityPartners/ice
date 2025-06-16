'use client'

import React, { Component, ReactNode } from 'react'
import { Button } from '@/components/ui/Button'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.props.onError?.(error, errorInfo)
    
    // Send error to monitoring service in production
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      // Example: window.reportError?.(error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
            We&apos;re sorry, but something unexpected happened. 
            Please try refreshing the page or contact support if the problem persists.
          </p>
          <div className="flex gap-3">
            <Button onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
            <Button variant="outline" onClick={() => this.setState({ hasError: false })}>
              Try Again
            </Button>
          </div>
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-6 text-left">
              <summary className="cursor-pointer text-sm text-gray-500 dark:text-gray-400">
                Error Details (Development)
              </summary>
              <pre className="mt-2 text-xs bg-red-50 dark:bg-red-900/20 p-4 rounded overflow-auto max-w-2xl">
                {this.state.error?.stack}
              </pre>
            </details>
          )}
        </div>
      )
    }

    return this.props.children
  }
} 