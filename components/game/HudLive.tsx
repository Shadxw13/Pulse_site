'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m } from 'motion/react';
import { pulseUi } from '@/lib/palette';
import { prefersReducedMotion } from '@/lib/useReducedMotion';

/*
 * Parties animées du HUD de la base, refaites à partir de son CSS (unités vw du jeu → cqw).
 * À placer dans un écran 16:9 qui porte `container-type: inline-size`.
 */

type Notif =
  | { id: number; kind: 'server'; title: string; text: React.ReactNode }
  | { id: number; kind: 'business'; title: string; text: React.ReactNode };

const FEED: Array<Omit<Notif, 'id'>> = [
  {
    kind: 'server',
    title: 'Territoires',
    text: (
      <>
        Le <b>Port</b> est contesté. Les Vagos attaquent la zone, capture à 64 %.
      </>
    ),
  },
  { kind: 'business', title: 'Weazel News', text: 'Braquage en cours à la Fleeca de Vinewood.' },
  {
    kind: 'server',
    title: 'Livraison',
    text: (
      <>
        Votre commande vous attend au <b>Burger Shot</b>.
      </>
    ),
  },
  { kind: 'business', title: 'Benny’s', text: 'Votre Sultan est prête, passez la récupérer.' },
  {
    kind: 'server',
    title: 'Salaire',
    text: (
      <>
        Vous avez reçu <b>850 $</b> de salaire.
      </>
    ),
  },
];

const NOTIF_MS = 4200;

export function HudNotifications({ paused = false }: { paused?: boolean }) {
  const [items, setItems] = useState<Notif[]>([{ ...FEED[0], id: 0 }] as Notif[]);
  const n = useRef(1);
  const [reduce, setReduce] = useState(false);

  useEffect(() => setReduce(prefersReducedMotion()), []);

  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(() => {
      const next = { ...FEED[n.current % FEED.length], id: n.current } as Notif;
      n.current += 1;
      setItems((prev) => [...prev, next].slice(-2));
    }, NOTIF_MS);
    return () => clearInterval(t);
  }, [reduce, paused]);

  return (
    <div
      aria-hidden="true"
      className="absolute flex flex-col justify-end gap-[0.45cqw] font-bai text-white"
      style={{ left: '1.5cqw', width: '14.4cqw', bottom: '14.2cqw' }}
    >
      <AnimatePresence initial={false} mode="popLayout">
        {items.map((it) => (
          <m.div
            key={it.id}
            layout
            initial={{ opacity: 0, x: '-110%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-110%' }}
            transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
            className="relative overflow-hidden"
            style={{ background: pulseUi.notifBg }}
          >
            {it.kind === 'server' ? (
              <div style={{ padding: '.5cqw .8cqw .75cqw' }}>
                <div className="font-bold uppercase" style={{ fontSize: '.8cqw', letterSpacing: '.02em' }}>
                  {it.title}
                </div>
                <div
                  className="font-light [&_b]:font-semibold"
                  style={{ fontSize: '.66cqw', lineHeight: 1.25 }}
                >
                  {it.text}
                </div>
              </div>
            ) : (
              <div style={{ padding: '.6cqw .6cqw .75cqw' }}>
                <div className="font-bold" style={{ fontSize: '.7cqw', marginBottom: '.15cqw' }}>
                  {it.title}
                </div>
                <div
                  className="font-light"
                  style={{ fontSize: '.66cqw', lineHeight: 1.25, color: pulseUi.textDim }}
                >
                  {it.text}
                </div>
              </div>
            )}
            <div
              className="absolute inset-x-0 bottom-0 overflow-hidden"
              style={{ height: '.35cqw', background: pulseUi.notifTrack }}
            >
              <div
                className="notif-bar h-full origin-left"
                style={{ background: pulseUi.notifBar, animationDuration: `${NOTIF_MS * 2}ms` }}
              />
            </div>
          </m.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/** Compteur « square » du HUD : vitesse, rapport, jauge d’essence et barre de régime. */
export function HudSpeedometer({ paused = false }: { paused?: boolean }) {
  const [speed, setSpeed] = useState(87);
  useEffect(() => {
    if (prefersReducedMotion() || paused) return;
    let cur = 87;
    let target = 87;
    let n = 0;
    // ~12 images/s suffisent pour un compteur, et laissent le fil principal libre.
    const id = setInterval(() => {
      if (n++ % 22 === 0) target = 38 + Math.round(Math.random() * 84);
      cur += (target - cur) * 0.12;
      setSpeed(Math.round(cur));
    }, 80);
    return () => clearInterval(id);
  }, [paused]);

  const digits = String(speed).padStart(3, '0').split('');
  const lead = speed < 10 ? 2 : speed < 100 ? 1 : 0;
  const gear = speed < 30 ? 1 : speed < 55 ? 2 : speed < 80 ? 3 : speed < 105 ? 4 : 5;
  const rpm = Math.min(0.96, 0.25 + ((speed % 25) / 25) * 0.6);

  return (
    <div
      aria-hidden="true"
      className="absolute flex origin-bottom-right flex-col items-end text-white"
      style={{ right: '1.5cqw', bottom: '.7cqw', transform: 'scale(1.296)', gap: '.2cqw' }}
    >
      <div className="flex items-end justify-between" style={{ width: '10.8cqw', gap: '.2cqw' }}>
        <div className="flex items-end" style={{ gap: '.15cqw' }}>
          <div
            className="flex items-end font-hudnum font-extrabold tabular-nums"
            style={{
              fontSize: '2.6cqw',
              lineHeight: 1,
              letterSpacing: '.08cqw',
              textShadow: '0 0 .5cqw rgba(0,0,0,.5)',
            }}
          >
            {digits.map((d, i) => (
              <span
                key={i}
                className="inline-block text-center"
                style={{ width: '.62em', opacity: i < lead ? 0.45 : 1 }}
              >
                {d}
              </span>
            ))}
          </div>
          <div
            className="flex flex-col items-center font-bold"
            style={{ fontSize: '.55cqw', color: pulseUi.textDim }}
          >
            {['H', 'M', 'K'].map((l) => (
              <span key={l} className="-rotate-90 leading-none">
                {l}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-end" style={{ gap: '.2cqw' }}>
          <div
            className="relative overflow-hidden"
            style={{ width: '.25cqw', height: '1.8cqw', background: pulseUi.rpmTrack }}
          >
            <div className="absolute inset-x-0 bottom-0 bg-white" style={{ height: '62%' }} />
          </div>
          <div
            className="flex items-center justify-center bg-white font-bai font-semibold"
            style={{ width: '1.8cqw', height: '1.8cqw', fontSize: '.9cqw', color: pulseUi.gearText }}
          >
            {gear}
          </div>
        </div>
      </div>
      <div
        className="relative overflow-hidden"
        style={{ width: '10.8cqw', height: '.7cqw', background: pulseUi.rpmTrack }}
      >
        <div
          className="absolute inset-y-0 left-0 bg-white/80 transition-[width] duration-100"
          style={{ width: `${rpm * 100}%` }}
        />
      </div>
    </div>
  );
}
