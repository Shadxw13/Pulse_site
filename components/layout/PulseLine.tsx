/** Motif ECG d’un battement (largeur 150 dans un viewBox de hauteur 100). */
const BEAT = 'h40 l10 -2 l8 2 h12 l8 -34 l10 64 l9 -40 l7 10 h46';
const ROW = `M0 50 ${Array.from({ length: 8 }, () => BEAT).join(' ')}`;
const ROW2 = `M1200 50 ${Array.from({ length: 8 }, () => BEAT).join(' ')}`;

/**
 * ECG animé en boucle : deux tracés identiques côte à côte, translation de −50 % (CSS).
 * Signature visuelle : utilisé dans le moniteur resmon.
 */
export function PulseLine({ className }: { className?: string }) {
  return (
    <svg
      className={`ecg-track absolute top-2.5 left-0 h-[100px] w-[200%] stroke-red-on-dark ${className ?? ''}`}
      viewBox="0 0 2400 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {[ROW, ROW2].map((d, i) => (
        <path key={i} d={d} fill="none" strokeWidth={2.4} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}

/** Ligne de pouls statique (séparateur du pied de page) : segment neutre + battement rouge. */
export const FOOTER_BEAT = 'M610 34 L628 34 L640 12 L656 54 L670 22 L680 34';
export const FOOTER_BASE = 'M0 34 H610 L628 34 L640 12 L656 54 L670 22 L680 34 H1440';
