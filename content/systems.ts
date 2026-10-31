/** Fonctionnalités clés (page Fonctionnalités) */
export const features: Array<{ title: string; text: string }> = [
  {
    title: 'Territoires',
    text: 'Des quartiers que les gangs capturent en jeu, avec revenus, alertes et règles réglables depuis le panel.',
  },
  { title: 'Optimisation', text: 'Environ 0,30 ms côté serveur. Chaque ressource est mesurée avant d’entrer dans la base.' },
  {
    title: 'ESX Legacy + ox_inventory',
    text: 'Un socle connu de la scène, nettoyé et harmonisé, avec un inventaire moderne.',
  },
  {
    title: 'Économie maîtrisée',
    text: 'Salaires, taxes, prix et entreprises équilibrés pour que l’argent garde sa valeur.',
  },
  {
    title: 'Logs Discord',
    text: 'Les actions importantes remontent dans vos salons Discord pour garder un œil sur le serveur.',
  },
  {
    title: 'Mises à jour',
    text: 'Correctifs et nouveautés publiés régulièrement, téléchargeables depuis votre espace client.',
  },
];

/** Systèmes inclus (puces de la page Fonctionnalités) */
export const systems: string[] = [
  'Territoires & gangs',
  'Jobs légaux',
  'Entreprises',
  'Concessionnaire',
  'Garages & fourrière',
  'Banque',
  'Immobilier',
  'Police & LSPD',
  'EMS',
  'Téléphone',
  'Facturation',
  'Coffres & stockage',
  'Création de personnage',
  'Vêtements & barbier',
  'Menu admin',
  'Logs Discord',
];

/** Noms qui défilent dans le CTA final de l’Accueil (deux rangées en sens inverse). */
export const marqueeRowA: string[] = [
  'Territoires',
  'Banque',
  'Garages',
  'Supérette',
  'Immobilier',
  'Police',
  'EMS',
  'Téléphone',
  'Entreprises',
  'Concessionnaire',
  'Facturation',
  'Création de personnage',
  'Barbier',
  'Logs Discord',
];
export const marqueeRowB: string[] = [...marqueeRowA.slice(7), ...marqueeRowA.slice(0, 7)];

export const panelPoints: string[] = [
  'Licence, IP autorisée et téléchargements',
  'Économie, jobs et territoires réglables sans toucher au code',
  'Webhooks Discord et logs par catégorie',
  'Factures et historique des commandes',
  'Tickets de support suivis depuis le panel',
];

export const panelRows: Array<{ label: string; hint: string; value: string }> = [
  { label: 'Taxe sur les ventes', hint: 'Appliquée aux entreprises', value: '8 %' },
  { label: 'Salaire de base', hint: 'Toutes les 15 minutes', value: '250 $' },
  { label: 'Revenu par territoire', hint: 'Par heure de contrôle', value: '2 400 $' },
  { label: 'Délai entre deux captures', hint: 'Par zone', value: '45 min' },
];
