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
  /** Classes du conteneur magnétique (boutons principaux), ex. « mt-auto flex ». */
  wrapperClassName?: string;
  children: React.ReactNode;
};

type AsLink = Common & { href: string; external?: boolean } & Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    'href' | 'className' | 'children'
  >;
type AsButton = Common & { href?: undefined } & Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'className' | 'children'
  >;

const variants: Record<ButtonVariant, string> = {
  default: 'border-line-2 bg-surf text-ink hover:border-ink',
  red: 'border-red bg-red text-white hover:border-red-hover hover:bg-red-hover',
  ink: 'border-ink bg-ink text-white hover:border-ink-hover hover:bg-ink-hover',
  discord: 'border-ink bg-ink text-white hover:border-ink-hover hover:bg-ink-hover',
};

export function buttonClass(
  variant: ButtonVariant = 'default',
  size: 'md' | 'sm' = 'md',
  className?: string,
) {
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
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-300 ease-pulse group-hover:translate-x-[3px]"
      >
        {m[2]}
      </span>
    </>
  );
}

const COMMON_KEYS = ['variant', 'size', 'primary', 'className', 'wrapperClassName', 'children'] as const;

/** Retire les props propres au composant avant de les passer à l’élément DOM. */
function stripCommon<T extends object>(props: T): T {
  const out = { ...props } as Record<string, unknown>;
  for (const k of COMMON_KEYS) delete out[k];
  if ('href' in out && out.href === undefined) delete out.href;
  return out as T;
}

export function Button(props: AsLink | AsButton) {
  const { variant = 'default', size = 'md', primary, className, wrapperClassName, children } = props;
  const isPrimary = primary ?? (size === 'md' && (variant === 'red' || variant === 'discord'));
  const cls = buttonClass(variant, size, className);
  const content = withArrow(children);

  let el: React.ReactNode;
  if (props.href !== undefined) {
    const { href, external, ...anchor } = stripCommon(props) as AsLink;
    const isExternal = external ?? /^https?:\/\//.test(href);
    el = isExternal ? (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...anchor}>
        {content}
      </a>
    ) : (
      <Link href={href} className={cls} {...anchor}>
        {content}
      </Link>
    );
  } else {
    const { type = 'button', ...btn } = stripCommon(props) as Omit<AsButton, 'href'>;
    el = (
      <button type={type} className={cls} {...btn}>
        {content}
      </button>
    );
  }

  return isPrimary ? <ButtonFx className={wrapperClassName}>{el}</ButtonFx> : el;
}
