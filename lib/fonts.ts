import {
  Bai_Jamjuree,
  Bricolage_Grotesque,
  Instrument_Sans,
  JetBrains_Mono,
  Montserrat,
} from 'next/font/google';

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
  preload: false,
});

/** Polices des interfaces en jeu de la base (HUD, notifications) : pas de préchargement. */
export const bai = Bai_Jamjuree({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-baijam',
  display: 'swap',
  preload: false,
});

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['800'],
  variable: '--font-montserrat',
  display: 'swap',
  preload: false,
});

export const fontVariables = [bricolage, instrument, jetbrains, bai, montserrat]
  .map((f) => f.variable)
  .join(' ');
