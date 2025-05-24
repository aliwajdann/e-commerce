// components/AnimatedLink.tsx
'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AnimatedLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      whileHover="hover"
      initial="initial"
      className="relative inline-block"
    >
      <Link
        href={href}
        className="transition-colors text-base-dark dark:text-base-light"
      >
        {children}
        <motion.span
          variants={{
            initial: { width: 0 },
            hover: { width: "100%" },
          }}
          transition={{ duration: 0.3 }}
          className="absolute left-0 -bottom-1 h-[2px] bg-primary block"
        />
      </Link>
    </motion.div>
  );
}
