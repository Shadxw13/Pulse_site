import { Barlow_Semi_Condensed, Bricolage_Grotesque, Fraunces, Instrument_Sans, JetBrains_Mono } from 'next/font/google';

export const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-bricolage',
  display: 'swap',
});

export const instrument = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
});

export const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
});

/** Polices de l’aperçu du configurateur HUD uniquement : pas de préchargement. */
export const barlow = Barlow_Semi_Condensed({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-barlow',
  display: 'swap',
  preload: false,
});

export const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['600'],
  variable: '--font-fraunces',
  display: 'swap',
  preload: false,
});

export const fontVariables = [bricolage, instrument, jetbrains, barlow, fraunces].map((f) => f.variable).join(' ');
