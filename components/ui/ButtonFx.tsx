'use client';

import { useRef } from 'react';
import { Magnetic } from '@/components/motion/Magnetic';
import { prefersReducedMotion } from '@/lib/useReducedMotion';

/** Petit éclat de 6 traits rouges au clic (« click spark »). */
function spark(x: number, y: number) {
  if (prefersReducedMotion()) return;
  const host = document.createElement('span');
  host.setAttribute('aria-hidden', 'true');
  host.className = 'pointer-events-none fixed z-[200] block size-0';
  host.style.left = `${x}px`;
  host.style.top = `${y}px`;
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * 360 + 30;
    const s = document.createElement('i');
    s.className = 'absolute left-0 top-0 block h-[2px] w-[9px] origin-left rounded-[2px] bg-red';
    host.appendChild(s);
    s.animate(
      [
        { transform: `rotate(${a}deg) translateX(6px) scaleX(1)`, opacity: 1 },
        { transform: `rotate(${a}deg) translateX(20px) scaleX(0.2)`, opacity: 0 },
      ],
      { duration: 420, easing: 'cubic-bezier(.2,.75,.2,1)', fill: 'forwards' },
    );
  }
  document.body.appendChild(host);
  window.setTimeout(() => host.remove(), 460);
}

export function ButtonFx({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  return (
    <Magnetic>
      <span
        ref={ref}
        className="contents"
        onPointerDown={(e) => {
          if (e.button === 0) spark(e.clientX, e.clientY);
        }}
      >
        {children}
      </span>
    </Magnetic>
  );
}
