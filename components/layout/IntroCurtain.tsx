'use client';

import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '@/lib/useReducedMotion';

const KEY = 'pulse-intro-seen';
const TOTAL_MS = 3500;

/**
 * Rideau d’ouverture : couche encre, lettres « Pulse » qui montent puis repartent,
 * puis les couches encre et rouge descendent (3,5 s, CSS pur).
 * Seulement à la première visite de la session, jamais en prefers-reduced-motion.
 * Un script en <head> pose html[data-intro="skip"] avant le premier rendu pour éviter tout flash.
 */
export function IntroCurtain() {
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const html = document.documentElement;
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === '1';
    } catch {
      seen = true;
    }
    if (seen || prefersReducedMotion() || html.dataset.intro === 'skip') {
      html.dataset.intro = 'skip';
      setMounted(false);
      return;
    }
    html.dataset.intro = 'play';
    try {
      sessionStorage.setItem(KEY, '1');
    } catch {
      /* stockage indisponible : le rideau rejouera, sans gravité */
    }
    const t = window.setTimeout(() => {
      html.dataset.intro = 'done';
      setMounted(false);
    }, TOTAL_MS);
    return () => window.clearTimeout(t);
  }, []);

  if (!mounted) return null;
  return (
    <div className="intro" aria-hidden="true">
      <div className="layer l-red" />
      <div className="layer l-ink">
        <div className="word">
          {'Pulse'.split('').map((ch, i) => (
            <span className="m" key={i}>
              <span className="c" style={{ animationDelay: `${(0.15 + i * 0.09).toFixed(2)}s, 1.75s` }}>
                {ch}
              </span>
            </span>
          ))}
        </div>
        <span className="isub">Base FiveM · ESX Legacy</span>
      </div>
    </div>
  );
}

/** Script inline (avec nonce) exécuté avant le rendu : décide si le rideau doit être masqué. */
export const introBootScript = `(function(){var h=document.documentElement;try{var r=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;if(r)h.dataset.motion='reduce';if(r||sessionStorage.getItem('${KEY}')==='1')h.dataset.intro='skip'}catch(e){h.dataset.intro='skip'}})();`;
