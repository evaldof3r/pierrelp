'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { gsap } from '@/lib/animations';
import { prefersReducedMotion, getDuration } from '@/lib/animations';

export function HeroSection() {
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const iphoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const timeline = gsap.timeline({ delay: 0.2 });

    // Title Line 1: "ASSISTENTE IA QUE"
    if (titleLine1Ref.current) {
      timeline.from(titleLine1Ref.current, {
        opacity: 0,
        y: 30,
        duration: getDuration(0.8),
        ease: 'power2.out',
      });
    }

    // Title Line 2: "FALA SUA LÍNGUA CHEGOU!"
    if (titleLine2Ref.current) {
      timeline.from(
        titleLine2Ref.current,
        {
          opacity: 0,
          y: 30,
          duration: getDuration(0.8),
          ease: 'power2.out',
        },
        '-=0.65' // Start 0.15s after line 1 starts (stagger effect)
      );
    }

    // Subtitle: after title completes (delay: 0.4s from title start)
    if (subtitleRef.current) {
      timeline.from(
        subtitleRef.current,
        {
          opacity: 0,
          y: 20,
          duration: getDuration(0.6),
          ease: 'ease.out',
        },
        '-=0.4' // Start 0.4s after timeline start
      );
    }

    // iPhone Mockup: after subtitle (delay: 0.8s from timeline start)
    if (iphoneRef.current) {
      timeline.from(
        iphoneRef.current,
        {
          opacity: 0,
          scale: 0.85,
          y: 40,
          rotation: -2,
          duration: getDuration(1),
          ease: 'power3.out',
        },
        '-=0.2' // Start 0.6s after timeline start
      );
    }

    // CTA Buttons: after iPhone mockup (delay: 1.6s from timeline start)
    if (ctaGroupRef.current) {
      timeline.from(
        ctaGroupRef.current,
        {
          opacity: 0,
          y: 20,
          duration: getDuration(0.6),
          ease: 'ease.out',
        },
        '-=0.4' // Start 1.2s after timeline start (after iPhone starts)
      );
    }

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <section className="w-full flex flex-col items-center pt-24 md:pt-32 lg:pt-[208px] pb-12 md:pb-16 lg:pb-[80px] px-4 md:px-8 lg:px-[164px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
      <Container maxWidth="section" className="flex flex-col gap-8 md:gap-12 lg:gap-[64px] items-center">
        {/* Hero Text */}
        <div className="w-full flex flex-col gap-4 md:gap-[16px] items-center">
          {/* Main Title */}
          <h1 className="w-full font-bold leading-[1.1] text-[#f8f8f8] text-[32px] md:text-[48px] lg:text-[76px] text-center tracking-[-0.96px] md:tracking-[-1.44px] lg:tracking-[-2.28px]">
            <span ref={titleLine1Ref} className="inline-block">
              ASSISTENTE IA QUE
            </span>
            <br />
            <span ref={titleLine2Ref} className="inline-block">
              FALA SUA LÍNGUA CHEGOU!
            </span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="w-full font-normal leading-[24px] md:leading-[28px] lg:leading-[32px] text-[var(--color-neutral-foreground-muted)] text-[14px] md:text-[18px] lg:text-[24px] text-center uppercase px-2 md:px-0"
          >
            Pierre é a inteligência artificial que analisa seus gastos e te ajuda a economizar
          </p>
        </div>

        {/* iPhone Mockup */}
        <div className="w-full flex gap-[8px] items-center justify-center">
          <div
            ref={iphoneRef}
            className="relative rounded-[22.901px] w-full max-w-[280px] md:max-w-[320px] lg:max-w-[375px] aspect-[375/813]"
          >
            {/* iPhone Bezel */}
            <Image
              src="/images/iphone-bezel.webp"
              alt="iPhone displaying Pierre app interface"
              fill
              className="object-contain rounded-[22.901px] pointer-events-none"
              priority
              sizes="(max-width: 768px) 100vw, 375px"
            />
          </div>
        </div>

        {/* CTAs */}
        <div
          ref={ctaGroupRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4"
        >
          <Button
            variant="primary"
            size="lg"
            className="px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-medium min-w-[200px] md:min-w-[240px]"
          >
            Comece Grátis
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-medium min-w-[200px] md:min-w-[240px]"
          >
            Ver Como Funciona
          </Button>
        </div>
      </Container>
    </section>
  );
}

