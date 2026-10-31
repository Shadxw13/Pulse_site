'use client';

import { useState } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { SplitHeading } from '@/components/motion/SplitHeading';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { cn } from '@/lib/cn';
import { hexA, hudAccents, hudFonts, hudScene } from '@/lib/palette';

/** « Aux couleurs de votre serveur » : 6 couleurs, arrondis de 0 à 20 px, 3 polices, aperçu HUD en direct. */
export function HudConfigurator() {
  const [acc, setAcc] = useState(0);
  const [rad, setRad] = useState(10);
  const [font, setFont] = useState(0);
  const a = hudAccents[acc];
  const r2 = Math.min(rad, 10);
  const ff = hudFonts[font].family;
  const ease = 'background-color .35s ease, border-radius .35s ease, box-shadow .35s ease';

  return (
    <section className="sec sec-alt">
      <div className="wrap grid grid-cols-1 items-center gap-[clamp(32px,5vw,64px)] md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)]">
        <Reveal className="flex flex-col gap-[22px]">
          <div className="flex flex-col gap-4">
            <Eyebrow>Interface</Eyebrow>
            <SplitHeading className="h2">Aux couleurs de votre serveur.</SplitHeading>
            <p className="lead !text-base">Couleur, arrondis et police du HUD se choisissent dans l’espace client. Essayez ici.</p>
          </div>
          <div className="flex flex-col gap-2.5">
            <span className="text-sm font-semibold">
              Couleur · <span className="font-normal text-muted">{a.name}</span>
            </span>
            <div className="flex flex-wrap gap-2.5">
              {hudAccents.map((x, i) => (
                <button
                  key={x.name}
                  type="button"
                  aria-label={x.name}
                  aria-pressed={i === acc}
                  onClick={() => setAcc(i)}
                  className={cn(
                    'size-9 cursor-pointer rounded-full border-2 border-white p-0 transition-[box-shadow,transform] duration-200 hover:scale-105',
                    i === acc ? 'shadow-[0_0_0_2px_var(--color-ink)]' : 'shadow-[0_0_0_1px_var(--color-line-2)]',
                  )}
                  style={{ background: x.color }}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <label htmlFor="hud-radius" className="text-sm font-semibold">
              Arrondis · <span className="mono font-normal text-muted">{rad} px</span>
            </label>
            <input
              id="hud-radius"
              type="range"
              min={0}
              max={20}
              step={1}
              value={rad}
              onChange={(e) => setRad(Number(e.target.value))}
              className="w-full accent-ink"
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <span className="text-sm font-semibold">Police</span>
            <div className="flex flex-wrap gap-2">
              {hudFonts.map((x, i) => (
                <button
                  key={x.name}
                  type="button"
                  aria-pressed={i === font}
                  onClick={() => setFont(i)}
                  style={{ fontFamily: x.family }}
                  className={cn(
                    'h-10 cursor-pointer rounded-full border px-3.5 text-sm transition-colors',
                    i === font ? 'border-ink bg-ink text-white' : 'border-line-2 bg-surf text-ink-2 hover:border-ink',
                  )}
                >
                  {x.name}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal
          delay={0.1}
          aria-hidden="true"
          className="relative min-h-[440px] overflow-hidden rounded-[22px]"
          style={{ background: hudScene.bg, fontFamily: ff }}
        >
          <svg viewBox="0 0 600 440" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full opacity-50">
            <g fill={hudScene.building}>
              <rect x="20" y="180" width="70" height="260" />
              <rect x="100" y="120" width="90" height="320" />
              <rect x="420" y="150" width="80" height="290" />
              <rect x="510" y="200" width="70" height="240" />
            </g>
          </svg>
          <div className="absolute top-6 left-6 w-[250px] max-w-[calc(100%-48px)] overflow-hidden text-dark-text" style={{ borderRadius: rad, background: hudScene.panel, transition: ease }}>
            <div className="px-4 py-3.5 text-base font-bold text-white" style={{ background: a.color, transition: ease }}>
              Los Santos Customs
            </div>
            <div className="flex flex-col gap-1 p-2 text-sm">
              <div
                className="flex justify-between px-3 py-2.5"
                style={{ borderRadius: r2, background: hexA(a.lite, 0.14), boxShadow: `inset 3px 0 0 ${a.color}`, transition: ease }}
              >
                <span>Réparation</span>
                <span>850 $</span>
              </div>
              {['Peinture', 'Performances', 'Néons'].map((l) => (
                <div key={l} className="flex justify-between px-3 py-2.5">
                  <span>{l}</span>
                  <span>›</span>
                </div>
              ))}
            </div>
          </div>
          <div
            className="absolute top-6 right-6 hidden w-[240px] px-3.5 py-3 text-[13px] text-dark-text sm:block"
            style={{ borderRadius: rad, background: hudScene.panel, boxShadow: `inset 3px 0 0 ${a.color}`, transition: ease }}
          >
            <div className="font-bold">Facture reçue</div>
            <div className="text-dark-muted">Los Santos Customs · 850 $</div>
          </div>
          <div
            className="absolute bottom-[30px] left-1/2 flex -translate-x-1/2 items-center gap-2.5 py-2 pr-3.5 pl-2 text-sm whitespace-nowrap text-dark-text max-sm:bottom-[132px]"
            style={{ borderRadius: rad, background: hudScene.panel, transition: ease }}
          >
            <span
              className="inline-flex size-7 items-center justify-center font-bold text-white"
              style={{ borderRadius: r2, background: a.color, transition: ease }}
            >
              E
            </span>
            Ouvrir le coffre
          </div>
          <div className="absolute right-6 bottom-6 flex items-end gap-3.5 text-white">
            <svg width="92" height="92" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke={hudScene.ring} strokeWidth="8" strokeDasharray="188 252" transform="rotate(135 50 50)" strokeLinecap="round" />
              <circle cx="50" cy="50" r="40" fill="none" stroke={a.lite} strokeWidth="8" strokeDasharray="120 252" transform="rotate(135 50 50)" strokeLinecap="round" style={{ transition: 'stroke .35s ease' }} />
              <text x="50" y="56" textAnchor="middle" className="fill-white" fontSize="24" fontWeight="700" style={{ fontFamily: ff }}>
                87
              </text>
            </svg>
          </div>
          <div className="absolute bottom-6 left-6 flex w-[180px] flex-col gap-1.5">
            <div className="h-1.5" style={{ borderRadius: r2, background: hudScene.track }}>
              <div className="h-full w-[82%]" style={{ borderRadius: r2, background: a.lite, transition: ease }} />
            </div>
            <div className="h-1.5" style={{ borderRadius: r2, background: hudScene.track }}>
              <div className="h-full w-[56%]" style={{ borderRadius: r2, background: hudScene.bar2 }} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
