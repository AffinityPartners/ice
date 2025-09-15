'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './button';
import { Input } from './input';

interface EmergencyMedicalProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Emergency Medical Profile Modal optimized for mobile devices.
 * 
 * Features:
 * - Mobile-first responsive design with proper touch targets
 * - Smooth animations for better user experience
 * - Prevents iOS zoom with proper input sizing
 * - Enhanced accessibility with proper ARIA attributes
 * - Backdrop blur and proper z-index management
 * - Touch-friendly button spacing and sizing
 */

const EmergencyMedicalProfileModal: React.FC<EmergencyMedicalProfileModalProps> = ({ 
  isOpen, 
  onClose 
}) => {
  const [deviceId, setDeviceId] = useState('');
  const [pin, setPin] = useState('');

  // Modal state management

  const handleAccessProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Device ID:', deviceId);
    console.log('PIN:', pin);
    // Add your logic to access the medical profile
  };

  const handleClose = () => {
    setDeviceId('');
    setPin('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            // Close modal when clicking backdrop
            if (e.target === e.currentTarget) {
              handleClose();
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <motion.div 
            className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-auto overflow-hidden"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 sm:p-8">
              <h2 
                id="modal-title"
                className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center"
              >
                Emergency Medical Profile Access
              </h2>
              <p 
                id="modal-description"
                className="text-gray-600 text-sm sm:text-base mb-6 text-center leading-relaxed"
              >
                Please enter the Device ID and PIN to access emergency medical profile
              </p>
              
              <form onSubmit={handleAccessProfile} className="space-y-6">
                <div>
                  <label 
                    htmlFor="device-id" 
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Device ID
                  </label>
                  <Input
                    type="text"
                    id="device-id"
                    value={deviceId}
                    onChange={(e) => setDeviceId(e.target.value)}
                    placeholder="Enter Device ID"
                    required
                    autoComplete="off"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label 
                    htmlFor="pin" 
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    PIN
                  </label>
                  <Input
                    type="password"
                    id="pin"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="Enter PIN"
                    required
                    autoComplete="current-password"
                    className="w-full"
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button 
                    type="button"
                    onClick={handleClose}
                    variant="outline"
                    size="touch"
                    className="flex-1 order-2 sm:order-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    size="touch"
                    className="flex-1 order-1 sm:order-2"
                  >
                    ACCESS PROFILE
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EmergencyMedicalProfileModal; 