export type MomentScreen = 'vestiaire' | 'garage' | 'superette' | 'territoire' | 'immobilier';

export type Moment = {
  hour: string;
  title: string;
  text: string;
  settings: string;
  screen: MomentScreen;
  /** Ciel : dégradé vertical (haut, bas) */
  sky: [string, string];
};

export const moments: Moment[] = [
  {
    hour: '18:00',
    title: 'Prise de service',
    text: 'Les joueurs enfilent leur tenue au vestiaire. Le grade et le salaire suivent le job, réglés depuis l’espace client.',
    settings: 'Jobs › Grades et salaires',
    screen: 'vestiaire',
    sky: ['#E7B48E', '#F3D7BC'],
  },
  {
    hour: '20:00',
    title: 'Passage au garage',
    text: 'Les véhicules rangés, ceux en fourrière et ceux à réparer, sur un seul écran.',
    settings: 'Véhicules › Garages et fourrière',
    screen: 'garage',
    sky: ['#C9785C', '#8C5C78'],
  },
  {
    hour: '22:00',
    title: 'Courses de fin de journée',
    text: 'Un vrai ticket de caisse, le paiement par carte ou en espèces, et les stocks des magasins.',
    settings: 'Économie › Magasins',
    screen: 'superette',
    sky: ['#5A4A72', '#2C2843'],
  },
  {
    hour: '00:00',
    title: 'Le Port est contesté',
    text: 'Une capture se déclenche. Les deux gangs voient l’avancée en direct, la police est alertée.',
    settings: 'Illégal › Territoires',
    screen: 'territoire',
    sky: ['#24213A', '#141322'],
  },
  {
    hour: '02:00',
    title: 'Retour à l’appartement',
    text: 'Le coffre, la garde-robe et le loyer de la propriété, accessibles en entrant chez soi.',
    settings: 'Immobilier › Propriétés',
    screen: 'immobilier',
    sky: ['#1A1830', '#2D2A45'],
  },
];

export const STORY_INTERVAL_MS = 5000;
