/** Réglages généraux du site. Tout ce qui est entre [crochets] reste à compléter. */

const panelUrl = (process.env.NEXT_PUBLIC_PANEL_URL ?? 'https://panel.pulsedev.fr').replace(/\/$/, '');

export const site = {
  name: 'Pulse',
  tagline: 'Base FiveM pour serveurs RP.',
  /** Société qui édite et vend la base. */
  company: 'Pulsedev',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pulsedev.fr').replace(/\/$/, ''),
  discord: {
    /** À confirmer. */
    url: 'https://discord.gg/pulsedev',
    name: 'Pulse - Development',
    online: '412',
    members: '3 549',
    channels: ['annonces', 'boutique', 'ouvrir-un-ticket', 'avis', 'support', 'changelog'],
    highlightedChannel: 'ouvrir-un-ticket',
  },
  testServer: {
    command: 'connect 51.254.128.242:30120',
  },
  panel: {
    url: panelUrl,
    login: panelUrl,
    downloads: `${panelUrl}/licence#telechargements`,
    support: `${panelUrl}/support`,
    docs: `${panelUrl}/support#docs`,
    admin: process.env.NEXT_PUBLIC_ADMIN_URL ?? 'https://admin.pulsedev.fr',
  },
  /** Placeholder : remplacer par l’URL de la chaîne. Tant que null, le lien renvoie vers /discord#youtube. */
  youtubeUrl: null as string | null,
  legal: {
    publisher: '[À COMPLÉTER] Nom et prénom de l’entrepreneur',
    tradeName: 'Pulsedev',
    status: 'Micro-entreprise (entrepreneur individuel)',
    siret: '[À COMPLÉTER] SIRET',
    address: '[À COMPLÉTER] Adresse postale',
    email: '[À COMPLÉTER] Adresse e-mail de contact',
    director: '[À COMPLÉTER] Directeur de la publication',
    host: '[À COMPLÉTER] Hébergeur (raison sociale, adresse, téléphone)',
    vat: 'TVA non applicable, art. 293 B du CGI',
  },
} as const;

export type NavKey = 'accueil' | 'fonctionnalites' | 'tarifs' | 'avis' | 'faq' | 'discord';

export const nav: ReadonlyArray<{ key: NavKey; label: string; href: string }> = [
  { key: 'accueil', label: 'Accueil', href: '/' },
  { key: 'fonctionnalites', label: 'Fonctionnalités', href: '/fonctionnalites' },
  { key: 'tarifs', label: 'Tarifs', href: '/tarifs' },
  { key: 'avis', label: 'Avis', href: '/avis' },
  { key: 'faq', label: 'FAQ', href: '/faq' },
  { key: 'discord', label: 'Discord', href: '/discord' },
];

export const footerColumns: ReadonlyArray<{ title: string; links: ReadonlyArray<{ label: string; href: string }> }> = [
  {
    title: 'Produit',
    links: [
      { label: 'Fonctionnalités', href: '/fonctionnalites' },
      { label: 'Tarifs', href: '/tarifs' },
      { label: 'Avis', href: '/avis' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'Espace client',
    links: [
      { label: 'Se connecter', href: site.panel.login },
      { label: 'Téléchargements', href: site.panel.downloads },
      { label: 'Support', href: site.panel.support },
    ],
  },
  {
    title: 'Communauté',
    links: [
      { label: 'Discord', href: '/discord' },
      { label: 'Serveur de test', href: '/discord#serveur-test' },
      { label: 'YouTube', href: site.youtubeUrl ?? '/discord#youtube' },
    ],
  },
  {
    title: 'Légal',
    links: [
      { label: 'Mentions légales', href: '/mentions-legales' },
      { label: 'CGV', href: '/mentions-legales#cgv' },
      { label: 'Confidentialité', href: '/mentions-legales#confidentialite' },
    ],
  },
];
