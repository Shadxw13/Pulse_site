import { Marquee } from '@/components/motion/Marquee';
import { Reveal } from '@/components/motion/Reveal';
import { SplitHeading } from '@/components/motion/SplitHeading';
import { Button } from '@/components/ui/Button';
import { LogoMark } from '@/components/ui/Logo';
import { marqueeRowA, marqueeRowB } from '@/content/systems';
import { site } from '@/content/site';

function Row({ items }: { items: string[] }) {
  return (
    <>
      {items.map((t, i) => (
        <span key={`${t}-${i}`} className="inline-flex items-center gap-7 pr-7">
          {t}
          <i className="size-2.5 rounded-full bg-red opacity-45" />
        </span>
      ))}
    </>
  );
}

/**
 * Le texte géant est purement décoratif (aria-hidden) : il est peint via background-clip,
 * ce qui garde la teinte pâle des maquettes.
 *
 * Deux rangées de systèmes qui défilent en sens inverse, et une carte centrale qui les chevauche. */
export function FinalCta() {
  const row = 'display text-[clamp(40px,6vw,84px)] leading-[1.1] font-bold tracking-[-0.04em]';
  return (
    <section className="relative overflow-hidden pb-[clamp(72px,9vw,120px)]">
      <div aria-hidden="true" className="-mb-10 flex flex-col gap-1">
        <Marquee speed={42} className={`${row} deco-text bg-line-3`}>
          <Row items={marqueeRowA} />
        </Marquee>
        <Marquee speed={36} reverse className={`${row} deco-text bg-line`}>
          <Row items={marqueeRowB} />
        </Marquee>
      </div>
      <div className="wrap flex justify-center">
        <Reveal className="relative flex w-[min(720px,100%)] flex-col items-center gap-[18px] rounded-[18px] border border-line bg-surf p-[clamp(28px,4vw,48px)] text-center shadow-soft">
          <LogoMark width={52} height={30} />
          <SplitHeading className="h2 max-w-[16ch]">On vous attend sur {site.discord.name}.</SplitHeading>
          <p className="lead max-w-[44ch] !text-base">
            Commandes, support et annonces de version : tout se passe sur le Discord.
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            <Button variant="discord" href="/discord">
              Rejoindre le Discord
            </Button>
            <Button href="/tarifs">Voir les offres</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
