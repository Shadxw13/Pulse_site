'use client';

import { useEffect, useLayoutEffect, type RefObject } from 'react';
import { GSAP_EASE } from './motion';

type GsapModule = typeof import('gsap').gsap;
type Plugins = {
  gsap: GsapModule;
  ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger;
  SplitText: typeof import('gsap/SplitText').SplitText;
  DrawSVGPlugin: typeof import('gsap/DrawSVGPlugin').DrawSVGPlugin;
};

let pending: Promise<Plugins> | null = null;

/**
 * GSAP et ses plugins sont chargés à la demande, côté client uniquement :
 * rien de GSAP n’entre dans le bundle initial des pages.
 */
export function loadGsap(): Promise<Plugins> {
  if (!pending) {
    // On laisse passer le premier rendu et l’hydratation avant de charger GSAP (moins de blocage).
    const idle = new Promise<void>((resolve) => {
      if ('requestIdleCallback' in window) window.requestIdleCallback(() => resolve(), { timeout: 1200 });
      else setTimeout(resolve, 200);
    });
    pending = idle
      .then(() =>
        Promise.all([
          import('gsap'),
          import('gsap/ScrollTrigger'),
          import('gsap/SplitText'),
          import('gsap/DrawSVGPlugin'),
          import('gsap/CustomEase'),
        ]),
      )
      .then(([g, st, sp, dr, ce]) => {
        const gsap = g.gsap;
        gsap.registerPlugin(st.ScrollTrigger, sp.SplitText, dr.DrawSVGPlugin, ce.CustomEase);
        ce.CustomEase.create(GSAP_EASE, '0.2,0.75,0.2,1');
        return {
          gsap,
          ScrollTrigger: st.ScrollTrigger,
          SplitText: sp.SplitText,
          DrawSVGPlugin: dr.DrawSVGPlugin,
        };
      });
  }
  return pending;
}

type Setup = (p: Plugins) => void | (() => void);

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/**
 * Équivalent de useGSAP (@gsap/react) avec chargement dynamique :
 * tout ce que `setup` crée vit dans un gsap.context() limité à `scope`,
 * et context.revert() nettoie tweens, ScrollTriggers et SplitText au démontage.
 */
export function useGsapFx(
  setup: Setup,
  opts: { scope: RefObject<HTMLElement | SVGElement | null>; deps?: unknown[]; enabled?: boolean },
) {
  const { scope, deps = [], enabled = true } = opts;
  useIsoLayoutEffect(() => {
    if (!enabled) return;
    let alive = true;
    let revert: (() => void) | undefined;
    loadGsap().then((p) => {
      if (!alive) return;
      const ctx = p.gsap.context(() => setup(p), scope.current ?? undefined);
      revert = () => ctx.revert();
    });
    return () => {
      alive = false;
      revert?.();
    };
  }, [enabled, ...deps]);
}
