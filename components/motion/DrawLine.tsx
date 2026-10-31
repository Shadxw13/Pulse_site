'use client';

import { useRef } from 'react';
import { useGsapFx } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/useReducedMotion';

/** Tracé SVG progressif (DrawSVG) à l’entrée dans le viewport. À placer dans un <svg>. */
export function DrawLine({
  duration = 1.4,
  delay = 0,
  start = 'top 92%',
  afterIntro = false,
  ...path
}: React.SVGProps<SVGPathElement> & {
  duration?: number;
  delay?: number;
  start?: string;
  afterIntro?: boolean;
}) {
  const ref = useRef<SVGPathElement>(null);
  useGsapFx(
    ({ gsap }) => {
      const el = ref.current;
      if (!el) return;
      el.setAttribute('data-draw', 'done');
      if (prefersReducedMotion()) return;
      // Hero de l’Accueil : pendant le rideau d’ouverture, on attend sa fin.
      const intro = afterIntro && document.documentElement.dataset.intro === 'play' ? 2.9 : 0;
      gsap.fromTo(
        el,
        { drawSVG: '0%' },
        {
          drawSVG: '100%',
          duration,
          delay: delay + intro,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: el, start, once: true },
        },
      );
    },
    { scope: ref },
  );
  return <path ref={ref} data-draw="pending" {...path} />;
}
