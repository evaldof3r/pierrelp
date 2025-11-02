/**
 * Animation Utilities
 * 
 * Helper functions for common animation tasks and optimizations.
 */

import { gsap } from 'gsap';
import { prefersReducedMotion } from '../config';

/**
 * Set GPU-accelerated properties for better performance
 * @param element - DOM element to optimize
 */
export function optimizeForGPU(element: Element | null): void {
  if (!element || prefersReducedMotion()) return;
  
  // Use will-change for GPU acceleration during animation
  if (element instanceof HTMLElement) {
    element.style.willChange = 'transform, opacity';
  }
}

/**
 * Remove GPU optimization after animation completes
 * @param element - DOM element to clean up
 */
export function removeGPUOptimization(element: Element | null): void {
  if (!element) return;
  
  if (element instanceof HTMLElement) {
    element.style.willChange = 'auto';
  }
}

/**
 * Create a timeline with automatic GPU optimization
 * @param element - Element to optimize
 * @param callback - Animation callback
 * @returns GSAP Timeline
 */
export function createOptimizedTimeline(
  element: Element | null,
  callback: (tl: gsap.core.Timeline) => void
): gsap.core.Timeline | null {
  if (prefersReducedMotion()) return null;
  
  const tl = gsap.timeline();
  
  if (element) {
    optimizeForGPU(element);
    
    tl.call(() => {
      // Cleanup after animation completes
      tl.eventCallback('onComplete', () => {
        removeGPUOptimization(element);
      });
    });
  }
  
  callback(tl);
  
  return tl;
}

/**
 * Debounce function for scroll-based animations
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for scroll-based animations (uses requestAnimationFrame)
 * @param func - Function to throttle
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => void>(
  func: T
): (...args: Parameters<T>) => void {
  let rafId: number | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        func(...args);
        rafId = null;
      });
    }
  };
}

/**
 * Check if element is in viewport
 * @param element - DOM element to check
 * @param threshold - Threshold ratio (0-1)
 * @returns true if element is in viewport
 */
export function isInViewport(
  element: Element | null,
  threshold: number = 0.1
): boolean {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  
  return (
    rect.top >= -rect.height * threshold &&
    rect.left >= -rect.width * threshold &&
    rect.bottom <= windowHeight + rect.height * threshold &&
    rect.right <= windowWidth + rect.width * threshold
  );
}

/**
 * Get element's position relative to viewport
 * @param element - DOM element
 * @returns Position data
 */
export function getElementPosition(element: Element | null) {
  if (!element) return null;
  
  const rect = element.getBoundingClientRect();
  
  return {
    top: rect.top,
    left: rect.left,
    bottom: rect.bottom,
    right: rect.right,
    width: rect.width,
    height: rect.height,
    centerY: rect.top + rect.height / 2,
    centerX: rect.left + rect.width / 2,
  };
}

