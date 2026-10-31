'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/cn';
import { isMobileViewport, prefersReducedMotion } from '@/lib/useReducedMotion';

/**
 * Grille de points (couleur line-2) en canvas 2D. Les points proches du curseur grossissent légèrement.
 * 60 fps pendant l’interaction, à l’arrêt hors écran ou sans mouvement.
 */
export default function DotField({
  gap = 24,
  radius = 1.1,
  boost = 1.4,
  reach = 130,
  opacity = 1,
  className,
}: {
  gap?: number;
  radius?: number;
  boost?: number;
  reach?: number;
  opacity?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const color =
      getComputedStyle(document.documentElement).getPropertyValue('--color-line-2').trim() || 'gray';
    const interactive =
      !prefersReducedMotion() && !isMobileViewport() && matchMedia('(hover: hover)').matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let cols = 0;
    let rows = 0;
    let scale = new Float32Array(0);
    const mouse = { x: -9999, y: -9999 };
    let raf = 0;
    let visible = true;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      cols = Math.ceil(w / gap) + 1;
      rows = Math.ceil(h / gap) + 1;
      scale = new Float32Array(cols * rows).fill(1);
      draw(false);
    };

    const draw = (animateStep: boolean) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity;
      const ox = (w - (cols - 1) * gap) / 2;
      const oy = (h - (rows - 1) * gap) / 2;
      let moving = false;
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const x = ox + i * gap;
          const y = oy + j * gap;
          const k = j * cols + i;
          if (animateStep) {
            const d = Math.hypot(x - mouse.x, y - mouse.y);
            const target = d < reach ? 1 + boost * (1 - d / reach) ** 2 : 1;
            const s = scale[k] + (target - scale[k]) * 0.18;
            if (Math.abs(s - target) > 0.01) moving = true;
            scale[k] = s;
          }
          ctx.beginPath();
          ctx.arc(x, y, radius * scale[k], 0, Math.PI * 2);
          ctx.fill();
        }
      }
      return moving;
    };

    const loop = () => {
      raf = 0;
      if (!visible) return;
      if (draw(true)) raf = requestAnimationFrame(loop);
    };
    const kick = () => {
      if (!raf && visible) raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      kick();
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
      kick();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) kick();
    });
    io.observe(canvas);
    const host = canvas.parentElement;
    if (interactive && host) {
      host.addEventListener('pointermove', onMove);
      host.addEventListener('pointerleave', onLeave);
    }
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host?.removeEventListener('pointermove', onMove);
      host?.removeEventListener('pointerleave', onLeave);
    };
  }, [gap, radius, boost, reach, opacity]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
    />
  );
}
