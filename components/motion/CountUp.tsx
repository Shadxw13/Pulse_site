'use client';

import { useEffect, useRef } from 'react';
import { easePulse } from '@/lib/motion';
import { prefersReducedMotion } from '@/lib/useReducedMotion';

/** Compteur de 0 à la valeur, au format fr-FR, déclenché à l’entrée dans le viewport (puis à chaque changement). */
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
  const shown = useRef<number | null>(null);
  const fmt = (n: number) =>
    prefix +
    n.toLocaleString('fr-FR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) +
    suffix;
  const final = fmt(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.textContent = final;
      shown.current = value;
      return;
    }
    let raf = 0;
    const run = (from: number) => {
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / (duration * 1000));
        const v = from + (value - from) * easePulse(p);
        el.textContent = fmt(v);
        shown.current = v;
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    // Déjà joué : on anime depuis la valeur affichée.
    if (shown.current !== null) {
      run(shown.current);
      return () => cancelAnimationFrame(raf);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          run(0);
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span className={className} style={{ fontVariantNumeric: 'tabular-nums' }}>
      <span className="sr-only">{final}</span>
      <span ref={ref} aria-hidden="true">
        {final}
      </span>
    </span>
  );
}
