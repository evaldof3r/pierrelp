'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/animations';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion, getDuration } from '@/lib/animations';
import CursorFollow from '@/components/ui/cursor-follow';

interface FeatureCardProps {
  variant: 'dark' | 'light' | 'light-accent';
  title: string;
  imageSrc: string;
  imageAlt: string;
  cursorText?: string;
}

function FeatureCard({ variant, title, imageSrc, imageAlt, cursorText }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Hover animation only (scroll animation handled by parent stagger)
  useEffect(() => {
    if (prefersReducedMotion() || !cardRef.current) return;

    const card = cardRef.current;
    let hoverTween: gsap.core.Tween | null = null;

    const handleMouseEnter = () => {
      hoverTween = gsap.to(card, {
        scale: 1.02,
        y: -4,
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
        duration: getDuration(0.3),
        ease: 'ease.out',
      });
    };

    const handleMouseLeave = () => {
      if (hoverTween) hoverTween.kill();
      gsap.to(card, {
        scale: 1,
        y: 0,
        boxShadow: 'none',
        duration: getDuration(0.3),
        ease: 'ease.out',
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
      if (hoverTween) hoverTween.kill();
    };
  }, []);
  const variantStyles = {
    dark: 'bg-[var(--color-primary-surface)]',
    light: 'bg-[var(--color-secondary-accent-hover)]',
    'light-accent': 'bg-[var(--color-secondary-accent)]',
  };

  const textColor = variant === 'dark' 
    ? 'text-[var(--color-neutral-foreground)]'
    : 'text-[var(--color-neutral-foreground-inverted)]';

  return (
    <div
      ref={cardRef}
      data-cursor-text={cursorText || title}
      className={`w-full max-w-[546px] lg:w-[546px] min-h-[400px] lg:h-[600px] rounded-[24px] overflow-hidden flex flex-col gap-[4px] transition-shadow`}
    >
      <div className={`${variantStyles[variant]} w-full min-h-[400px] lg:h-[600px] rounded-[24px] flex flex-col gap-[4px]`}>
        {/* Title Container */}
        <div className="w-full min-h-[80px] md:min-h-[100px] lg:h-[126px] px-4 md:px-6 lg:px-[24px] pt-4 md:pt-6 lg:pt-[24px] pb-2 md:pb-4 lg:pb-[12px] flex flex-col gap-[4px] shrink-0">
          <h3 className={`w-full font-bold leading-[1.4] ${textColor} text-[20px] md:text-[24px] lg:text-[30px]`}>
            {title}
          </h3>
        </div>
        
        {/* Image Container */}
        <div className="flex-1 w-full relative min-h-[320px] md:min-h-[300px] overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain md:object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 546px"
          />
        </div>
      </div>
    </div>
  );
}

interface FeatureHighlightProps {
  variant: 'green' | 'light';
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: 'left' | 'right';
  cursorText?: string;
}

function FeatureHighlight({ 
  variant, 
  title, 
  description, 
  imageSrc, 
  imageAlt,
  imagePosition = 'right',
  cursorText 
}: FeatureHighlightProps) {
  const highlightRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // Scroll-triggered sequential animation
  useEffect(() => {
    if (prefersReducedMotion() || !highlightRef.current) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: highlightRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
        once: true,
      },
    });

    // Text animation
    if (textRef.current) {
      const textX = imagePosition === 'left' ? -30 : 30;
      timeline.from(
        textRef.current,
        {
          opacity: 0,
          x: textX,
          duration: getDuration(0.8),
          ease: 'power2.out',
        },
        0 // Start at same time as image
      );
    }

    // Image animation
    if (imageRef.current) {
      timeline.from(
        imageRef.current,
        {
          opacity: 0,
          scale: 0.9,
          duration: getDuration(0.8),
          ease: 'power2.out',
        },
        0.2 // Start 0.2s after text (stagger effect)
      );
    }

    return () => {
      if (timeline.scrollTrigger) {
        timeline.scrollTrigger.kill();
      }
      timeline.kill();
    };
  }, [imagePosition]);

  const bgColor = variant === 'green' 
    ? 'bg-[var(--color-accent-green-secondary)]'
    : 'bg-[var(--color-secondary-accent-hover)]';

  const textContainer = (
    <div
      ref={textRef}
      className="w-full lg:w-[556px] min-h-[200px] md:min-h-[300px] lg:h-[600px] px-4 md:px-6 lg:px-[24px] py-4 md:py-8 lg:py-[40px] lg:pr-[12px] flex flex-col justify-between gap-4 md:gap-6 lg:gap-0 shrink-0"
    >
      <h2 className="font-bold leading-none text-[var(--color-neutral-foreground-inverted)] text-[32px] md:text-[48px] lg:text-[80px] w-full">
        {title.split('\n').map((line, i) => (
          <React.Fragment key={i}>
            {line}
            {i < title.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </h2>
      <p className="hidden md:block font-normal leading-[24px] md:leading-[26px] lg:leading-[28px] text-[var(--color-neutral-foreground-disabled)] text-[14px] md:text-[16px] lg:text-[20px] w-full">
        {description.split('\n').map((line, i) => (
          <React.Fragment key={i}>
            {line}
            {i < description.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </p>
    </div>
  );

  const imageContainer = (
    <div
      ref={imageRef}
      className="w-full lg:w-[556px] h-[400px] md:h-[400px] lg:h-[600px] relative overflow-hidden"
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-contain md:object-contain lg:object-cover"
        sizes="(max-width: 1024px) 100vw, 556px"
      />
    </div>
  );

  return (
    <div
      ref={highlightRef}
      data-cursor-text={cursorText || title}
      className={`w-full max-w-[1112px] lg:w-[1112px] min-h-[600px] md:min-h-[600px] lg:h-[600px] rounded-[24px] overflow-hidden flex flex-col lg:flex-row justify-between items-center ${bgColor}`}
    >
      {imagePosition === 'left' ? (
        <>
          {imageContainer}
          {textContainer}
        </>
      ) : (
        <>
          {textContainer}
          {imageContainer}
        </>
      )}
    </div>
  );
}

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRow1Ref = useRef<HTMLDivElement>(null);
  const cardsRow3Ref = useRef<HTMLDivElement>(null);
  const cardsRow5Ref = useRef<HTMLDivElement>(null);

  // Stagger animation for cards in the same row
  useEffect(() => {
    if (prefersReducedMotion()) return;

    // Helper function to create stagger animation for cards
    const createStaggerAnimation = (
      container: HTMLElement | null,
      trigger: HTMLElement | null
    ) => {
      if (!container || !trigger) return;

      // Get direct children (the card divs)
      const cards = Array.from(container.children);
      if (cards.length === 0) return;

      gsap.from(cards, {
        opacity: 0,
        y: 50,
        scale: 0.95,
        duration: getDuration(0.7),
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: trigger,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
      });
    };

    // Animate rows with stagger
    createStaggerAnimation(cardsRow1Ref.current, cardsRow1Ref.current);
    createStaggerAnimation(cardsRow3Ref.current, cardsRow3Ref.current);
    createStaggerAnimation(cardsRow5Ref.current, cardsRow5Ref.current);
  }, []);

  return (
    <CursorFollow className="w-full">
      <section
        ref={sectionRef}
        className="w-full flex flex-wrap gap-4 md:gap-6 lg:gap-[20px] items-center justify-center pt-16 md:pt-24 lg:pt-[120px] pb-12 md:pb-16 lg:pb-[80px] px-4 md:px-8 lg:px-[164px]"
      >
        {/* Row 1: Two Cards */}
        <div ref={cardsRow1Ref} className="contents">
          <FeatureCard
            variant="dark"
            title="O jeito mais simples de entender pra onde seu dinheiro vai"
            imageSrc="/images/feature-simple-tracking.webp"
            imageAlt="Interface mostrando visualização simples dos gastos"
            cursorText="Acompanhe seus gastos"
          />
          <FeatureCard
            variant="light"
            title="Receba insights reais sobre suas finanças"
            imageSrc="/images/feature-insights.webp"
            imageAlt="Insights financeiros personalizados"
            cursorText="Descubra insights"
          />
        </div>

        {/* Row 2: Large Highlight */}
        <FeatureHighlight
          variant="green"
          title="Seu consultor financeiro no seu bolso"
          description="O Pierre é seu consultor 24h no WhatsApp ou app — que fala a sua língua, responde rápido e te ajuda a cuidar do dinheiro em qualquer hora do dia."
          imageSrc="/images/feature-consultant.webp"
          imageAlt="Consultor financeiro Pierre no seu bolso"
          imagePosition="right"
          cursorText="Consultor 24h"
        />

        {/* Row 3: Two Cards */}
        <div ref={cardsRow3Ref} className="contents">
          <FeatureCard
            variant="light"
            title="Segurança de ponta certificada pelo Banco Central"
            imageSrc="/images/feature-security.webp"
            imageAlt="Segurança certificada pelo Banco Central"
            cursorText="Segurança garantida"
          />
          <FeatureCard
            variant="dark"
            title="Gráficos e relatórios claros sobre suas finanças"
            imageSrc="/images/feature-reports.webp"
            imageAlt="Gráficos e relatórios financeiros"
            cursorText="Veja seus relatórios"
          />
        </div>

        {/* Row 4: Large Highlight (reversed) */}
        <FeatureHighlight
          variant="light"
          title="Inteligência para cuidar do seu dinheiro"
          description="Pierre te avisa antes de você gastar demais e mostra como economizar todo mês"
          imageSrc="/images/feature-intelligence.webp"
          imageAlt="Inteligência artificial para finanças"
          imagePosition="left"
          cursorText="Economize mais"
        />

        {/* Row 5: Two Cards */}
        <div ref={cardsRow5Ref} className="contents">
          <FeatureCard
            variant="dark"
            title="São mais de 56 instituições. Seu banco provavelmente está aqui."
            imageSrc="/images/feature-banks.webp"
            imageAlt="56+ instituições financeiras conectadas"
            cursorText="Conecte seu banco"
          />
          <FeatureCard
            variant="light-accent"
            title="Lembretes inteligentes de contas, boletos e pagamentos"
            imageSrc="/images/feature-reminders.webp"
            imageAlt="Lembretes inteligentes de pagamentos"
            cursorText="Nunca esqueça"
          />
        </div>
      </section>
    </CursorFollow>
  );
}

