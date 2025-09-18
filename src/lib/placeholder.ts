// Placeholder image utility
export const PLACEHOLDER_IMAGE = '/placeholder-performer.svg'

// Get placeholder with optional text overlay
export function getPlaceholder(text?: string): string {
  if (!text) return PLACEHOLDER_IMAGE
  
  // For dynamic text, we'd normally generate this server-side
  // For now, return the default placeholder
  return PLACEHOLDER_IMAGE
}

// Placeholder for different types of content
export const placeholders = {
  artist: PLACEHOLDER_IMAGE,
  album: PLACEHOLDER_IMAGE,
  event: PLACEHOLDER_IMAGE,
  news: PLACEHOLDER_IMAGE,
  video: PLACEHOLDER_IMAGE,
  user: PLACEHOLDER_IMAGE,
  default: PLACEHOLDER_IMAGE
}