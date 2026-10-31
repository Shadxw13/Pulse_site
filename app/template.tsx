'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { EASE } from '@/lib/motion';

declare global {
  interface Window {
    __pulseNavigated?: boolean;
  }
}

/** Transition de page : fondu de 250 ms et légère montée du <main>. Pas d’animation au premier chargement. */
export default function Template({ children }: { children: React.ReactNode }) {
  const [animate] = useState(() => typeof window !== 'undefined' && window.__pulseNavigated === true);
  useEffect(() => {
    window.__pulseNavigated = true;
  }, []);
  return (
    <motion.main
      id="contenu"
      tabIndex={-1}
      className="overflow-x-clip outline-none"
      initial={animate ? { opacity: 0, y: 10 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: EASE }}
    >
      {children}
    </motion.main>
  );
}
