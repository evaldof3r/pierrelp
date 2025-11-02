'use client';

import React, { useRef, useEffect } from 'react';
import { Button } from '../ui/Button';
import Image from 'next/image';
import { gsap } from '@/lib/animations';
import { prefersReducedMotion, getDuration } from '@/lib/animations';

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  // Initial entrance animation
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const timeline = gsap.timeline();

    // Logo: fade in + slide down
    if (logoRef.current) {
      timeline.from(logoRef.current, {
        opacity: 0,
        y: -20,
        duration: getDuration(0.6),
        ease: 'ease.out',
      });
    }

    // Buttons: stagger fade in
    if (buttonsRef.current) {
      const buttons = buttonsRef.current.querySelectorAll('button');
      timeline.from(
        buttons,
        {
          opacity: 0,
          duration: getDuration(0.5),
          ease: 'ease.out',
          stagger: 0.1,
        },
        '-=0.3' // Start slightly before logo completes
      );
    }

    return () => {
      timeline.kill();
    };
  }, []);

  // Scroll behavior: increase blur/glassmorphism effect
  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current) return;

    const container = containerRef.current;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = 100;

      if (scrollY > threshold) {
        // Increase blur and add shadow
        gsap.to(container, {
          backdropFilter: 'blur(20px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          duration: getDuration(0.3),
          ease: 'ease.out',
        });
      } else {
        // Reset to original state (use default blur value)
        gsap.to(container, {
          backdropFilter: 'blur(8px)', // Default blur value
          boxShadow: 'none',
          duration: getDuration(0.3),
          ease: 'ease.out',
        });
      }
    };

    // Throttle scroll for performance
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center pt-[var(--spacing-6)] pb-[var(--spacing-10)] px-4 md:px-8 lg:px-[164px]"
    >
      <div className="w-full max-w-[var(--max-w-container)] flex items-center justify-between">
        {/* Glassmorphism Container */}
        <div
          ref={containerRef}
          className="w-full backdrop-blur-[var(--backdrop-blur)] bg-[var(--color-primary-background-base)] border border-[var(--color-neutral-border)] rounded-full px-3 py-2 md:px-6 md:py-3 lg:px-[26px] flex items-center justify-between gap-2 md:gap-4 transition-all"
        >
          {/* Logo */}
          <div
            ref={logoRef}
            className="h-[32px] w-[98px] md:h-[39.818px] md:w-[121.488px] relative shrink-0"
          >
            <Image
              src="/images/pierre-logo-navbar.webp"
              alt="Pierre logo"
              width={121}
              height={40}
              className="object-contain"
              priority
            />
          </div>

          {/* Actions */}
          <div
            ref={buttonsRef}
            className="flex items-center gap-2 md:gap-[var(--spacing-4)] shrink-0"
          >
            <Button
              variant="primary"
              size="md"
              className="text-xs md:text-base px-3 md:px-[var(--spacing-6)] py-1.5 md:py-[var(--spacing-4)]"
            >
              <span className="hidden sm:inline">Baixar APP</span>
              <span className="sm:hidden">APP</span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="hidden xl:inline-flex text-xs md:text-base px-3 md:px-[var(--spacing-6)] py-1.5 md:py-[var(--spacing-4)]"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

