'use client';

import { AnimatePresence, m } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { SplitHeading } from '@/components/motion/SplitHeading';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { MAP_H, MAP_W, contestedId, crews, territories, type Freq } from '@/content/territories';
import { cn } from '@/lib/cn';
import { useGsapFx } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/useReducedMotion';

/* Dégradés du guide UI de la ressource territory (html/style.css). */
const ui = {
  container: 'linear-gradient(0deg, #06060645 0%, #20202045 100%)',
  normal: 'linear-gradient(0deg, #06060635 0%, #20202035 100%)',
  accent: 'linear-gradient(0deg, #2abd5335 0%, #0f832f35 100%)',
  alt: 'linear-gradient(0deg, #2a5dbd35 0%, #0f558335 100%)',
  high: 'linear-gradient(0deg, #bd2a2a35 0%, #83210f35 100%)',
};
const level: Record<Freq, { label: string; bg: string }> = {
  low: { label: 'Faible', bg: ui.alt },
  normal: { label: 'Normal', bg: ui.accent },
  high: { label: 'Forte', bg: ui.high },
};
function competitionLevel(n: number | null): { label: string; bg: string } {
  if (n === null) return { label: 'Aucune', bg: ui.alt };
  if (n <= 1) return level.low;
  if (n <= 4) return level.normal;
  return level.high;
}

const CYCLE_MS = 4200;
const startIndex = Math.max(
  0,
  territories.findIndex((t) => t.id === contestedId),
);

/**
 * Les vrais territoires de la base (Los Santos), avec l’info-bulle et la barre d’expérience de crew du jeu.
 * Parcours automatique tant que le visiteur n’a pas choisi ; le territoire attaqué pulse et sa capture avance.
 */
export function TerritoryMap() {
  const [sel, setSel] = useState(startIndex);
  const [auto, setAuto] = useState(true);
  const [capture, setCapture] = useState(0.18);
  const [inView, setInView] = useState(false);
  const svg = useRef<SVGSVGElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const t = territories[sel];
  const crew = crews[t.crew];
  const comp = competitionLevel(t.competition);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Parcours automatique des quartiers.
  useEffect(() => {
    if (!auto || !inView || prefersReducedMotion()) return;
    const id = setInterval(() => setSel((s) => (s + 1) % territories.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [auto, inView]);

  // Capture du territoire attaqué : la barre de crew se remplit puis repart.
  useEffect(() => {
    if (!inView || prefersReducedMotion()) return;
    const id = setInterval(() => setCapture((c) => (c >= 0.98 ? 0.12 : Math.min(1, c + 0.07))), 700);
    return () => clearInterval(id);
  }, [inView]);

  useGsapFx(
    ({ gsap }) => {
      const paths = svg.current?.querySelectorAll<SVGPathElement>('[data-zone]');
      if (!paths?.length || prefersReducedMotion()) return;
      gsap.fromTo(
        paths,
        { drawSVG: '0%', fillOpacity: 0 },
        {
          drawSVG: '100%',
          fillOpacity: 1,
          duration: 1.1,
          ease: 'power2.inOut',
          stagger: 0.07,
          scrollTrigger: { trigger: svg.current, start: 'top 80%', once: true },
        },
      );
    },
    { scope: svg },
  );

  const pick = (i: number) => {
    setAuto(false);
    setSel(i);
  };
  const xp = Math.round(capture * 500);

  return (
    <section className="sec sec-alt">
      <div className="wrap grid grid-cols-1 items-center gap-[clamp(32px,5vw,64px)] md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.35fr)]">
        <Reveal className="flex flex-col gap-[18px]">
          <Eyebrow>Territoires</Eyebrow>
          <SplitHeading className="h2">La ville appartient à ceux qui la tiennent.</SplitHeading>
          <p className="lead !text-base">
            Onze quartiers de Los Santos, plus Paleto Bay, se capturent en jeu. Chaque crew gagne de
            l’expérience, et la carte de pause affiche qui tient quoi.
          </p>
          <div className="mt-1.5 grid grid-cols-2 gap-1.5" role="group" aria-label="Choisir un territoire">
            {territories.map((zone, i) => {
              const on = i === sel;
              return (
                <button
                  key={zone.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => pick(i)}
                  className={cn(
                    'flex w-full min-w-0 cursor-pointer items-center gap-2 rounded-lg border bg-surf px-3 py-2 text-left text-[13.5px] text-ink transition-[border-color,box-shadow] duration-200',
                    on ? 'border-ink shadow-[0_0_0_1px_var(--color-ink)]' : 'border-line hover:border-line-2',
                  )}
                >
                  <i
                    className={cn('size-2 flex-none rounded-full', zone.id === contestedId && 'loop-pulse')}
                    style={{ background: crews[zone.crew].fill.replace(/[\d.]+\)$/, '1)') }}
                  />
                  <span className="truncate">{zone.name}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            ref={box}
            className="relative flex flex-col overflow-hidden rounded-[20px] bg-[#0b0f1a] font-bai text-white shadow-device md:aspect-[16/10] md:flex-row-reverse"
          >
            {/* Fond « Miami » : coucher de soleil sur la baie */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(60% 55% at 12% 100%, rgba(255,92,138,.55), transparent 70%), radial-gradient(55% 50% at 95% 0%, rgba(25,195,195,.4), transparent 70%), radial-gradient(45% 40% at 70% 85%, rgba(255,170,70,.35), transparent 70%), linear-gradient(160deg,#141a33 0%,#0b0f1a 60%)',
              }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[.13]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)',
                backgroundSize: '6% 6.4%',
              }}
            />

            <div
              className="relative w-full flex-none md:h-full md:w-auto"
              style={{ aspectRatio: `${MAP_W} / ${MAP_H}` }}
            >
              <svg
                ref={svg}
                viewBox={`0 0 ${MAP_W} ${MAP_H}`}
                className="absolute inset-0 size-full"
                role="img"
                aria-label={`Carte des territoires de la base. Sélection : ${t.name}, ${crew.name}.`}
              >
                {territories.map((zone, i) => {
                  const c = crews[zone.crew];
                  const on = i === sel;
                  return (
                    <path
                      key={zone.id}
                      data-zone
                      d={zone.path}
                      onClick={() => pick(i)}
                      onPointerEnter={(e) => e.pointerType === 'mouse' && pick(i)}
                      className={cn(
                        'cursor-pointer transition-[stroke-width,filter] duration-300',
                        zone.id === contestedId && 'loop-pulse',
                      )}
                      style={{
                        fill: c.fill,
                        stroke: on ? '#fff' : c.stroke,
                        strokeWidth: on ? 3 : 1.5,
                        strokeLinejoin: 'round',
                        filter: on ? 'drop-shadow(0 0 8px rgba(255,255,255,.55))' : undefined,
                      }}
                    />
                  );
                })}
                <g pointerEvents="none" fontSize="10.5" fontWeight="600" textAnchor="middle" fill="#fff">
                  {territories.map((zone, i) => (
                    <text
                      key={zone.id}
                      x={zone.center.x}
                      y={zone.center.y}
                      opacity={i === sel ? 1 : 0.7}
                      style={{ paintOrder: 'stroke', stroke: 'rgba(0,0,0,.55)', strokeWidth: 3 }}
                    >
                      {zone.name}
                    </text>
                  ))}
                </g>
              </svg>
            </div>

            <div className="relative flex min-w-0 flex-1 flex-col justify-between gap-5 p-4 md:p-5">
              {/* Barre d’expérience du crew (#exp-container de la ressource) */}
              <div aria-hidden="true" className="text-center">
                <div
                  className="mb-2 inline-block px-3 py-1.5 text-[13px] font-bold tracking-[1px]"
                  style={{ background: ui.container, borderRadius: 2 }}
                >
                  7
                </div>
                <div className="mb-1.5 flex items-center justify-between text-[11px] font-semibold">
                  <span className="text-white/55">Experience</span>
                  <span className="text-white/55 tabular-nums">{xp}/500 XP</span>
                </div>
                <div
                  className="relative h-[5px] overflow-hidden"
                  style={{ background: ui.normal, borderRadius: 2 }}
                >
                  <div
                    className="absolute inset-y-0 left-0 transition-[width] duration-500"
                    style={{ width: `${capture * 100}%`, background: ui.accent, borderRadius: 2 }}
                  />
                </div>
              </div>

              {/* Info-bulle du jeu (#territory-tooltip) */}
              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  key={t.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  aria-live="polite"
                  className="px-3.5 py-3"
                  style={{ background: 'rgba(10,12,20,.62)', borderRadius: 2 }}
                >
                  <div className="mb-1.5 text-[15px] font-bold">{t.name}</div>
                  <p className="m-0 line-clamp-4 text-[12px] leading-[1.35] text-white/90">{t.description}</p>
                  <div className="mt-2 flex flex-col gap-1 text-[12px]">
                    <div>
                      <b>Fréquentation</b> :
                      <span
                        className="ml-1.5 inline-block px-1.5 py-px font-semibold"
                        style={{ background: level[t.frequentation].bg, borderRadius: 2 }}
                      >
                        {level[t.frequentation].label}
                      </span>
                    </div>
                    <div>
                      <b>Concurrence</b> :
                      <span
                        className="ml-1.5 inline-block px-1.5 py-px font-semibold"
                        style={{ background: comp.bg, borderRadius: 2 }}
                      >
                        {comp.label}
                      </span>
                      {t.competition !== null && t.competition > 1 && (
                        <span className="opacity-80"> ({t.competition})</span>
                      )}
                    </div>
                    <div className="text-white/70">
                      {t.id === contestedId ? 'Attaqué, capture en cours' : `Tenu par ${crew.name}`}
                    </div>
                  </div>
                </m.div>
              </AnimatePresence>
            </div>
          </div>
          <p className="mt-3 text-[13px] text-muted">
            Tracés et descriptions repris de la ressource territory de la base. Noms de crews donnés à titre
            d’exemple.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
