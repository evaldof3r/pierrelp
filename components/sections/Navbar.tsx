import React from 'react';
import { Button } from '../ui/Button';
import Image from 'next/image';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center pt-[var(--spacing-6)] pb-[var(--spacing-10)] px-[164px]">
      <div className="w-full max-w-[var(--max-w-container)] flex items-center justify-between">
        {/* Glassmorphism Container */}
        <div className="w-full backdrop-blur-[var(--backdrop-blur)] bg-[var(--color-primary-background-base)] border border-[var(--color-neutral-border)] rounded-full px-[26px] py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="h-[39.818px] w-[121.488px] relative">
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
          <div className="flex items-center gap-[var(--spacing-4)]">
            <Button variant="primary" size="md">
              Baixar APP
            </Button>
            <Button variant="outline" size="lg">
              Login
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

