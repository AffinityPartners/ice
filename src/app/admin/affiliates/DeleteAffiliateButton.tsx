'use client';

import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

interface DeleteAffiliateButtonProps {
  affiliateId: string;
  deleteAction: (formData: FormData) => Promise<void>;
}

export default function DeleteAffiliateButton({ 
  affiliateId, 
  deleteAction 
}: DeleteAffiliateButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    const formData = new FormData();
    formData.append('affiliateId', affiliateId);
    await deleteAction(formData);
    setShowConfirm(false);
  };

  if (showConfirm) {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">Delete?</span>
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800 transition-colors text-sm font-medium"
        >
          Yes
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          className="text-gray-600 hover:text-gray-800 transition-colors text-sm font-medium"
        >
          No
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="inline-flex items-center text-red-600 hover:text-red-800 transition-colors"
    >
      <FaTrash className="mr-1" />
      Delete
    </button>
  );
}