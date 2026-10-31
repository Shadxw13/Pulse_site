/** Courbe maison unique : cubic-bezier(.2,.75,.2,1). Jamais de rebond. */
export const EASE = [0.2, 0.75, 0.2, 1] as const;
export const EASE_CSS = 'cubic-bezier(.2,.75,.2,1)';
/** Même courbe pour GSAP, enregistrée via CustomEase au chargement des plugins. */
export const GSAP_EASE = 'pulse';

export const DUR = {
  fast: 0.35,
  base: 0.6,
  slow: 0.9,
  /** Fondu toléré en prefers-reduced-motion (< 200 ms). */
  reduced: 0.15,
} as const;

export const STAGGER = 0.06;
export const REVEAL_Y = 36;
export const MOBILE_QUERY = '(max-width: 859px)';
export const REDUCED_QUERY = '(prefers-reduced-motion: reduce)';
