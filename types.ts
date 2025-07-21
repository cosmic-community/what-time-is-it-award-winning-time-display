// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Design Theme interface
export interface DesignTheme extends CosmicObject {
  type: 'design-themes';
  metadata: {
    theme_name?: string;
    primary_font?: string;
    secondary_font?: string;
    color_palette?: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      text: string;
    };
    background_style?: {
      key: BackgroundStyle;
      value: string;
    };
    background_config?: {
      gradient?: string;
      fallback?: string;
    };
    css_variables?: string;
  };
}

// Time Display interface
export interface TimeDisplay extends CosmicObject {
  type: 'time-displays';
  metadata: {
    display_name?: string;
    time_format?: {
      key: TimeFormat;
      value: string;
    };
    font_size_range?: string;
    font_weight?: {
      key: FontWeight;
      value: string;
    };
    text_alignment?: {
      key: TextAlignment;
      value: string;
    };
    letter_spacing?: string;
  };
}

// Layout Variation interface
export interface LayoutVariation extends CosmicObject {
  type: 'layout-variations';
  metadata: {
    layout_name?: string;
    positioning_type?: {
      key: PositioningType;
      value: string;
    };
    position_config?: Record<string, any>;
    container_styling?: Record<string, any>;
    responsive_rules?: Record<string, any>;
  };
}

// Visual Effect interface
export interface VisualEffect extends CosmicObject {
  type: 'visual-effects';
  metadata: {
    effect_name?: string;
    animation_type?: {
      key: AnimationType;
      value: string;
    };
    animation_duration?: string;
    animation_config?: {
      keyframes?: string;
      timingFunction?: string;
      iterationCount?: string;
      delay?: string;
    };
    trigger_type?: {
      key: TriggerType;
      value: string;
    };
  };
}

// Type literals for select-dropdown values
export type BackgroundStyle = 'gradient' | 'solid' | 'image' | 'pattern';
export type TimeFormat = '12hour' | '24hour' | 'minimal';
export type FontWeight = '100' | '300' | '400' | '600' | '700' | '900';
export type TextAlignment = 'center' | 'left' | 'right';
export type PositioningType = 'center' | 'offset' | 'corner' | 'floating';
export type AnimationType = 'fade' | 'pulse' | 'glow' | 'slide' | 'rotate' | 'scale';
export type TriggerType = 'continuous' | 'interval' | 'hover' | 'load';

// Combined design configuration for randomization
export interface DesignConfiguration {
  theme: DesignTheme;
  timeDisplay: TimeDisplay;
  layout: LayoutVariation;
  visualEffect: VisualEffect;
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards for runtime validation
export function isDesignTheme(obj: CosmicObject): obj is DesignTheme {
  return obj.type === 'design-themes';
}

export function isTimeDisplay(obj: CosmicObject): obj is TimeDisplay {
  return obj.type === 'time-displays';
}

export function isLayoutVariation(obj: CosmicObject): obj is LayoutVariation {
  return obj.type === 'layout-variations';
}

export function isVisualEffect(obj: CosmicObject): obj is VisualEffect {
  return obj.type === 'visual-effects';
}