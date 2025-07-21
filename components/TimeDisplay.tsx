'use client'

import { useState, useEffect } from 'react'
import { DesignConfiguration } from '@/types'
import { 
  formatTime, 
  generateDynamicStyles, 
  generateTimeDisplayStyles, 
  generateLayoutStyles,
  generateContainerStyles 
} from '@/lib/design-generator'

interface TimeDisplayProps {
  config: DesignConfiguration
}

export default function TimeDisplay({ config }: TimeDisplayProps) {
  const [currentTime, setCurrentTime] = useState('')
  const [mounted, setMounted] = useState(false)

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const timeFormat = config.timeDisplay.metadata?.time_format?.key || '12hour'
      setCurrentTime(formatTime(timeFormat))
    }

    // Set initial time
    updateTime()
    setMounted(true)

    // Set up interval for updates
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [config.timeDisplay.metadata?.time_format?.key])

  // Generate dynamic styles
  const dynamicStyles = generateDynamicStyles(config)
  const timeDisplayStyles = generateTimeDisplayStyles(config)
  const layoutStyles = generateLayoutStyles(config)
  const containerStyles = generateContainerStyles(config)

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-4xl">⏰</div>
      </div>
    )
  }

  return (
    <>
      {/* Inject dynamic styles */}
      <style jsx global>{dynamicStyles}</style>
      
      <div 
        className="dynamic-background min-h-screen relative"
        style={{
          background: config.theme.metadata?.background_config?.gradient || 
                     config.theme.metadata?.color_palette?.background || 
                     '#f5f7fa'
        }}
      >
        {/* Time display container with dynamic positioning */}
        <div
          className="absolute"
          style={layoutStyles}
        >
          <div
            className="time-display"
            style={{
              ...containerStyles,
              ...timeDisplayStyles,
            }}
          >
            {currentTime}
          </div>
        </div>

        {/* Debug info in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed top-4 left-4 bg-black/20 text-white p-2 rounded text-xs font-mono">
            <div>Theme: {config.theme.title}</div>
            <div>Display: {config.timeDisplay.title}</div>
            <div>Layout: {config.layout.title}</div>
            <div>Effect: {config.visualEffect.title}</div>
          </div>
        )}
      </div>
    </>
  )
}