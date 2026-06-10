'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/utils/cn';

const variants = {
  default: 'bg-white border border-gray-100',
  elevated: 'bg-white shadow-card',
  gradient: 'bg-gradient-to-br from-white to-primary-50',
  glass: 'glass border border-white/40',
  lavender: 'bg-primary-50/60 border border-primary-100/70',
} as const;

export function Card({
  className,
  variant = 'default',
  hover = true,
  children,
  ...props
}: HTMLMotionProps<'div'> & { variant?: keyof typeof variants; hover?: boolean }) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={cn(
        'rounded-2xl p-6',
        variants[variant],
        hover && 'transition-shadow duration-200 hover:shadow-lg',
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
