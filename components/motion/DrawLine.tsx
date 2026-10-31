'use client';

import { useRef } from 'react';
import { useGsapFx } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/useReducedMotion';

/** Tracé SVG progressif (DrawSVG) à l’entrée dans le viewport. À placer dans un <svg>. */
export function DrawLine({
  duration = 1.4,
  delay = 0,
  start = 'top 92%',
  ...path
}: React.SVGProps<SVGPathElement> & { duration?: number; delay?: number; start?: string }) {
  const ref = useRef<SVGPathElement>(null);
  useGsapFx(
    ({ gsap }) => {
      const el = ref.current;
      if (!el) return;
      el.setAttribute('data-draw', 'done');
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        el,
        { drawSVG: '0%' },
        { drawSVG: '100%', duration, delay, ease: 'power2.inOut', scrollTrigger: { trigger: el, start, once: true } },
      );
    },
    { scope: ref },
  );
  return <path ref={ref} data-draw="pending" {...path} />;
}
