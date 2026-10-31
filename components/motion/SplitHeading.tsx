'use client';

import { Children, cloneElement, isValidElement, useRef, type ReactElement, type ReactNode } from 'react';
import { useGsapFx } from '@/lib/gsap';
import { GSAP_EASE } from '@/lib/motion';
import { isMobileViewport, prefersReducedMotion } from '@/lib/useReducedMotion';
import { cn } from '@/lib/cn';

type Props = React.HTMLAttributes<HTMLHeadingElement> & {
  as?: 'h1' | 'h2' | 'h3' | 'p';
  /**
   * Titre au-dessus de la ligne de flottaison : les mots sont découpés dès le rendu serveur
   * et montent en CSS pur, sans attendre le JS (meilleur LCP). Sinon : GSAP SplitText au défilement.
   */
  immediate?: boolean;
  /** Pour le hero de l’Accueil : attend la fin du rideau d’ouverture. */
  afterIntro?: boolean;
};

/** Découpe les nœuds texte en mots masqués (rendu serveur). Les éléments SVG restent intacts. */
function splitWords(children: ReactNode, counter: { i: number }): ReactNode {
  return Children.map(children, (child) => {
    if (typeof child === 'string') {
      return child.split(/(\s+)/).map((part, k) =>
        /^\s+$/.test(part) || part === '' ? (
          part
        ) : (
          <span key={k} className="sw">
            <span className="sw-i" style={{ ['--i' as string]: counter.i++ }}>
              {part}
            </span>
          </span>
        ),
      );
    }
    if (isValidElement(child) && child.type === 'span') {
      const el = child as ReactElement<{ children?: ReactNode }>;
      return cloneElement(el, undefined, splitWords(el.props.children, counter));
    }
    return child;
  });
}

/** Titre découpé en mots qui montent depuis un masque, en cascade de 60 ms. */
export function SplitHeading({
  as: Tag = 'h2',
  immediate = false,
  afterIntro = false,
  children,
  className,
  ...rest
}: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGsapFx(
    ({ gsap, SplitText }) => {
      const el = ref.current;
      if (!el) return;
      el.setAttribute('data-split', 'done');
      if (prefersReducedMotion()) return;
      const split = SplitText.create(el, { type: 'words', mask: 'words', wordsClass: 'split-w' });
      gsap.from(split.words, {
        yPercent: 110,
        duration: isMobileViewport() ? 0.6 : 0.9,
        ease: GSAP_EASE,
        stagger: 0.06,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
      return () => split.revert();
    },
    { scope: ref, enabled: !immediate },
  );

  if (immediate) {
    return (
      <Tag ref={ref} className={cn('split-css', afterIntro && 'split-intro', className)} {...rest}>
        {splitWords(children, { i: 0 })}
      </Tag>
    );
  }

  return (
    <Tag ref={ref} data-split="pending" className={className} {...rest}>
      {children}
    </Tag>
  );
}
