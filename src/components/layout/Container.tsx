import React from 'react';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

/**
 * Global Responsive Container Component
 * Applies uniform site-wide constraints:
 * - Mobile: 100% width with responsive horizontal padding
 * - from md: max-w-6xl (72rem)
 * - from 2xl: max-w-7xl (80rem)
 */
export default function Container({
  children,
  className = '',
  as: Component = 'div',
  ...props
}: ContainerProps) {
  return (
    <Component
      className={`section-container ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

