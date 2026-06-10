'use client';

import * as React from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { Container } from '@/components/ui/container';

const TEXT =
  'من أوّل رسالة على واتساب، إلى صفقةٍ مكتملة — سادة كونكت يجمع محادثاتك وعملاءك وفريقك في مكانٍ واحد، ويحوّل طريقة عملك بالكامل.';

function Word({
  children,
  progress,
  range,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const color = useTransform(progress, range, ['#cbd5e1', '#210b65']);
  return (
    <motion.span style={{ opacity, color }} className="inline-block">
      {children}
    </motion.span>
  );
}

export function Statement() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.55'],
  });
  const words = TEXT.split(' ');

  return (
    <section ref={ref} className="bg-white py-20 md:py-28">
      <Container size="md">
        <p className="flex flex-wrap justify-center gap-x-2.5 gap-y-1.5 text-center text-2xl font-extrabold leading-[1.7] md:text-[2.4rem] md:leading-[1.55]">
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {w}
            </Word>
          ))}
        </p>
      </Container>
    </section>
  );
}
