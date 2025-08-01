'use client';

import { useState } from 'react';
import { FaStickyNote } from 'react-icons/fa';
import AffiliateNotesModal from './AffiliateNotesModal';
import AffiliateNotesBadge from './AffiliateNotesBadge';

interface AffiliateNotesButtonProps {
  affiliateId: string;
  affiliateName: string;
}

export default function AffiliateNotesButton({ 
  affiliateId, 
  affiliateName 
}: AffiliateNotesButtonProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="relative inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#245789]"
      >
        <FaStickyNote className="mr-1.5" />
        Notes
        <AffiliateNotesBadge affiliateId={affiliateId} />
      </button>
      
      <AffiliateNotesModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        affiliateId={affiliateId}
        affiliateName={affiliateName}
      />
    </>
  );
}