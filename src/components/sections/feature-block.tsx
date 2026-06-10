'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { Check, type LucideIcon } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { cn } from '@/lib/utils/cn';
import { ease, defaultViewport } from '@/lib/motion';

/** Alternating product feature block: copy on one side, a mockup on the other. */
export function FeatureBlock({
  eyebrow,
  eyebrowIcon: EyebrowIcon,
  title,
  description,
  bullets,
  mock,
  reverse = false,
}: {
  eyebrow: string;
  eyebrowIcon: LucideIcon;
  title: React.ReactNode;
  description: string;
  bullets?: string[];
  mock: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <div className="py-14 md:py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={defaultViewport}
            transition={{ duration: 0.7, ease }}
            className={cn(reverse && 'lg:order-2')}
          >
            <span className="inline-flex items-center gap-2 text-sm font-bold text-primary-600">
              <EyebrowIcon size={18} />
              {eyebrow}
            </span>
            <h3 className="mt-3 text-2xl font-extrabold leading-snug text-navy md:text-[2rem]">{title}</h3>
            <p className="mt-4 text-lg leading-relaxed text-foreground-muted">{description}</p>
            {bullets && (
              <ul className="mt-6 space-y-3">
                {bullets.map((b) => (
                  <li key={b} className="flex items-center gap-3">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary-100">
                      <Check className="h-3 w-3 text-primary-600" />
                    </span>
                    <span className="text-foreground">{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={defaultViewport}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className={cn('relative', reverse && 'lg:order-1')}
          >
            {mock}
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
