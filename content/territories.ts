export type ZoneOwner = 'lynx' | 'corbeaux' | 'libre';
export type Zone = {
  name: string;
  owner: string;
  ownerKey: ZoneOwner;
  contested: boolean;
  /** Revenu horaire en dollars (affiché « 1 800 $ / h ») */
  income: number;
  next: string;
  /** Tracé SVG dans un viewBox 600×460 */
  path: string;
  label: { x: number; y: number };
};

export const zones: Zone[] = [
  { name: 'Vinewood', owner: 'Les Lynx', ownerKey: 'lynx', contested: false, income: 1800, next: 'Libre dans 22 min', path: 'M30 30 L175 40 L170 140 L40 130Z', label: { x: 62, y: 92 } },
  { name: 'Downtown', owner: 'Libre', ownerKey: 'libre', contested: false, income: 2400, next: 'Disponible', path: 'M215 30 L400 26 L396 128 L222 140Z', label: { x: 270, y: 90 } },
  { name: 'Mirror Park', owner: 'Les Corbeaux', ownerKey: 'corbeaux', contested: false, income: 1600, next: 'Libre dans 40 min', path: 'M440 30 L570 40 L566 300 L436 296Z', label: { x: 462, y: 172 } },
  { name: 'Vespucci', owner: 'Les Corbeaux', ownerKey: 'corbeaux', contested: false, income: 2000, next: 'Libre dans 12 min', path: 'M30 170 L172 172 L184 312 L36 316Z', label: { x: 62, y: 248 } },
  { name: 'Davis', owner: 'Les Lynx', ownerKey: 'lynx', contested: false, income: 2200, next: 'Libre dans 31 min', path: 'M224 166 L398 160 L404 300 L220 306Z', label: { x: 272, y: 238 } },
  { name: 'Le Port', owner: 'Les Lynx', ownerKey: 'lynx', contested: true, income: 3000, next: 'En cours · 04:12', path: 'M40 352 L400 346 L404 430 L44 432Z', label: { x: 172, y: 396 } },
];

export const defaultZoneIndex = 5;

export const roads: string[] = [
  'M0 150 C160 170 330 120 600 140',
  'M0 330 C200 300 380 360 600 320',
  'M190 0 C200 160 160 300 210 460',
  'M420 0 C400 140 440 300 410 460',
];
