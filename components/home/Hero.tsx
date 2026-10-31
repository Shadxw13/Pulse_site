import { Button } from '@/components/ui/Button';
import { LazyDotField } from '@/components/motion/LazyDotField';
import { DrawLine } from '@/components/motion/DrawLine';
import { SplitHeading } from '@/components/motion/SplitHeading';
import { GameStage } from './GameStage';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-[clamp(48px,6vw,84px)] pb-[clamp(56px,7vw,96px)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[640px] [mask-image:radial-gradient(70%_80%_at_50%_30%,#000_30%,transparent_80%)]">
        <LazyDotField />
      </div>
      <div className="wrap hero-rise rise flex flex-col items-center gap-[22px] text-center [--intro-offset:2.7s]">
        <span className="inline-flex min-h-[34px] flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 rounded-full border border-line bg-surf py-[5px] pr-3.5 pl-1.5 text-[13.5px] text-ink-2">
          <b className="mono inline-flex h-6 items-center rounded-full bg-ink px-[9px] text-[11.5px] font-medium text-white">
            ESX Legacy
          </b>
          ox_inventory · environ 0,30 ms côté serveur
        </span>
        <SplitHeading as="h1" immediate afterIntro className="h1 max-w-[15ch] !text-[clamp(44px,6.4vw,88px)]">
          Votre serveur RP, sur une base qui{' '}
          <span className="relative whitespace-nowrap">
            tient la charge
            <svg
              aria-hidden="true"
              viewBox="0 0 400 40"
              preserveAspectRatio="none"
              className="absolute right-0 bottom-[-0.16em] left-0 h-[0.32em] w-full overflow-visible"
            >
              <DrawLine
                d="M0 24 H150 L166 24 L178 6 L192 38 L204 14 L214 24 H400"
                fill="none"
                className="stroke-red"
                strokeWidth={5}
                strokeLinecap="round"
                strokeLinejoin="round"
                delay={0.4}
                afterIntro
              />
            </svg>
          </span>
          .
        </SplitHeading>
        <p className="lead max-w-[52ch] !text-[17.5px]">
          Pulse réunit les systèmes d’un serveur ESX complet, un espace client pour tout régler depuis votre
          navigateur et une tablette de gestion en jeu.
        </p>
        <div className="flex flex-wrap justify-center gap-2.5">
          <Button variant="red" href="/tarifs">
            Voir les offres
          </Button>
          <Button href="#tester">Rejoindre le serveur de test</Button>
        </div>
      </div>

      <div className="wrap hero-rise rise mt-[clamp(40px,5vw,64px)] [--intro-offset:2.7s] [--rise-delay:.2s]">
        <GameStage />
      </div>
    </section>
  );
}
