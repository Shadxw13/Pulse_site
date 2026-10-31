'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/cn';
import { prefersReducedMotion } from '@/lib/useReducedMotion';

/**
 * Défilement infini. La vitesse augmente avec la vitesse de défilement de la page.
 * Le contenu est dupliqué ; on translate de 0 à −50 %.
 */
export function Marquee({
  children,
  speed = 40,
  reverse = false,
  className,
}: {
  children: React.ReactNode;
  /** pixels par seconde au repos */
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el || prefersReducedMotion()) return;
    let x = 0;
    let last = performance.now();
    let lastY = window.scrollY;
    let boost = 0;
    let raf = 0;
    let visible = false;
    const dir = reverse ? 1 : -1;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const y = window.scrollY;
      const v = Math.abs(y - lastY) / Math.max(dt, 0.001); // px/s de défilement
      lastY = y;
      boost += (Math.min(v * 0.35, 600) - boost) * 0.1;
      const half = el.scrollWidth / 2;
      x += dir * (speed + boost) * dt;
      if (half > 0) {
        if (x <= -half) x += half;
        if (x > 0) x -= half;
      }
      el.style.transform = `translate3d(${x}px,0,0)`;
      raf = visible ? requestAnimationFrame(tick) : 0;
    };
    if (reverse) x = -el.scrollWidth / 4;

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) {
        last = performance.now();
        lastY = window.scrollY;
        raf = requestAnimationFrame(tick);
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [speed, reverse]);

  return (
    <div className={cn('overflow-hidden', className)}>
      <div ref={track} className="flex w-max whitespace-nowrap will-change-transform">
        <div className="flex">{children}</div>
        <div className="flex" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
