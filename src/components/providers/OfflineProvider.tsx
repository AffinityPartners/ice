'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OfflineContextType {
  isOnline: boolean;
  isServiceWorkerSupported: boolean;
  isServiceWorkerRegistered: boolean;
  showOfflineIndicator: boolean;
  registerServiceWorker: () => Promise<void>;
}

const OfflineContext = createContext<OfflineContextType | undefined>(undefined);

/**
 * Offline Provider that manages service worker registration and offline state.
 * 
 * Features:
 * - Automatic service worker registration
 * - Online/offline state detection
 * - Offline indicator UI component
 * - Service worker update notifications
 * - Background sync support
 * 
 * The provider enhances mobile experience by:
 * - Providing offline functionality for critical features
 * - Showing clear offline/online status
 * - Caching important assets for offline use
 * - Handling network state changes gracefully
 * 
 * @param children React children to wrap with offline context
 */
export function OfflineProvider({ children }: { children: React.ReactNode }) {
  const [isOnline, setIsOnline] = useState(true);
  const [isServiceWorkerSupported, setIsServiceWorkerSupported] = useState(false);
  const [isServiceWorkerRegistered, setIsServiceWorkerRegistered] = useState(false);
  const [showOfflineIndicator, setShowOfflineIndicator] = useState(false);

  // Check service worker support
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      setIsServiceWorkerSupported(true);
    }
  }, []);

  // Register service worker
  const registerServiceWorker = async () => {
    if (!isServiceWorkerSupported) {
      console.log('Service workers are not supported');
      return;
    }

    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      
      console.log('Service Worker registered successfully:', registration);
      setIsServiceWorkerRegistered(true);

      // Handle service worker updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New service worker available
              console.log('New service worker available');
              // You could show an update notification here
            }
          });
        }
      });

      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'CACHE_UPDATED') {
          console.log('Cache updated by service worker');
        }
      });

    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  };

  // Monitor online/offline status
  useEffect(() => {
    const updateOnlineStatus = () => {
      const online = navigator.onLine;
      setIsOnline(online);
      
      // Show indicator when going offline, hide after delay when coming online
      if (!online) {
        setShowOfflineIndicator(true);
      } else {
        setTimeout(() => {
          setShowOfflineIndicator(false);
        }, 2000); // Hide after 2 seconds when back online
      }
    };

    // Initial check
    updateOnlineStatus();

    // Listen for online/offline events
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  // Auto-register service worker on mount
  useEffect(() => {
    if (isServiceWorkerSupported && !isServiceWorkerRegistered) {
      registerServiceWorker();
    }
  }, [isServiceWorkerSupported, isServiceWorkerRegistered]);

  const contextValue: OfflineContextType = {
    isOnline,
    isServiceWorkerSupported,
    isServiceWorkerRegistered,
    showOfflineIndicator,
    registerServiceWorker,
  };

  return (
    <OfflineContext.Provider value={contextValue}>
      {children}
      <OfflineIndicator />
    </OfflineContext.Provider>
  );
}

/**
 * Hook to access offline context
 */
export function useOffline() {
  const context = useContext(OfflineContext);
  if (context === undefined) {
    throw new Error('useOffline must be used within an OfflineProvider');
  }
  return context;
}

/**
 * Offline indicator component that shows current connection status
 */
function OfflineIndicator() {
  const { isOnline, showOfflineIndicator } = useOffline();

  return (
    <AnimatePresence>
      {showOfflineIndicator && (
        <motion.div
          className="fixed top-20 left-4 right-4 z-50 md:left-auto md:right-6 md:w-80"
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
          }}
        >
          <div
            className={cn(
              'rounded-lg shadow-lg backdrop-blur-sm border p-4 flex items-center space-x-3',
              isOnline
                ? 'bg-green-50/90 border-green-200 text-green-800'
                : 'bg-yellow-50/90 border-yellow-200 text-yellow-800'
            )}
          >
            <div className="flex-shrink-0">
              {isOnline ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                >
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              ) : (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-yellow-500 border-t-transparent rounded-full"
                />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">
                {isOnline ? 'Back Online' : 'You\'re Offline'}
              </p>
              <p className="text-xs opacity-75 mt-1">
                {isOnline 
                  ? 'Your connection has been restored'
                  : 'Some features may be limited'
                }
              </p>
            </div>

            {!isOnline && (
              <div className="flex-shrink-0">
                <motion.button
                  className="text-xs font-medium bg-yellow-100 hover:bg-yellow-200 px-2 py-1 rounded transition-colors touch-manipulation"
                  onClick={() => window.location.reload()}
                  whileTap={{ scale: 0.95 }}
                >
                  Retry
                </motion.button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Hook to check if a feature should be available offline
 */
export function useOfflineCapability(feature: 'forms' | 'navigation' | 'images' | 'api') {
  const { isOnline, isServiceWorkerRegistered } = useOffline();

  const capabilities = {
    forms: isServiceWorkerRegistered, // Forms can be queued offline
    navigation: true, // Basic navigation always works
    images: isServiceWorkerRegistered, // Cached images work offline
    api: isOnline, // API calls need network
  };

  return {
    isAvailable: capabilities[feature],
    isOnline,
    isServiceWorkerRegistered,
  };
}

// Helper function for cn utility (if not imported)
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
