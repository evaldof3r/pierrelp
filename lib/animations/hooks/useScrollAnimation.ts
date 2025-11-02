/**
 * useScrollAnimation Hook
 * 
 * Custom React hook for scroll-triggered GSAP animations.
 * Handles setup, cleanup, and reduced motion preferences automatically.
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  prefersReducedMotion,
  configureScrollTrigger,
  getDuration,
} from '../config';

export interface UseScrollAnimationOptions {
  /**
   * Element to animate (ref or selector)
   */
  element?: React.RefObject<HTMLElement | null> | React.RefObject<HTMLElement> | string | HTMLElement | null;
  
  /**
   * Animation configuration
   */
  animation: (target: gsap.TweenTarget) => gsap.core.Tween;
  
  /**
   * ScrollTrigger configuration
   */
  scrollTrigger?: ScrollTrigger.Vars;
  
  /**
   * Enable/disable animation (useful for conditional animations)
   */
  enabled?: boolean;
  
  /**
   * Dependencies array for re-running effect
   */
  deps?: React.DependencyList;
}

/**
 * Hook for scroll-triggered animations
 * 
 * @example
 * ```tsx
 * const elementRef = useRef<HTMLDivElement>(null);
 * 
 * useScrollAnimation({
 *   element: elementRef,
 *   animation: (target) => gsap.from(target, {
 *     opacity: 0,
 *     y: 50,
 *     duration: 0.8,
 *     ease: 'power2.out',
 *   }),
 *   scrollTrigger: {
 *     start: 'top 80%',
 *   },
 * });
 * ```
 */
export function useScrollAnimation({
  element,
  animation,
  scrollTrigger = {},
  enabled = true,
  deps = [],
}: UseScrollAnimationOptions): void {
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  
  useEffect(() => {
    // Skip if disabled or reduced motion
    if (!enabled || prefersReducedMotion()) {
      return;
    }
    
    // Get target element
    let target: gsap.TweenTarget | null = null;
    
    if (element) {
      if (typeof element === 'string') {
        target = document.querySelector(element);
      } else if ('current' in element && element.current) {
        target = element.current;
      } else if (element instanceof HTMLElement) {
        target = element;
      }
    }
    
    if (!target) return;
    
    // Create animation
    const anim = animation(target);
    
    if (anim && anim.scrollTrigger) {
      animationRef.current = anim;
      scrollTriggerRef.current = anim.scrollTrigger as ScrollTrigger;
    } else {
      // Create ScrollTrigger if not automatically created
      const config = configureScrollTrigger(scrollTrigger);
      
      scrollTriggerRef.current = ScrollTrigger.create({
        ...config,
        animation: anim,
        trigger: target as gsap.DOMTarget,
      });
      
      animationRef.current = anim;
    }
    
    // Cleanup function
    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
      
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
    };
  }, [enabled, element, animation, ...deps]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);
}

/**
 * Simplified hook for common fade-in-up animation
 */
export function useFadeInUp(
  element: React.RefObject<HTMLElement | null> | React.RefObject<HTMLElement> | string | HTMLElement | null,
  options: {
    duration?: number;
    delay?: number;
    y?: number;
    enabled?: boolean;
  } = {}
): void {
  const { duration = 0.8, delay = 0, y = 50, enabled = true } = options;
  
  useScrollAnimation({
    element,
    animation: (target) =>
      gsap.from(target, {
        opacity: 0,
        y,
        duration: getDuration(duration),
        delay,
        ease: 'power2.out',
      }),
    enabled,
  });
}

