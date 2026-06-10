'use client';

import dynamic from 'next/dynamic';
import { motion } from 'motion/react';
import { Rocket, MessageCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Container } from '../ui/container';
import { HeroMock } from './hero-mock';
import { SITE } from '@/lib/site';

// Decorative WebGL background — lazy + client-only so three.js stays out of the
// critical hydration path (it never renders on the server anyway).
const ParticleNetwork = dynamic(
  () => import('./particle-network').then((m) => m.ParticleNetwork),
  { ssr: false },
);
import { staggerContainer, blurFadeUp, scaleUp, ease } from '@/lib/motion';

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-primary-50/60 via-white to-white pt-28 pb-20 md:pt-36"
    >
      {/* drifting gradient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 right-[-10rem] h-80 w-80 rounded-full bg-primary-200/40 blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-10 left-[-6rem] h-72 w-72 rounded-full bg-secondary-200/40 blur-3xl"
          animate={{ x: [0, 25, 0], y: [0, -18, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-primary-100/60 blur-3xl"
          animate={{ x: [0, -15, 0], y: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* three.js network constellation — sits above the blobs, below the copy */}
      <ParticleNetwork className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.85),rgba(0,0,0,0.55)_55%,transparent_92%)]" />

      <Container className="relative">
        <motion.div
          variants={staggerContainer(0.14)}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          <motion.div variants={blurFadeUp}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-gray-200 bg-white/70 px-4 py-2 text-sm font-semibold text-foreground-muted">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-whatsapp text-white">
                <MessageCircle size={14} fill="currentColor" strokeWidth={0} />
              </span>
              <span className="h-4 w-px bg-gray-200" />
              من المحادثة إلى الصفقة
            </span>
          </motion.div>

          <motion.h1
            variants={blurFadeUp}
            className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.2] text-navy md:text-5xl lg:text-6xl"
          >
            محادثاتك ومبيعاتك،
            <br />
            في نظام <span className="gradient-text">واحد ذكي</span>
          </motion.h1>

          <motion.p
            variants={blurFadeUp}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted md:text-xl"
          >
            سادة كونكت تجمع واتساب، الموظف الذكي، الحملات، الصفقات والتقارير في مكانٍ واحد —
            لتبيع أكثر، وتردّ أسرع.
          </motion.p>

          <motion.div variants={scaleUp} className="mt-9">
            <Button href={SITE.signup} size="lg" leftIcon={<Rocket className="h-5 w-5" />}>
              ابدأ الآن مجاناً
            </Button>
          </motion.div>

          <motion.p variants={blurFadeUp} className="mt-4 text-sm text-foreground-subtle">
            بدون بطاقة ائتمان · جاهز خلال دقائق
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50, filter: 'blur(12px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, ease, delay: 0.5 }}
          className="relative mx-auto mt-16 max-w-4xl"
        >
          <HeroMock />
        </motion.div>
      </Container>
    </section>
  );
}
