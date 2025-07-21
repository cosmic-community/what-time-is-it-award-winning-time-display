'use client'

import { useState, useEffect } from 'react'
import { DesignConfiguration, DesignTheme, TimeDisplay as TimeDisplayType, LayoutVariation, VisualEffect } from '@/types'
import { 
  formatTime, 
  generateDynamicStyles, 
  generateTimeDisplayStyles, 
  generateLayoutStyles,
  generateContainerStyles,
  generateRandomDesign
} from '@/lib/design-generator'

interface TimeDisplayProps {
  themes: DesignTheme[]
  displays: TimeDisplayType[]
  layouts: LayoutVariation[]
  effects: VisualEffect[]
}

export default function TimeDisplay({ themes, displays, layouts, effects }: TimeDisplayProps) {
  const [currentTime, setCurrentTime] = useState('')
  const [mounted, setMounted] = useState(false)
  const [config, setConfig] = useState<DesignConfiguration | null>(null)

  // Generate random design configuration on client side
  useEffect(() => {
    const randomConfig = generateRandomDesign(themes, displays, layouts, effects)
    setConfig(randomConfig)
  }, [themes, displays, layouts, effects])

  // Update time every second
  useEffect(() => {
    if (!config) return

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
  }, [config])

  // Don't render until we have a config and are mounted
  if (!mounted || !config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-4xl animate-pulse">⏰</div>
      </div>
    )
  }

  // Generate dynamic styles
  const dynamicStyles = generateDynamicStyles(config)
  const timeDisplayStyles = generateTimeDisplayStyles(config)
  const layoutStyles = generateLayoutStyles(config)
  const containerStyles = generateContainerStyles(config)

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