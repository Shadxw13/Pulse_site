'use client';

import { m, type Variants } from 'motion/react';
import { DUR, EASE, REVEAL_Y, STAGGER } from '@/lib/motion';
import { useIsMobile, useReducedMotion } from '@/lib/useReducedMotion';

type Tag = 'div' | 'section' | 'figure' | 'ul' | 'li' | 'span' | 'p' | 'article';

type Props = React.HTMLAttributes<HTMLElement> & {
  as?: Tag;
  /** Retard en secondes (ou rang dans une fratrie : index × 60 ms). */
  delay?: number;
  index?: number;
  /** Les enfants <RevealItem> entrent en cascade (60 ms). */
  stagger?: boolean;
  /** Au-dessus de la ligne de flottaison : animation CSS dès le premier rendu, sans attendre le JS. */
  immediate?: boolean;
};

function useRevealTiming() {
  const reduce = useReducedMotion();
  const mobile = useIsMobile();
  return {
    reduce,
    y: reduce ? 0 : mobile ? 24 : REVEAL_Y,
    duration: reduce ? DUR.reduced : mobile ? 0.5 : 0.8,
  };
}

/** Fondu + translation de 36 px à l’entrée dans le viewport (une seule fois). */
export function Reveal({
  as = 'div',
  delay = 0,
  index = 0,
  stagger = false,
  immediate = false,
  children,
  ...rest
}: Props) {
  const { reduce, y, duration } = useRevealTiming();
  if (immediate) {
    const Tag = as;
    const { className, style, ...dom } = rest;
    return (
      <Tag
        className={['rise', className].filter(Boolean).join(' ')}
        style={{ ...style, ['--rise-delay' as string]: `${delay + index * STAGGER}s` }}
        {...(dom as React.HTMLAttributes<HTMLElement>)}
      >
        {children}
      </Tag>
    );
  }
  const M = m[as] as typeof m.div;
  const variants: Variants = stagger
    ? {
        hidden: {},
        show: {
          transition: {
            delayChildren: reduce ? 0 : delay + index * STAGGER,
            staggerChildren: reduce ? 0 : STAGGER,
          },
        },
      }
    : {
        hidden: { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration, ease: EASE, delay: reduce ? 0 : delay + index * STAGGER },
        },
      };
  return (
    <M
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -8% 0px' }}
      variants={variants}
      {...(rest as React.ComponentProps<typeof m.div>)}
    >
      {children}
    </M>
  );
}

/** Enfant d’un <Reveal stagger> : hérite du déclenchement du parent. */
export function RevealItem({ as = 'div', children, ...rest }: Omit<Props, 'delay' | 'index' | 'stagger'>) {
  const { y, duration } = useRevealTiming();
  const M = m[as] as typeof m.div;
  return (
    <M
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration, ease: EASE } },
      }}
      {...(rest as React.ComponentProps<typeof m.div>)}
    >
      {children}
    </M>
  );
}
