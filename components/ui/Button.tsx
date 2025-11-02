'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from '@/lib/animations';
import { prefersReducedMotion, getDuration } from '@/lib/animations';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Micro-interactions: hover scale
  useEffect(() => {
    if (prefersReducedMotion() || disabled || !buttonRef.current) return;

    const button = buttonRef.current;
    let hoverTween: gsap.core.Tween | null = null;
    let activeTween: gsap.core.Tween | null = null;

    const handleMouseEnter = () => {
      if (activeTween) activeTween.kill();
      hoverTween = gsap.to(button, {
        scale: 1.02,
        duration: getDuration(0.2),
        ease: 'ease.inOut',
      });
    };

    const handleMouseLeave = () => {
      if (hoverTween) hoverTween.kill();
      if (activeTween) activeTween.kill();
      gsap.to(button, {
        scale: 1,
        duration: getDuration(0.2),
        ease: 'ease.inOut',
      });
    };

    const handleMouseDown = () => {
      if (hoverTween) hoverTween.kill();
      activeTween = gsap.to(button, {
        scale: 0.98,
        duration: getDuration(0.1),
        ease: 'ease.inOut',
      });
    };

    const handleMouseUp = () => {
      if (activeTween) activeTween.kill();
      gsap.to(button, {
        scale: 1.02,
        duration: getDuration(0.1),
        ease: 'ease.inOut',
      });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);
    button.addEventListener('mousedown', handleMouseDown);
    button.addEventListener('mouseup', handleMouseUp);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
      button.removeEventListener('mousedown', handleMouseDown);
      button.removeEventListener('mouseup', handleMouseUp);
      if (hoverTween) hoverTween.kill();
      if (activeTween) activeTween.kill();
    };
  }, [disabled]);

  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors rounded-full';
  
  const variantStyles = {
    primary: 'bg-[var(--color-accent-green-primary)] text-[var(--color-neutral-foreground-inverted)] hover:opacity-90',
    secondary: 'bg-[var(--color-secondary-accent)] text-[var(--color-neutral-foreground-inverted)] hover:bg-[var(--color-secondary-accent-hover)]',
    outline: 'border border-[var(--color-neutral-border)] text-[var(--color-neutral-foreground)] hover:bg-[var(--color-primary-surface)]',
    ghost: 'text-[var(--color-neutral-foreground)] hover:bg-[var(--color-primary-surface)]',
  };
  
  const sizeStyles = {
    sm: 'px-[var(--spacing-4)] py-[var(--spacing-2)] text-sm',
    md: 'px-[var(--spacing-6)] py-[var(--spacing-4)] text-base',
    lg: 'px-[var(--spacing-8)] py-[var(--spacing-4)] text-lg',
  };
  
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}
    >
      {children}
    </button>
  );
}

