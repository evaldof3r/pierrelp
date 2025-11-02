/**
 * Fade In Up Preset
 * 
 * Common animation preset: fade in while moving up.
 */

import { gsap } from 'gsap';
import { getDuration } from '../config';
import type { gsap as GSAP } from 'gsap';

export interface FadeInUpOptions {
  /**
   * Starting opacity
   */
  fromOpacity?: number;
  
  /**
   * Starting Y position
   */
  fromY?: number;
  
  /**
   * Duration in seconds
   */
  duration?: number;
  
  /**
   * Delay in seconds
   */
  delay?: number;
  
  /**
   * Easing function
   */
  ease?: string;
}

/**
 * Create fade in up animation
 * 
 * @param target - Element to animate
 * @param options - Animation options
 * @returns GSAP Tween
 */
export function fadeInUp(
  target: gsap.TweenTarget,
  options: FadeInUpOptions = {}
): GSAP.core.Tween {
  const {
    fromOpacity = 0,
    fromY = 50,
    duration = 0.8,
    delay = 0,
    ease = 'power2.out',
  } = options;
  
  return gsap.from(target, {
    opacity: fromOpacity,
    y: fromY,
    duration: getDuration(duration),
    delay,
    ease,
  });
}

