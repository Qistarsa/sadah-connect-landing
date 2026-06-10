'use client';

import type { ReactNode } from 'react';
import { MotionConfig } from 'motion/react';

/** `reducedMotion="user"` makes every motion animation honor the OS
 * prefers-reduced-motion setting (transforms become instant). */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
