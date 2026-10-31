'use client';

import Image from 'next/image';
import { m, useSpring, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { HudNotifications, HudSpeedometer } from '@/components/game/HudLive';
import { useGsapFx } from '@/lib/gsap';
import { isMobileViewport, prefersReducedMotion } from '@/lib/useReducedMotion';
import street from '@/assets/game/street.jpg';
import hud from '@/assets/game/hud.webp';
import bankPanel from '@/assets/game/bank-panel.webp';
import ltdCart from '@/assets/game/ltd-cart.webp';

const spring = { stiffness: 120, damping: 24, mass: 0.6 };

/**
 * Scène de jeu réelle : capture GTA V + HUD de la base (statuts, ID, notifications, compteur),
 * avec la banque Fleeca et le panier de la supérette qui flottent autour.
 * Parallaxe souris (desktop) et légère inclinaison 3D au défilement (8° → 0°).
 */
export function GameStage() {
  const stage = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const mx = useSpring(0, spring);
  const my = useSpring(0, spring);

  const screenRX = useTransform(my, (v) => -v * 5);
  const screenRY = useTransform(mx, (v) => v * 7);
  const bgX = useTransform(mx, (v) => v * -14);
  const bgY = useTransform(my, (v) => v * -8);
  const bankX = useTransform(mx, (v) => v * 34);
  const bankY = useTransform(my, (v) => v * 22);
  const cartX = useTransform(mx, (v) => v * 46);
  const cartY = useTransform(my, (v) => v * 28);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

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
      aria-label="Capture en jeu de la base Pulse : le HUD avec les statuts, l’identifiant, les notifications et le compteur, la banque Fleeca et le panier de la supérette"
      className="relative mx-auto max-w-[1080px] md:h-[600px] md:[perspective:1800px]"
    >
      <div ref={tilt} className="stage-tilt relative h-full [transform-style:preserve-3d]">
        <m.div
          style={{ rotateX: screenRX, rotateY: screenRY }}
          className="relative aspect-video overflow-hidden rounded-[20px] bg-dark-deep shadow-stage [container-type:inline-size] md:absolute md:inset-x-[7%] md:top-0 [transform-style:preserve-3d]"
        >
          <m.div style={{ x: bgX, y: bgY }} className="absolute -inset-4">
            <Image
              src={street}
              alt=""
              fill
              priority
              placeholder="blur"
              sizes="(max-width: 860px) 100vw, 960px"
              className="object-cover"
            />
          </m.div>
          <Image src={hud} alt="" fill sizes="(max-width: 860px) 100vw, 960px" className="object-cover" />
          <HudNotifications paused={!visible} />
          <HudSpeedometer paused={!visible} />
        </m.div>

        <m.div
          style={{ x: bankX, y: bankY, rotate: -3 }}
          className="absolute top-[36px] left-0 hidden w-[290px] overflow-hidden rounded-[6px] shadow-pop md:block"
        >
          <Image src={bankPanel} alt="" sizes="300px" className="h-auto w-full" />
        </m.div>

        <m.div
          style={{ x: cartX, y: cartY, rotate: 3 }}
          className="absolute top-[40px] right-0 hidden w-[150px] overflow-hidden rounded-[6px] shadow-pop md:block"
        >
          <Image src={ltdCart} alt="" sizes="150px" className="h-auto w-full" />
        </m.div>
      </div>
    </div>
  );
}
