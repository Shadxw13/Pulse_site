import { ImageResponse } from 'next/og';
import { LOGO_PATH } from '@/components/ui/Logo';

export const alt = 'Pulse, base FiveM ESX Legacy pour serveurs RP';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Image Open Graph générée : logo, titre et ligne de pouls. Couleurs = jetons du site. */
export default function OpengraphImage() {
  const bg = '#F5F4F1';
  const ink = '#16151A';
  const red = '#C8161D';
  const muted = '#67646C';
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: bg,
        padding: 72,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <svg width="84" height="48" viewBox="240 350 560 324">
          <path fill={red} d={LOGO_PATH} />
        </svg>
        <span style={{ fontSize: 52, fontWeight: 800, color: ink, letterSpacing: -2 }}>Pulse</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <span
          style={{
            fontSize: 76,
            fontWeight: 800,
            color: ink,
            lineHeight: 1,
            letterSpacing: -3,
            maxWidth: 980,
          }}
        >
          Votre serveur RP, sur une base qui tient la charge.
        </span>
        <span style={{ fontSize: 30, color: muted }}>
          ESX Legacy · ox_inventory · environ 0,30 ms côté serveur
        </span>
      </div>
      <svg width="1056" height="40" viewBox="0 0 1056 40">
        <path
          d="M0 24 H440 L460 24 L474 4 L492 38 L506 12 L518 24 H1056"
          fill="none"
          stroke={red}
          strokeWidth="4"
          strokeLinejoin="round"
        />
      </svg>
    </div>,
    size,
  );
}
