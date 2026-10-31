export type OfferId = 'mensuelle' | 'lifetime' | 'unlock';

/** Un avantage s’écrit « avant **gras** après », comme sur la page Tarifs. */
export type Perk = { before: string; strong: string; after: string };

export type Offer = {
  id: OfferId;
  /** Nom court (Accueil) */
  label: string;
  /** Nom complet (Tarifs) */
  name: string;
  /** Accroche de la liste de l’Accueil */
  short: string;
  description: string;
  price: number;
  per: string;
  recommended: boolean;
  /** Avantages listés sur l’Accueil */
  homePerks: string[];
  /** Avantages listés sur la page Tarifs */
  perks: Perk[];
};

const perk = (before: string, strong: string, after = ''): Perk => ({ before, strong, after });

export const offers: Offer[] = [
  {
    id: 'mensuelle',
    label: 'Mensuelle',
    name: 'Base Pulse',
    short: 'Pour lancer votre serveur',
    description: 'Pour lancer votre serveur sans gros investissement de départ.',
    price: 25,
    per: '/ 30 jours',
    recommended: false,
    homePerks: [
      'La base complète pendant 30 jours renouvelables',
      'Mises à jour pendant l’abonnement',
      'Espace client et tablette de gestion',
      'Support par ticket',
    ],
    perks: [
      perk('Accès à la base pendant', '30 jours', 'renouvelables'),
      perk('Mises à jour incluses pendant', 'l’abonnement'),
      perk('Support', 'standard', 'par ticket'),
      perk('Espace client et', 'panel', 'de configuration'),
    ],
  },
  {
    id: 'lifetime',
    label: 'Lifetime',
    name: 'Base Pulse Lifetime',
    short: 'Un paiement, la base pour toujours',
    description: 'Un seul paiement, la base et ses mises à jour pour toujours.',
    price: 150,
    per: 'une fois',
    recommended: true,
    homePerks: [
      'Accès à la base à vie',
      'Mises à jour à vie',
      'Support premium prioritaire',
      'Espace client et tablette de gestion',
    ],
    perks: [
      perk('Accès à la base', 'à vie'),
      perk('Mises à jour', 'à vie', 'incluses'),
      perk('Support', 'premium', 'prioritaire'),
      perk('Espace client et', 'panel', 'de configuration'),
    ],
  },
  {
    id: 'unlock',
    label: 'Unlock',
    name: 'Pulse Unlock',
    short: 'Le code source complet',
    description: 'Pour les équipes qui veulent modifier la base en profondeur.',
    price: 300,
    per: 'une fois',
    recommended: false,
    homePerks: [
      'Tout le contenu de la Lifetime',
      'L’intégralité du code source',
      'Support premium prioritaire',
      'Licence à vie pour un serveur',
    ],
    perks: [
      perk('Tout le contenu de la', 'Lifetime'),
      perk('Intégralité du', 'code source', 'accessible'),
      perk('Support', 'premium', 'prioritaire'),
      perk('Licence', 'à vie', 'pour un serveur'),
    ],
  },
];

export const defaultOfferId: OfferId = 'lifetime';

export function formatPrice(n: number): string {
  return `${n.toLocaleString('fr-FR')} €`;
}

export const orderSteps = [
  {
    n: '01',
    title: 'Rejoignez le Discord',
    text: 'Passez sur le serveur Pulse - Development et lisez le salon boutique.',
  },
  {
    n: '02',
    title: 'Ouvrez un ticket',
    text: 'Choisissez votre formule. Un membre de l’équipe vous répond dans le ticket.',
  },
  {
    n: '03',
    title: 'Payez par PayPal',
    text: 'Vous recevez le lien de paiement. L’équipe valide le paiement à réception.',
  },
  {
    n: '04',
    title: 'Recevez votre licence',
    text: 'La clé arrive en message privé. Les fichiers sont dans votre espace client.',
  },
];
