'use client';

import { useState, useEffect } from 'react';
import { FaStickyNote, FaExclamationTriangle } from 'react-icons/fa';

interface AffiliateNotesBadgeProps {
  affiliateId: string;
}

export default function AffiliateNotesBadge({ affiliateId }: AffiliateNotesBadgeProps) {
  const [noteCount, setNoteCount] = useState(0);
  const [hasUrgent, setHasUrgent] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/affiliates/${affiliateId}/notes`)
      .then(res => res.json())
      .then(notes => {
        const unresolvedNotes = notes.filter((note: any) => !note.isResolved);
        setNoteCount(unresolvedNotes.length);
        setHasUrgent(unresolvedNotes.some((note: any) => note.priority === 'URGENT'));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [affiliateId]);

  if (loading || noteCount === 0) {
    return null;
  }

  return (
    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
      hasUrgent 
        ? 'bg-red-100 text-red-800' 
        : 'bg-[#245789]/10 text-[#245789]'
    }`}>
      {hasUrgent ? (
        <FaExclamationTriangle className="mr-1" />
      ) : (
        <FaStickyNote className="mr-1" />
      )}
      {noteCount}
    </div>
  );
}