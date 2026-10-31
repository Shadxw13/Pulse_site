'use client';

import { animate, useInView } from 'motion/react';
import { useEffect, useRef } from 'react';
import { EASE } from '@/lib/motion';
import { prefersReducedMotion } from '@/lib/useReducedMotion';

/** Compteur de 0 à la valeur, au format fr-FR, déclenché à l’entrée dans le viewport. */
export function CountUp({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 0.9,
  className,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const fmt = (n: number) =>
    prefix + n.toLocaleString('fr-FR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
  const final = fmt(value);
  const played = useRef(false);
  const last = useRef(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (prefersReducedMotion()) {
      el.textContent = final;
      return;
    }
    const from = played.current ? last.current : 0;
    played.current = true;
    last.current = value;
    const ctrl = animate(from, value, {
      duration,
      ease: EASE,
      onUpdate: (v) => {
        el.textContent = fmt(v);
      },
    });
    return () => ctrl.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value]);

  return (
    <span className={className} style={{ fontVariantNumeric: 'tabular-nums' }}>
      <span className="sr-only">{final}</span>
      <span ref={ref} aria-hidden="true">
        {final}
      </span>
    </span>
  );
}
