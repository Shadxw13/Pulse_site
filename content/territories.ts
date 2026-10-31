/* Territoires réels de la base (territory/territories.json), coordonnées GTA projetées dans un viewBox.
 * Descriptions : locales/fr.lua de la ressource. Les crews et la concurrence sont des exemples. */

export type Freq = 'low' | 'normal' | 'high';
export type Crew = 'lynx' | 'corbeaux' | 'libre';
export type Territory = {
  id: string;
  name: string;
  description: string;
  frequentation: Freq;
  crew: Crew;
  /** Crews concurrents présents (null si libre) */
  competition: number | null;
  path: string;
  center: { x: number; y: number };
};

export const MAP_W = 600;
export const MAP_H = 565;

export const crews: Record<Crew, { name: string; fill: string; stroke: string }> = {
  lynx: { name: 'Les Lynx', fill: 'rgba(220, 30, 30, 0.38)', stroke: 'rgba(255, 255, 255, 0.9)' },
  corbeaux: { name: 'Les Corbeaux', fill: 'rgba(245, 160, 40, 0.38)', stroke: 'rgba(255, 255, 255, 0.9)' },
  libre: { name: 'Libre', fill: 'rgba(80, 180, 255, 0.3)', stroke: 'rgba(255, 255, 255, 0.55)' },
};

export const territories: Territory[] = [
  {
    id: 'vespucci_plage_sud',
    name: 'Vespucci Plage Sud',
    description:
      'Une plage iconique inspirée de Santa Monica : Muscle Sands, le skate-park et le marché en bord de mer attirent touristes et artistes en journée. La nuit, la foule s’efface, les commerces ferment et l’endroit gagne en intimité, où seuls quelques feux de camp ou hipsters persistent sur le sable.',
    frequentation: 'high',
    crew: 'libre',
    competition: null,
    path: 'M172.7 364.6 L203.0 342.0 L169.6 301.4 L142.5 231.6 L108.2 266.8Z',
    center: { x: 159, y: 301 },
  },
  {
    id: 'vespucci_plage_nord',
    name: 'Vespucci Plage Nord',
    description:
      "Zone plus raffinée avec marina, canaux et petites boutiques : une ambiance paisible idéale pour se fondre dans le décor. Le quartier, moins exposé à l’agitation touristique, offre un cadre parfait pour des rencontres discrètes ou des regroupements à l'écart.",
    frequentation: 'normal',
    crew: 'lynx',
    competition: 1,
    path: 'M139.0 230.8 L116.5 217.5 L44.5 156.0 L30.0 173.7 L86.4 248.4 L65.8 276.2 L83.2 292.8Z',
    center: { x: 81, y: 228 },
  },
  {
    id: 'aeroport',
    name: 'Aéroport',
    description:
      'Aéroport international de Los Santos, avec de vastes terminaux, pistes sécurisées, zones de fret et traffic constant. Malgré une sécurité renforcée, les hangars périphériques, les routes de service et les points d’accès multiples en font un lieu parfait pour opérer sous couvert.',
    frequentation: 'high',
    crew: 'libre',
    competition: null,
    path: 'M202.7 534.9 L245.3 459.8 L266.8 432.3 L224.5 401.9 L208.5 417.3 L219.9 426.8 L170.3 519.1Z',
    center: { x: 220, y: 456 },
  },
  {
    id: 'wardogs',
    name: 'Wardogs',
    description:
      'Au cœur des docks industriels, les quais bruissent de l’activité des poids lourds et des entrepôts. Le jour, l’endroit est un ballet organisé de camions et d’ouvriers. La nuit, l’usine se vide, les hangars se ferment, et les ombres prennent le relais, offrant un terrain propice aux manœuvres clandestines.',
    frequentation: 'low',
    crew: 'corbeaux',
    competition: 1,
    path: 'M465.4 351.6 L453.6 468.8 L467.0 468.1 L468.1 477.8 L513.3 480.6 L526.1 464.3 L537.3 402.6 L516.0 353.2 L493.3 353.5Z',
    center: { x: 493, y: 424 },
  },
  {
    id: 'mazebank',
    name: 'MazeBank',
    description:
      "Secteur autour de l’Arena de Maze Bank, lieu de tournage pour les auditions de 'Fame or Shame' ou les courses de l’Arena War. Allées larges, parkings vastes et accès discrets créent une toile de fond idéale pour se mêler à la foule ou disparaître selon l'affluence.",
    frequentation: 'normal',
    crew: 'libre',
    competition: null,
    path: 'M286.0 384.5 L290.1 396.3 L300.2 404.7 L312.8 412.6 L319.3 413.2 L334.9 407.7 L337.1 383.4 L320.5 368.1 L306.1 370.4 L297.5 369.0 L289.6 374.3Z',
    center: { x: 309, y: 389 },
  },
  {
    id: 'sud_de_los_santos',
    name: 'Sud de Los Santos',
    description:
      'Secteur urbain dense mêlant garages, habitations modestes et artères routières. Activité constante et circulation lourde; présence policière variable — parfait pour opérations rapides et embuscades.',
    frequentation: 'normal',
    crew: 'corbeaux',
    competition: 4,
    path: 'M350.3 335.0 L396.1 374.2 L436.5 326.4 L436.5 309.5 L421.7 306.4 L400.9 290.1 L387.8 289.0Z',
    center: { x: 404, y: 319 },
  },
  {
    id: 'centre_ville',
    name: 'Centre Ville',
    description:
      'Cœur de Los Santos, gratte‑ciel, sièges de firmes et rues animées. Entre les tours: parkings et accès de service, parfaits pour une surveillance discrète ou des échanges sous le radar.',
    frequentation: 'high',
    crew: 'lynx',
    competition: 5,
    path: 'M414.7 264.2 L415.3 222.2 L397.9 221.3 L335.6 198.6 L311.6 265.1Z',
    center: { x: 375, y: 234 },
  },
  {
    id: 'little_seoul',
    name: 'Little Seoul',
    description:
      'Quartier dense d’inspiration coréenne, ruelles étroites, supérettes et restos. Flux piétonnier soutenu et parkings souterrains: multiples raccourcis, zones d’ombre et cachettes naturelles.',
    frequentation: 'low',
    crew: 'lynx',
    competition: 2,
    path: 'M224.6 237.2 L238.1 261.4 L257.1 289.0 L271.0 272.7 L273.8 257.6 L273.6 237.0 L277.7 227.8 L278.6 218.9 L209.0 218.4Z',
    center: { x: 256, y: 247 },
  },
  {
    id: 'universite',
    name: 'Université',
    description:
      'Campus verdoyant, bibliothèques et résidences. Calme apparent mais circulation régulière: accès secondaires propices aux filatures et rencontres furtives.',
    frequentation: 'normal',
    crew: 'libre',
    competition: null,
    path: 'M143.9 61.8 L133.4 48.1 L127.7 54.2 L108.9 43.0 L88.8 52.4 L80.2 61.2 L73.9 72.5 L103.6 99.6 L117.7 119.7 L140.7 102.0 L137.5 77.6 L138.7 69.6Z',
    center: { x: 116, y: 72 },
  },
  {
    id: 'vinewood',
    name: 'Vinewood',
    description:
      'Villas cossues et panoramas. Routes en lacets et points de vue stratégiques — un terrain privilégié pour surveiller ou disparaître sans trace.',
    frequentation: 'high',
    crew: 'lynx',
    competition: 2,
    path: 'M480.0 65.2 L474.4 59.9 L468.5 61.5 L441.9 50.9 L411.8 40.7 L372.1 30.0 L360.3 40.4 L354.5 53.0 L359.2 54.5 L347.1 87.0 L414.7 111.8 L429.2 87.8 L440.1 84.3 L460.5 92.8Z',
    center: { x: 415, y: 66 },
  },
  {
    id: 'mirror_park',
    name: 'Mirror Park',
    description:
      'Havre de sérénité autour d’un lac, cafés et petites boutiques. Calme ponctué par le clapotis de l’eau — idéal pour rendez‑vous discrets ou observation paisible.',
    frequentation: 'normal',
    crew: 'corbeaux',
    competition: 3,
    path: 'M526.0 128.7 L512.1 143.0 L503.8 152.6 L483.2 163.1 L476.2 169.4 L475.5 178.8 L508.6 215.5 L537.9 215.7 L538.8 210.7 L546.4 208.1 L549.1 204.1 L558.4 206.3 L562.7 208.9 L565.9 206.2 L564.1 200.4 L559.7 201.2 L551.9 198.3 L552.0 189.7 L550.0 184.2 L554.1 186.2 L561.1 189.4 L570.0 185.3 L569.4 176.1 L551.7 165.5 L551.1 156.4 L547.0 150.5 L549.3 147.5 L547.0 141.8 L541.3 140.7 L536.7 131.5 L528.0 126.2Z',
    center: { x: 540, y: 177 },
  },
];

/** Territoire attaqué dans l’animation (capture en cours). */
export const contestedId = 'centre_ville';
