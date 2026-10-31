'use client';

import Image, { type StaticImageData } from 'next/image';
import { useState } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { SplitHeading } from '@/components/motion/SplitHeading';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { cn } from '@/lib/cn';
import street from '@/assets/game/street.jpg';
import basicRoundBlue from '@/assets/game/hud/basic-round-blue.webp';
import basicRoundGold from '@/assets/game/hud/basic-round-gold.webp';
import basicRoundGreen from '@/assets/game/hud/basic-round-green.webp';
import basicRoundRed from '@/assets/game/hud/basic-round-red.webp';
import basicSquareBlue from '@/assets/game/hud/basic-square-blue.webp';
import basicSquareGold from '@/assets/game/hud/basic-square-gold.webp';
import basicSquareGreen from '@/assets/game/hud/basic-square-green.webp';
import basicSquareRed from '@/assets/game/hud/basic-square-red.webp';
import blackRoundBlue from '@/assets/game/hud/black-round-blue.webp';
import blackRoundGold from '@/assets/game/hud/black-round-gold.webp';
import blackRoundGreen from '@/assets/game/hud/black-round-green.webp';
import blackRoundRed from '@/assets/game/hud/black-round-red.webp';
import blackSquareBlue from '@/assets/game/hud/black-square-blue.webp';
import blackSquareGold from '@/assets/game/hud/black-square-gold.webp';
import blackSquareGreen from '@/assets/game/hud/black-square-green.webp';
import blackSquareRed from '@/assets/game/hud/black-square-red.webp';

type Theme = 'basic' | 'black';
type Style = 'square' | 'round';
type Color = 'red' | 'blue' | 'green' | 'gold';

/** Rendus réels du HUD de la base pour chaque réglage (thème × compteur × couleur serveur). */
const renders: Record<`${Theme}-${Style}-${Color}`, StaticImageData> = {
  'basic-round-blue': basicRoundBlue,
  'basic-round-gold': basicRoundGold,
  'basic-round-green': basicRoundGreen,
  'basic-round-red': basicRoundRed,
  'basic-square-blue': basicSquareBlue,
  'basic-square-gold': basicSquareGold,
  'basic-square-green': basicSquareGreen,
  'basic-square-red': basicSquareRed,
  'black-round-blue': blackRoundBlue,
  'black-round-gold': blackRoundGold,
  'black-round-green': blackRoundGreen,
  'black-round-red': blackRoundRed,
  'black-square-blue': blackSquareBlue,
  'black-square-gold': blackSquareGold,
  'black-square-green': blackSquareGreen,
  'black-square-red': blackSquareRed,
};

/** Couleurs serveur (convars pulse_color_r/g/b) proposées dans l’essai. */
const colors: Array<{ id: Color; name: string; rgb: string }> = [
  { id: 'red', name: 'Rouge Pulse', rgb: 'rgb(237 28 36)' },
  { id: 'blue', name: 'Bleu', rgb: 'rgb(79 181 233)' },
  { id: 'green', name: 'Vert', rgb: 'rgb(52 199 120)' },
  { id: 'gold', name: 'Or', rgb: 'rgb(245 180 40)' },
];

/** Agrandissements du rendu (coordonnées dans l’image 1920 × 1080). */
const zooms = [
  { label: 'Statuts et minimap', x: 0, y: 820, w: 520, h: 260 },
  { label: 'Compteur', x: 1400, y: 820, w: 520, h: 260 },
];

const themes: Array<{ id: Theme; name: string }> = [
  { id: 'basic', name: 'Transparent' },
  { id: 'black', name: 'Noir' },
];
const styles: Array<{ id: Style; name: string }> = [
  { id: 'square', name: 'Carré' },
  { id: 'round', name: 'Rond' },
];

function Choice<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: Array<{ id: T; name: string }>;
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-sm font-semibold">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((x) => (
          <button
            key={x.id}
            type="button"
            aria-pressed={x.id === value}
            onClick={() => onChange(x.id)}
            className={cn(
              'h-10 cursor-pointer rounded-full border px-4 text-sm transition-colors',
              x.id === value
                ? 'border-ink bg-ink text-white'
                : 'border-line-2 bg-surf text-ink-2 hover:border-ink',
            )}
          >
            {x.name}
          </button>
        ))}
      </div>
    </div>
  );
}

/** « Aux couleurs de votre serveur » : le vrai HUD de la base, rendu pour chaque réglage. */
export function HudConfigurator() {
  const [color, setColor] = useState<Color>('red');
  const [theme, setTheme] = useState<Theme>('basic');
  const [style, setStyle] = useState<Style>('square');
  const key = `${theme}-${style}-${color}` as const;
  const c = colors.find((x) => x.id === color)!;

  return (
    <section className="sec sec-alt">
      <div className="wrap grid grid-cols-1 items-center gap-[clamp(32px,5vw,64px)] md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.3fr)]">
        <Reveal className="flex flex-col gap-[22px]">
          <div className="flex flex-col gap-4">
            <Eyebrow>Interface</Eyebrow>
            <SplitHeading className="h2">Aux couleurs de votre serveur.</SplitHeading>
            <p className="lead !text-base">
              La couleur du serveur, le thème du HUD et le style du compteur se règlent dans la configuration.
              Essayez ici : chaque aperçu est un rendu du vrai HUD de la base.
            </p>
          </div>
          <div className="flex flex-col gap-2.5">
            <span className="text-sm font-semibold">
              Couleur du serveur · <span className="font-normal text-muted">{c.name}</span>
            </span>
            <div className="flex flex-wrap gap-2.5">
              {colors.map((x) => (
                <button
                  key={x.id}
                  type="button"
                  aria-label={x.name}
                  aria-pressed={x.id === color}
                  onClick={() => setColor(x.id)}
                  className={cn(
                    'size-9 cursor-pointer rounded-full border-2 border-white p-0 transition-[box-shadow,transform] duration-200 hover:scale-105',
                    x.id === color
                      ? 'shadow-[0_0_0_2px_var(--color-ink)]'
                      : 'shadow-[0_0_0_1px_var(--color-line-2)]',
                  )}
                  style={{ background: x.rgb }}
                />
              ))}
            </div>
          </div>
          <Choice label="Thème du HUD" options={themes} value={theme} onChange={setTheme} />
          <Choice label="Compteur de vitesse" options={styles} value={style} onChange={setStyle} />
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col gap-3">
          <div className="relative aspect-video overflow-hidden rounded-[18px] bg-dark-deep shadow-device">
            <Image
              src={street}
              alt=""
              fill
              sizes="(max-width: 860px) 100vw, 760px"
              className="object-cover"
            />
            {(Object.keys(renders) as Array<keyof typeof renders>).map((k) => (
              <Image
                key={k}
                src={renders[k]}
                alt={
                  k === key
                    ? `HUD de la base, thème ${theme === 'basic' ? 'transparent' : 'noir'}, compteur ${style === 'square' ? 'carré' : 'rond'}, couleur ${c.name.toLowerCase()}`
                    : ''
                }
                aria-hidden={k !== key}
                fill
                loading="lazy"
                sizes="(max-width: 860px) 100vw, 760px"
                className="object-cover transition-opacity duration-300"
                style={{ opacity: k === key ? 1 : 0 }}
              />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {zooms.map((z) => (
              <div
                key={z.label}
                className="relative overflow-hidden rounded-[12px] bg-dark-deep"
                style={{ aspectRatio: `${z.w} / ${z.h}` }}
              >
                <div
                  className="absolute"
                  style={{
                    width: `${(1920 / z.w) * 100}%`,
                    height: `${(1080 / z.h) * 100}%`,
                    left: `${(-z.x / z.w) * 100}%`,
                    top: `${(-z.y / z.h) * 100}%`,
                  }}
                >
                  <Image src={street} alt="" fill sizes="1600px" className="object-cover" />
                  <Image
                    key={key}
                    src={renders[key]}
                    alt=""
                    fill
                    sizes="1600px"
                    className="zoom-in object-cover"
                  />
                </div>
                <span className="absolute top-2 left-2.5 rounded-full bg-dark/75 px-2 py-0.5 text-[11px] text-dark-text">
                  {z.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
