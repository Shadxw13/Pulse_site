'use client';

import { useSyncExternalStore } from 'react';
import { MOBILE_QUERY, REDUCED_QUERY } from './motion';

function subscribeTo(query: string) {
  return (cb: () => void) => {
    if (typeof window === 'undefined' || !window.matchMedia) return () => {};
    const mq = window.matchMedia(query);
    mq.addEventListener('change', cb);
    return () => mq.removeEventListener('change', cb);
  };
}

function useMedia(query: string, serverValue: boolean): boolean {
  return useSyncExternalStore(
    subscribeTo(query),
    () =>
      typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(query).matches : serverValue,
    () => serverValue,
  );
}

/** true si l’utilisateur demande moins d’animations. */
export function useReducedMotion(): boolean {
  return useMedia(REDUCED_QUERY, false);
}

/** true sous 860 px : pas de parallaxe souris ni de Lenis. */
export function useIsMobile(): boolean {
  return useMedia(MOBILE_QUERY, false);
}

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia(REDUCED_QUERY).matches;
}

export function isMobileViewport(): boolean {
  return typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia(MOBILE_QUERY).matches;
}
