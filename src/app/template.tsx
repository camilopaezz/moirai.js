'use client';

import { LazyMotion, domMax, m as motion } from 'framer-motion';
import { ReactNode } from 'react';

const Transition = ({ children }: { children: ReactNode }) => {
  return (
    <LazyMotion features={domMax}>
      <motion.div
        className="min-h-[calc(100%_-_120px)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {children}
      </motion.div>
    </LazyMotion>
  );
};

export default Transition;
