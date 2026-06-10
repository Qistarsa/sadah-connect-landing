import * as React from 'react';
import { cn } from '@/lib/utils/cn';

const variants = {
  primary: 'bg-primary-100 text-primary-700',
  secondary: 'bg-secondary-100 text-secondary-600',
  navy: 'border border-gray-200 bg-white text-navy',
  success: 'bg-green-100 text-green-700',
  outline: 'border border-primary-300 bg-transparent text-primary-600',
} as const;

export function Badge({
  className,
  variant = 'primary',
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: keyof typeof variants }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-bold',
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
