'use client';

import { motion } from 'motion/react';
import { Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { SITE } from '@/lib/site';
import { ease, defaultViewport } from '@/lib/motion';

export function FinalCta() {
  return (
    <section className="py-16 md:py-20">
      <Container size="lg">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={defaultViewport}
          transition={{ duration: 0.7, ease }}
          className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-primary-600 via-[#6d28d9] to-indigo px-6 py-20 text-center text-white shadow-[0_40px_120px_-40px_rgba(124,58,237,0.6)]"
        >
          <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_60%_at_50%_-10%,rgba(255,255,255,0.18),transparent)]" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-balance text-4xl font-extrabold leading-tight md:text-5xl">
              مع سادة تبدأ بمحادثة..
              <br />
              وتنتهي{' '}
              <span className="underline decoration-white/40 decoration-4 underline-offset-8">بصفقة</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-white/85 md:text-lg">
              ابدأ اليوم مجانا، وفعل الموظف الذكي خلال دقائق.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button
                href={SITE.signup}
                size="lg"
                className="bg-white text-navy hover:bg-white/90"
                leftIcon={<Rocket className="h-5 w-5" />}
              >
                ابدأ الآن مجانا
              </Button>
              <a
                href={SITE.whatsapp}
                className="rounded-xl border border-white/30 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
              >
                تواصل مع المبيعات
              </a>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
