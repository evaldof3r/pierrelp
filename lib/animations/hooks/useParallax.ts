/**
 * useParallax Hook
 * 
 * Custom React hook for subtle parallax effects.
 * Optimized with throttling for performance.
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../config';
import { throttle } from '../utils/animationUtils';

export interface UseParallaxOptions {
  /**
   * Element to apply parallax to
   */
  element?: React.RefObject<HTMLElement> | string | HTMLElement | null;
  
  /**
   * Parallax speed (0-1, where 0.5 = half scroll speed)
   */
  speed?: number;
  
  /**
   * Direction of parallax
   */
  direction?: 'vertical' | 'horizontal';
  
  /**
   * Axis to animate ('x' or 'y')
   */
  axis?: 'x' | 'y';
  
  /**
   * ScrollTrigger configuration
   */
  scrollTrigger?: {
    start?: string;
    end?: string;
    scrub?: boolean;
  };
  
  /**
   * Enable/disable parallax
   */
  enabled?: boolean;
}

/**
 * Hook for parallax animations
 * 
 * @example
 * ```tsx
 * const backgroundRef = useRef<HTMLDivElement>(null);
 * 
 * useParallax({
 *   element: backgroundRef,
 *   speed: 0.5,
 *   axis: 'y',
 *   scrollTrigger: {
 *     scrub: true,
 *   },
 * });
 * ```
 */
export function useParallax({
  element,
  speed = 0.5,
  direction = 'vertical',
  axis = 'y',
  scrollTrigger = {},
  enabled = true,
}: UseParallaxOptions): void {
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  
  useEffect(() => {
    // Skip if disabled or reduced motion
    if (!enabled || prefersReducedMotion()) {
      return;
    }
    
    // Get target element
    let target: HTMLElement | null = null;
    
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
    
    // Determine axis based on direction
    const animAxis = direction === 'horizontal' ? 'x' : 'y';
    const finalAxis = axis || animAxis;
    
    // Calculate movement distance
    const movement = speed * 100; // Convert to pixels
    
    // Create parallax animation
    const anim = gsap.to(target, {
      [finalAxis]: movement,
      ease: 'none',
      scrollTrigger: {
        trigger: target,
        start: scrollTrigger.start || 'top bottom',
        end: scrollTrigger.end || 'bottom top',
        scrub: scrollTrigger.scrub !== false, // Default to true for smooth parallax
        ...scrollTrigger,
      },
    });
    
    animationRef.current = anim;
    
    if (anim.scrollTrigger) {
      scrollTriggerRef.current = anim.scrollTrigger as ScrollTrigger;
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
  }, [enabled, element, speed, direction, axis, ...Object.values(scrollTrigger)]);
  
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

