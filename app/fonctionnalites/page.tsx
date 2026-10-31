import type { Metadata } from 'next';
import { LazyDotField } from '@/components/motion/LazyDotField';
import { Reveal, RevealItem } from '@/components/motion/Reveal';
import { SplitHeading } from '@/components/motion/SplitHeading';
import { Spotlight } from '@/components/motion/Spotlight';
import { Button } from '@/components/ui/Button';
import { Check } from '@/components/ui/Check';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { features, panelPoints, panelRows, systems } from '@/content/systems';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Fonctionnalités',
  description:
    'Territoires, économie maîtrisée, logs Discord, ESX Legacy + ox_inventory et un espace client pour tout régler sans toucher au code.',
  alternates: { canonical: '/fonctionnalites' },
};

export default function FonctionnalitesPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-[clamp(56px,8vw,104px)] pb-[clamp(40px,5vw,64px)]">
        <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(180deg,#000,transparent)]">
          <LazyDotField gap={28} opacity={0.6} boost={0.9} />
        </div>
        <div className="wrap rise flex flex-wrap items-end justify-between gap-8">
          <div className="flex flex-[1_1_560px] flex-col gap-[22px]">
            <Eyebrow>Fonctionnalités</Eyebrow>
            <SplitHeading as="h1" immediate className="h1 max-w-[14ch]">
              Tout ce qu’il faut pour un serveur RP qui tient.
            </SplitHeading>
          </div>
          <div className="flex flex-[0_1_420px] flex-col gap-5">
            <p className="lead !text-[16.5px]">
              Une base ESX Legacy reprise de zéro : des systèmes pensés pour le RP, une charge serveur
              minimale et un espace client pour tout régler sans toucher au code.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <Button variant="red" href="/tarifs">
                Voir les tarifs
              </Button>
              <Button href="/discord#serveur-test">Tester en jeu</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="sec !pt-6">
        <div className="wrap flex flex-col gap-7">
          <SplitHeading as="h2" immediate className="h2">
            Ce qui fait la différence en jeu.
          </SplitHeading>
          <div className="border-b border-line">
            {features.map((f, i) => (
              <Reveal key={f.title} immediate={i < 2} delay={i < 2 ? 0.15 + i * 0.06 : 0}>
                <Spotlight className="-mx-4 grid grid-cols-[48px_minmax(0,1fr)] items-baseline gap-6 rounded-[18px] border-t border-line px-4 py-[26px] md:grid-cols-[72px_minmax(0,1fr)_minmax(0,1.3fr)]">
                  <span className="mono text-[13px] font-medium text-red-text">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="h3">{f.title}</h3>
                  <p className="col-start-2 m-0 text-[15.5px] text-ink-2 md:col-start-auto">{f.text}</p>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap flex flex-wrap items-start gap-[clamp(32px,5vw,64px)]">
          <Reveal className="flex flex-[1_1_320px] flex-col gap-3.5">
            <Eyebrow>Systèmes inclus</Eyebrow>
            <SplitHeading className="h2">Déjà en place au premier lancement.</SplitHeading>
            <p className="lead !text-base">
              La liste évolue avec les mises à jour, annoncées sur le Discord.
            </p>
          </Reveal>
          <Reveal stagger className="flex flex-[1.4_1_480px] flex-wrap gap-2.5">
            {systems.map((s) => (
              <RevealItem
                key={s}
                as="span"
                className="inline-flex min-h-10 items-center rounded-full border border-line bg-bg px-4 text-[14.5px] text-ink"
              >
                {s}
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="panel" className="sec scroll-mt-20">
        <div className="wrap flex flex-wrap items-center gap-[clamp(36px,5vw,64px)]">
          <Reveal className="flex flex-[1_1_380px] flex-col gap-[18px]">
            <Eyebrow>Espace client</Eyebrow>
            <SplitHeading className="h2">Votre serveur se règle depuis le panel.</SplitHeading>
            <p className="lead !text-base">Connexion avec Discord, puis tout est au même endroit.</p>
            <div className="flex flex-col gap-3 pt-1">
              {panelPoints.map((pt) => (
                <div key={pt} className="flex items-start gap-3 text-[15.5px] leading-[1.55] text-ink-2">
                  <Check className="text-green" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
            <div className="pt-2">
              <Button variant="ink" href={site.panel.login}>
                Ouvrir l’espace client →
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.1} aria-hidden="true" className="min-w-0 flex-[1_1_460px]">
            <div className="overflow-hidden rounded-[14px] border border-dark-line bg-dark text-dark-text shadow-float">
              <div className="flex items-center gap-2 border-b border-dark-line px-4 py-3">
                <span className="flex gap-1.5">
                  {[0, 1, 2].map((k) => (
                    <i key={k} className="size-[9px] rounded-full bg-dark-dot" />
                  ))}
                </span>
                <span className="mono ml-2 text-[11.5px] text-dark-muted">
                  Mon serveur › Économie &amp; taxes
                </span>
              </div>
              <div className="flex flex-col gap-2.5 p-[18px]">
                {panelRows.map((r) => (
                  <div
                    key={r.label}
                    className="flex items-center justify-between gap-3 rounded-[10px] border border-dark-line bg-dark-2 px-3.5 py-3"
                  >
                    <span className="flex flex-col gap-[3px]">
                      <span className="text-[13.5px] font-semibold">{r.label}</span>
                      <span className="text-xs text-dark-muted">{r.hint}</span>
                    </span>
                    <span className="mono rounded-lg border border-dark-line bg-dark px-2.5 py-1.5 text-[13px]">
                      {r.value}
                    </span>
                  </div>
                ))}
                <div className="flex justify-end gap-2 pt-1">
                  <span className="rounded-lg border border-dark-line px-3 py-2 text-[12.5px] text-dark-muted">
                    Annuler
                  </span>
                  <span className="rounded-lg bg-red px-3 py-2 text-[12.5px] font-semibold text-white">
                    Enregistrer
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-[clamp(64px,8vw,112px)]">
        <div className="wrap">
          <Reveal className="flex flex-wrap items-center justify-between gap-6 rounded-[18px] border border-line bg-surf p-[clamp(28px,4vw,44px)]">
            <div className="flex flex-[1_1_380px] flex-col gap-2.5">
              <SplitHeading className="h2 !text-[clamp(24px,3vw,34px)]">
                Envie de la voir tourner ?
              </SplitHeading>
              <p className="lead !text-base">
                Connectez-vous au serveur de test ou posez vos questions à l’équipe sur le Discord.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <Button variant="discord" href="/discord">
                Rejoindre le Discord
              </Button>
              <Button href="/tarifs">Voir les tarifs</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
