import { cn } from '@/lib/cn';

export function Tag({ children, tone = 'neutral', className }: { children: React.ReactNode; tone?: 'neutral' | 'red'; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex h-6 items-center rounded-full px-2.5 text-xs font-medium',
        tone === 'red' ? 'bg-red-soft text-red-text' : 'bg-sunk text-ink-2',
        className,
      )}
    >
      {children}
    </span>
  );
}
