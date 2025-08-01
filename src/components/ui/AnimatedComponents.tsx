'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

// Fade up animation for sections
export const FadeUp = ({
  children,
  delay = 0,
  className = ''
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
);

// Slide in from left for sidebar
export const SlideInLeft = ({
  children,
  delay = 0,
  className = ''
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -100 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.4, delay, ease: 'easeOut' }}
    className={className}
  >
    {children}
  </motion.div>
);

// Scale animation for cards
export const ScaleIn = ({
  children,
  delay = 0,
  className = ''
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3, delay, ease: 'easeOut' }}
    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    className={className}
  >
    {children}
  </motion.div>
);

// Hover card animation wrapper
export const HoverCard = ({
  children,
  className = ''
}: {
  children: ReactNode;
  className?: string;
}) => (
  <motion.div
    whileHover={{
      scale: 1.05,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      transition: { duration: 0.3, ease: 'easeOut' }
    }}
    whileTap={{ scale: 0.95 }}
    className={className}
  >
    {children}
  </motion.div>
);

// Stagger container for lists
export const StaggerContainer = ({
  children,
  className = ''
}: {
  children: ReactNode;
  className?: string;
}) => (
  <motion.div
    initial="hidden"
    animate="show"
    variants={{
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1
        }
      }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Stagger item for lists
export const StaggerItem = ({
  children,
  className = ''
}: {
  children: ReactNode;
  className?: string;
}) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0 }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Animated button
export const AnimatedButton = ({
  children,
  onClick,
  className = '',
  disabled = false,
  type = 'button'
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}) => (
  <motion.button
    type={type}
    onClick={onClick}
    disabled={disabled}
    whileHover={{ scale: disabled ? 1 : 1.05 }}
    whileTap={{ scale: disabled ? 1 : 0.95 }}
    transition={{ duration: 0.2 }}
    className={className}
  >
    {children}
  </motion.button>
);

// Animated counter
export const AnimatedCounter = ({
  value,
  duration = 2,
  className = ''
}: {
  value: number;
  duration?: number;
  className?: string;
}) => {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {value}
    </motion.span>
  );
};