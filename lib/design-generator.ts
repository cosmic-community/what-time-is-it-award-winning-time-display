import { DesignTheme, TimeDisplay, LayoutVariation, VisualEffect, DesignConfiguration } from '@/types'

export function generateRandomDesign(
  themes: DesignTheme[],
  displays: TimeDisplay[], 
  layouts: LayoutVariation[],
  effects: VisualEffect[]
): DesignConfiguration | null {
  // Ensure we have content for each type
  if (!themes.length || !displays.length || !layouts.length || !effects.length) {
    console.warn('Missing content for random design generation:', {
      themes: themes.length,
      displays: displays.length,
      layouts: layouts.length,
      effects: effects.length
    });
    return null;
  }

  // Add randomization seed based on current timestamp for more variety
  const seed = Date.now();
  const random = (index: number) => Math.floor((Math.sin(seed + index) * 10000) % 1 * Math.abs(Math.cos(seed + index)) + Math.random());

  // Randomly select one from each category with enhanced randomization
  const randomTheme = themes[Math.floor(random(1) * themes.length)];
  const randomDisplay = displays[Math.floor(random(2) * displays.length)];
  const randomLayout = layouts[Math.floor(random(3) * layouts.length)];
  const randomEffect = effects[Math.floor(random(4) * effects.length)];

  // Additional safety checks to ensure we have valid objects
  if (!randomTheme || !randomDisplay || !randomLayout || !randomEffect) {
    console.error('Failed to generate random design - some objects are null');
    return null;
  }

  console.log('Generated random design:', {
    theme: randomTheme.title,
    display: randomDisplay.title,
    layout: randomLayout.title,
    effect: randomEffect.title
  });

  // Return with explicit type assertion to satisfy TypeScript
  return {
    theme: randomTheme as DesignTheme,
    timeDisplay: randomDisplay as TimeDisplay,
    layout: randomLayout as LayoutVariation,
    visualEffect: randomEffect as VisualEffect
  };
}

export function formatTime(format: string): string {
  const now = new Date();
  
  switch (format) {
    case '12hour':
      return now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
    case '24hour':
      return now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
    case 'minimal':
      return now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    default:
      return now.toLocaleTimeString();
  }
}

export function generateDynamicStyles(config: DesignConfiguration): string {
  const { theme, timeDisplay, layout, visualEffect } = config;
  
  let styles = '';

  // Base theme colors and fonts with fallbacks
  if (theme.metadata?.color_palette) {
    styles += `
      :root {
        --primary-color: ${theme.metadata.color_palette.primary || '#000000'};
        --secondary-color: ${theme.metadata.color_palette.secondary || '#666666'};
        --accent-color: ${theme.metadata.color_palette.accent || '#ff0000'};
        --background-color: ${theme.metadata.color_palette.background || '#ffffff'};
        --text-color: ${theme.metadata.color_palette.text || '#333333'};
        --primary-font: ${theme.metadata.primary_font || 'Inter, sans-serif'};
        --secondary-font: ${theme.metadata.secondary_font || 'monospace'};
      }
    `;
  }

  // Custom CSS variables from theme
  if (theme.metadata?.css_variables) {
    styles += `
      :root {
        ${theme.metadata.css_variables}
      }
    `;
  }

  // Animation keyframes from visual effect with unique naming
  if (visualEffect.metadata?.animation_config?.keyframes) {
    const animationName = `effect-${visualEffect.slug}-${Date.now()}`;
    styles += `
      @keyframes ${animationName} {
        ${visualEffect.metadata.animation_config.keyframes}
      }
      
      .time-display {
        animation-name: ${animationName} !important;
      }
    `;
  }

  // Background styling from theme with enhanced support
  if (theme.metadata?.background_config?.gradient) {
    styles += `
      .dynamic-background {
        background: ${theme.metadata.background_config.gradient} !important;
        background-attachment: fixed;
      }
    `;
  }

  // Special cyber theme effects
  if (theme.slug === 'neon-cyber') {
    styles += `
      .dynamic-background {
        position: relative;
      }
      
      .dynamic-background::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--scan-lines);
        pointer-events: none;
        opacity: 0.1;
        z-index: 1;
      }
      
      .time-display {
        position: relative;
        z-index: 2;
      }
    `;
  }

  return styles;
}

export function generateTimeDisplayStyles(config: DesignConfiguration): Record<string, any> {
  const { theme, timeDisplay, visualEffect } = config;
  
  const styles: Record<string, any> = {};

  // Typography from time display with enhanced responsive support
  if (timeDisplay.metadata?.font_size_range) {
    styles.fontSize = timeDisplay.metadata.font_size_range;
  }
  
  if (timeDisplay.metadata?.font_weight?.key) {
    styles.fontWeight = timeDisplay.metadata.font_weight.key;
  }

  if (timeDisplay.metadata?.letter_spacing) {
    styles.letterSpacing = timeDisplay.metadata.letter_spacing;
  }

  if (timeDisplay.metadata?.text_alignment?.key) {
    styles.textAlign = timeDisplay.metadata.text_alignment.key;
  }

  // Colors from theme with CSS variable fallbacks
  styles.color = 'var(--text-color)';

  // Font family from theme with CSS variable fallbacks
  styles.fontFamily = 'var(--primary-font)';

  // Enhanced animation from visual effect
  if (visualEffect.metadata?.animation_duration && visualEffect.metadata?.animation_config) {
    const duration = visualEffect.metadata.animation_duration;
    const timingFunction = visualEffect.metadata.animation_config.timingFunction || 'ease';
    const iterationCount = visualEffect.metadata.animation_config.iterationCount || '1';
    const delay = visualEffect.metadata.animation_config.delay || '0s';
    
    styles.animationDuration = duration;
    styles.animationTimingFunction = timingFunction;
    styles.animationIterationCount = iterationCount;
    styles.animationDelay = delay;
    styles.animationFillMode = 'both';
  }

  // Special effects based on theme
  if (theme.slug === 'neon-cyber') {
    styles.textShadow = 'var(--neon-glow)';
  }

  return styles;
}

export function generateLayoutStyles(config: DesignConfiguration): Record<string, any> {
  const { layout } = config;
  
  if (!layout.metadata?.position_config) {
    // Fallback to center positioning
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
      top: 0,
      left: 0,
    };
  }

  const styles = { ...layout.metadata.position_config };
  
  // Ensure responsive behavior on mobile
  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    const responsiveRules = layout.metadata?.responsive_rules?.mobile;
    if (responsiveRules) {
      Object.assign(styles, responsiveRules);
    }
  }

  return styles;
}

export function generateContainerStyles(config: DesignConfiguration): Record<string, any> {
  const { layout, theme } = config;
  
  const styles: Record<string, any> = {};
  
  if (layout.metadata?.container_styling) {
    Object.assign(styles, layout.metadata.container_styling);
  }

  // Add theme-specific styling enhancements
  if (theme.slug === 'bold-geometric') {
    styles.boxShadow = 'var(--geometric-shadow)';
  } else if (theme.slug === 'organic-flow') {
    styles.boxShadow = 'var(--organic-shadow)';
  } else if (theme.slug === 'minimal-zen') {
    styles.boxShadow = 'var(--shadow-subtle)';
  }

  // Ensure proper transitions
  styles.transition = 'var(--transition-smooth)';

  return styles;
}

// Utility function to force re-randomization on page refresh
export function seedRandomization(): void {
  // Force browser to treat each page load as unique
  if (typeof window !== 'undefined') {
    const timestamp = Date.now();
    window.history.replaceState({}, '', `${window.location.pathname}?t=${timestamp}`);
  }
}