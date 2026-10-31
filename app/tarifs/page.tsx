import type { Metadata } from 'next';
import { CountUp } from '@/components/motion/CountUp';
import { Reveal, RevealItem } from '@/components/motion/Reveal';
import { SplitHeading } from '@/components/motion/SplitHeading';
import { Spotlight } from '@/components/motion/Spotlight';
import { Button } from '@/components/ui/Button';
import { Check } from '@/components/ui/Check';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { pricingFaq } from '@/content/faq';
import { offers, orderSteps } from '@/content/offers';
import { cn } from '@/lib/cn';

export const metadata: Metadata = {
  title: 'Tarifs',
  description:
    'Base Pulse mensuelle à 25 €, Lifetime à 150 €, Unlock (code source) à 300 €. Commande par ticket sur Discord, paiement PayPal. TVA non applicable, art. 293 B du CGI.',
  alternates: { canonical: '/tarifs' },
};

export default function TarifsPage() {
  return (
    <>
      <section className="pt-[clamp(56px,8vw,104px)] pb-[clamp(40px,5vw,56px)]">
        <div className="wrap rise flex flex-col items-center gap-[18px] text-center">
          <Eyebrow>Tarifs</Eyebrow>
          <SplitHeading as="h1" immediate className="h1 max-w-[16ch]">
            Une formule pour chaque projet.
          </SplitHeading>
          <p className="lead">
            Toutes les formules incluent la base complète et l’espace client. La commande se passe sur le
            Discord, par ticket.
          </p>
        </div>
      </section>

      <section className="pb-[clamp(64px,8vw,104px)]">
        <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] items-stretch gap-4">
          {offers.map((o, i) => {
            const hot = o.recommended;
            return (
              <Reveal immediate key={o.id} index={i} delay={0.1} className="h-full">
                <Spotlight
                  className={cn(
                    'flex h-full flex-col gap-[22px] rounded-[20px] border p-[30px]',
                    hot ? 'border-dark bg-dark text-dark-text' : 'border-line bg-surf',
                  )}
                >
                  <div className="flex flex-col gap-2">
                    <span className="flex items-center justify-between gap-2.5">
                      <span className={cn('text-[13.5px]', hot ? 'text-dark-muted' : 'text-muted')}>
                        {o.label}
                      </span>
                      {hot && (
                        <span className="rounded-full bg-red px-2.5 py-1 text-xs font-medium text-white">
                          Recommandée
                        </span>
                      )}
                    </span>
                    <span className="display text-2xl font-bold tracking-[-0.02em]">{o.name}</span>
                    <span
                      className={cn('text-[14.5px] leading-[1.55]', hot ? 'text-dark-muted' : 'text-muted')}
                    >
                      {o.description}
                    </span>
                  </div>
                  <div
                    className={cn(
                      'flex items-baseline gap-2 border-b pb-5',
                      hot ? 'border-dark-line' : 'border-line',
                    )}
                  >
                    <CountUp
                      value={o.price}
                      suffix=" €"
                      className="display text-[54px] leading-none font-bold tracking-[-0.04em]"
                    />
                    <span className={cn('text-[15px]', hot ? 'text-dark-muted' : 'text-muted')}>{o.per}</span>
                  </div>
                  <ul className="m-0 flex list-none flex-col gap-3 p-0">
                    {o.perks.map((p) => (
                      <li
                        key={p.before + p.strong}
                        className="flex items-start gap-3 text-[15px] leading-[1.55]"
                      >
                        <Check />
                        <span>
                          {p.before} <b className="font-semibold">{p.strong}</b> {p.after}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={hot ? 'red' : 'default'}
                    href="/discord"
                    className="mt-auto w-full"
                    wrapperClassName="mt-auto flex w-full"
                    primary={hot}
                  >
                    Commander sur Discord
                  </Button>
                </Spotlight>
              </Reveal>
            );
          })}
        </div>
        <div className="wrap pt-[22px]">
          <div className="flex flex-wrap justify-center gap-x-[26px] gap-y-2.5 text-[13.5px] text-muted">
            <span>Paiement PayPal, validé par l’équipe</span>
            <span>Licence envoyée en message privé</span>
            <span>TVA non applicable, art. 293 B du CGI</span>
          </div>
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap flex flex-col gap-11">
          <Reveal className="flex flex-col gap-3.5">
            <Eyebrow>Comment commander</Eyebrow>
            <SplitHeading className="h2">Quatre étapes, tout sur Discord.</SplitHeading>
          </Reveal>
          <Reveal stagger className="relative grid grid-cols-2 gap-7 md:grid-cols-4 md:gap-0">
            {orderSteps.map((s, i) => (
              <RevealStep key={s.n} last={i === orderSteps.length - 1}>
                <span className="mono relative z-[1] flex size-10 items-center justify-center rounded-full border border-line-2 bg-surf text-[13px] font-medium text-ink">
                  {s.n}
                </span>
                <span className="mt-1.5 text-[17px] font-semibold">{s.title}</span>
                <span className="text-[14.5px] leading-[1.6] text-ink-2">{s.text}</span>
              </RevealStep>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="sec">
        <div className="wrap flex flex-wrap items-start gap-[clamp(32px,5vw,64px)]">
          <Reveal className="flex flex-[1_1_300px] flex-col gap-3.5">
            <Eyebrow>Paiement</Eyebrow>
            <SplitHeading className="h2">Vos questions avant de commander.</SplitHeading>
            <div className="mt-1.5">
              <Button size="sm" href="/faq">
                Toute la FAQ →
              </Button>
            </div>
          </Reveal>
          <div className="flex flex-[1.5_1_480px] flex-col gap-2.5">
            {pricingFaq.map((q, i) => (
              <Reveal key={q.q} index={i}>
                <Spotlight className="flex flex-col gap-2 rounded-2xl border border-line bg-surf px-6 py-[22px]">
                  <h3 className="m-0 text-[16.5px] font-semibold">{q.q}</h3>
                  <p className="m-0 text-[15px] leading-[1.6] text-ink-2">{q.a}</p>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function RevealStep({ children, last }: { children: React.ReactNode; last: boolean }) {
  return (
    <RevealItem
      className={cn(
        'relative flex flex-col gap-2.5 pr-6',
        !last &&
          'md:before:absolute md:before:top-5 md:before:right-0 md:before:left-10 md:before:h-px md:before:bg-line-2 md:before:content-[""]',
      )}
    >
      {children}
    </RevealItem>
  );
}
