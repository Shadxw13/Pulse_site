'use client';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import type { RefObject } from 'react';
import { GSAP_EASE } from './motion';

gsap.registerPlugin(useGSAP);

type Plugins = {
  gsap: typeof gsap;
  ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger;
  SplitText: typeof import('gsap/SplitText').SplitText;
  DrawSVGPlugin: typeof import('gsap/DrawSVGPlugin').DrawSVGPlugin;
};

let pending: Promise<Plugins> | null = null;

/** Les plugins GSAP sont chargés à la demande, côté client uniquement. */
export function loadGsap(): Promise<Plugins> {
  if (!pending) {
    pending = Promise.all([
      import('gsap/ScrollTrigger'),
      import('gsap/SplitText'),
      import('gsap/DrawSVGPlugin'),
      import('gsap/CustomEase'),
    ]).then(
      ([st, sp, dr, ce]) => {
        gsap.registerPlugin(st.ScrollTrigger, sp.SplitText, dr.DrawSVGPlugin, ce.CustomEase);
        ce.CustomEase.create(GSAP_EASE, '0.2,0.75,0.2,1');
        return { gsap, ScrollTrigger: st.ScrollTrigger, SplitText: sp.SplitText, DrawSVGPlugin: dr.DrawSVGPlugin };
      },
    );
  }
  return pending;
}

type Setup = (p: Plugins) => void | (() => void);

/**
 * useGSAP + plugins chargés dynamiquement : tout ce qui est créé dans `setup`
 * est enregistré dans le contexte GSAP et nettoyé au démontage.
 */
export function useGsapFx(
  setup: Setup,
  opts: { scope: RefObject<HTMLElement | SVGElement | null>; deps?: unknown[]; enabled?: boolean },
) {
  const { scope, deps = [], enabled = true } = opts;
  useGSAP(
    (context) => {
      if (!enabled) return;
      let alive = true;
      loadGsap().then((p) => {
        if (!alive) return;
        context.add(() => setup(p));
      });
      return () => {
        alive = false;
      };
    },
    { scope, dependencies: [enabled, ...deps], revertOnUpdate: true },
  );
}

export { gsap };
