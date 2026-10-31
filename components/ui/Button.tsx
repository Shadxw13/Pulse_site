import Link from 'next/link';
import { cn } from '@/lib/cn';
import { ButtonFx } from './ButtonFx';

export type ButtonVariant = 'default' | 'red' | 'ink' | 'discord';

type Common = {
  variant?: ButtonVariant;
  size?: 'md' | 'sm';
  /** Bouton principal : effet magnétique + éclat au clic. Par défaut pour rouge et Discord en taille normale. */
  primary?: boolean;
  className?: string;
  children: React.ReactNode;
};

type AsLink = Common & { href: string; external?: boolean } & Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    'href' | 'className' | 'children'
  >;
type AsButton = Common & { href?: undefined } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>;

const variants: Record<ButtonVariant, string> = {
  default: 'border-line-2 bg-surf text-ink hover:border-ink',
  red: 'border-red bg-red text-white hover:border-red-hover hover:bg-red-hover',
  ink: 'border-ink bg-ink text-white hover:border-ink-hover hover:bg-ink-hover',
  discord: 'border-ink bg-ink text-white hover:border-ink-hover hover:bg-ink-hover',
};

export function buttonClass(variant: ButtonVariant = 'default', size: 'md' | 'sm' = 'md', className?: string) {
  return cn(
    'group relative inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border font-medium whitespace-nowrap no-underline',
    'leading-none transition-colors duration-200',
    size === 'md' ? 'min-h-12 px-[22px] text-[15px]' : 'min-h-10 px-4 text-sm',
    variants[variant],
    className,
  );
}

/** Sépare une flèche finale « → » pour la faire glisser de 3 px au survol. */
function withArrow(children: React.ReactNode) {
  if (typeof children !== 'string') return children;
  const m = children.match(/^(.*?)\s*(→)$/);
  if (!m) return children;
  return (
    <>
      {m[1]}
      <span aria-hidden="true" className="inline-block transition-transform duration-300 ease-pulse group-hover:translate-x-[3px]">
        {m[2]}
      </span>
    </>
  );
}

export function Button(props: AsLink | AsButton) {
  const { variant = 'default', size = 'md', primary, className, children } = props;
  const isPrimary = primary ?? (size === 'md' && (variant === 'red' || variant === 'discord'));
  const cls = buttonClass(variant, size, className);
  const content = withArrow(children);

  let el: React.ReactNode;
  if (props.href !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { variant: _v, size: _s, primary: _p, className: _c, children: _ch, href, external, ...rest } = props;
    const isExternal = external ?? /^https?:\/\//.test(href);
    el = isExternal ? (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>
        {content}
      </a>
    ) : (
      <Link href={href} className={cls} {...rest}>
        {content}
      </Link>
    );
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { variant: _v, size: _s, primary: _p, className: _c, children: _ch, href: _h, type = 'button', ...rest } = props;
    el = (
      <button type={type} className={cls} {...rest}>
        {content}
      </button>
    );
  }

  return isPrimary ? <ButtonFx>{el}</ButtonFx> : el;
}
