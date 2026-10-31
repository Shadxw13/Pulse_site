'use client';

import { useRef } from 'react';
import { useGsapFx } from '@/lib/gsap';
import { GSAP_EASE } from '@/lib/motion';
import { isMobileViewport, prefersReducedMotion } from '@/lib/useReducedMotion';

type Props = React.HTMLAttributes<HTMLHeadingElement> & {
  as?: 'h1' | 'h2' | 'h3' | 'p';
  /** Joue tout de suite (titres au-dessus de la ligne de flottaison) au lieu d’attendre le défilement. */
  immediate?: boolean;
  delay?: number;
  /** Tracé SVG interne (ligne de pouls) à dessiner après le titre. */
  draw?: { selector: string; delay: number; duration: number };
};

/** Titre découpé en mots (GSAP SplitText) qui montent depuis un masque, en cascade. */
export function SplitHeading({ as: Tag = 'h2', immediate = false, delay = 0, draw, children, ...rest }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGsapFx(
    ({ gsap, SplitText }) => {
      const el = ref.current;
      if (!el) return;
      const path = draw ? el.querySelector<SVGPathElement>(draw.selector) : null;
      const show = () => {
        el.setAttribute('data-split', 'done');
        path?.setAttribute('data-draw', 'done');
      };
      if (prefersReducedMotion()) {
        show();
        return;
      }
      const split = SplitText.create(el, { type: 'words', mask: 'words', wordsClass: 'split-w' });
      show();
      const mobile = isMobileViewport();
      // Pendant le rideau d’ouverture, le titre du hero attend la fin de l’animation.
      const introDelay = immediate && document.documentElement.dataset.intro === 'play' ? 2.6 : 0;
      gsap.from(split.words, {
        yPercent: 110,
        opacity: 0,
        duration: mobile ? 0.6 : 0.9,
        ease: GSAP_EASE,
        stagger: 0.06,
        delay: delay + introDelay,
        scrollTrigger: immediate ? undefined : { trigger: el, start: 'top 88%', once: true },
      });
      if (path && draw) {
        gsap.fromTo(
          path,
          { drawSVG: '0%' },
          { drawSVG: '100%', duration: draw.duration, delay: draw.delay + introDelay, ease: 'power2.inOut' },
        );
      }
      return () => split.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} data-split="pending" {...rest}>
      {children}
    </Tag>
  );
}
