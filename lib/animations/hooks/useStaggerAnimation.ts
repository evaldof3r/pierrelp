/**
 * useStaggerAnimation Hook
 * 
 * Custom React hook for staggered GSAP animations.
 * Perfect for animating lists, cards, or multiple elements sequentially.
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  prefersReducedMotion,
  configureScrollTrigger,
  getDuration,
} from '../config';
import type { EasingPreset } from '../utils/easingPresets';
import { getEasing } from '../utils/easingPresets';

export interface UseStaggerAnimationOptions {
  /**
   * Elements to animate (ref, selector, or array of elements)
   */
  elements?:
    | React.RefObject<HTMLElement>
    | string
    | HTMLElement
    | NodeListOf<Element>
    | Element[]
    | null;
  
  /**
   * Animation properties to apply
   */
  animation?: {
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
  };
  
  /**
   * Stagger delay in seconds
   */
  stagger?: number;
  
  /**
   * ScrollTrigger configuration
   */
  scrollTrigger?: ScrollTrigger.Vars;
  
  /**
   * Duration of each element animation
   */
  duration?: number;
  
  /**
   * Easing preset or custom easing string
   */
  ease?: EasingPreset | string;
  
  /**
   * Enable/disable animation
   */
  enabled?: boolean;
  
  /**
   * Dependencies array for re-running effect
   */
  deps?: React.DependencyList;
}

/**
 * Hook for staggered animations
 * 
 * @example
 * ```tsx
 * const cardsRef = useRef<HTMLDivElement>(null);
 * 
 * useStaggerAnimation({
 *   elements: cardsRef.current?.querySelectorAll('.card'),
 *   animation: {
 *     from: { opacity: 0, y: 50 },
 *   },
 *   stagger: 0.15,
 *   duration: 0.7,
 *   ease: 'intelligent',
 * });
 * ```
 */
export function useStaggerAnimation({
  elements,
  animation = {},
  stagger = 0.15,
  duration = 0.7,
  ease = 'intelligent',
  scrollTrigger = {},
  enabled = true,
  deps = [],
}: UseStaggerAnimationOptions): void {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  
  useEffect(() => {
    // Skip if disabled or reduced motion
    if (!enabled || prefersReducedMotion()) {
      return;
    }
    
    // Get target elements
    let targets: gsap.TweenTarget | null = null;
    
    if (elements) {
      if (typeof elements === 'string') {
        targets = document.querySelectorAll(elements);
      } else if ('current' in elements && elements.current) {
        // If ref, try to find children or use the element itself
        const el = elements.current;
        targets = el.children.length > 0 ? el.children : el;
      } else if (elements instanceof HTMLElement) {
        targets = elements;
      } else if (elements instanceof NodeList || Array.isArray(elements)) {
        targets = elements;
      }
    }
    
    if (!targets || (Array.isArray(targets) && targets.length === 0)) {
      return;
    }
    
    // Get easing string
    const easing =
      typeof ease === 'string' && ease in ['calm', 'intelligent', 'dramatic', 'approachable', 'snappy']
        ? getEasing(ease as EasingPreset)
        : ease;
    
    // Create timeline
    const tl = gsap.timeline({
      scrollTrigger: configureScrollTrigger({
        trigger: Array.isArray(targets) ? targets[0] : targets,
        ...scrollTrigger,
      }),
    });
    
    // Apply animation
    if (animation.from) {
      tl.from(targets, {
        ...animation.from,
        duration: getDuration(duration),
        ease: easing,
        stagger,
      });
    } else if (animation.to) {
      tl.to(targets, {
        ...animation.to,
        duration: getDuration(duration),
        ease: easing,
        stagger,
      });
    }
    
    timelineRef.current = tl;
    
    if (tl.scrollTrigger) {
      scrollTriggerRef.current = tl.scrollTrigger as ScrollTrigger;
    }
    
    // Cleanup function
    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
        scrollTriggerRef.current = null;
      }
      
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  }, [enabled, elements, stagger, duration, ease, ...deps]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);
}

