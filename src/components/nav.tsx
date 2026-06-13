'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { BrandMark } from './brand-mark';
import { Button } from './ui/button';
import { Container } from './ui/container';
import { SITE } from '@/lib/site';

const LINKS = [
  { href: '#features', label: 'المميزات' },
  { href: '#ai', label: 'الموظف الذكي' },
  { href: '#pricing', label: 'الأسعار' },
  { href: '#faq', label: 'الأسئلة' },
];

export function Nav() {
  const [open, setOpen] = React.useState(false);
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b border-gray-200/70 bg-white/80 backdrop-blur-lg md:inset-x-auto md:left-0 md:right-0 md:mx-6 md:mt-4 md:rounded-2xl md:border"
    >
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <a href="#top" aria-label="سادة كونكت">
            <BrandMark />
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-gray-700 transition-colors hover:text-primary-600"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <Button href={SITE.signup} variant="outline" size="sm" className="rounded-lg border-primary-400 px-5">
              ابدأ مجانا
            </Button>
          </div>

          <button
            type="button"
            className="p-2 text-navy md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="القائمة"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-gray-100 md:hidden"
          >
            <Container>
              <div className="space-y-2 py-4">
                {LINKS.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-1.5 font-medium text-gray-700"
                  >
                    {l.label}
                  </a>
                ))}
                <Button href={SITE.signup} variant="outline" className="mt-2 w-full">
                  ابدأ مجانا
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
