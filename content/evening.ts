export type MomentScreen = 'charcreator' | 'garage' | 'ltd' | 'inventory' | 'bank';

export type Moment = {
  hour: string;
  title: string;
  text: string;
  settings: string;
  /** Capture vidéo de la vraie interface : /game/<screen>.{webm,mp4,jpg} */
  screen: MomentScreen;
  /** Description de la capture pour les lecteurs d’écran */
  alt: string;
  /** Ciel : dégradé vertical (haut, bas) */
  sky: [string, string];
};

export const moments: Moment[] = [
  {
    hour: '18:00',
    title: 'Arrivée en ville',
    text: 'Le joueur crée son personnage : identité, génétique, visage, corps, vêtements et accessoires, sur l’interface de la base.',
    settings: 'Personnages › Création',
    screen: 'charcreator',
    alt: 'Création de personnage de la base Pulse : onglets Identité, Génétique, Visage et Vêtements',
    sky: ['#E7B48E', '#F3D7BC'],
  },
  {
    hour: '20:00',
    title: 'Passage au garage',
    text: 'Les véhicules rangés, les favoris, ceux en fourrière et ceux garés ailleurs, sur un seul écran.',
    settings: 'Véhicules › Garages et fourrière',
    screen: 'garage',
    alt: 'Garage de la base Pulse : onglets Mes véhicules, Favoris, Fourrière, Ailleurs et cartes des véhicules',
    sky: ['#C9785C', '#8C5C78'],
  },
  {
    hour: '22:00',
    title: 'Courses de fin de journée',
    text: 'Le vendeur de la supérette compose le panier du client et lui envoie la facture. Rayons et prix se règlent par magasin.',
    settings: 'Économie › Magasins',
    screen: 'ltd',
    alt: 'Caisse de la supérette LTD : catégories, produits et panier qui se remplit avant l’envoi de la facture',
    sky: ['#5A4A72', '#2C2843'],
  },
  {
    hour: '00:00',
    title: 'Le coffre est plein',
    text: 'L’inventaire ox_inventory aux couleurs du serveur : les poches, les vêtements portés et le coffre du véhicule côte à côte.',
    settings: 'Inventaire › Objets',
    screen: 'inventory',
    alt: 'Inventaire de la base Pulse : poches du joueur à gauche, coffre du véhicule à droite',
    sky: ['#24213A', '#141322'],
  },
  {
    hour: '02:00',
    title: 'Le salaire tombe',
    text: 'La Fleeca Bank de la base : solde, dépôts, retraits, virements entre joueurs et code PIN aux distributeurs.',
    settings: 'Économie › Banque',
    screen: 'bank',
    alt: 'Fleeca Bank de la base Pulse : tableau de bord, virement et dépôt',
    sky: ['#1A1830', '#2D2A45'],
  },
];

export const STORY_INTERVAL_MS = 7000;
