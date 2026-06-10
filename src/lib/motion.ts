import type { Variants, Transition } from 'motion/react';

/** Shared motion language, matching the sadah.io feel (blur-in reveals). */

export const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const easeOut = ease; // back-compat alias

export const smoothTransition: Transition = { duration: 0.6, ease };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: smoothTransition },
};

export const blurFadeUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease } },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: smoothTransition },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: smoothTransition },
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: smoothTransition },
};

export function staggerContainer(stagger = 0.12, delayChildren = 0.1): Variants {
  return { hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren } } };
}

export const defaultViewport = { once: true, margin: '-80px' } as const;
export const viewportOnce = defaultViewport; // back-compat alias
