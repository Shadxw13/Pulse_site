import type { Metadata } from 'next';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Mentions légales',
  description:
    'Mentions légales, conditions générales de vente et politique de confidentialité du site Pulse.',
  alternates: { canonical: '/mentions-legales' },
  robots: { index: true, follow: true },
};

function Block({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="flex scroll-mt-24 flex-col gap-3 border-t border-line pt-8">
      <h2 className="h3 !text-[24px]">{title}</h2>
      <div className="flex flex-col gap-3 text-[15.5px] leading-[1.7] text-ink-2 [&_p]:m-0">{children}</div>
    </section>
  );
}

export default function MentionsLegalesPage() {
  const l = site.legal;
  return (
    <section className="py-[clamp(56px,8vw,104px)]">
      <div className="wrap flex max-w-[860px] flex-col gap-10">
        <div className="rise flex flex-col gap-[18px]">
          <Eyebrow>Légal</Eyebrow>
          <h1 className="h1">Mentions légales.</h1>
          <p className="lead !text-base">
            Informations sur l’éditeur du site, les conditions de vente et vos données.
          </p>
        </div>

        <Block title="Éditeur du site">
          <p>
            Le site {site.url.replace(/^https?:\/\//, '')} est édité par {l.publisher}, sous le nom commercial{' '}
            {l.tradeName}.
          </p>
          <p>Statut : {l.status}.</p>
          <p>SIRET : {l.siret}.</p>
          <p>Adresse : {l.address}.</p>
          <p>Contact : {l.email}.</p>
          <p>Directeur de la publication : {l.director}.</p>
          <p>{l.vat}.</p>
        </Block>

        <Block title="Hébergement">
          <p>{l.host}.</p>
        </Block>

        <Block title="Propriété intellectuelle">
          <p>
            Les textes, illustrations, logos et le code de la base Pulse sont la propriété de {l.tradeName}.
            Toute reproduction ou redistribution sans autorisation écrite est interdite.
          </p>
          <p>Pulse n’est pas affilié à Rockstar Games ni à Cfx.re. FiveM est une marque de Cfx.re.</p>
        </Block>

        <Block id="cgv" title="Conditions générales de vente">
          <p>
            [À COMPLÉTER] Conditions générales de vente : offres, prix, commande par ticket Discord, paiement
            par carte via Stripe, livraison de la licence, droit de rétractation pour un contenu numérique,
            résiliation de l’offre mensuelle, responsabilité.
          </p>
        </Block>

        <Block id="confidentialite" title="Confidentialité">
          <p>
            Ce site vitrine ne dépose aucun cookie de mesure d’audience ni de publicité et ne collecte aucune
            donnée personnelle. Seule une préférence technique (rideau d’ouverture déjà vu) est gardée dans le
            stockage de session de votre navigateur et disparaît à la fermeture de l’onglet.
          </p>
          <p>
            [À COMPLÉTER] Données traitées lors d’une commande (Discord, Stripe, espace client), durée de
            conservation et contact pour exercer vos droits.
          </p>
        </Block>
      </div>
    </section>
  );
}
