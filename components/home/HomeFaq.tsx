'use client';

import { useId, useState } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { SplitHeading } from '@/components/motion/SplitHeading';
import { AccordionPanel, PlusSign } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { homeFaq } from '@/content/faq';

/** 4 questions numérotées 01-04, le « + » tourne à 45°. */
export function HomeFaq() {
  const [open, setOpen] = useState(0);
  const base = useId();
  return (
    <section className="sec">
      <div className="wrap flex !max-w-[900px] flex-col gap-7">
        <Reveal className="flex flex-wrap items-end justify-between gap-5">
          <SplitHeading className="h2">Avant de vous lancer.</SplitHeading>
          <Button size="sm" href="/faq">
            Toute la FAQ →
          </Button>
        </Reveal>
        <Reveal className="border-t border-line-2">
          {homeFaq.map((f, i) => {
            const isOpen = open === i;
            const qid = `${base}-q${i}`;
            const pid = `${base}-p${i}`;
            return (
              <div key={f.q} className="border-b border-line-2">
                <button
                  id={qid}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={pid}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full cursor-pointer items-center gap-[18px] border-0 bg-transparent py-[22px] text-left text-[17px] leading-[1.4] font-medium text-ink"
                >
                  <span className="mono w-[34px] flex-none text-[13px] font-medium text-red-text">{String(i + 1).padStart(2, '0')}</span>
                  {f.q}
                  <PlusSign open={isOpen} className="ml-auto inline-block flex-none text-[22px] leading-none" />
                </button>
                <AccordionPanel open={isOpen} id={pid} labelledBy={qid}>
                  <p className="m-0 max-w-[64ch] pb-6 pl-[52px] text-ink-2">{f.a}</p>
                </AccordionPanel>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
