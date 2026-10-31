import type { Metadata } from 'next';
import { IntroCurtain } from '@/components/layout/IntroCurtain';
import { EveningStory } from '@/components/home/EveningStory';
import { FinalCta } from '@/components/home/FinalCta';
import { Hero } from '@/components/home/Hero';
import { HomeFaq } from '@/components/home/HomeFaq';
import { HudConfigurator } from '@/components/home/HudConfigurator';
import { ManageSwitch } from '@/components/home/ManageSwitch';
import { OfferPicker } from '@/components/home/OfferPicker';
import { PerfBand } from '@/components/home/PerfBand';
import { ReleaseDeck } from '@/components/home/ReleaseDeck';
import { TerritoryMap } from '@/components/home/TerritoryMap';
import { TestAndReview } from '@/components/home/TestAndReview';

export const metadata: Metadata = {
  title: { absolute: 'Pulse · Base FiveM ESX Legacy pour serveurs RP' },
  description:
    'Pulse réunit les systèmes d’un serveur ESX complet, un espace client pour tout régler depuis votre navigateur et une tablette de gestion en jeu. Environ 0,30 ms côté serveur.',
  alternates: { canonical: '/' },
};

export default function Home() {
  return (
    <>
      <IntroCurtain />
      <Hero />
      <PerfBand />
      <EveningStory />
      <TerritoryMap />
      <ManageSwitch />
      <HudConfigurator />
      <ReleaseDeck />
      <TestAndReview />
      <OfferPicker />
      <HomeFaq />
      <FinalCta />
    </>
  );
}
