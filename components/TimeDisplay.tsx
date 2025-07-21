'use client'

import { useState, useEffect } from 'react'
import { DesignConfiguration, DesignData } from '@/types'
import { 
  generateRandomDesign,
  formatTime, 
  generateDynamicStyles, 
  generateTimeDisplayStyles, 
  generateLayoutStyles,
  generateContainerStyles 
} from '@/lib/design-generator'

interface TimeDisplayProps {
  designData: DesignData
}

export default function TimeDisplay({ designData }: TimeDisplayProps) {
  const [currentTime, setCurrentTime] = useState('')
  const [config, setConfig] = useState<DesignConfiguration | null>(null)
  const [mounted, setMounted] = useState(false)

  // Generate new random design on component mount (every page visit)
  useEffect(() => {
    const newConfig = generateRandomDesign(
      designData.themes,
      designData.displays,
      designData.layouts,
      designData.effects
    );
    
    if (newConfig) {
      setConfig(newConfig);
      console.log('🎨 New design generated:', {
        theme: newConfig.theme.title,
        display: newConfig.timeDisplay.title,
        layout: newConfig.layout.title,
        effect: newConfig.visualEffect.title
      });
    }
  }, [designData]);

  // Update time every second
  useEffect(() => {
    if (!config) return;

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

  // Don't render until we have both config and mounted state
  if (!mounted || !config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-6xl animate-pulse">⏰</div>
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
        className="dynamic-background min-h-screen relative transition-all duration-1000"
        style={{
          background: config.theme.metadata?.background_config?.gradient || 
                     config.theme.metadata?.color_palette?.background || 
                     '#f5f7fa'
        }}
      >
        {/* Time display container with dynamic positioning */}
        <div
          className="absolute transition-all duration-1000"
          style={layoutStyles}
        >
          <div
            className="time-display transition-all duration-1000"
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
            <div className="mt-1 text-green-300">🔄 Refresh to see new design</div>
          </div>
        )}
      </div>
    </>
  )
}