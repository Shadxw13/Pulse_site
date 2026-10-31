'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';
import { prefersReducedMotion } from '@/lib/useReducedMotion';

/**
 * Capture vidéo d’une vraie interface de la base, enregistrée hors jeu (16:9).
 * Lecture seulement quand l’écran est visible ; mouvement réduit : image fixe et bouton lecture.
 */
export function GameVideo({
  name,
  label,
  className,
  active = true,
}: {
  /** Fichiers /game/<name>.{webm,mp4,jpg} */
  name: string;
  label: string;
  className?: string;
  /** Pour une pile de vidéos : seule la vidéo active joue. */
  active?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setReduce(prefersReducedMotion());
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (inView && active && !reduce) {
      if (v.preload === 'none') v.preload = 'auto';
      v.play().catch(() => {});
    } else if (!v.paused) {
      v.pause();
    }
    if (!active) v.currentTime = 0;
  }, [inView, active, reduce]);

  return (
    <div className={cn('relative aspect-video overflow-hidden bg-dark-deep', className)}>
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        poster={`/game/${name}.jpg`}
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="absolute inset-0 size-full object-cover"
      >
        <source src={`/game/${name}.webm`} type="video/webm" />
        <source src={`/game/${name}.mp4`} type="video/mp4" />
      </video>
      {reduce && (
        <button
          type="button"
          onClick={() => {
            const v = ref.current;
            if (!v) return;
            if (v.paused) v.play().catch(() => {});
            else v.pause();
          }}
          aria-label={playing ? 'Mettre la vidéo en pause' : 'Lire la vidéo'}
          className="absolute right-3 bottom-3 flex size-10 cursor-pointer items-center justify-center rounded-full border-0 bg-dark/80 text-dark-text"
        >
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" fill="currentColor">
            {playing ? <path d="M4 3h3v10H4zM9 3h3v10H9z" /> : <path d="M4 2.5v11l9-5.5z" />}
          </svg>
        </button>
      )}
    </div>
  );
}
