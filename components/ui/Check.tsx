import { cn } from '@/lib/cn';

/** Coche (vert sur clair par défaut). */
export function Check({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn('mt-1 flex-none', className)}
    >
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  );
}
