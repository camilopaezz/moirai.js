'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const Transition = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      className="min-h-[calc(100%_-_120px)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Transition;
