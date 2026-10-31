'use client';

import { m, useSpring } from 'motion/react';
import { useRef } from 'react';
import { isMobileViewport, prefersReducedMotion } from '@/lib/useReducedMotion';

const MAX = 8;
const spring = { stiffness: 220, damping: 22, mass: 0.4 }; // amorti critique : pas de rebond

/** Le contenu suit légèrement le curseur (8 px max, ressort Motion, sans rebond visible). */
export function Magnetic({
  children,
  strength = 0.25,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  return (
    <m.span
      ref={ref}
      className={className ?? 'inline-flex'}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || prefersReducedMotion() || isMobileViewport()) return;
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const dx = (e.clientX - (r.left + r.width / 2)) * strength;
        const dy = (e.clientY - (r.top + r.height / 2)) * strength;
        x.set(Math.max(-MAX, Math.min(MAX, dx)));
        y.set(Math.max(-MAX, Math.min(MAX, dy)));
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </m.span>
  );
}
