import * as React from 'react';
import { cn } from '@/lib/utils/cn';

const sizes = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
} as const;

export function Container({
  className,
  size = 'lg',
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { size?: keyof typeof sizes }) {
  return (
    <div className={cn('mx-auto w-full px-5 sm:px-6 lg:px-8', sizes[size], className)} {...props} />
  );
}
