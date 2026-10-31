'use client';

import { AnimatePresence, m } from 'motion/react';
import Image from 'next/image';
import { useState } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { SplitHeading } from '@/components/motion/SplitHeading';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { site } from '@/content/site';
import { cn } from '@/lib/cn';
import { DUR, EASE } from '@/lib/motion';
import { useIsMobile, useReducedMotion } from '@/lib/useReducedMotion';
import street from '@/assets/game/street.jpg';
import panelLogin from '@/assets/game/panel-login.webp';

const MODES = [
  {
    label: 'Tablette en jeu',
    title: 'La tablette /gestion',
    points: [
      'S’ouvre avec /gestion, seulement pour les rôles que vous autorisez.',
      'Météo, heure, annonces, joueurs et sanctions sans quitter le jeu.',
      'Quatre grandes catégories, puis tous les réglages du serveur.',
    ],
    cta: 'Voir la tablette →',
    href: '/fonctionnalites#panel',
  },
  {
    label: 'Espace client',
    title: 'L’espace client',
    points: [
      'Connexion avec votre compte Discord.',
      'Économie, jobs et territoires réglables sans toucher au code.',
      'Licence, téléchargements et support au même endroit.',
    ],
    cta: 'Ouvrir l’espace client →',
    href: site.panel.login,
  },
] as const;

/** Tablette en jeu : capture GTA V sur fond « Miami », la commande /gestion tapée dans le chat. */
function TabletScreen() {
  return (
    <div className="relative h-full overflow-hidden bg-dark-deep font-bai text-white">
      <Image
        src={street}
        alt=""
        fill
        sizes="(max-width: 860px) 100vw, 560px"
        className="ken-burns object-cover"
      />
      <div
        className="absolute inset-0 mix-blend-soft-light"
        style={{
          background:
            'linear-gradient(135deg, rgba(255,79,139,.9) 0%, rgba(255,170,70,.75) 45%, rgba(25,195,195,.85) 100%)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div
        className="absolute bottom-[7%] left-[5%] flex items-center gap-2 px-3 py-2 text-[15px] font-semibold"
        style={{ background: 'linear-gradient(90deg,#0000008c,#00000062)', borderRadius: 2 }}
      >
        <span className="text-white/55">›</span>
        <span className="type-cmd">/gestion</span>
        <i className="caret h-[1.1em] w-[2px] bg-white" />
      </div>
    </div>
  );
}

/** Espace client : la vraie page de connexion du panel, en ligne. */
function BrowserScreen() {
  return (
    <div className="flex h-full flex-col bg-dark-deep">
      <div className="flex h-[38px] flex-none items-center gap-2.5 border-b border-dark-line bg-dark-bar px-3.5">
        <span className="flex gap-1.5">
          {[0, 1, 2].map((k) => (
            <i key={k} className="size-[9px] rounded-full bg-dark-dot" />
          ))}
        </span>
        <span className="mx-auto flex h-6 max-w-[300px] flex-1 items-center justify-center rounded-md bg-dark-deep text-[11.5px] text-dark-muted">
          {site.panel.login.replace(/^https?:\/\//, '')}
        </span>
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <Image
          src={panelLogin}
          alt=""
          fill
          sizes="(max-width: 860px) 100vw, 760px"
          className="ken-burns object-cover object-left"
        />
      </div>
    </div>
  );
}

/**
 * « Gérez votre serveur en jeu ou depuis votre navigateur. »
 * L’appareil passe de tablette à fenêtre de navigateur (animation de layout Motion = transforms),
 * avec fondu croisé des contenus et des 3 points d’explication.
 */
export function ManageSwitch() {
  const [mode, setMode] = useState<0 | 1>(0);
  const reduce = useReducedMotion();
  const mobile = useIsMobile();
  const M = MODES[mode];
  const t = { duration: reduce ? 0 : 0.7, ease: EASE };
  const tablet = mode === 0;

  return (
    <section className="sec">
      <div className="wrap flex flex-col items-center gap-8">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <Eyebrow>Gestion</Eyebrow>
          <SplitHeading className="h2 max-w-[18ch]">
            Gérez votre serveur en jeu ou depuis votre navigateur.
          </SplitHeading>
        </Reveal>
        <Reveal>
          <div
            role="group"
            aria-label="Choisir l’outil"
            className="inline-flex gap-1 rounded-full bg-sunk p-1"
          >
            {MODES.map((md, i) => (
              <button
                key={md.label}
                type="button"
                aria-pressed={mode === i}
                onClick={() => setMode(i as 0 | 1)}
                className={cn(
                  'relative h-10 cursor-pointer rounded-full border-0 bg-transparent px-[18px] text-[14.5px] font-medium transition-colors duration-[250ms]',
                  mode === i ? 'text-white' : 'text-ink-2 hover:text-ink',
                )}
              >
                {mode === i && (
                  <m.span
                    layoutId="seg-pill"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ duration: reduce ? 0 : DUR.fast, ease: EASE }}
                  />
                )}
                <span className="relative">{md.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid w-full grid-cols-1 items-center gap-[clamp(28px,4vw,56px)] md:grid-cols-[minmax(0,1.6fr)_minmax(0,0.8fr)]">
          <div className="flex min-h-[430px] items-center justify-center">
            <m.div
              layout
              transition={t}
              aria-hidden="true"
              className="relative mx-auto overflow-hidden bg-dark-edge shadow-device"
              style={{
                width: mobile ? '100%' : tablet ? 560 : '100%',
                maxWidth: '100%',
                height: mobile ? 420 : tablet ? 400 : 430,
                borderRadius: tablet ? 30 : 14,
                padding: tablet ? 12 : 1,
              }}
            >
              <m.div
                layout
                transition={t}
                className="relative h-full overflow-hidden"
                style={{ borderRadius: tablet ? 18 : 13 }}
              >
                <AnimatePresence initial={false}>
                  <m.div
                    key={mode}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduce ? DUR.reduced : 0.45, ease: 'easeOut' }}
                  >
                    {tablet ? <TabletScreen /> : <BrowserScreen />}
                  </m.div>
                </AnimatePresence>
              </m.div>
            </m.div>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={mode}
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: reduce ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduce ? 0 : -6 }}
              transition={{ duration: reduce ? DUR.reduced : DUR.fast, ease: EASE }}
            >
              <h3 className="h3">{M.title}</h3>
              {M.points.map((p) => (
                <div
                  key={p}
                  className="flex items-start gap-3 text-[15.5px] text-ink-2 before:mt-2.5 before:size-1.5 before:flex-none before:rounded-full before:bg-red before:content-['']"
                >
                  {p}
                </div>
              ))}
              <div className="pt-1.5">
                <Button variant="ink" size="sm" href={M.href}>
                  {M.cta}
                </Button>
              </div>
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
