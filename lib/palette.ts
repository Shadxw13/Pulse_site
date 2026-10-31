/**
 * Couleurs secondaires, sourdes, réservées aux illustrations (scènes SVG, tuiles de tablette, gangs).
 * Les couleurs d’interface, elles, sont des jetons Tailwind dans app/globals.css.
 */
export const gangs = {
  lynx: '#3D5A80',
  corbeaux: '#C8161D',
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

/**
 * Interfaces en jeu de la base Pulse (repris du CSS du HUD) : notifications, compteur.
 * Couleur serveur par défaut : pulse_color 237, 28, 36.
 */
export const pulseUi = {
  server: '#ED1C24',
  notifBg: 'linear-gradient(90deg, #0000008c, #00000062)',
  notifTrack: '#00000080',
  notifBar: 'linear-gradient(90deg, #fbd180, #f7cb6b)',
  textDim: 'rgba(255,255,255,.55)',
  rpmTrack: '#0006',
  gearText: '#000',
} as const;
