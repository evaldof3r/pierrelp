/**
 * GSAP Configuration
 * 
 * Central configuration for GSAP animations throughout the Pierre landing page.
 * Handles plugin registration, reduced motion detection, and global settings.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

/**
 * Check if user prefers reduced motion
 * @returns true if user prefers reduced motion, false otherwise
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check if device is mobile
 * @returns true if mobile device, false otherwise
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(max-width: 768px)').matches;
}

/**
 * Check if device is tablet
 * @returns true if tablet device, false otherwise
 */
export function isTablet(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(min-width: 769px) and (max-width: 1024px)').matches;
}

/**
 * Global animation settings
 */
export const animationConfig = {
  // Reduced motion: if true, animations are instant or disabled
  respectReducedMotion: prefersReducedMotion(),
  
  // Mobile: shorter durations for better performance
  isMobile: isMobile(),
  
  // Default durations (in seconds)
  durations: {
    fast: prefersReducedMotion() ? 0 : 0.2,
    normal: prefersReducedMotion() ? 0 : 0.5,
    slow: prefersReducedMotion() ? 0 : 0.8,
    slower: prefersReducedMotion() ? 0 : 1.2,
  },
  
  // Default easing functions (Pierre brand)
  easing: {
    calm: 'ease.out',
    intelligent: 'power2.out',
    dramatic: 'power3.out',
    approachable: 'ease.inOut',
  },
  
  // ScrollTrigger defaults
  scrollTrigger: {
    start: 'top 80%',
    end: 'bottom 20%',
    toggleActions: 'play none none none',
    once: true, // Trigger only once by default
  },
} as const;

/**
 * Get animation duration based on reduced motion preference
 * @param duration - Base duration in seconds
 * @returns Duration (0 if reduced motion, original otherwise)
 */
export function getDuration(duration: number): number {
  if (prefersReducedMotion()) return 0;
  return duration;
}

/**
 * Configure ScrollTrigger with defaults
 * @param config - ScrollTrigger configuration
 * @returns Configured ScrollTrigger config
 */
export function configureScrollTrigger(config: ScrollTrigger.Vars = {}) {
  return {
    ...animationConfig.scrollTrigger,
    ...config,
    // Disable if reduced motion
    ...(prefersReducedMotion() && { immediateRender: true, onEnter: () => {} }),
  };
}

// Export GSAP instance for direct use if needed
export { gsap, ScrollTrigger };

