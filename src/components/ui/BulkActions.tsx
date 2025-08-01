'use client';

import { useState } from 'react';
import {
  FaCheckSquare,
  FaSquare,
  FaMinusSquare,
  FaTrash,
  FaUserShield,
  FaUserTie,
  FaUser,
  FaBan,
  FaCheck,
  FaChevronDown,
} from 'react-icons/fa';

interface BulkActionsProps<T> {
  items: T[];
  selectedIds: Set<string>;
  onSelectionChange: (ids: Set<string>) => void;
  actions: BulkAction[];
  getItemId: (item: T) => string;
  className?: string;
}

export interface BulkAction {
  label: string;
  icon?: React.ReactNode;
  action: (selectedIds: string[]) => Promise<void>;
  variant?: 'default' | 'danger';
  requireConfirm?: boolean;
  confirmMessage?: string;
}

export default function BulkActions<T>({
  items,
  selectedIds,
  onSelectionChange,
  actions,
  getItemId,
  className = '',
}: BulkActionsProps<T>) {
  const [showActions, setShowActions] = useState(false);
  const [processing, setProcessing] = useState(false);

  const allItemIds = items.map(getItemId);
  const allSelected = allItemIds.length > 0 && allItemIds.every(id => selectedIds.has(id));
  const someSelected = allItemIds.some(id => selectedIds.has(id));

  const handleSelectAll = () => {
    if (allSelected) {
      onSelectionChange(new Set());
    } else {
      onSelectionChange(new Set(allItemIds));
    }
  };

  const handleAction = async (action: BulkAction) => {
    if (selectedIds.size === 0) return;

    if (action.requireConfirm) {
      const message = action.confirmMessage || 
        `Are you sure you want to ${action.label.toLowerCase()} ${selectedIds.size} selected items?`;
      
      if (!confirm(message)) return;
    }

    setProcessing(true);
    try {
      await action.action(Array.from(selectedIds));
      onSelectionChange(new Set());
      setShowActions(false);
    } catch (error) {
      console.error('Bulk action failed:', error);
      alert('Action failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Select All Checkbox */}
      <button
        onClick={handleSelectAll}
        className="text-gray-600 hover:text-gray-900"
        title={allSelected ? 'Deselect all' : 'Select all'}
      >
        {allSelected ? (
          <FaCheckSquare className="w-5 h-5" />
        ) : someSelected ? (
          <FaMinusSquare className="w-5 h-5" />
        ) : (
          <FaSquare className="w-5 h-5" />
        )}
      </button>

      {/* Selected Count */}
      {selectedIds.size > 0 && (
        <span className="text-sm text-gray-700">
          {selectedIds.size} selected
        </span>
      )}

      {/* Bulk Actions Dropdown */}
      {selectedIds.size > 0 && (
        <div className="relative">
          <button
            onClick={() => setShowActions(!showActions)}
            disabled={processing}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#245789] disabled:opacity-50"
          >
            Bulk Actions
            <FaChevronDown className="ml-2 -mr-1" />
          </button>

          {showActions && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowActions(false)}
              />
              <div className="absolute left-0 z-20 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu">
                  {actions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleAction(action)}
                      disabled={processing}
                      className={`flex items-center px-4 py-2 text-sm w-full text-left hover:bg-gray-100 disabled:opacity-50 ${
                        action.variant === 'danger' 
                          ? 'text-red-700 hover:bg-red-50' 
                          : 'text-gray-700'
                      }`}
                      role="menuitem"
                    >
                      {action.icon && <span className="mr-3">{action.icon}</span>}
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

// Checkbox component for individual items
export function BulkCheckbox({ 
  checked, 
  onChange,
  className = ''
}: { 
  checked: boolean; 
  onChange: (checked: boolean) => void;
  className?: string;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`text-gray-600 hover:text-gray-900 ${className}`}
    >
      {checked ? (
        <FaCheckSquare className="w-5 h-5" />
      ) : (
        <FaSquare className="w-5 h-5" />
      )}
    </button>
  );
}