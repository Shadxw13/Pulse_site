'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { m } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Wordmark } from '@/components/ui/Logo';
import { buttonClass } from '@/components/ui/Button';
import { nav, site } from '@/content/site';
import { cn } from '@/lib/cn';
import { DUR, EASE } from '@/lib/motion';
import { useReducedMotion } from '@/lib/useReducedMotion';

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * En-tête collant : fond flouté après 24 px de défilement, se cache en descendant,
 * réapparaît en remontant. Soulignement du lien actif partagé (layoutId).
 */
export function SiteHeader() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const openRef = useRef(open);
  openRef.current = open;

  useEffect(() => {
    let prev = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        setScrolled(y > 24);
        if (!openRef.current) {
          if (y > 120 && y > prev + 2) setHidden(true);
          else if (y < prev - 2 || y <= 120) setHidden(false);
        }
        prev = y;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onResize = () => window.innerWidth >= 900 && setOpen(false);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <m.header
      className={cn(
        'sticky top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled || open ? 'border-line bg-bg/86 backdrop-blur-[10px]' : 'border-transparent bg-bg',
      )}
      animate={{ y: hidden && !open ? '-100%' : '0%' }}
      transition={{ duration: reduce ? 0 : DUR.fast, ease: EASE }}
    >
      <a
        href="#contenu"
        className="absolute top-2 left-2 z-10 -translate-y-20 rounded-full bg-ink px-4 py-2 text-sm text-white focus:translate-y-0"
      >
        Aller au contenu
      </a>
      <div className="mx-auto flex min-h-[68px] max-w-[1200px] items-center justify-between gap-5 px-[clamp(16px,4vw,40px)]">
        <Link href="/" className="flex items-center text-ink no-underline" aria-label="Pulse, accueil">
          <Wordmark />
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-7 min-[900px]:flex">
          {nav.map((l) => {
            const on = isActive(pathname, l.href);
            return (
              <Link
                key={l.key}
                href={l.href}
                aria-current={on ? 'page' : undefined}
                className={cn(
                  'relative inline-flex min-h-11 items-center text-[14.5px] no-underline transition-colors',
                  on ? 'font-semibold text-ink' : 'font-medium text-muted hover:text-ink',
                )}
              >
                {l.label}
                {on && (
                  <m.span
                    layoutId="nav-underline"
                    className="absolute right-0 bottom-0 left-0 h-px bg-ink"
                    transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.panel.login}
            className="hidden min-h-10 items-center px-3 text-sm text-ink no-underline hover:underline min-[900px]:inline-flex"
          >
            Se connecter
          </a>
          <Link href="/tarifs" className={buttonClass('ink', 'sm')}>
            Voir les offres
          </Link>
          <button
            type="button"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((o) => !o)}
            className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-line bg-transparent text-ink min-[900px]:hidden"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d={open ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16'} />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <m.nav
          id="menu-mobile"
          aria-label="Navigation principale"
          className="flex flex-col border-t border-line px-[clamp(16px,4vw,40px)] pt-2 pb-[18px] min-[900px]:hidden"
          initial={{ opacity: 0, y: reduce ? 0 : -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? DUR.reduced : DUR.fast, ease: EASE }}
        >
          {nav.map((l) => (
            <Link
              key={l.key}
              href={l.href}
              aria-current={isActive(pathname, l.href) ? 'page' : undefined}
              className="flex min-h-[52px] items-center justify-between border-b border-line text-[17px] font-semibold text-ink no-underline"
            >
              {l.label}
              <span className="opacity-50" aria-hidden="true">
                ›
              </span>
            </Link>
          ))}
          <a
            href={site.panel.login}
            className="mt-4 flex min-h-12 items-center justify-center rounded-full border border-line text-[15px] font-semibold text-ink no-underline"
          >
            Se connecter
          </a>
        </m.nav>
      )}
    </m.header>
  );
}
