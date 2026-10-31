import type { Metadata } from 'next';
import { Reveal } from '@/components/motion/Reveal';
import { SplitHeading } from '@/components/motion/SplitHeading';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { reviewSlots, reviews, reviewStats } from '@/content/reviews';
import { cn } from '@/lib/cn';

export const metadata: Metadata = {
  title: 'Avis clients',
  description: 'Les avis des clients vérifiés de Pulse, publiés depuis le Discord après leur commande.',
  alternates: { canonical: '/avis' },
};

const STARS = '★★★★★';
const starsOf = (scores: Record<string, number>) => {
  const v = Object.values(scores);
  const n = Math.round(v.reduce((a, b) => a + b, 0) / v.length);
  return { text: '★'.repeat(n) + '☆'.repeat(5 - n), n };
};

export default function AvisPage() {
  return (
    <>
      <section className="pt-[clamp(56px,8vw,104px)] pb-[clamp(48px,6vw,72px)]">
        <div className="wrap rise flex flex-wrap items-center gap-[clamp(32px,5vw,64px)]">
          <div className="flex flex-[1_1_420px] flex-col gap-[18px]">
            <Eyebrow>Avis clients</Eyebrow>
            <SplitHeading as="h1" immediate className="h1">
              Ce que disent les clients.
            </SplitHeading>
            <p className="lead">
              Chaque avis vient d’un client vérifié, publié depuis le Discord après sa commande.
            </p>
          </div>
          {reviewStats && (
            <div className="flex w-full flex-[0_1_360px] flex-col gap-3.5 rounded-[18px] border border-line bg-surf p-7">
              <div className="flex items-baseline gap-2.5">
                <span className="display text-[56px] leading-none font-bold tracking-[-0.04em]">
                  {reviewStats.rating}
                </span>
                <span className="text-base text-muted">/ 5</span>
              </div>
              <span className="text-xl tracking-[2px] text-star" aria-hidden="true">
                {STARS}
              </span>
              <span className="text-sm text-muted">
                {reviewStats.count} {reviewStats.count > 1 ? 'avis vérifiés' : 'avis vérifié'}
              </span>
              <div className="flex flex-col gap-2.5 border-t border-line pt-3.5">
                {reviewStats.criteria.map((c) => (
                  <div
                    key={c.label}
                    className="flex items-center justify-between gap-3 text-[14.5px] text-ink-2"
                  >
                    <span>{c.label}</span>
                    <span className="h-1.5 max-w-[180px] flex-1 overflow-hidden rounded-full bg-sunk">
                      <i
                        className="block h-full origin-left rounded-full bg-star"
                        style={{ width: `${c.pct}%` }}
                      />
                    </span>
                    <span className="mono text-[12.5px] text-ink">{c.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="pb-[clamp(64px,8vw,104px)]">
        <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-4">
          {reviews.map((r, i) => (
            <Reveal
              as="figure"
              immediate
              key={r.name}
              index={i}
              delay={0.15}
              className="m-0 flex flex-col gap-4 rounded-[18px] border border-dark bg-dark p-[26px] text-dark-text"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2.5">
                  <span className="flex size-[38px] items-center justify-center rounded-full bg-red font-semibold text-white">
                    {r.name[0].toUpperCase()}
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <strong className="text-[14.5px] font-semibold">{r.name}</strong>
                    <span className="text-[12.5px] text-dark-muted">{r.offer}</span>
                  </span>
                </span>
                <span
                  className="text-sm text-warn"
                  role="img"
                  aria-label={`${starsOf(r.scores).n} étoiles sur 5`}
                >
                  {starsOf(r.scores).text}
                </span>
              </div>
              <blockquote className="m-0 text-[16.5px] leading-[1.55]">« {r.text} »</blockquote>
              <span className="text-[12.5px] text-dark-muted">Avis vérifié · {r.source}</span>
            </Reveal>
          ))}
          {Array.from({ length: reviewSlots }, (_, i) => (
            <Reveal
              as="figure"
              immediate
              key={`slot-${i}`}
              index={reviews.length + i}
              delay={0.15}
              className="m-0 flex flex-col gap-4 rounded-[18px] border border-dashed border-line-2 bg-transparent p-[26px] text-muted"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2.5">
                  <span className="flex size-[38px] items-center justify-center rounded-full bg-sunk font-semibold text-muted">
                    ?
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <strong className="text-[14.5px] font-semibold">Prochain avis</strong>
                    <span className="text-[12.5px]">Emplacement</span>
                  </span>
                </span>
                <span className="text-sm text-line-2" aria-hidden="true">
                  ☆☆☆☆☆
                </span>
              </div>
              <blockquote className="m-0 text-[16.5px] leading-[1.55]">
                Les avis publiés sur le Discord s’afficheront ici automatiquement.
              </blockquote>
              <span className="text-[12.5px]">Emplacement de démonstration</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap flex flex-col gap-8">
          <Reveal className="flex flex-col gap-3">
            <Eyebrow>Comment ça marche</Eyebrow>
            <SplitHeading className="h2">Des avis qu’on ne peut pas inventer.</SplitHeading>
          </Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-3.5">
            {[
              ['Client vérifié', 'Seul un client avec une commande validée peut laisser un avis.'],
              [
                'Quatre critères',
                'Qualité de la base, optimisation, support et rapidité de livraison, notés sur 5.',
              ],
              [
                'Publié sur Discord',
                'Chaque avis apparaît aussi dans le salon avis du serveur, visible par tous.',
              ],
            ].map(([t, d], i) => (
              <Reveal
                key={t}
                index={i}
                className={cn('flex flex-col gap-1.5 rounded-2xl border border-line bg-bg p-6')}
              >
                <b className="text-base font-semibold">{t}</b>
                <span className="text-[14.5px] leading-[1.6] text-ink-2">{d}</span>
              </Reveal>
            ))}
          </div>
          <div>
            <Button variant="discord" href="/discord">
              Lire les avis sur Discord
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
