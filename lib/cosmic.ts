import { createBucketClient } from '@cosmicjs/sdk'
import { DesignTheme, TimeDisplay, LayoutVariation, VisualEffect, CosmicResponse } from '@/types'

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: "staging"
})

export async function getAllDesignThemes(): Promise<DesignTheme[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'design-themes' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as DesignTheme[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch design themes');
  }
}

export async function getAllTimeDisplays(): Promise<TimeDisplay[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'time-displays' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as TimeDisplay[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch time displays');
  }
}

export async function getAllLayoutVariations(): Promise<LayoutVariation[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'layout-variations' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as LayoutVariation[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch layout variations');
  }
}

export async function getAllVisualEffects(): Promise<VisualEffect[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'visual-effects' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as VisualEffect[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch visual effects');
  }
}

export async function getAllDesignData() {
  try {
    const [themes, displays, layouts, effects] = await Promise.all([
      getAllDesignThemes(),
      getAllTimeDisplays(),
      getAllLayoutVariations(),
      getAllVisualEffects()
    ]);

    return {
      themes,
      displays,
      layouts,
      effects
    };
  } catch (error) {
    console.error('Error fetching design data:', error);
    throw new Error('Failed to fetch design data');
  }
}