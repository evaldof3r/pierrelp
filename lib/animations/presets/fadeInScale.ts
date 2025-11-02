/**
 * Fade In Scale Preset
 * 
 * Common animation preset: fade in while scaling.
 * Great for hero reveals and important elements.
 */

import { gsap } from 'gsap';
import { getDuration } from '../config';
import type { gsap as GSAP } from 'gsap';

export interface FadeInScaleOptions {
  /**
   * Starting opacity
   */
  fromOpacity?: number;
  
  /**
   * Starting scale
   */
  fromScale?: number;
  
  /**
   * Starting Y position (optional)
   */
  fromY?: number;
  
  /**
   * Starting rotation in degrees (optional)
   */
  fromRotation?: number;
  
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
 * Create fade in scale animation
 * 
 * @param target - Element to animate
 * @param options - Animation options
 * @returns GSAP Tween
 */
export function fadeInScale(
  target: gsap.TweenTarget,
  options: FadeInScaleOptions = {}
): GSAP.core.Tween {
  const {
    fromOpacity = 0,
    fromScale = 0.85,
    fromY = 0,
    fromRotation = 0,
    duration = 1,
    delay = 0,
    ease = 'power3.out',
  } = options;
  
  const vars: gsap.TweenVars = {
    opacity: fromOpacity,
    scale: fromScale,
    duration: getDuration(duration),
    delay,
    ease,
  };
  
  if (fromY !== 0) {
    vars.y = fromY;
  }
  
  if (fromRotation !== 0) {
    vars.rotation = fromRotation;
  }
  
  return gsap.from(target, vars);
}

