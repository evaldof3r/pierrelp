/**
 * AnimatedSection Component
 * 
 * Reusable wrapper component for sections with scroll-triggered animations.
 * Simplifies adding animations to section containers.
 */

'use client';

import React, { useRef } from 'react';
import { useFadeInUp } from '@/lib/animations';

export interface AnimatedSectionProps {
  /**
   * Children to render
   */
  children: React.ReactNode;
  
  /**
   * CSS class name
   */
  className?: string;
  
  /**
   * HTML element type
   */
  as?: 'section' | 'div' | 'article' | 'header' | 'footer';
  
  /**
   * Animation configuration
   */
  animation?: {
    /**
     * Enable/disable animation
     */
    enabled?: boolean;
    
    /**
     * Animation duration
     */
    duration?: number;
    
    /**
     * Animation delay
     */
    delay?: number;
    
    /**
     * Y offset for fade in up
     */
    y?: number;
  };
  
  /**
   * ScrollTrigger configuration
   */
  scrollTrigger?: {
    /**
     * Start trigger position
     */
    start?: string;
    
    /**
     * End trigger position
     */
    end?: string;
    
    /**
     * Trigger only once
     */
    once?: boolean;
  };
}

/**
 * AnimatedSection - Wrapper for sections with scroll animations
 * 
 * @example
 * ```tsx
 * <AnimatedSection
 *   animation={{ duration: 0.8, y: 50 }}
 *   scrollTrigger={{ start: 'top 80%' }}
 * >
 *   <h2>My Section</h2>
 * </AnimatedSection>
 * ```
 */
export function AnimatedSection({
  children,
  className = '',
  as: Component = 'section',
  animation = {},
  scrollTrigger = {},
}: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  
  const {
    enabled = true,
    duration = 0.8,
    delay = 0,
    y = 50,
  } = animation;
  
  // Apply fade in up animation
  useFadeInUp(sectionRef, {
    duration,
    delay,
    y,
    enabled,
  });
  
  // Type-safe ref casting based on component type
  const ref = sectionRef as React.Ref<HTMLElement>;
  
  return (
    <Component ref={ref} className={className}>
      {children}
    </Component>
  );
}

