'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { SplitHeading } from '@/components/motion/SplitHeading';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { LogoMark } from '@/components/ui/Logo';
import { site } from '@/content/site';
import { cn } from '@/lib/cn';
import { DUR, EASE } from '@/lib/motion';
import { tiles } from '@/lib/palette';
import { useIsMobile, useReducedMotion } from '@/lib/useReducedMotion';

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

const TILE_ICONS = {
  Serveur: (
    <svg viewBox="0 0 100 100" className="absolute top-[18px] -right-3.5 w-[90px] opacity-[.22]" aria-hidden="true">
      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="10" />
      <circle cx="50" cy="50" r="14" fill="currentColor" />
    </svg>
  ),
  Staff: (
    <svg viewBox="0 0 100 100" className="absolute top-[18px] -right-2.5 w-[86px] opacity-[.22]" aria-hidden="true">
      <circle cx="50" cy="34" r="20" fill="currentColor" />
      <path d="M14 96 C14 66 86 66 86 96Z" fill="currentColor" />
    </svg>
  ),
  Monde: (
    <svg viewBox="0 0 100 100" className="absolute top-4 -right-3 w-[90px] opacity-[.22]" aria-hidden="true">
      <path d="M10 70 L40 30 L58 54 L70 40 L94 70Z" fill="currentColor" />
      <circle cx="74" cy="22" r="10" fill="currentColor" />
    </svg>
  ),
  Illégal: (
    <svg viewBox="0 0 100 100" className="absolute top-[18px] -right-2.5 w-[86px] opacity-[.22]" aria-hidden="true">
      <path d="M50 8 L88 24 V52 C88 74 70 90 50 96 C30 90 12 74 12 52 V24Z" fill="currentColor" />
    </svg>
  ),
};

const TABLET_TILES: Array<[keyof typeof TILE_ICONS, readonly [string, string], string]> = [
  ['Serveur', tiles.rouge, 'Réglages, annonces, ressources'],
  ['Staff', tiles.ardoise, 'Joueurs, sanctions, reports'],
  ['Monde', tiles.sauge, 'Météo, heure, zones'],
  ['Illégal', tiles.graphite, 'Territoires, trafics'],
];

function TabletScreen() {
  return (
    <div className="flex h-full flex-col gap-3.5 bg-[linear-gradient(180deg,#1C1B21,#141317)] p-[18px]">
      <div className="flex items-center justify-between text-dark-text">
        <span className="display flex items-center gap-2 text-base font-bold">
          <LogoMark width={22} height={13} onDark />
          Pulse Gestion
        </span>
        <span className="mono text-xs text-dark-muted">/gestion · Admin_Kev</span>
      </div>
      <div className="grid flex-1 grid-cols-4 gap-2.5">
        {TABLET_TILES.map(([label, [a, b], small]) => (
          <div key={label} className="tc" style={{ background: `linear-gradient(165deg, ${a}, ${b})` }}>
            {TILE_ICONS[label]}
            <b>{label}</b>
            <small>{small}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

function BrowserScreen() {
  const rows = [
    ['Taxe sur les ventes', 'Appliquée aux entreprises', '8 %'],
    ['Salaire de base', 'Toutes les 15 minutes', '250 $'],
    ['Revenu par territoire', 'Par heure de contrôle', '2 400 $'],
  ];
  return (
    <div className="flex h-full flex-col bg-dark-deep">
      <div className="flex h-[38px] items-center gap-2.5 border-b border-dark-line bg-[#1A191E] px-3.5">
        <span className="flex gap-1.5">
          {[0, 1, 2].map((k) => (
            <i key={k} className="size-[9px] rounded-full bg-[#3A383F]" />
          ))}
        </span>
        <span className="mx-auto flex h-6 max-w-[300px] flex-1 items-center justify-center rounded-md bg-dark-deep text-[11.5px] text-dark-muted">
          Espace client Pulse
        </span>
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,140px)_minmax(0,1fr)] sm:grid-cols-[180px_minmax(0,1fr)]">
        <div className="flex flex-col gap-1 border-r border-dark-line px-2.5 py-3.5 text-[12.5px] text-dark-muted">
          {['Accueil', 'Joueurs', 'Économie', 'Territoires', 'Rôles', 'Licence'].map((l) => (
            <span key={l} className={cn('px-2.5 py-[7px]', l === 'Économie' && 'rounded-[7px] bg-dark-2 text-dark-text')}>
              {l}
            </span>
          ))}
        </div>
        <div className="flex min-w-0 flex-col gap-[9px] p-4 text-dark-text">
          <b className="display text-[17px] font-bold">Économie &amp; taxes</b>
          {rows.map(([a, b, c]) => (
            <div key={a} className="ui-r !px-3 !py-2.5 text-[12.5px]">
              <span>
                {a}
                <br />
                <span className="text-[11px] text-dark-muted">{b}</span>
              </span>
              <span className="mono">{c}</span>
            </div>
          ))}
          <div className="flex justify-end">
            <span className="rounded-[7px] bg-red px-3 py-[7px] text-xs font-semibold text-white">Enregistrer</span>
          </div>
        </div>
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
          <SplitHeading className="h2 max-w-[18ch]">Gérez votre serveur en jeu ou depuis votre navigateur.</SplitHeading>
        </Reveal>
        <Reveal>
          <div role="group" aria-label="Choisir l’outil" className="inline-flex gap-1 rounded-full bg-sunk p-1">
            {MODES.map((m, i) => (
              <button
                key={m.label}
                type="button"
                aria-pressed={mode === i}
                onClick={() => setMode(i as 0 | 1)}
                className={cn(
                  'relative h-10 cursor-pointer rounded-full border-0 bg-transparent px-[18px] text-[14.5px] font-medium transition-colors duration-[250ms]',
                  mode === i ? 'text-white' : 'text-ink-2 hover:text-ink',
                )}
              >
                {mode === i && (
                  <motion.span
                    layoutId="seg-pill"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ duration: reduce ? 0 : DUR.fast, ease: EASE }}
                  />
                )}
                <span className="relative">{m.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid w-full grid-cols-1 items-center gap-[clamp(28px,4vw,56px)] md:grid-cols-[minmax(0,1.6fr)_minmax(0,0.8fr)]">
          <div className="flex min-h-[430px] items-center justify-center">
            <motion.div
              layout
              transition={t}
              aria-hidden="true"
              className="relative mx-auto overflow-hidden bg-dark-edge shadow-[0_40px_80px_rgba(22,21,26,.22)]"
              style={{
                width: mobile ? '100%' : tablet ? 560 : '100%',
                maxWidth: '100%',
                height: mobile ? 420 : tablet ? 400 : 430,
                borderRadius: tablet ? 30 : 14,
                padding: tablet ? 12 : 1,
              }}
            >
              <motion.div layout transition={t} className="relative h-full overflow-hidden" style={{ borderRadius: tablet ? 18 : 13 }}>
                <AnimatePresence initial={false}>
                  <motion.div
                    key={mode}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduce ? DUR.reduced : 0.45, ease: 'easeOut' }}
                  >
                    {tablet ? <TabletScreen /> : <BrowserScreen />}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
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
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
