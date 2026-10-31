'use client';

import { useRef, useState } from 'react';
import { CountUp } from '@/components/motion/CountUp';
import { Reveal } from '@/components/motion/Reveal';
import { SplitHeading } from '@/components/motion/SplitHeading';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Tag } from '@/components/ui/Tag';
import { defaultZoneIndex, roads, zones } from '@/content/territories';
import { cn } from '@/lib/cn';
import { useGsapFx } from '@/lib/gsap';
import { zoneColors } from '@/lib/palette';
import { prefersReducedMotion } from '@/lib/useReducedMotion';

function colorsOf(i: number) {
  const z = zones[i];
  return z.contested ? zoneColors.contested : zoneColors[z.ownerKey];
}

/** Carte SVG de 6 quartiers, liste cliquable synchronisée, quartier contesté qui pulse, fiche flottante. */
export function TerritoryMap() {
  const [sel, setSel] = useState(defaultZoneIndex);
  const svg = useRef<SVGSVGElement>(null);
  const z = zones[sel];

  // Contours des quartiers tracés à l’entrée.
  useGsapFx(
    ({ gsap }) => {
      const paths = svg.current?.querySelectorAll<SVGPathElement>('[data-zone]');
      if (!paths?.length || prefersReducedMotion()) return;
      gsap.fromTo(
        paths,
        { drawSVG: '0%' },
        {
          drawSVG: '100%',
          duration: 0.9,
          ease: 'power2.inOut',
          stagger: 0.08,
          scrollTrigger: { trigger: svg.current, start: 'top 80%', once: true },
        },
      );
    },
    { scope: svg },
  );

  return (
    <section className="sec sec-alt">
      <div className="wrap grid grid-cols-1 items-center gap-[clamp(32px,5vw,64px)] md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)]">
        <Reveal className="flex flex-col gap-[18px]">
          <Eyebrow>Territoires</Eyebrow>
          <SplitHeading className="h2">La ville appartient à ceux qui la tiennent.</SplitHeading>
          <p className="lead !text-base">
            Chaque quartier se capture en jeu et rapporte à son gang. Revenus, délais et alertes se règlent quartier par
            quartier.
          </p>
          <div className="mt-1.5 flex flex-col gap-2">
            {zones.map((zone, i) => {
              const on = i === sel;
              return (
                <button
                  key={zone.name}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setSel(i)}
                  className={cn(
                    'flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl border bg-surf px-3.5 py-3 text-left text-ink transition-[border-color,box-shadow] duration-200',
                    on ? 'border-ink shadow-[0_0_0_1px_var(--color-ink)]' : 'border-line hover:border-line-2',
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    <i className="size-2.5 flex-none rounded-full" style={{ background: colorsOf(i).stroke }} />
                    {zone.name}
                  </span>
                  <span className="text-[13.5px] text-muted">{zone.contested ? 'Contesté' : zone.owner}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal className="relative" delay={0.1}>
          <svg
            ref={svg}
            viewBox="0 0 600 460"
            width="100%"
            role="img"
            aria-label={`Carte des territoires. Quartier sélectionné : ${z.name}, ${z.contested ? 'contesté' : z.owner}.`}
            className="block rounded-[20px] border border-line bg-bg"
          >
            <g className="stroke-line-2" strokeWidth="10" fill="none" strokeLinecap="round">
              {roads.map((d) => (
                <path key={d} d={d} />
              ))}
            </g>
            {zones.map((zone, i) => {
              const c = colorsOf(i);
              const on = i === sel;
              return (
                <path
                  key={zone.name}
                  data-zone
                  d={zone.path}
                  onClick={() => setSel(i)}
                  className={cn('cursor-pointer transition-[stroke-width] duration-300', zone.contested && 'loop-pulse')}
                  style={{ fill: c.fill, stroke: on ? 'var(--color-ink)' : c.stroke, strokeWidth: on ? 3 : 1.5 }}
                />
              );
            })}
            <g className="fill-ink" fontFamily="var(--font-instrument), Arial, sans-serif" fontSize="14" fontWeight="600" pointerEvents="none">
              {zones.map((zone) => (
                <text key={zone.name} x={zone.label.x} y={zone.label.y}>
                  {zone.name}
                </text>
              ))}
            </g>
          </svg>
          <div className="relative mt-3 flex w-auto flex-col gap-2 rounded-[18px] border border-line bg-surf p-[18px] shadow-[0_24px_50px_rgba(22,21,26,.12)] md:absolute md:right-[18px] md:-bottom-7 md:mt-0 md:w-[300px]">
            <div className="flex items-center justify-between">
              <b className="display text-lg font-bold">{z.name}</b>
              <Tag tone={z.contested ? 'red' : 'neutral'}>{z.contested ? 'Contesté' : z.owner === 'Libre' ? 'Libre' : 'Tenu'}</Tag>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Contrôlé par</span>
              <span>{z.owner}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Revenu</span>
              <CountUp className="mono" value={z.income} suffix=" $ / h" duration={0.6} />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Capture</span>
              <span className="mono">{z.next}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
