'use client'

import { useState, useEffect } from 'react'
import { DesignConfiguration } from '@/types'
import { 
  formatTime, 
  generateDynamicStyles, 
  generateTimeDisplayStyles, 
  generateLayoutStyles,
  generateContainerStyles,
  seedRandomization
} from '@/lib/design-generator'

interface TimeDisplayProps {
  config: DesignConfiguration
}

export default function TimeDisplay({ config }: TimeDisplayProps) {
  const [currentTime, setCurrentTime] = useState('')
  const [mounted, setMounted] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Force re-randomization on component mount
  useEffect(() => {
    seedRandomization();
    setIsClient(true);
  }, []);

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

  // Generate dynamic styles with client-side enhancement
  const dynamicStyles = generateDynamicStyles(config)
  const timeDisplayStyles = generateTimeDisplayStyles(config)
  const layoutStyles = generateLayoutStyles(config)
  const containerStyles = generateContainerStyles(config)

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-6xl animate-pulse">⏰</div>
      </div>
    )
  }

  return (
    <>
      {/* Inject dynamic styles */}
      <style jsx global>{dynamicStyles}</style>
      
      <div 
        className={`dynamic-background min-h-screen relative ${config.theme.slug === 'neon-cyber' ? 'cyber-background' : ''}`}
        style={{
          background: config.theme.metadata?.background_config?.gradient || 
                     config.theme.metadata?.color_palette?.background || 
                     '#f5f7fa',
          backgroundAttachment: 'fixed',
          overflow: 'hidden'
        }}
      >
        {/* Time display container with dynamic positioning */}
        <div
          className="absolute"
          style={layoutStyles}
        >
          <div
            className="time-display select-none"
            style={{
              ...containerStyles,
              ...timeDisplayStyles,
            }}
          >
            {currentTime}
          </div>
        </div>

        {/* Refresh hint for users */}
        <div className="fixed bottom-4 right-4 text-xs opacity-30 hover:opacity-80 transition-opacity">
          <span className="bg-black/20 text-white px-2 py-1 rounded">
            Refresh for new design ↻
          </span>
        </div>

        {/* Debug info in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed top-4 left-4 bg-black/80 text-white p-3 rounded text-xs font-mono max-w-xs">
            <div className="font-bold mb-1">Random Design Config:</div>
            <div>🎨 Theme: {config.theme.title}</div>
            <div>⏰ Display: {config.timeDisplay.title}</div>
            <div>📐 Layout: {config.layout.title}</div>
            <div>🎭 Effect: {config.visualEffect.title}</div>
            <div className="mt-2 text-yellow-300">Refresh to randomize!</div>
          </div>
        )}
      </div>
    </>
  )
}