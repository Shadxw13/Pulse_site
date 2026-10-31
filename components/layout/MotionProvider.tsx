'use client';

import { MotionConfig } from 'motion/react';

/** Motion respecte prefers-reduced-motion : transforms coupés, fondus conservés. */
export function MotionProvider({ children, nonce }: { children: React.ReactNode; nonce?: string }) {
  return (
    <MotionConfig reducedMotion="user" nonce={nonce}>
      {children}
    </MotionConfig>
  );
}
