import { cn } from '@/lib/cn';

export const LOGO_PATH =
  'M245 480C300 474 330 445 360 420C410 378 465 356 520 354L520 511C465 513 410 535 360 577C330 602 300 631 245 637ZM520 512C575 506 605 477 635 452C685 410 740 388 795 386L795 543C740 545 685 567 635 609C605 634 575 663 520 669Z';

/** Logo Pulse : rouge sur clair, rouge plus vif sur sombre. */
export function LogoMark({
  width = 30,
  height = 17,
  onDark = false,
  className,
  title,
}: {
  width?: number;
  height?: number;
  onDark?: boolean;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="240 350 560 324"
      className={cn(onDark ? 'fill-red-on-dark' : 'fill-red', className)}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path d={LOGO_PATH} />
    </svg>
  );
}

export function Wordmark({ size = 22 }: { size?: number }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className="display font-extrabold leading-none tracking-[-0.03em]" style={{ fontSize: size }}>
        Pulse
      </span>
    </span>
  );
}
