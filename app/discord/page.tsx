import type { Metadata } from 'next';
import { Reveal } from '@/components/motion/Reveal';
import { SplitHeading } from '@/components/motion/SplitHeading';
import { Button } from '@/components/ui/Button';
import { CopyCommand } from '@/components/ui/CopyCommand';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { site } from '@/content/site';
import { discordMock as d } from '@/lib/palette';
import Image from 'next/image';
import banner from '@/assets/brand/discord-banner.webp';
import symbol from '@/assets/brand/symbol.webp';

export const metadata: Metadata = {
  title: 'Discord et serveur de test',
  description:
    'Commandes, support, mises à jour et entraide : rejoignez Pulse - Development sur Discord, et testez la base sur le serveur de test.',
  alternates: { canonical: '/discord' },
};

const WHY = [
  ['Boutique et tickets', 'Commandez votre formule et suivez votre commande dans un ticket privé.'],
  ['Support', 'Une réponse immédiate de l’assistant, puis l’équipe si besoin. Prioritaire en Lifetime.'],
  ['Mises à jour', 'Chaque nouvelle version est annoncée avec son changelog.'],
  ['Entraide', 'Échangez avec les autres clients et partagez vos configurations.'],
];

function ServerCard() {
  return (
    <div
      className="w-full max-w-[500px] overflow-hidden rounded-[14px] shadow-float"
      style={{ background: d.card }}
    >
      <div className="relative aspect-[4/1] overflow-hidden">
        <Image src={banner} alt="" fill priority sizes="500px" className="banner-pan object-cover" />
      </div>
      <div className="relative px-5 pb-5">
        <div
          className="-mt-9 flex size-[72px] items-center justify-center rounded-[14px] border-[5px]"
          style={{ background: d.icon, borderColor: d.card }}
        >
          <Image src={symbol} alt="" width={44} height={44} />
        </div>
        <div className="flex flex-col gap-1.5 pt-3">
          <span className="text-xl font-bold" style={{ color: d.title }}>
            {site.discord.name}
          </span>
          <span className="flex gap-4 text-[13.5px]" style={{ color: d.text }}>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full" style={{ background: d.online }} />
              {site.discord.online} en ligne
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full" style={{ background: d.offline }} />
              {site.discord.members} membres
            </span>
          </span>
        </div>
        <div className="mt-4 flex flex-col gap-0.5 rounded-[10px] p-2.5" style={{ background: d.list }}>
          <span
            className="px-2.5 py-1 text-[11.5px] font-bold tracking-[0.04em]"
            style={{ color: d.section }}
          >
            BOUTIQUE
          </span>
          {site.discord.channels.map((name) => {
            const on = name === site.discord.highlightedChannel;
            return (
              <span
                key={name}
                className="flex min-h-8 items-center gap-2 rounded-md px-2.5 text-sm"
                style={{ background: on ? d.active : 'transparent', color: on ? d.title : d.section }}
              >
                <span className="text-[17px]" style={{ color: d.offline }}>
                  #
                </span>
                {name}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function DiscordPage() {
  return (
    <>
      <section className="py-[clamp(56px,8vw,104px)]">
        <div className="wrap flex flex-wrap items-center gap-[clamp(36px,5vw,64px)]">
          <div className="rise flex flex-[1_1_420px] flex-col gap-5">
            <Eyebrow>Communauté</Eyebrow>
            <SplitHeading as="h1" immediate className="h1">
              Tout se passe sur le Discord.
            </SplitHeading>
            <p className="lead">
              Commandes, support, mises à jour et entraide entre créateurs de serveurs : rejoignez{' '}
              {site.discord.name}.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <Button variant="discord" href={site.discord.url}>
                Rejoindre le serveur
              </Button>
              <Button href="#serveur-test">Serveur de test</Button>
            </div>
          </div>
          <div
            className="rise flex min-w-0 flex-[1_1_440px] justify-center [--rise-delay:.12s]"
            aria-hidden="true"
          >
            <ServerCard />
          </div>
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap flex flex-col gap-9">
          <Reveal className="flex flex-col gap-3">
            <Eyebrow>Sur le serveur</Eyebrow>
            <SplitHeading className="h2">Ce que vous y trouvez.</SplitHeading>
          </Reveal>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(250px,100%),1fr))] gap-3.5">
            {WHY.map(([t, x], i) => (
              <Reveal
                key={t}
                index={i}
                className="flex flex-col gap-2 rounded-2xl border border-line bg-bg p-6"
              >
                <b className="text-[17px] font-semibold">{t}</b>
                <span className="text-[14.5px] leading-[1.6] text-ink-2">{x}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="serveur-test" className="sec scroll-mt-20">
        <div className="wrap">
          <Reveal className="flex flex-wrap items-center gap-[clamp(28px,4vw,48px)] rounded-[22px] bg-dark p-[clamp(28px,4vw,44px)] text-dark-text">
            <div className="flex flex-[1_1_360px] flex-col gap-3.5">
              <Eyebrow onDark>Serveur de test</Eyebrow>
              <SplitHeading className="h2">Essayez la base en jeu.</SplitHeading>
              <p className="lead !text-base !text-dark-muted">
                Ouvrez FiveM, appuyez sur F8 et collez la commande. Le serveur de test tourne avec la dernière
                version de Pulse.
              </p>
            </div>
            <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-3">
              <CopyCommand command={site.testServer.command} size={15} />
              <div className="flex flex-wrap gap-[18px] pl-5 text-[13.5px] text-dark-muted">
                <span>Ouvert à tous</span>
                <span>ESX Legacy · ox_inventory</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="youtube" className="scroll-mt-20 pb-[clamp(64px,8vw,104px)]">
        <div className="wrap">
          <Reveal className="flex flex-wrap items-center justify-between gap-5 rounded-[18px] border border-line bg-surf px-[30px] py-7">
            <div className="flex flex-[1_1_360px] flex-col gap-1.5">
              <SplitHeading className="h2 !text-[clamp(22px,3vw,30px)]">
                Les vidéos de présentation
              </SplitHeading>
              <p className="lead !text-[15.5px]">Démonstrations des systèmes et tutoriels d’installation.</p>
            </div>
            <Button href={site.youtubeUrl ?? '#youtube'}>Voir la chaîne YouTube ↗</Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
