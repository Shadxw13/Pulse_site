'use client';

import { useEffect, useRef, useState } from 'react';
import { ScrambleText } from '@/components/motion/ScrambleText';
import { Button } from './Button';
import { cn } from '@/lib/cn';

/** Pilule sombre avec la commande `connect …` et un bouton Copier (« Copié » pendant 1,6 s). */
export function CopyCommand({ command, size = 14.5, className }: { command: string; size?: number; className?: string }) {
  const [copied, setCopied] = useState(false);
  const t = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(t.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard?.writeText(command);
    } catch {
      /* presse-papiers indisponible : on affiche quand même le retour */
    }
    setCopied(true);
    window.clearTimeout(t.current);
    t.current = window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div
      className={cn(
        'flex items-center gap-2.5 rounded-full border border-dark-line bg-dark-2 py-1.5 pr-1.5 pl-5 text-dark-text',
        className,
      )}
    >
      <code className="mono min-w-0 flex-1 truncate" style={{ fontSize: size }}>
        <ScrambleText text={command} />
      </code>
      <Button variant="red" size="sm" primary onClick={copy} aria-live="polite">
        {copied ? 'Copié' : 'Copier'}
      </Button>
    </div>
  );
}
