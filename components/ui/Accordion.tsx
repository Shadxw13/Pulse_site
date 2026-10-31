'use client';

import { m } from 'motion/react';
import { DUR, EASE, EASE_CSS } from '@/lib/motion';
import { useReducedMotion } from '@/lib/useReducedMotion';

/**
 * Réponse d’une FAQ. La hauteur change sans animation (pas de layout thrash) ;
 * seul le texte entre en fondu + légère montée.
 */
export function AccordionPanel({
  open,
  id,
  labelledBy,
  children,
}: {
  open: boolean;
  id: string;
  labelledBy: string;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  if (!open) return null;
  return (
    <m.div
      id={id}
      role="region"
      aria-labelledby={labelledBy}
      initial={{ opacity: 0, y: reduce ? 0 : -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? DUR.reduced : DUR.fast, ease: EASE }}
    >
      {children}
    </m.div>
  );
}

/** Le « + » qui tourne à 45° à l’ouverture. */
export function PlusSign({
  open,
  className,
  style,
}: {
  open: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        ...style,
        transform: `rotate(${open ? 45 : 0}deg)`,
        transition: `transform .3s ${EASE_CSS}, background-color .2s, color .2s, border-color .2s`,
      }}
    >
      +
    </span>
  );
}
