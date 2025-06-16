'use client';

import React, { useState } from 'react';
import Modal from './Modal';
import { Button } from './Button';

interface EmergencyMedicalProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmergencyMedicalProfileModal: React.FC<EmergencyMedicalProfileModalProps> = ({ 
  isOpen, 
  onClose 
}) => {
  const [deviceId, setDeviceId] = useState('');
  const [pin, setPin] = useState('');

  console.log('Modal isOpen:', isOpen);

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

  // Test version - simple display
  if (isOpen) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
          <h2 className="text-xl font-semibold mb-4">Emergency Medical Profile Access</h2>
          <p className="text-gray-600 text-sm mb-6">
            Please enter the Device ID and PIN to access emergency medical profile
          </p>
          
          <form onSubmit={handleAccessProfile} className="space-y-4">
            <div>
              <label htmlFor="device-id" className="block text-sm font-medium text-gray-700 mb-2">
                Device ID
              </label>
              <input
                type="text"
                id="device-id"
                value={deviceId}
                onChange={(e) => setDeviceId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#245789] focus:border-[#245789] transition-colors"
                placeholder="Enter Device ID"
                required
              />
            </div>
            
            <div>
              <label htmlFor="pin" className="block text-sm font-medium text-gray-700 mb-2">
                PIN
              </label>
              <input
                type="password"
                id="pin"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#245789] focus:border-[#245789] transition-colors"
                placeholder="Enter PIN"
                required
              />
            </div>
            
            <div className="flex gap-4 pt-4">
              <Button 
                type="button"
                onClick={handleClose}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-md transition-colors"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="flex-1 bg-[#CA0015] hover:bg-red-700 text-white font-medium py-3 px-4 rounded-md transition-colors shadow-md hover:shadow-lg"
              >
                ACCESS PROFILE
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return null;
};

export default EmergencyMedicalProfileModal; 