import type { Metadata } from 'next';
import { SplitHeading } from '@/components/motion/SplitHeading';
import { FaqPage } from '@/components/pages/FaqList';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { faq } from '@/content/faq';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Questions fréquentes sur la base Pulse : prise en main, commande, licence et support.',
  alternates: { canonical: '/faq' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function Page() {
  return (
    <section className="py-[clamp(56px,8vw,104px)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <FaqPage
        intro={
          <>
            <Eyebrow>FAQ</Eyebrow>
            <SplitHeading as="h1" immediate className="h1">
              Questions fréquentes.
            </SplitHeading>
            <p className="lead !text-base">
              Pas trouvé votre réponse ? L’équipe répond sur le Discord, par ticket.
            </p>
          </>
        }
        after={
          <div className="pt-2">
            <Button variant="discord" href="/discord">
              Poser une question
            </Button>
          </div>
        }
      />
    </section>
  );
}
