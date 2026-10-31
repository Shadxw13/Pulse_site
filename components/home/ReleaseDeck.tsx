'use client';

import { useState } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { ScrambleText } from '@/components/motion/ScrambleText';
import { SplitHeading } from '@/components/motion/SplitHeading';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Tag } from '@/components/ui/Tag';
import { releases, releasesAreExamples } from '@/content/releases';
import { site } from '@/content/site';
import { EASE_CSS } from '@/lib/motion';

/** Pile de cartes de version, navigation ←/→. */
export function ReleaseDeck() {
  const [pos, setPos] = useState(0);
  const cur = releases[pos];

  return (
    <section className="sec">
      <div className="wrap grid grid-cols-1 items-center gap-[clamp(32px,5vw,72px)] md:grid-cols-2">
        <Reveal className="flex flex-col gap-[18px]">
          <Eyebrow>Mises à jour</Eyebrow>
          <SplitHeading className="h2">Une base qui continue d’avancer après votre achat.</SplitHeading>
          <p className="lead !text-base">
            Chaque version arrive dans votre espace client avec ses notes et sa documentation. Le support répond par ticket
            sur le Discord.
          </p>
          <div className="flex flex-wrap gap-2.5">
            <Button size="sm" href={site.panel.downloads}>
              Notes de version →
            </Button>
            <Button size="sm" href={site.panel.docs}>
              Documentation →
            </Button>
          </div>
        </Reveal>

        <Reveal className="flex flex-col gap-4" delay={0.1}>
          <div
            className="relative h-[330px]"
            role="region"
            aria-roledescription="carrousel"
            aria-label="Notes de version"
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') setPos((p) => Math.min(releases.length - 1, p + 1));
              if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 1));
            }}
          >
            {releases.map((r, i) => {
              const k = i - pos;
              const shown = k >= 0 && k < 3;
              return (
                <article
                  key={r.version}
                  aria-hidden={k !== 0}
                  className="absolute inset-x-0 top-0 rounded-[20px] border border-line bg-surf p-[26px] shadow-[0_20px_50px_rgba(22,21,26,.08)]"
                  style={{
                    transform: k < 0 ? 'translate(-40px, 0) rotate(-6deg)' : `translate(${k * 16}px, ${k * 14}px) scale(${1 - k * 0.04})`,
                    opacity: k < 0 ? 0 : shown ? 1 - k * 0.25 : 0,
                    zIndex: 10 - Math.abs(k),
                    transition: `transform .6s ${EASE_CSS}, opacity .6s`,
                  }}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <b className="display text-[44px] leading-none font-bold tracking-[-0.04em]">
                      {k === 0 ? <ScrambleText text={r.version} /> : r.version}
                    </b>
                    <span className="text-[13.5px] text-muted">{r.date}</span>
                  </div>
                  <ul className="m-0 mt-5 flex list-none flex-col gap-2.5 p-0">
                    {r.changes.map((c) => (
                      <li key={c.text} className="flex items-baseline gap-3 text-[15px]">
                        <Tag tone={c.kind === 'Correctif' ? 'red' : 'neutral'} className="flex-none">
                          {c.kind}
                        </Tag>
                        <span>{c.text}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
          <div className="flex items-center justify-end gap-2.5">
            <span className="mono mr-auto text-[13px] text-muted" aria-live="polite">
              {cur.version} · {pos + 1} sur {releases.length}
              {releasesAreExamples ? ' (exemples)' : ''}
            </span>
            <Button size="sm" onClick={() => setPos((p) => Math.max(0, p - 1))} aria-label="Version plus récente" disabled={pos === 0}>
              ←
            </Button>
            <Button
              size="sm"
              variant="ink"
              onClick={() => setPos((p) => Math.min(releases.length - 1, p + 1))}
              aria-label="Version précédente"
              disabled={pos === releases.length - 1}
            >
              →
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
