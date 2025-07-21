export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  metadata?: Record<string, any>;
}

export interface DesignTheme extends CosmicObject {
  metadata?: {
    theme_name?: string;
    primary_font?: string;
    secondary_font?: string;
    color_palette?: {
      primary?: string;
      secondary?: string;
      accent?: string;
      background?: string;
      text?: string;
    };
    background_style?: {
      key: string;
      value: string;
    };
    background_config?: {
      gradient?: string;
      fallback?: string;
    };
    css_variables?: string;
  };
}

export interface TimeDisplay extends CosmicObject {
  metadata?: {
    display_name?: string;
    time_format?: {
      key: string;
      value: string;
    };
    font_size_range?: string;
    font_weight?: {
      key: string;
      value: string;
    };
    text_alignment?: {
      key: string;
      value: string;
    };
    letter_spacing?: string;
  };
}

export interface LayoutVariation extends CosmicObject {
  metadata?: {
    layout_name?: string;
    positioning_type?: {
      key: string;
      value: string;
    };
    position_config?: Record<string, any>;
    container_styling?: Record<string, any>;
    responsive_rules?: Record<string, any>;
  };
}

export interface VisualEffect extends CosmicObject {
  metadata?: {
    effect_name?: string;
    animation_type?: {
      key: string;
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
      key: string;
      value: string;
    };
  };
}

export interface DesignConfiguration {
  theme: DesignTheme;
  timeDisplay: TimeDisplay;
  layout: LayoutVariation;
  visualEffect: VisualEffect;
}

export interface DesignData {
  themes: DesignTheme[];
  displays: TimeDisplay[];
  layouts: LayoutVariation[];
  effects: VisualEffect[];
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
}