import React from 'react';

export interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: 'container' | 'section' | 'card';
  className?: string;
}

export function Container({
  children,
  maxWidth = 'container',
  className = '',
}: ContainerProps) {
  const maxWidthStyles = {
    container: 'max-w-[1280px]',
    section: 'max-w-[1112px]',
    card: 'max-w-[546px]',
  };
  
  return (
    <div className={`w-full mx-auto ${maxWidthStyles[maxWidth]} ${className}`}>
      {children}
    </div>
  );
}

