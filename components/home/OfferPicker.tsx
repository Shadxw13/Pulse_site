'use client';

import { AnimatePresence, m } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';
import { CountUp } from '@/components/motion/CountUp';
import { Reveal } from '@/components/motion/Reveal';
import { ScrambleText } from '@/components/motion/ScrambleText';
import { SplitHeading } from '@/components/motion/SplitHeading';
import { Spotlight } from '@/components/motion/Spotlight';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Tag } from '@/components/ui/Tag';
import { defaultOfferId, formatPrice, offers } from '@/content/offers';
import { cn } from '@/lib/cn';
import { DUR, EASE } from '@/lib/motion';
import { useReducedMotion } from '@/lib/useReducedMotion';

function Check() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-1 flex-none text-ok"
    >
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  );
}

/** Liste des 3 offres à gauche, détail de l’offre choisie à droite (fond sombre). Lifetime par défaut. */
export function OfferPicker() {
  const [id, setId] = useState(defaultOfferId);
  const reduce = useReducedMotion();
  const o = offers.find((x) => x.id === id) ?? offers[0];

  return (
    <section className="sec sec-alt">
      <div className="wrap flex flex-col gap-9">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-3.5">
            <Eyebrow>Offres</Eyebrow>
            <SplitHeading className="h2 max-w-[14ch]">Choisissez votre façon de démarrer.</SplitHeading>
          </div>
          <p className="lead max-w-[40ch] !text-[15.5px]">
            La base, l’espace client, la tablette et les mises à jour sont inclus dans les trois offres.
          </p>
        </Reveal>

        <Reveal className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2">
          <div
            className="flex flex-col overflow-hidden rounded-[20px] border border-line bg-bg"
            role="group"
            aria-label="Choisir une offre"
          >
            {offers.map((x) => {
              const on = x.id === id;
              return (
                <button
                  key={x.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setId(x.id)}
                  className={cn(
                    'flex w-full flex-1 cursor-pointer items-center justify-between gap-4 border-0 border-b border-line px-[22px] py-5 text-left text-ink transition-[background-color,box-shadow] duration-200 last:border-b-0',
                    on
                      ? 'bg-surf shadow-[inset_3px_0_0_var(--color-red)]'
                      : 'bg-transparent hover:bg-ink/[.03]',
                  )}
                >
                  <span className="flex flex-col gap-1">
                    <span className="flex items-center gap-2.5 text-[17px] font-semibold">
                      {x.label}
                      {x.recommended && <Tag tone="red">Recommandée</Tag>}
                    </span>
                    <span className="text-sm text-muted">{x.short}</span>
                  </span>
                  <span className="text-right">
                    <CountUp
                      value={x.price}
                      suffix=" €"
                      className="display text-[30px] leading-none font-bold tracking-[-0.03em]"
                    />
                    <br />
                    <span className="text-[13px] text-muted">{x.per}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <Spotlight className="flex flex-col gap-[18px] rounded-[20px] bg-dark p-[clamp(26px,3vw,36px)] text-dark-text">
            <div className="flex items-baseline justify-between gap-3">
              <b className="display text-[26px] font-bold">{o.label}</b>
              <span className="display text-[40px] leading-none font-bold tracking-[-0.04em]">
                <ScrambleText text={formatPrice(o.price)} onView={false} />
              </span>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={o.id}
                className="flex flex-col gap-[18px]"
                initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? DUR.reduced : DUR.fast, ease: EASE }}
              >
                <p className="m-0 text-dark-muted">{o.description}</p>
                <ul className="m-0 flex list-none flex-col gap-2.5 border-t border-dark-line p-0 pt-[18px]">
                  {o.homePerks.map((it) => (
                    <li key={it} className="flex items-start gap-3">
                      <Check />
                      {it}
                    </li>
                  ))}
                </ul>
              </m.div>
            </AnimatePresence>
            <div className="mt-auto flex flex-wrap items-center gap-2.5">
              <Button variant="red" href="/discord">
                Commander sur Discord
              </Button>
              <Link href="/tarifs" className="text-sm text-dark-muted hover:text-dark-text">
                Comparer en détail
              </Link>
            </div>
          </Spotlight>
        </Reveal>
        <span className="text-[13px] text-muted">
          Commande par ticket sur Discord. Paiement par carte via Stripe. TVA non applicable, art. 293 B
          du CGI.
        </span>
      </div>
    </section>
  );
}
