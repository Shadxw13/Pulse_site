'use client';

import { LazyMotion, MotionConfig } from 'motion/react';

const loadFeatures = () => import('@/lib/motion-features').then((m) => m.default);

/**
 * Motion en chargement différé (LazyMotion + composants `m`) : le bundle initial reste léger.
 * Motion respecte prefers-reduced-motion : transforms coupés, fondus conservés.
 */
export function MotionProvider({ children, nonce }: { children: React.ReactNode; nonce?: string }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user" nonce={nonce}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
