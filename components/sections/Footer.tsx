'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { Container } from '../ui/Container';
import { gsap } from '@/lib/animations';
import { prefersReducedMotion, getDuration } from '@/lib/animations';
import CursorFollow from '@/components/ui/cursor-follow';

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const socialLinksRef = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<HTMLDivElement>(null);

  // Footer reveal animation
  useEffect(() => {
    if (prefersReducedMotion() || !footerRef.current) return;

    gsap.from(footerRef.current, {
      opacity: 0,
      y: 30,
      duration: getDuration(0.6),
      ease: 'power2.out',
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
        once: true,
      },
    });
  }, []);

  // Social links hover animation
  useEffect(() => {
    if (prefersReducedMotion() || !socialLinksRef.current) return;

    const links = socialLinksRef.current.querySelectorAll('a');
    const hoverTweens: Map<Element, gsap.core.Tween> = new Map();
    const handlers: Array<{
      link: Element;
      enter: () => void;
      leave: () => void;
    }> = [];

    links.forEach((link) => {
      const handleMouseEnter = () => {
        // Kill existing tween for this link
        const existingTween = hoverTweens.get(link);
        if (existingTween) existingTween.kill();

        const tween = gsap.to(link, {
          scale: 1.1,
          rotation: 5,
          duration: getDuration(0.2),
          ease: 'ease.out',
        });
        hoverTweens.set(link, tween);
      };

      const handleMouseLeave = () => {
        const existingTween = hoverTweens.get(link);
        if (existingTween) existingTween.kill();

        gsap.to(link, {
          scale: 1,
          rotation: 0,
          duration: getDuration(0.2),
          ease: 'ease.out',
        });

        hoverTweens.delete(link);
      };

      link.addEventListener('mouseenter', handleMouseEnter);
      link.addEventListener('mouseleave', handleMouseLeave);

      handlers.push({
        link,
        enter: handleMouseEnter,
        leave: handleMouseLeave,
      });
    });

    // Cleanup function
    return () => {
      handlers.forEach(({ link, enter, leave }) => {
        link.removeEventListener('mouseenter', enter);
        link.removeEventListener('mouseleave', leave);
        const tween = hoverTweens.get(link);
        if (tween) tween.kill();
      });
      hoverTweens.clear();
    };
  }, []);

  // QR Code hover animation
  useEffect(() => {
    if (prefersReducedMotion() || !qrCodeRef.current) return;

    const qrCode = qrCodeRef.current;
    let hoverTween: gsap.core.Tween | null = null;

    const handleMouseEnter = () => {
      if (hoverTween) hoverTween.kill();
      hoverTween = gsap.to(qrCode, {
        scale: 1.05,
        y: -4,
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
        duration: getDuration(0.3),
        ease: 'ease.out',
      });
    };

    const handleMouseLeave = () => {
      if (hoverTween) hoverTween.kill();
      hoverTween = null;
      gsap.to(qrCode, {
        scale: 1,
        y: 0,
        boxShadow: 'none',
        duration: getDuration(0.3),
        ease: 'ease.out',
      });
    };

    qrCode.addEventListener('mouseenter', handleMouseEnter);
    qrCode.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      qrCode.removeEventListener('mouseenter', handleMouseEnter);
      qrCode.removeEventListener('mouseleave', handleMouseLeave);
      if (hoverTween) {
        hoverTween.kill();
        hoverTween = null;
      }
    };
  }, []);

  return (
    <CursorFollow className="w-full">
      <footer
        ref={footerRef}
        className="w-full bg-[var(--color-primary-background)] flex flex-col items-center px-4 md:px-8 lg:px-[164px] py-12 md:py-16 lg:py-[96px]"
      >
      <Container maxWidth="section" className="w-full flex flex-col gap-8 md:gap-10 lg:gap-[40px]">
        {/* Footer Main Container */}
        <div className="w-full flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 md:gap-10 lg:gap-0">
          {/* Footer Left Section */}
          <div className="flex flex-col gap-4 md:gap-6 lg:gap-[24px] items-start w-full lg:w-auto">
            {/* Logo and Description */}
            <div className="flex flex-col gap-4 md:gap-6 lg:gap-[24px] items-start w-full lg:w-auto">
              {/* Logo */}
              <div className="h-[32px] w-[96px] md:h-[39.818px] md:w-[120px] relative shrink-0">
                <Image
                  src="/images/pierre-logo-footer.webp"
                  alt="Pierre logo"
                  width={120}
                  height={40}
                  className="object-contain"
                />
              </div>
              {/* Description */}
              <p className="font-normal leading-[18px] md:leading-[20px] text-[var(--color-neutral-foreground-muted)] text-[12px] md:text-[13px] lg:text-[14px] uppercase w-full max-w-[346px]">
                Seu assistente de IA para finanças pessoais. Converse com o seu dinheiro.
              </p>
            </div>

            {/* Footer Links */}
            <div className="flex flex-wrap gap-4 md:gap-6 lg:gap-[24px] items-center justify-start">
              {/* Social Links */}
              <div ref={socialLinksRef} className="flex gap-1 md:gap-[3px] items-center">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[32px] h-[32px] md:w-[37.241px] md:h-[37.241px] relative shrink-0 flex items-center justify-center"
                  aria-label="Instagram"
                >
                  <Image
                    src="/images/icon-instagram.webp"
                    alt="Instagram"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </a>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[32px] h-[32px] md:w-[37.241px] md:h-[37.241px] relative shrink-0 flex items-center justify-center"
                  aria-label="Discord"
                >
                  <Image
                    src="/images/icon-discord.webp"
                    alt="Discord"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </a>
                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[32px] h-[32px] md:w-[37.241px] md:h-[37.241px] relative shrink-0 flex items-center justify-center"
                  aria-label="WhatsApp"
                >
                  <Image
                    src="/images/icon-whatsapp.webp"
                    alt="WhatsApp"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </a>
              </div>

              {/* Vertical Divider */}
              <div className="w-[0.776px] h-[12.414px] bg-[var(--color-neutral-foreground-muted)] shrink-0 hidden md:block" />

              {/* Terms Link */}
              <a
                href="/termos"
                className="font-normal leading-[18px] md:leading-[20px] text-[rgba(255,255,255,0.7)] text-[12px] md:text-[13px] lg:text-[14px] hover:opacity-80 transition-opacity"
              >
                TERMOS DE USO
              </a>
            </div>

            {/* App Store Badges */}
            <div className="flex gap-2 md:gap-[8px] items-center flex-wrap">
              {/* App Store iOS */}
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[110px] h-[35px] md:w-[126px] md:h-[40px] bg-[var(--color-primary-background)] border border-[var(--color-neutral-border)] rounded-[7px] relative overflow-hidden flex items-center justify-center hover:opacity-80 transition-opacity shrink-0"
              >
                <Image
                  src="/images/app-store-badge.webp"
                  alt="Download on the App Store"
                  width={126}
                  height={40}
                  className="object-contain"
                />
              </a>

              {/* Google Play */}
              <a
                href="https://play.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[120px] h-[35px] md:w-[135px] md:h-[40px] bg-[var(--color-primary-background)] border border-[var(--color-neutral-border)] rounded-[5px] relative overflow-hidden flex items-center justify-center hover:opacity-80 transition-opacity shrink-0"
              >
                <Image
                  src="/images/google-play-badge.webp"
                  alt="Get it on Google Play"
                  width={135}
                  height={40}
                  className="object-contain"
                />
              </a>
            </div>
          </div>

          {/* QR Code */}
          <div
            ref={qrCodeRef}
            data-cursor-text="escaneie para baixar o app"
            className="hidden lg:block w-full max-w-[200px] md:max-w-[240px] lg:w-[240px] lg:h-[240px] aspect-square relative rounded-[24px] overflow-hidden mx-auto lg:mx-0 transition-shadow cursor-pointer"
          >
            <Image
              src="/images/qr-code-pierre.webp"
              alt="QR Code para download do app Pierre"
              fill
              className="object-cover"
              sizes="240px"
            />
          </div>
        </div>

        {/* Horizontal Divider */}
        <div className="w-full h-[0.776px] bg-[rgba(158,158,158,0.3)] shrink-0" />

        {/* Copyright Section */}
        <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-4 lg:gap-0">
          {/* Copyright Text */}
          <p className="font-normal leading-[18px] md:leading-[20px] text-[var(--color-neutral-foreground-muted)] text-[11px] md:text-[12px] lg:text-[14px] uppercase w-full md:w-auto">
            © 2025 Pierre - Assistente de IA Financeiro. Todos os direitos reservados.
          </p>

          {/* Powered By */}
          <p className="font-normal leading-normal text-[var(--color-neutral-foreground-muted)] text-[11px] md:text-[12px] lg:text-[14px] text-left md:text-right w-full md:w-auto">
            Powered by CloudWalk, Inc.
          </p>
        </div>
      </Container>
    </footer>
    </CursorFollow>
  );
}

