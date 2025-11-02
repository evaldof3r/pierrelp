/**
 * Smooth Scroll Utilities
 * 
 * Utilities for smooth scrolling behavior throughout the app.
 */

import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { prefersReducedMotion } from '../config';

// Register ScrollToPlugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin);
}

/**
 * Smooth scroll to element
 * @param target - Element selector, ref, or element
 * @param options - Scroll options
 */
export function smoothScrollTo(
  target: string | HTMLElement | null,
  options: {
    offset?: number;
    duration?: number;
    ease?: string;
  } = {}
): void {
  if (prefersReducedMotion()) {
    // Instant scroll if reduced motion
    if (typeof target === 'string') {
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    } else if (target) {
      target.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
    return;
  }

  const { offset = 0, duration = 1, ease = 'power2.inOut' } = options;

  let selector: string;
  
  if (typeof target === 'string') {
    selector = target;
  } else if (target) {
    // Get selector from element
    const id = target.id;
    const className = target.className;
    
    if (id) {
      selector = `#${id}`;
    } else if (className) {
      selector = `.${className.split(' ')[0]}`;
    } else {
      // Fallback: scroll to element directly
      gsap.to(window, {
        scrollTo: {
          y: target,
          offsetY: offset,
        },
        duration,
        ease,
      });
      return;
    }
  } else {
    return;
  }

  gsap.to(window, {
    scrollTo: {
      y: selector,
      offsetY: offset,
    },
    duration,
    ease,
  });
}

/**
 * Smooth scroll to top
 * @param duration - Scroll duration
 */
export function smoothScrollToTop(duration: number = 1): void {
  if (prefersReducedMotion()) {
    window.scrollTo({ top: 0, behavior: 'auto' });
    return;
  }

  gsap.to(window, {
    scrollTo: {
      y: 0,
    },
    duration,
    ease: 'power2.inOut',
  });
}

/**
 * Smooth scroll by amount
 * @param amount - Pixels to scroll
 * @param duration - Scroll duration
 */
export function smoothScrollBy(amount: number, duration: number = 0.5): void {
  if (prefersReducedMotion()) {
    window.scrollBy({ top: amount, behavior: 'auto' });
    return;
  }

  const currentScroll = window.scrollY;
  
  gsap.to(window, {
    scrollTo: {
      y: currentScroll + amount,
    },
    duration,
    ease: 'power2.inOut',
  });
}

