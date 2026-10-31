'use client';

import { useEffect, useRef, useState } from 'react';
import { PulseLine } from '@/components/layout/PulseLine';
import { CountUp } from '@/components/motion/CountUp';
import { Reveal } from '@/components/motion/Reveal';
import { ScrambleText } from '@/components/motion/ScrambleText';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { useGsapFx } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/useReducedMotion';

const TEXT =
  'Chaque ressource est mesurée avant d’entrer dans la base. Ce qui ne tient pas la charge n’y entre pas, et votre serveur garde de la marge pour vos propres scripts.';
const LIVE = ['0,30', '0,29', '0,31', '0,30', '0,28', '0,30', '0,32', '0,30'];

function StatCard({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="rounded-[14px] border border-dark-line bg-dark-2 p-[18px]">
      {children}
      <div className="mt-2 text-[13px] text-dark-muted">{label}</div>
    </div>
  );
}

export function PerfBand() {
  const root = useRef<HTMLElement>(null);
  const para = useRef<HTMLParagraphElement>(null);
  const [live, setLive] = useState(LIVE[0]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let k = 0;
    const iv = window.setInterval(() => {
      k = (k + 1) % LIVE.length;
      setLive(LIVE[k]);
    }, 1400);
    return () => window.clearInterval(iv);
  }, []);

  // Révélation mot par mot, pilotée par le défilement (#4A4850 → dark-text).
  useGsapFx(
    ({ gsap }) => {
      const words = para.current?.querySelectorAll<HTMLElement>('[data-w]');
      if (!words?.length || prefersReducedMotion()) return;
      const css = getComputedStyle(document.documentElement);
      const from = css.getPropertyValue('--color-dark-dim').trim();
      const to = css.getPropertyValue('--color-dark-text').trim();
      gsap.fromTo(
        words,
        { color: from },
        {
          color: to,
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: { trigger: para.current, start: 'top 80%', end: 'bottom 45%', scrub: 0.4 },
        },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} className="bg-dark py-[clamp(72px,9vw,120px)] text-dark-text">
      <div className="wrap grid grid-cols-1 items-center gap-[clamp(32px,5vw,72px)] md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="flex flex-col gap-[22px]">
          <Eyebrow onDark>Performances</Eyebrow>
          <p
            ref={para}
            className="display m-0 max-w-[28ch] text-[clamp(26px,3.2vw,42px)] leading-[1.18] font-semibold tracking-[-0.03em]"
          >
            {TEXT.split(' ').map((w, i) => (
              <span key={i} data-w>
                {w}{' '}
              </span>
            ))}
          </p>
        </div>
        <Reveal className="flex flex-col gap-4">
          <div className="relative h-[120px] overflow-hidden rounded-[14px] border border-dark-line bg-dark-deep" aria-hidden="true">
            <PulseLine />
            <span className="mono absolute top-3 left-4 z-[1] text-[11.5px] text-dark-muted">resmon · serveur de test</span>
            <span className="mono absolute top-3 right-4 z-[1] text-xs text-dark-text">
              <ScrambleText text={live} onView={false} duration={450} /> ms
            </span>
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,var(--color-dark-deep)_0,transparent_18%,transparent_82%,var(--color-dark-deep)_100%)]" />
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <StatCard label="Charge de la base complète au repos">
              <div className="display text-[34px] leading-none font-bold tracking-[-0.04em]">
                <CountUp value={0.3} decimals={2} />
                <span className="text-base text-dark-muted"> ms</span>
              </div>
            </StatCard>
            <StatCard label="Le socle que connaissent vos développeurs">
              <div className="display text-[22px] leading-[1.1] font-bold">ESX Legacy</div>
            </StatCard>
            <StatCard label="Un inventaire moderne, déjà intégré">
              <div className="display text-[22px] leading-[1.1] font-bold">ox_inventory</div>
            </StatCard>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
