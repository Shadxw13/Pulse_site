'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import type Lenis from 'lenis';
import { loadGsap } from '@/lib/gsap';
import { isMobileViewport, prefersReducedMotion } from '@/lib/useReducedMotion';

declare global {
  interface Window {
    /** Instance Lenis active (desktop), pour les défilements programmés. */
    __lenis?: Lenis;
  }
}

/**
 * Défilement fluide Lenis synchronisé avec ScrollTrigger (desktop uniquement, jamais en reduced-motion).
 * Lenis et GSAP sont chargés dynamiquement.
 */
export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion() || isMobileViewport()) return;
    let cancelled = false;
    let cleanup = () => {};
    Promise.all([import('lenis'), loadGsap()]).then(([{ default: LenisCtor }, { gsap, ScrollTrigger }]) => {
      if (cancelled) return;
      const lenis = new LenisCtor({ autoRaf: false, anchors: { offset: -80 }, lerp: 0.12 });
      lenisRef.current = lenis;
      window.__lenis = lenis;
      lenis.on('scroll', ScrollTrigger.update);
      const raf = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      cleanup = () => {
        gsap.ticker.remove(raf);
        lenis.destroy();
        lenisRef.current = null;
        window.__lenis = undefined;
      };
    });
    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  // Nouvelle page : on repart du haut et on recalcule les déclencheurs.
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    loadGsap().then(({ ScrollTrigger }) => requestAnimationFrame(() => ScrollTrigger.refresh()));
  }, [pathname]);

  return null;
}
