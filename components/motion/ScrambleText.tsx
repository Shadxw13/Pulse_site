'use client';

import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/lib/useReducedMotion';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%';
const KEEP = /[\s.,:;·/€$%()-]/;

/**
 * Texte qui se « décrypte » : caractères aléatoires puis le vrai texte, sur 600 ms.
 * Rejoué à l’entrée dans le viewport et à chaque changement de `text`.
 */
export function ScrambleText({
  text,
  duration = 600,
  className,
  onView = true,
}: {
  text: string;
  duration?: number;
  className?: string;
  onView?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const first = useRef(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.textContent = text;
    if (prefersReducedMotion()) return;

    let raf = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const solved = Math.floor(p * text.length);
        let out = '';
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          out += i < solved || KEEP.test(ch) ? ch : CHARS[(Math.random() * CHARS.length) | 0];
        }
        el.textContent = out;
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    if (first.current && onView) {
      first.current = false;
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            io.disconnect();
            run();
          }
        },
        { threshold: 0.6 },
      );
      io.observe(el);
      return () => {
        io.disconnect();
        cancelAnimationFrame(raf);
        el.textContent = text;
      };
    }
    first.current = false;
    run();
    return () => {
      cancelAnimationFrame(raf);
      el.textContent = text;
    };
  }, [text, duration, onView]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden="true" style={{ fontVariantNumeric: 'tabular-nums' }}>
        {text}
      </span>
    </span>
  );
}
