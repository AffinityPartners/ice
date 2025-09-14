'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FloatingActionButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
  label?: string;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

interface SpeedDialAction {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

interface SpeedDialFABProps extends Omit<FloatingActionButtonProps, 'onClick'> {
  actions: SpeedDialAction[];
  closeOnAction?: boolean;
}

/**
 * Floating Action Button component optimized for mobile interfaces.
 * 
 * Features:
 * - Touch-optimized sizing with proper touch targets (44px minimum)
 * - Multiple size variants for different use cases
 * - Flexible positioning options
 * - Loading states with smooth animations
 * - Accessibility support with proper ARIA attributes
 * - Hardware-accelerated animations for smooth performance
 * - Speed dial functionality for multiple actions
 * 
 * The component provides excellent mobile UX by:
 * - Using proper z-index stacking for overlay scenarios
 * - Providing visual feedback on touch interactions
 * - Supporting keyboard navigation for accessibility
 * - Optimizing animations for mobile performance
 * - Following Material Design principles for familiarity
 * 
 * @param props Configuration props for the floating action button
 */
export function FloatingActionButton({
  icon,
  onClick,
  className,
  size = 'md',
  position = 'bottom-right',
  label,
  disabled = false,
  loading = false,
  variant = 'primary',
}: FloatingActionButtonProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-14 h-14',
    lg: 'w-16 h-16',
  };

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'bottom-center': 'bottom-6 left-1/2 transform -translate-x-1/2',
  };

  const variantClasses = {
    primary: 'bg-[#245789] hover:bg-blue-700 text-white shadow-blue-500/25',
    secondary: 'bg-[#CA0015] hover:bg-red-700 text-white shadow-red-500/25',
    success: 'bg-green-500 hover:bg-green-600 text-white shadow-green-500/25',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-yellow-500/25',
    danger: 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/25',
  };

  return (
    <>
      <motion.button
        className={cn(
          'fixed z-50 rounded-full shadow-lg transition-all duration-200',
          'flex items-center justify-center touch-manipulation',
          'focus:outline-none focus:ring-4 focus:ring-offset-2',
          sizeClasses[size],
          positionClasses[position],
          variantClasses[variant],
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        onClick={disabled ? undefined : onClick}
        disabled={disabled || loading}
        whileHover={{ scale: disabled ? 1 : 1.05 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 25,
        }}
        aria-label={label || 'Floating action button'}
      >
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 1, rotate: 360 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
            />
          ) : (
            <motion.div
              key="icon"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="w-6 h-6 flex items-center justify-center"
            >
              {icon}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Label tooltip for desktop */}
      {label && (
        <div className={cn(
          'fixed z-40 hidden sm:block pointer-events-none',
          'bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg',
          'opacity-0 hover:opacity-100 transition-opacity duration-200',
          position === 'bottom-right' && 'bottom-6 right-20',
          position === 'bottom-left' && 'bottom-6 left-20',
          position === 'bottom-center' && 'bottom-6 left-1/2 transform -translate-x-1/2 mb-20'
        )}>
          {label}
        </div>
      )}
    </>
  );
}

/**
 * Speed Dial FAB with expandable action menu
 */
export function SpeedDialFAB({
  icon,
  actions,
  closeOnAction = true,
  className,
  size = 'md',
  position = 'bottom-right',
  label,
  disabled = false,
  variant = 'primary',
}: SpeedDialFABProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleActionClick = (action: SpeedDialAction) => {
    action.onClick();
    if (closeOnAction) {
      setIsOpen(false);
    }
  };

  const toggleOpen = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Speed Dial Actions */}
      <AnimatePresence>
        {isOpen && (
          <div className={cn(
            'fixed z-50',
            position === 'bottom-right' && 'bottom-24 right-6',
            position === 'bottom-left' && 'bottom-24 left-6',
            position === 'bottom-center' && 'bottom-24 left-1/2 transform -translate-x-1/2'
          )}>
            {actions.map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0, y: 20 }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 25,
                  delay: index * 0.05,
                }}
                className="mb-4 flex items-center"
              >
                {/* Action Label */}
                <div className={cn(
                  'bg-white shadow-lg rounded-lg px-3 py-2 mr-4',
                  'text-sm font-medium text-gray-900',
                  position === 'bottom-left' && 'order-2 ml-4 mr-0'
                )}>
                  {action.label}
                </div>

                {/* Action Button */}
                <motion.button
                  className={cn(
                    'w-12 h-12 rounded-full shadow-lg flex items-center justify-center',
                    'transition-colors duration-200 touch-manipulation',
                    action.variant === 'primary' && 'bg-[#245789] hover:bg-blue-700 text-white',
                    action.variant === 'secondary' && 'bg-[#CA0015] hover:bg-red-700 text-white',
                    action.variant === 'success' && 'bg-green-500 hover:bg-green-600 text-white',
                    action.variant === 'warning' && 'bg-yellow-500 hover:bg-yellow-600 text-white',
                    action.variant === 'danger' && 'bg-red-500 hover:bg-red-600 text-white',
                    !action.variant && 'bg-white hover:bg-gray-50 text-gray-700'
                  )}
                  onClick={() => handleActionClick(action)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    {action.icon}
                  </div>
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <FloatingActionButton
        icon={
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.div>
        }
        onClick={toggleOpen}
        className={className}
        size={size}
        position={position}
        label={label}
        disabled={disabled}
        variant={variant}
      />
    </>
  );
}

/**
 * Pre-configured FAB for common actions
 */
export function ContactFAB({
  phoneNumber,
  emailAddress,
  position = 'bottom-right',
}: {
  phoneNumber?: string;
  emailAddress?: string;
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
}) {
  const actions: SpeedDialAction[] = [];

  if (phoneNumber) {
    actions.push({
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
      ),
      label: 'Call',
      onClick: () => window.open(`tel:${phoneNumber}`),
      variant: 'success' as const,
    });
  }

  if (emailAddress) {
    actions.push({
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      ),
      label: 'Email',
      onClick: () => window.open(`mailto:${emailAddress}`),
      variant: 'primary' as const,
    });
  }

  if (actions.length === 0) {
    return null;
  }

  return (
    <SpeedDialFAB
      icon={
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
        </svg>
      }
      actions={actions}
      position={position}
      label="Contact us"
      variant="primary"
    />
  );
}
