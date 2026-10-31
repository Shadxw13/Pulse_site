'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { GameVideo } from '@/components/game/GameVideo';
import { Reveal } from '@/components/motion/Reveal';
import { SplitHeading } from '@/components/motion/SplitHeading';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { moments, STORY_INTERVAL_MS } from '@/content/evening';
import { cn } from '@/lib/cn';
import { useGsapFx } from '@/lib/gsap';
import { EASE_CSS } from '@/lib/motion';
import { isMobileViewport, prefersReducedMotion } from '@/lib/useReducedMotion';

/**
 * « Une soirée sur votre serveur » : 5 moments de 18:00 à 02:00.
 * Desktop : section épinglée, le défilement fait avancer les moments et la barre suit le scroll.
 * Mobile (ou non épinglé) : avance auto toutes les 5 s, pause au survol, l’auto s’arrête au clic.
 */
export function EveningStory() {
  const section = useRef<HTMLElement>(null);
  const pinBox = useRef<HTMLDivElement>(null);
  const bars = useRef<Array<HTMLElement | null>>([]);
  const trigger = useRef<{ start: number; end: number } | null>(null);
  const [hour, setHour] = useState(0);
  const [auto, setAuto] = useState(true);
  const [cycle, setCycle] = useState(0);
  const [hover, setHover] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const r = prefersReducedMotion();
    setReduce(r);
    if (r) setAuto(false);
  }, []);

  // Scroll épinglé (desktop uniquement)
  useGsapFx(
    ({ ScrollTrigger }) => {
      if (prefersReducedMotion() || isMobileViewport() || !pinBox.current) return;
      const n = moments.length;
      let last = -1;
      const st = ScrollTrigger.create({
        trigger: pinBox.current,
        start: 'center center',
        end: () => `+=${Math.round(window.innerHeight * n * 0.7)}`,
        invalidateOnRefresh: true,
        pin: true,
        pinSpacing: true, // le parent est en flex : GSAP le désactiverait par défaut
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress * n;
          const i = Math.min(n - 1, Math.floor(p));
          if (i !== last) {
            last = i;
            setHour(i);
          }
          bars.current.forEach((b, k) => {
            if (b) b.style.transform = `scaleX(${k === i ? Math.min(1, p - i) : 0})`;
          });
        },
      });
      bars.current.forEach((b) => {
        if (b) b.style.transform = 'scaleX(0)';
      });
      trigger.current = st; // start/end restent à jour après un refresh
      setPinned(true);
      setAuto(false);
      return () => {
        trigger.current = null;
        setPinned(false);
      };
    },
    { scope: section },
  );

  const next = useCallback(() => {
    setHour((h) => (h + 1) % moments.length);
    setCycle((c) => c + 1);
  }, []);

  const pick = (i: number) => {
    if (pinned && trigger.current) {
      const { start, end } = trigger.current;
      const top = start + ((i + 0.5) / moments.length) * (end - start);
      if (window.__lenis) window.__lenis.scrollTo(top, { duration: 0.9 });
      else window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
      return;
    }
    setAuto(false);
    setHour(i);
  };

  const m = moments[hour];
  const running = auto && !pinned && !reduce;

  return (
    <section ref={section} className="sec">
      <div className="wrap flex flex-col gap-9">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-3.5">
            <Eyebrow>Côté joueurs</Eyebrow>
            <SplitHeading className="h2 max-w-[15ch]">
              Une soirée sur votre serveur, de 18 h à 2 h.
            </SplitHeading>
          </div>
          <p className="lead max-w-[40ch] !text-[15.5px]">
            Cinq moments d’une soirée type, avec les vraies interfaces que vos joueurs croisent, filmées
            depuis la base.
          </p>
        </Reveal>

        <div
          ref={pinBox}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="flex flex-col gap-[18px] bg-bg"
        >
          <div className="grid grid-cols-[repeat(5,minmax(112px,1fr))] gap-3 overflow-x-auto pb-1.5 md:grid-cols-5 md:overflow-visible md:pb-0">
            {moments.map((mo, i) => {
              const on = i === hour;
              return (
                <button
                  key={mo.hour}
                  type="button"
                  aria-pressed={on}
                  onClick={() => pick(i)}
                  className={cn(
                    'relative flex min-w-0 cursor-pointer flex-col items-start gap-1 border-0 bg-transparent pt-3 text-left transition-colors',
                    on ? 'text-ink' : 'text-muted hover:text-ink',
                  )}
                >
                  <span className="absolute inset-x-0 top-0 h-[3px] overflow-hidden rounded-[3px] bg-line-2">
                    <i
                      key={running && on ? `run-${cycle}` : `idle-${i}`}
                      ref={(el) => {
                        bars.current[i] = el;
                      }}
                      onAnimationEnd={running && on ? next : undefined}
                      className={cn(
                        'absolute inset-0 origin-left bg-ink',
                        running && on && 'story-prog',
                        running && on && hover && 'paused',
                      )}
                      style={{
                        ['--story-dur' as string]: `${STORY_INTERVAL_MS}ms`,
                        transform: pinned ? undefined : `scaleX(${on && !running ? 1 : 0})`,
                      }}
                    />
                  </span>
                  <b className="mono text-[13px] font-medium">{mo.hour}</b>
                  <span className="text-sm">{mo.title}</span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 items-stretch gap-[18px] md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
            <div
              className="relative min-h-[260px] md:min-h-[420px] overflow-hidden rounded-[22px]"
              aria-live="polite"
            >
              {moments.map((mo, i) => (
                <div
                  key={`sky-${mo.hour}`}
                  aria-hidden="true"
                  className="absolute inset-0 transition-opacity duration-1000"
                  style={{
                    background: `linear-gradient(180deg, ${mo.sky[0]} 0%, ${mo.sky[1]} 100%)`,
                    opacity: i === hour ? 1 : 0,
                  }}
                />
              ))}
              {moments.map((mo, i) => (
                <div
                  key={mo.hour}
                  aria-hidden={i !== hour}
                  inert={i !== hour}
                  className="absolute inset-0 flex items-center justify-center p-[clamp(14px,3vw,32px)]"
                  style={{
                    opacity: i === hour ? 1 : 0,
                    transform: i === hour ? 'translateY(0) scale(1)' : 'translateY(18px) scale(.97)',
                    transition: `opacity .6s ease, transform .6s ${EASE_CSS}`,
                  }}
                >
                  <GameVideo
                    name={mo.screen}
                    label={mo.alt}
                    active={i === hour}
                    className="w-full rounded-[12px] shadow-device"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-between gap-3.5 rounded-[18px] border border-line bg-surf p-7">
              <div className="flex flex-col gap-3">
                <span className="mono text-[13px] text-red-text">{m.hour}</span>
                <h3 className="h3 !text-[26px]">{m.title}</h3>
                <p className="m-0 text-ink-2">{m.text}</p>
              </div>
              <div className="flex flex-col gap-2.5">
                <div className="flex justify-between gap-3 rounded-xl bg-bg px-3.5 py-3 text-sm">
                  <span className="text-muted">Se règle dans</span>
                  <span className="text-right font-medium">{m.settings}</span>
                </div>
                <span className="text-[13px] text-muted">
                  {pinned
                    ? 'Faites défiler pour avancer dans la soirée.'
                    : running
                      ? 'Défilement automatique, survolez pour mettre en pause.'
                      : 'Choisissez une heure au-dessus.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
