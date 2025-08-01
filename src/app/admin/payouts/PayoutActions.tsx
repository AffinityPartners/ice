'use client';

import { useState } from 'react';
import { FaDollarSign, FaSpinner, FaExclamationCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface PayoutActionsProps {
  affiliateId: string;
  amount: number;
  canPayout: boolean;
}

export default function PayoutActions({ affiliateId, amount, canPayout }: PayoutActionsProps) {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handlePayout = async () => {
    if (!canPayout || processing) return;
    
    setProcessing(true);
    setError(null);

    try {
      // Placeholder for payout processing
      alert('Payout processing is not yet implemented. This requires Stripe Connect integration.');
      
      // Refresh the page to show updated data
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setProcessing(false);
    }
  };

  if (!canPayout) {
    return (
      <div className="flex items-center text-sm text-gray-500">
        <FaExclamationCircle className="mr-1" />
        Not configured
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={handlePayout}
        disabled={processing}
        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing ? (
          <>
            <FaSpinner className="animate-spin mr-1" />
            Processing...
          </>
        ) : (
          <>
            <FaDollarSign className="mr-1" />
            Pay Out
          </>
        )}
      </button>
      {error && (
        <span className="text-xs text-red-600">{error}</span>
      )}
    </div>
  );
}