import { cn } from '@/lib/cn';

/** Surtitre : trait rouge 18×2 px puis libellé en muted 13,5 px. */
export function Eyebrow({ children, onDark = false, className }: { children: React.ReactNode; onDark?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2.5 text-[13.5px] leading-[1.4] font-medium',
        'before:h-[2px] before:w-[18px] before:rounded-[2px] before:bg-red before:content-[""]',
        onDark ? 'text-dark-muted' : 'text-muted',
        className,
      )}
    >
      {children}
    </span>
  );
}
