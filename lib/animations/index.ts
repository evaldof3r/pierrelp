/**
 * GSAP Animations - Main Export
 * 
 * Central export point for all animation utilities, hooks, and presets.
 */

// Config
export {
  animationConfig,
  prefersReducedMotion,
  isMobile,
  isTablet,
  getDuration,
  configureScrollTrigger,
  gsap,
  ScrollTrigger,
} from './config';

// Hooks
export { useScrollAnimation, useFadeInUp } from './hooks/useScrollAnimation';
export { useStaggerAnimation } from './hooks/useStaggerAnimation';
export { useParallax } from './hooks/useParallax';

// Utils
export {
  optimizeForGPU,
  removeGPUOptimization,
  createOptimizedTimeline,
  debounce,
  throttle,
  isInViewport,
  getElementPosition,
} from './utils/animationUtils';

export {
  easingPresets,
  getEasing,
  type EasingPreset,
} from './utils/easingPresets';

export {
  smoothScrollTo,
  smoothScrollToTop,
  smoothScrollBy,
} from './utils/smoothScroll';

// Presets
export { fadeInUp, type FadeInUpOptions } from './presets/fadeInUp';
export { fadeInScale, type FadeInScaleOptions } from './presets/fadeInScale';
export {
  staggerChildren,
  type StaggerChildrenOptions,
} from './presets/staggerChildren';

