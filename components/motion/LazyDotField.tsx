'use client';

import dynamic from 'next/dynamic';

/** DotField chargé dynamiquement, côté client uniquement (canvas). */
export const LazyDotField = dynamic(() => import('./DotField'), { ssr: false });
