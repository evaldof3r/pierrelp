import React from 'react';
import Image from 'next/image';
import { Container } from '../ui/Container';

export function HeroSection() {
  return (
    <section className="w-full flex flex-col items-center pt-[208px] pb-[80px] px-[164px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
      <Container maxWidth="section" className="flex flex-col gap-[64px] items-center">
        {/* Hero Text */}
        <div className="w-full flex flex-col gap-[16px] items-center">
          {/* Main Title */}
          <h1 className="w-full font-bold leading-[1.1] text-[#f8f8f8] text-[76px] text-center tracking-[-2.28px]">
            ASSISTENTE IA QUE<br />
            FALA SUA LÍNGUA CHEGOU!
          </h1>
          
          {/* Subtitle */}
          <p className="w-full font-normal leading-[32px] text-[var(--color-neutral-foreground-muted)] text-[24px] text-center uppercase">
            Pierre é a inteligência artificial que analisa seus gastos e te ajuda a economizar
          </p>
        </div>
        
        {/* iPhone Mockup */}
        <div className="w-full flex gap-[8px] items-center justify-center">
          <div className="h-[812.977px] relative rounded-[22.901px] w-[375px]">
            {/* iPhone Bezel */}
            <Image
              src="/images/iphone-bezel.webp"
              alt="iPhone displaying Pierre app interface"
              fill
              className="object-cover rounded-[22.901px] pointer-events-none"
              priority
              sizes="375px"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

