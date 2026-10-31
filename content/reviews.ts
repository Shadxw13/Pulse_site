export type Review = {
  name: string;
  /** Offre affichée sur la page Avis */
  offer: string;
  /** Offre affichée sur l’Accueil */
  offerShort: string;
  text: string;
  /** Notes sur 5 */
  scores: { qualite: number; optimisation: number; support: number; livraison: number };
  source: string;
};

/** Avis vérifiés, publiés depuis le Discord. */
export const reviews: Review[] = [
  {
    name: 'hxayato',
    offer: 'Base Pulse mensuelle',
    offerShort: 'base mensuelle',
    text: 'Reçu dans la journée, rien à dire, la base est propre.',
    scores: { qualite: 5, optimisation: 5, support: 5, livraison: 5 },
    source: 'Discord',
  },
];

/** Nombre d’emplacements « Prochain avis » affichés après les vrais avis (grille de 3). */
export const reviewSlots = Math.max(0, 3 - reviews.length);

const criteriaLabels: Array<[keyof Review['scores'], string]> = [
  ['qualite', 'Qualité'],
  ['optimisation', 'Optimisation'],
  ['support', 'Support'],
  ['livraison', 'Livraison'],
];

const avg = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);
const fr1 = (n: number) => n.toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

/** Note et nombre calculés automatiquement. null quand aucun avis n’est publié : le bloc est alors masqué. */
export const reviewStats =
  reviews.length === 0
    ? null
    : {
        count: reviews.length,
        rating: fr1(avg(reviews.map((r) => avg(Object.values(r.scores))))),
        criteria: criteriaLabels.map(([k, label]) => {
          const v = avg(reviews.map((r) => r.scores[k]));
          return { label, value: fr1(v), pct: Math.round((v / 5) * 100) };
        }),
      };
