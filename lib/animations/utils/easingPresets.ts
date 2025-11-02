/**
 * Easing Presets
 * 
 * Pierre brand-specific easing functions for consistent animations.
 * Aligned with brand personality: calm, intelligent, approachable.
 */

/**
 * Easing presets matching Pierre brand identity
 */
export const easingPresets = {
  /**
   * Calm - smooth, gentle animations
   * Use for: subtle entrances, gentle transitions
   */
  calm: 'ease.out',
  
  /**
   * Intelligent - sophisticated, refined animations
   * Use for: important elements, hero sections
   */
  intelligent: 'power2.out',
  
  /**
   * Dramatic - more pronounced animations
   * Use for: hero reveals, major CTAs
   */
  dramatic: 'power3.out',
  
  /**
   * Approachable - friendly, interactive animations
   * Use for: hover states, micro-interactions
   */
  approachable: 'ease.inOut',
  
  /**
   * Snappy - quick, responsive animations
   * Use for: button clicks, immediate feedback
   */
  snappy: 'power1.inOut',
} as const;

/**
 * Type for easing preset names
 */
export type EasingPreset = keyof typeof easingPresets;

/**
 * Get easing string from preset name
 * @param preset - Easing preset name
 * @returns Easing string for GSAP
 */
export function getEasing(preset: EasingPreset): string {
  return easingPresets[preset];
}

