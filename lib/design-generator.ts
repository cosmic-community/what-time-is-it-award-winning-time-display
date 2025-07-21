import { DesignTheme, TimeDisplay, LayoutVariation, VisualEffect, DesignConfiguration } from '@/types'

export function generateRandomDesign(
  themes: DesignTheme[],
  displays: TimeDisplay[], 
  layouts: LayoutVariation[],
  effects: VisualEffect[]
): DesignConfiguration | null {
  // Ensure we have content for each type
  if (!themes.length || !displays.length || !layouts.length || !effects.length) {
    return null;
  }

  // Randomly select one from each category with proper null checks
  const randomTheme = themes[Math.floor(Math.random() * themes.length)];
  const randomDisplay = displays[Math.floor(Math.random() * displays.length)];
  const randomLayout = layouts[Math.floor(Math.random() * layouts.length)];
  const randomEffect = effects[Math.floor(Math.random() * effects.length)];

  // Additional safety checks to ensure we have valid objects
  if (!randomTheme || !randomDisplay || !randomLayout || !randomEffect) {
    return null;
  }

  return {
    theme: randomTheme,
    timeDisplay: randomDisplay,
    layout: randomLayout,
    visualEffect: randomEffect
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

  // Base theme colors and fonts
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

  // Animation keyframes from visual effect
  if (visualEffect.metadata?.animation_config?.keyframes) {
    const animationName = `effect-${visualEffect.slug}`;
    styles += `
      @keyframes ${animationName} {
        ${visualEffect.metadata.animation_config.keyframes}
      }
    `;
  }

  // Background styling from theme
  if (theme.metadata?.background_config?.gradient) {
    styles += `
      .dynamic-background {
        background: ${theme.metadata.background_config.gradient};
      }
    `;
  }

  return styles;
}

export function generateTimeDisplayStyles(config: DesignConfiguration): Record<string, any> {
  const { theme, timeDisplay, layout, visualEffect } = config;
  
  const styles: Record<string, any> = {};

  // Typography from time display
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

  // Colors from theme
  if (theme.metadata?.color_palette?.text) {
    styles.color = theme.metadata.color_palette.text;
  }

  // Font family from theme
  if (theme.metadata?.primary_font) {
    styles.fontFamily = theme.metadata.primary_font;
  }

  // Animation from visual effect
  if (visualEffect.metadata?.animation_duration && visualEffect.metadata?.animation_config) {
    const animationName = `effect-${visualEffect.slug}`;
    const duration = visualEffect.metadata.animation_duration;
    const timingFunction = visualEffect.metadata.animation_config.timingFunction || 'ease';
    const iterationCount = visualEffect.metadata.animation_config.iterationCount || '1';
    const delay = visualEffect.metadata.animation_config.delay || '0s';
    
    styles.animation = `${animationName} ${duration} ${timingFunction} ${delay} ${iterationCount}`;
  }

  return styles;
}

export function generateLayoutStyles(config: DesignConfiguration): Record<string, any> {
  const { layout } = config;
  
  if (!layout.metadata?.position_config) {
    return {};
  }

  return layout.metadata.position_config;
}

export function generateContainerStyles(config: DesignConfiguration): Record<string, any> {
  const { layout } = config;
  
  if (!layout.metadata?.container_styling) {
    return {};
  }

  return layout.metadata.container_styling;
}