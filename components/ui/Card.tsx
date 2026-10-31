import { cn } from '@/lib/cn';

type Props = React.HTMLAttributes<HTMLDivElement> & { as?: 'div' | 'figure' | 'article' };

/** Carte à plat : fond blanc, filet, rayon 18 px, sans ombre. */
export function Card({ as: Tag = 'div', className, ...rest }: Props) {
  return <Tag className={cn('rounded-[18px] border border-line bg-surf', className)} {...rest} />;
}
