/**
 * Couleurs secondaires, sourdes, réservées aux illustrations (scènes SVG, tuiles de tablette, gangs).
 * Les couleurs d’interface, elles, sont des jetons Tailwind dans app/globals.css.
 */
export const tiles = {
  rouge: ['#D23A40', '#7E0E13'],
  ardoise: ['#46648C', '#1D2C44'],
  sauge: ['#5F8C6E', '#24392B'],
  graphite: ['#55535C', '#1D1C21'],
} as const;

export const gangs = {
  lynx: '#3D5A80',
  corbeaux: '#C8161D',
} as const;

/** Carte des territoires : remplissage, contour */
export const zoneColors = {
  corbeaux: { fill: 'rgba(200,22,29,.18)', stroke: gangs.corbeaux },
  lynx: { fill: 'rgba(61,90,128,.20)', stroke: gangs.lynx },
  libre: { fill: 'rgba(22,21,26,.04)', stroke: '#B8B3AA' },
  contested: { fill: 'rgba(200,22,29,.26)', stroke: gangs.corbeaux },
} as const;

/** Scène du hero (crépuscule) */
export const scene = {
  sky: ['#23212F', '#5A3E57', '#C1694B', '#E39A62'],
  sun: '#F2B27A',
  far: '#4B3A52',
  near: '#1E1A26',
  window: '#F3C58E',
  road: ['#26222C', '#121016'],
  lane: '#1A171F',
  mark: '#E8C48F',
  palm: '#141118',
  minimap: { bg: '#2B2932', road: '#4A4752' },
  tabletEdge: '#0F0E12',
  tabletScreen: '#1A191E',
} as const;

/** Configurateur HUD */
export const hudAccents: Array<{ name: string; color: string; lite: string }> = [
  { name: 'Rouge Pulse', color: '#C8161D', lite: '#F0575C' },
  { name: 'Bleu nuit', color: '#2F5E9E', lite: '#7FA8E0' },
  { name: 'Sauge', color: '#3F6E50', lite: '#86C29C' },
  { name: 'Ambre', color: '#93611A', lite: '#E8B04B' },
  { name: 'Prune', color: '#74396A', lite: '#C98BBE' },
  { name: 'Graphite', color: '#45434B', lite: '#C9C6CF' },
];

export const hudFonts: Array<{ name: string; family: string }> = [
  { name: 'Bricolage', family: 'var(--font-bricolage), Arial, sans-serif' },
  { name: 'Barlow', family: 'var(--font-barlow), Arial, sans-serif' },
  { name: 'Fraunces', family: 'var(--font-fraunces), Georgia, serif' },
];

export const hudScene = {
  bg: 'linear-gradient(160deg, #3A3542 0%, #24212B 55%, #17151B 100%)',
  building: '#2E2A35',
  panel: 'rgba(23,22,27,.94)',
  track: 'rgba(255,255,255,.16)',
  ring: 'rgba(255,255,255,.18)',
  bar2: '#E8E5DF',
} as const;

/** Maquette de la carte de serveur Discord (page Discord) : gris neutres, pas de bleu. */
export const discordMock = {
  card: '#2B2D31',
  banner: 'linear-gradient(120deg, #8E1016, #C8161D)',
  icon: '#111013',
  title: '#F2F3F5',
  text: '#B5BAC1',
  online: '#23A55A',
  offline: '#80848E',
  list: '#1E1F22',
  section: '#949BA4',
  active: '#35373C',
} as const;

export const hexA = (h: string, a: number) =>
  `rgba(${parseInt(h.slice(1, 3), 16)},${parseInt(h.slice(3, 5), 16)},${parseInt(h.slice(5, 7), 16)},${a})`;
