import { useEffect, useState } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'framer-motion';

const QUIPS = [
  'writing code',
  'writing article',
  'writing novel',
  'writing non-fiction',
  'side_projects > sleep',
  'status: tinkering',
  'git commit -m "definitely the last one"',
  'currently teaching a cube to fly',
  'works on my machine™',
];

export default function RotatingQuip() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % QUIPS.length), 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <p className="flex h-6 items-center font-mono text-sm text-gray-500 dark:text-gray-400" aria-live="off">
        <span className="mr-2 text-primary">$</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
          >
            {QUIPS[i]}
          </motion.span>
        </AnimatePresence>
        <span className="ml-0.5 inline-block h-4 w-2 bg-primary animate-blink" aria-hidden="true" />
      </p>
    </MotionConfig>
  );
}
