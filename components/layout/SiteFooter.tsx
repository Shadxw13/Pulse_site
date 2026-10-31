import Link from 'next/link';
import { DrawLine } from '@/components/motion/DrawLine';
import { Wordmark } from '@/components/ui/Logo';
import { footerColumns, site } from '@/content/site';
import { FOOTER_BASE, FOOTER_BEAT } from './PulseLine';

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const cls = 'text-sm text-muted-2 no-underline hover:text-ink';
  return /^https?:/.test(href) ? (
    <a href={href} className={cls}>
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-bg-2 text-ink">
      <svg aria-hidden="true" viewBox="0 0 1440 60" preserveAspectRatio="none" className="block h-[60px] w-full">
        <path d={FOOTER_BASE} fill="none" className="stroke-line-3" strokeWidth={1.5} />
        <DrawLine
          d={FOOTER_BEAT}
          fill="none"
          className="stroke-red"
          strokeWidth={1.8}
          strokeLinejoin="round"
         
          duration={1.1}
          start="top 98%"
        />
      </svg>
      <div className="relative mx-auto flex max-w-[1200px] flex-col gap-10 px-[clamp(16px,4vw,40px)] pt-6 pb-7">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-8">
          <div className="flex flex-col gap-3.5">
            <Wordmark size={21} />
            <p className="m-0 text-sm leading-[1.6] text-muted-2">{site.tagline}</p>
          </div>
          {footerColumns.map((c) => (
            <nav key={c.title} aria-label={c.title} className="flex flex-col gap-2.5">
              <span className="text-sm font-semibold">{c.title}</span>
              {c.links.map((l) => (
                <FooterLink key={l.label} href={l.href}>
                  {l.label}
                </FooterLink>
              ))}
            </nav>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line-3 pt-[22px] text-[13px] text-muted-2">
          <span>© 2026 Pulse. Pulse n’est pas affilié à Rockstar Games ni à Cfx.re.</span>
          <a
            href={site.panel.admin}
            className="inline-flex min-h-8 items-center gap-1.5 text-[12.5px] text-muted-2 no-underline hover:text-ink"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z" />
            </svg>
            Administration
          </a>
        </div>
      </div>
    </footer>
  );
}
