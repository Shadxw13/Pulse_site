'use client';

import { useId, useState } from 'react';
import { Spotlight } from '@/components/motion/Spotlight';
import { AccordionPanel, PlusSign } from '@/components/ui/Accordion';
import { faq, faqCategories, type FaqCategory } from '@/content/faq';
import { cn } from '@/lib/cn';

type Cat = 'tout' | FaqCategory;

/** Filtres par catégorie (colonne gauche) */
export function FaqFilters({ cat, onChange }: { cat: Cat; onChange: (c: Cat) => void }) {
  const cats: Cat[] = ['tout', ...faqCategories];
  return (
    <div className="flex flex-wrap gap-2 pt-1" role="group" aria-label="Filtrer par catégorie">
      {cats.map((c) => (
        <button
          key={c}
          type="button"
          aria-pressed={c === cat}
          onClick={() => onChange(c)}
          className={cn(
            'inline-flex min-h-10 cursor-pointer items-center rounded-full border px-4 text-sm font-medium transition-colors',
            c === cat ? 'border-ink bg-ink text-white' : 'border-line-2 bg-surf text-ink-2 hover:border-ink',
          )}
        >
          {c === 'tout' ? 'Tout' : c}
        </button>
      ))}
    </div>
  );
}

export function FaqPage({ intro, after }: { intro: React.ReactNode; after: React.ReactNode }) {
  const [cat, setCat] = useState<Cat>('tout');
  const [open, setOpen] = useState(0);
  const base = useId();
  const list = faq.map((f, i) => ({ ...f, i })).filter((f) => cat === 'tout' || f.category === cat);

  return (
    <div className="wrap flex flex-wrap items-start gap-[clamp(32px,5vw,64px)]">
      <div className="rise flex flex-[1_1_320px] flex-col gap-[18px] md:sticky md:top-24">
        {intro}
        <FaqFilters
          cat={cat}
          onChange={(c) => {
            setCat(c);
            setOpen(-1);
          }}
        />
        {after}
      </div>
      <div className="flex min-w-0 flex-[1.6_1_520px] flex-col gap-2.5" aria-live="polite">
        {list.map((f) => {
          const isOpen = open === f.i;
          const qid = `${base}-q${f.i}`;
          const pid = `${base}-p${f.i}`;
          return (
            <Spotlight
              key={f.q}
              className={cn(
                'rounded-2xl border bg-surf transition-colors duration-200',
                isOpen ? 'border-line-2' : 'border-line',
              )}
            >
              <button
                id={qid}
                type="button"
                aria-expanded={isOpen}
                aria-controls={pid}
                onClick={() => setOpen(isOpen ? -1 : f.i)}
                className="flex min-h-16 w-full cursor-pointer items-center justify-between gap-4 rounded-2xl border-0 bg-transparent px-[22px] py-[18px] text-left text-[16.5px] leading-[1.4] font-semibold text-ink"
              >
                <span className="flex flex-col gap-1.5">
                  <span className="text-[12.5px] font-medium text-muted">{f.category}</span>
                  {f.q}
                </span>
                <PlusSign
                  open={isOpen}
                  className={cn(
                    'flex size-8 flex-none items-center justify-center rounded-full border text-lg leading-none',
                    isOpen ? 'border-ink bg-ink text-white' : 'border-line-2 bg-surf text-ink',
                  )}
                />
              </button>
              <AccordionPanel open={isOpen} id={pid} labelledBy={qid}>
                <p className="m-0 px-[22px] pb-[22px] text-[15.5px] leading-[1.65] text-ink-2">{f.a}</p>
              </AccordionPanel>
            </Spotlight>
          );
        })}
      </div>
    </div>
  );
}
