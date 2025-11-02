import React from 'react';

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
    lg: 'px-[var(--spacing-6)] py-[var(--spacing-4)] text-base',
  };
  
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}
    >
      {children}
    </button>
  );
}

