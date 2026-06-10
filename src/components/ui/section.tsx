'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils/cn';
import { ease } from '@/lib/motion';
import { Container } from './container';

const backgrounds = {
  default: 'bg-background',
  muted: 'bg-surface',
  gradient: 'bg-gradient-to-b from-primary-50/60 to-white',
  lavender: 'bg-primary-50/40',
} as const;

export function Section({
  className,
  size = 'lg',
  background = 'default',
  children,
  id,
}: {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  background?: keyof typeof backgrounds;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease }}
      className={cn('scroll-mt-28 py-20 md:py-28', backgrounds[background], className)}
    >
      <Container size={size}>{children}</Container>
    </motion.section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  centered = true,
  className,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  centered?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('mb-14', centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl', className)}>
      {eyebrow && (
        <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-primary-100 px-3.5 py-1.5 text-sm font-bold text-primary-700">
          {eyebrow}
        </span>
      )}
      <h2 className="text-balance text-3xl font-extrabold leading-[1.18] text-navy md:text-4xl lg:text-[2.7rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg leading-relaxed text-foreground-muted">{description}</p>
      )}
    </div>
  );
}
