import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';

export default function NotFound() {
  return (
    <section className="py-[clamp(80px,12vw,160px)]">
      <div className="wrap flex flex-col items-center gap-5 text-center">
        <Eyebrow>Erreur 404</Eyebrow>
        <h1 className="h1 max-w-[14ch]">Cette page a perdu le pouls.</h1>
        <p className="lead">La page demandée n’existe pas ou a été déplacée.</p>
        <div className="flex flex-wrap justify-center gap-2.5">
          <Button variant="red" href="/">
            Retour à l’accueil
          </Button>
          <Button href="/discord">Nous écrire sur Discord</Button>
        </div>
      </div>
    </section>
  );
}
