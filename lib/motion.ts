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

/** Courbe de Bézier cubique (x1, y1, x2, y2) → fonction d’easing, pour les tweens faits main. */
export function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const sx = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sy = (t: number) => ((ay * t + by) * t + cy) * t;
  const dx = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 6; i++) {
      const d = dx(t);
      if (Math.abs(d) < 1e-6) break;
      t -= (sx(t) - x) / d;
    }
    return sy(Math.min(1, Math.max(0, t)));
  };
}

export const easePulse = cubicBezier(...EASE);
