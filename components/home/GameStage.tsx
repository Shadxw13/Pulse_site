'use client';

import { motion, useSpring, useTransform } from 'motion/react';
import { useRef } from 'react';
import { useGsapFx } from '@/lib/gsap';
import { isMobileViewport, prefersReducedMotion } from '@/lib/useReducedMotion';
import { scene, tiles } from '@/lib/palette';
import { CityScene } from './CityScene';

const spring = { stiffness: 120, damping: 24, mass: 0.6 };

/**
 * Scène de jeu (SVG) + HUD, avec la carte Banque et la tablette /gestion flottantes.
 * Parallaxe souris (desktop) et légère inclinaison 3D au défilement (8° → 0°).
 */
export function GameStage() {
  const stage = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);
  const mx = useSpring(0, spring);
  const my = useSpring(0, spring);

  const screenRX = useTransform(my, (v) => -v * 5);
  const screenRY = useTransform(mx, (v) => v * 7);
  const bankX = useTransform(mx, (v) => v * 34);
  const bankY = useTransform(my, (v) => v * 22);
  const tabX = useTransform(mx, (v) => v * 46);
  const tabY = useTransform(my, (v) => v * 28);

  useGsapFx(
    ({ gsap }) => {
      if (!tilt.current || prefersReducedMotion()) return;
      gsap.fromTo(
        tilt.current,
        { rotateX: 8, transformOrigin: '50% 100%' },
        {
          rotateX: 0,
          ease: 'none',
          scrollTrigger: { trigger: stage.current, start: 'top bottom', end: 'center center', scrub: 0.6 },
        },
      );
    },
    { scope: stage },
  );

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || prefersReducedMotion() || isMobileViewport()) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={stage}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      role="img"
      aria-label="Une scène de jeu avec le HUD de la base, une notification de territoire, la tablette de gestion et l’application bancaire"
      className="relative mx-auto max-w-[1080px] max-md:h-auto md:h-[560px] md:[perspective:1800px]"
    >
      <div ref={tilt} className="relative h-full [transform-style:preserve-3d]">
        <motion.div
          style={{ rotateX: screenRX, rotateY: screenRY }}
          className="overflow-hidden rounded-[20px] shadow-[0_50px_90px_rgba(22,21,26,.28),0_0_0_1px_rgba(22,21,26,.08)] max-md:relative max-md:h-[380px] md:absolute md:inset-x-[5%] md:top-0 md:h-[500px] [transform-style:preserve-3d]"
        >
          <CityScene />
          <div className="slide-in absolute top-[22px] right-[22px] w-[220px] rounded-xl border-l-[3px] border-red bg-dark/88 px-3.5 py-3 text-[12.5px] text-dark-text md:w-[270px]">
            <span className="text-[11px] text-dark-muted">Territoires · il y a 2 min</span>
            <div className="mt-0.5 font-semibold">Le Port est contesté</div>
            <div className="text-dark-muted">Les Corbeaux attaquent la zone. Capture à 64 %.</div>
          </div>
          <div
            className="absolute bottom-[22px] left-[22px] size-24 overflow-hidden rounded-full border-[3px] border-white/85 md:size-[150px]"
            style={{ background: scene.minimap.bg }}
          >
            <svg viewBox="0 0 150 150" width="100%" height="100%" aria-hidden="true">
              <rect width="150" height="150" fill={scene.minimap.bg} />
              <g stroke={scene.minimap.road} strokeWidth="7" fill="none">
                <path d="M0 60 C50 70 90 40 150 50" />
                <path d="M40 0 C50 60 30 100 50 150" />
                <path d="M110 0 C100 50 120 100 105 150" />
              </g>
              <path d="M70 80 L130 74 L136 130 L80 140Z" className="loop-pulse fill-red" opacity=".45" />
              <circle cx="75" cy="75" r="6" className="fill-white" />
            </svg>
          </div>
          <div className="absolute right-[26px] bottom-5 text-right text-white [text-shadow:0_2px_8px_rgba(0,0,0,.4)]">
            <div className="display text-[54px] leading-[0.9] font-extrabold tracking-[-0.04em]">87</div>
            <div className="text-xs opacity-90">km/h · essence 72 %</div>
          </div>
        </motion.div>

        <motion.div
          style={{ x: bankX, y: bankY, rotate: -4 }}
          className="ui absolute top-[70px] left-0 hidden w-[230px] shadow-[0_30px_60px_rgba(22,21,26,.3)] md:block"
        >
          <div className="ui-h">
            <b>Banque</b>
            <span className="text-dark-muted">Compte courant</span>
          </div>
          <div className="ui-b">
            <span className="text-[11px] text-dark-muted">Solde</span>
            <b className="display text-2xl leading-none font-extrabold">182 900 $</b>
            <div className="ui-r">
              <span>Salaire LSPD</span>
              <span className="mono text-ok">+ 300 $</span>
            </div>
            <div className="ui-r">
              <span>Mécano</span>
              <span className="mono">− 850 $</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          style={{ x: tabX, y: tabY, rotate: 3, background: scene.tabletEdge }}
          className="absolute top-[270px] right-0 hidden w-[320px] rounded-[22px] p-2.5 shadow-[0_30px_60px_rgba(22,21,26,.3)] md:block"
        >
          <div className="flex flex-col gap-2 overflow-hidden rounded-[14px] p-2.5" style={{ background: scene.tabletScreen }}>
            <div className="flex justify-between text-[11px] text-dark-muted">
              <span>Pulse Gestion</span>
              <span className="mono">21:40</span>
            </div>
            <div className="grid h-[150px] grid-cols-4 gap-1.5">
              {(
                [
                  ['Serveur', tiles.rouge],
                  ['Staff', tiles.ardoise],
                  ['Monde', tiles.sauge],
                  ['Illégal', tiles.graphite],
                ] as const
              ).map(([label, [a, b]]) => (
                <div key={label} className="tc" style={{ background: `linear-gradient(160deg, ${a}, ${b})` }}>
                  <b className="!text-[13px]">{label}</b>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
