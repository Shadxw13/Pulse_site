'use client';

import { cn } from '@/lib/cn';

type Props = React.HTMLAttributes<HTMLElement> & { as?: 'div' | 'figure' | 'article' | 'li' };

/**
 * Halo radial rouge très léger (7 %) qui suit la souris, et bordure qui s’éclaire près du curseur.
 * Mise à jour par variables CSS : aucun rendu React pendant le mouvement.
 */
export function Spotlight({ as: Tag = 'div', className, children, onPointerMove, ...rest }: Props) {
  return (
    <Tag
      className={cn('spot', className)}
      onPointerMove={(e: React.PointerEvent<HTMLElement>) => {
        const el = e.currentTarget;
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${e.clientX - r.left}px`);
        el.style.setProperty('--my', `${e.clientY - r.top}px`);
        onPointerMove?.(e as never);
      }}
      {...rest}
    >
      <span className="spot-halo" aria-hidden="true" />
      <span className="spot-edge" aria-hidden="true" />
      {children}
    </Tag>
  );
}
