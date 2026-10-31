import { Reveal } from '@/components/motion/Reveal';
import { SplitHeading } from '@/components/motion/SplitHeading';
import { Button } from '@/components/ui/Button';
import { CopyCommand } from '@/components/ui/CopyCommand';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { reviews } from '@/content/reviews';
import { site } from '@/content/site';

export function TestAndReview() {
  const review = reviews.find((r) => r.name === 'hxayato') ?? reviews[0];
  return (
    <section id="tester" className="scroll-mt-24 pb-[clamp(72px,9vw,120px)]">
      <div className="wrap grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        <Reveal className="flex flex-col gap-[18px] rounded-[22px] bg-dark p-[clamp(28px,4vw,44px)] text-dark-text">
          <Eyebrow onDark>Serveur de test</Eyebrow>
          <SplitHeading className="h2">Venez rouler dessus ce soir.</SplitHeading>
          <p className="m-0 max-w-[46ch] text-dark-muted">
            Le serveur de test tourne avec la dernière version de Pulse. Ouvrez FiveM, appuyez sur F8 et
            collez la commande.
          </p>
          <CopyCommand command={site.testServer.command} className="max-w-[460px]" />
          <span className="text-[13px] text-dark-muted">Ouvert à tous, sans inscription.</span>
        </Reveal>
        {review && (
          <Reveal
            as="figure"
            delay={0.08}
            className="m-0 flex flex-col justify-between gap-6 rounded-[18px] border border-line bg-surf p-[clamp(28px,4vw,40px)]"
          >
            <svg width="34" height="26" viewBox="0 0 34 26" aria-hidden="true" className="fill-red">
              <path d="M0 26V15C0 6 5 1 13 0l1 4c-5 1-8 4-8 9h7v13zm20 0V15c0-9 5-14 13-15l1 4c-5 1-8 4-8 9h7v13z" />
            </svg>
            <blockquote className="display m-0 text-[clamp(22px,2.4vw,30px)] leading-[1.3] font-semibold tracking-[-0.02em]">
              {review.text}
            </blockquote>
            <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-[18px]">
              <span className="flex items-center gap-2.5">
                <span className="inline-flex size-[38px] items-center justify-center rounded-full bg-red font-semibold text-white">
                  {review.name[0].toUpperCase()}
                </span>
                <span>
                  <b className="font-semibold">{review.name}</b>
                  <br />
                  <span className="text-[13px] text-muted">Avis vérifié · {review.offerShort}</span>
                </span>
              </span>
              <Button size="sm" href="/avis">
                Tous les avis
              </Button>
            </figcaption>
          </Reveal>
        )}
      </div>
    </section>
  );
}
