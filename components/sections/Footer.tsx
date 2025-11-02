import React from 'react';
import Image from 'next/image';
import { Container } from '../ui/Container';

export function Footer() {
  return (
    <footer className="w-full bg-[var(--color-primary-background)] flex flex-col items-center px-[164px] py-[96px]">
      <Container maxWidth="section" className="w-full flex flex-col gap-[40px]">
        {/* Footer Main Container */}
        <div className="w-full flex items-end justify-between">
          {/* Footer Left Section */}
          <div className="flex flex-col gap-[24px] items-start">
            {/* Logo and Description */}
            <div className="flex flex-col gap-[24px] items-start">
              {/* Logo */}
              <div className="h-[39.818px] w-[120px] relative">
                <Image
                  src="/images/pierre-logo-footer.webp"
                  alt="Pierre logo"
                  width={120}
                  height={40}
                  className="object-contain"
                />
              </div>
              {/* Description */}
              <p className="font-normal leading-[20px] text-[var(--color-neutral-foreground-muted)] text-[14px] uppercase w-[346px]">
                Seu assistente de IA para finanças pessoais. Converse com o seu dinheiro.
              </p>
            </div>

            {/* Footer Links */}
            <div className="flex gap-[24px] items-center justify-center">
              {/* Social Links */}
              <div className="flex gap-[3px] items-center w-[120px]">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[37.241px] h-[37.241px] relative shrink-0 flex items-center justify-center"
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
                  className="w-[37.241px] h-[37.241px] relative shrink-0 flex items-center justify-center"
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
                  className="w-[37.241px] h-[37.241px] relative shrink-0 flex items-center justify-center"
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
              <div className="w-[0.776px] h-[12.414px] bg-[var(--color-neutral-foreground-muted)] shrink-0" />

              {/* Terms Link */}
              <a
                href="/termos"
                className="font-normal leading-[20px] text-[rgba(255,255,255,0.7)] text-[14px] hover:opacity-80 transition-opacity"
              >
                TERMOS DE USO
              </a>
            </div>

            {/* App Store Badges */}
            <div className="flex gap-[8px] items-center">
              {/* App Store iOS */}
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[126px] h-[40px] bg-[var(--color-primary-background)] border border-[var(--color-neutral-border)] rounded-[7px] relative overflow-hidden flex items-center justify-center hover:opacity-80 transition-opacity"
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
                className="w-[135px] h-[40px] bg-[var(--color-primary-background)] border border-[var(--color-neutral-border)] rounded-[5px] relative overflow-hidden flex items-center justify-center hover:opacity-80 transition-opacity"
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
          <div className="w-[269px] h-[269px] relative rounded-[24px] overflow-hidden">
            <Image
              src="/images/qr-code-pierre.webp"
              alt="QR Code para download do app Pierre"
              fill
              className="object-cover"
              sizes="269px"
            />
          </div>
        </div>

        {/* Horizontal Divider */}
        <div className="w-full h-[0.776px] bg-[rgba(158,158,158,0.3)] shrink-0" />

        {/* Copyright Section */}
        <div className="w-full flex items-center justify-between">
          {/* Copyright Text */}
          <p className="font-normal leading-[20px] text-[var(--color-neutral-foreground-muted)] text-[14px] uppercase">
            © 2025 Pierre - Assistente de IA Financeiro. Todos os direitos reservados.
          </p>

          {/* Powered By */}
          <p className="font-normal leading-normal text-[var(--color-neutral-foreground-muted)] text-[14px] text-right">
            Powered by CloudWalk, Inc.
          </p>
        </div>
      </Container>
    </footer>
  );
}

