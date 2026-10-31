export type ChangeKind = 'Ajout' | 'Correctif' | 'Refonte';
export type Release = {
  version: string;
  date: string;
  changes: Array<{ kind: ChangeKind; text: string }>;
  /** true tant que la version est une donnée d’exemple : le site affiche alors « (exemples) ». */
  example: boolean;
};

/** Du plus récent au plus ancien. Données d’exemple à remplacer par les vraies notes de version. */
export const releases: Release[] = [
  {
    version: '2.4.2',
    date: '25 octobre 2026',
    example: true,
    changes: [
      { kind: 'Ajout', text: 'Délai de capture réglable par quartier' },
      { kind: 'Ajout', text: 'Gestion des magasins depuis la tablette' },
      { kind: 'Correctif', text: 'Blips des territoires après un redémarrage' },
    ],
  },
  {
    version: '2.4.1',
    date: '12 octobre 2026',
    example: true,
    changes: [
      { kind: 'Ajout', text: 'HUD avec trois styles de compteur' },
      { kind: 'Refonte', text: 'Démarrage du serveur plus rapide' },
      { kind: 'Correctif', text: 'Fourrière qui ne rendait pas le véhicule' },
    ],
  },
  {
    version: '2.4.0',
    date: '28 septembre 2026',
    example: true,
    changes: [
      { kind: 'Ajout', text: 'Virements programmés à la banque' },
      { kind: 'Ajout', text: 'Écran de chargement personnalisable' },
      { kind: 'Refonte', text: 'Menu des entreprises' },
    ],
  },
  {
    version: '2.3.2',
    date: '10 septembre 2026',
    example: true,
    changes: [
      { kind: 'Correctif', text: 'Synchronisation de la météo' },
      { kind: 'Correctif', text: 'Poids des armes dans l’inventaire' },
      { kind: 'Correctif', text: 'Prix du mécano sur les motos' },
    ],
  },
];

export const releasesAreExamples = releases.some((r) => r.example);
