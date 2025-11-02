/**
 * Stagger Children Preset
 * 
 * Common animation preset: animate children elements with stagger.
 */

import { gsap } from 'gsap';
import { getDuration } from '../config';
import type { gsap as GSAP } from 'gsap';

export interface StaggerChildrenOptions {
  /**
   * Parent element containing children
   */
  parent: gsap.TweenTarget;
  
  /**
   * Children selector (relative to parent)
   */
  children?: string;
  
  /**
   * Animation properties
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
 * Create stagger children animation
 * 
 * @param options - Animation options
 * @returns GSAP Timeline
 */
export function staggerChildren(
  options: StaggerChildrenOptions
): GSAP.core.Timeline {
  const {
    parent,
    children,
    animation = {},
    stagger = 0.15,
    duration = 0.7,
    delay = 0,
    ease = 'power2.out',
  } = options;
  
  // Get children elements
  let targets: gsap.TweenTarget;
  
  if (children) {
    // If parent is a ref or element, query children
    if (parent instanceof HTMLElement) {
      targets = parent.querySelectorAll(children);
    } else if (typeof parent === 'string') {
      const parentEl = document.querySelector(parent);
      targets = parentEl?.querySelectorAll(children) || [];
    } else {
      targets = parent;
    }
  } else {
    // Use parent directly (assumes it has children)
    targets = parent instanceof HTMLElement ? parent.children : parent;
  }
  
  const tl = gsap.timeline({ delay });
  
  // Apply animation
  if (animation.from) {
    tl.from(targets, {
      ...animation.from,
      duration: getDuration(duration),
      ease,
      stagger,
    });
  } else if (animation.to) {
    tl.to(targets, {
      ...animation.to,
      duration: getDuration(duration),
      ease,
      stagger,
    });
  }
  
  return tl;
}

