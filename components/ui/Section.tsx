import { cn } from '@/lib/cn';

type Props = React.HTMLAttributes<HTMLElement> & { alt?: boolean; dark?: boolean; flush?: boolean };

/** Section standard : padding vertical fluide, variante blanche (alt) ou sombre (dark). */
export function Section({ alt, dark, flush, className, ...rest }: Props) {
  return (
    <section
      className={cn(
        'relative',
        !flush && 'py-[clamp(64px,8vw,112px)]',
        alt && 'border-y border-line bg-surf',
        dark && 'bg-dark text-dark-text',
        className,
      )}
      {...rest}
    />
  );
}

export function Wrap({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('wrap', className)} {...rest} />;
}
