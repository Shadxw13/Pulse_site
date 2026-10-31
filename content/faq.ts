export type FaqCategory = 'La base' | 'Commande' | 'Licence' | 'Support';
export type FaqItem = { category: FaqCategory; q: string; a: string };

export const faqCategories: FaqCategory[] = ['La base', 'Commande', 'Licence', 'Support'];

/** Page FAQ */
export const faq: FaqItem[] = [
  {
    category: 'La base',
    q: 'Pourquoi nous faire confiance pour votre serveur ?',
    a: 'L’équipe Pulse est composée de développeurs et de sysadmins passés par les plus gros serveurs de la scène. Des projets qui tournent entre 600 et 1000 joueurs simultanés. Aucune ressource leakée ni mal optimisée. Tout est pensé et testé en conditions réelles avant d’arriver entre vos mains.',
  },
  {
    category: 'La base',
    q: 'Comment se passe la prise en main après l’achat ?',
    a: 'Vous recevez un accès direct aux fichiers de la base dès la validation de votre commande. La documentation vous guide pas à pas dans l’installation.',
  },
  {
    category: 'La base',
    q: 'Puis-je tester la base avant d’acheter ?',
    a: 'Oui, le serveur de test est ouvert à tous. Les informations de connexion sont sur la page Discord du site.',
  },
  {
    category: 'Commande',
    q: 'Comment acheter ?',
    a: 'Rejoignez le Discord, ouvrez un ticket depuis le salon boutique et choisissez votre formule. Vous payez par PayPal, l’équipe valide le paiement, puis votre licence vous est envoyée en message privé.',
  },
  {
    category: 'Commande',
    q: 'Comment passer d’un abonnement mensuel à la licence Lifetime ?',
    a: 'Ouvrez un ticket et nous ajustons l’offre. Le passage reste possible à tout moment.',
  },
  {
    category: 'Licence',
    q: 'Sur combien de serveurs puis-je utiliser ma licence ?',
    a: 'Une licence correspond à un serveur. L’adresse IP autorisée se change depuis votre espace client.',
  },
  {
    category: 'Licence',
    q: 'Que se passe-t-il si mon abonnement mensuel expire ?',
    a: 'Vous recevez un rappel avant l’échéance. Sans renouvellement, la licence est suspendue jusqu’au prochain paiement.',
  },
  {
    category: 'Support',
    q: 'En quoi consiste le Support Premium inclus en Lifetime ?',
    a: 'Vos demandes passent en priorité. Vous recevez une aide directe sur toute question de configuration.',
  },
];

/** Accueil : « Avant de vous lancer » */
export const homeFaq: Array<{ q: string; a: string }> = [
  {
    q: 'Faut-il savoir coder pour utiliser Pulse ?',
    a: 'Non. Les réglages courants se font depuis l’espace client et la tablette en jeu. L’offre Unlock donne le code source pour aller plus loin.',
  },
  {
    q: 'Mes ressources ESX vont-elles fonctionner ?',
    a: 'La base repose sur ESX Legacy et ox_inventory. La plupart des ressources prévues pour ce socle s’installent sans modification.',
  },
  {
    q: 'Comment se passe la commande ?',
    a: 'Sur le Discord, par ticket. Vous payez par PayPal, l’équipe valide le paiement, puis la licence arrive en message privé.',
  },
  {
    q: 'Puis-je changer d’offre plus tard ?',
    a: 'Oui. Ouvrez un ticket pour passer de la mensuelle à la Lifetime, ou de la Lifetime à l’Unlock.',
  },
];

/** Page Tarifs : « Vos questions avant de commander » */
export const pricingFaq: Array<{ q: string; a: string }> = [
  {
    q: 'Pourquoi passer par un ticket ?',
    a: 'Chaque commande est suivie par une personne de l’équipe. Vous pouvez poser vos questions avant de payer, et tout reste écrit dans le ticket.',
  },
  {
    q: 'Quels moyens de paiement acceptez-vous ?',
    a: 'PayPal pour l’instant. Le paiement par carte arrivera plus tard.',
  },
  {
    q: 'Comment passer de la mensuelle à la Lifetime ?',
    a: 'Ouvrez un ticket et nous ajustons l’offre. Le passage reste possible à tout moment.',
  },
  {
    q: 'Recevrai-je une facture ?',
    a: 'Oui, chaque commande validée donne lieu à une facture, disponible dans votre espace client.',
  },
];
