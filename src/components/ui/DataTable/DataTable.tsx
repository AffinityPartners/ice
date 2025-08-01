'use client';

import { ReactNode } from 'react';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

export interface Column<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: any, item: T) => ReactNode;
  className?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onSort?: (key: string, order: 'asc' | 'desc') => void;
  sortKey?: string;
  sortOrder?: 'asc' | 'desc';
  emptyMessage?: string;
  className?: string;
}

export function DataTable<T>({
  data,
  columns,
  onSort,
  sortKey,
  sortOrder,
  emptyMessage = 'No data found',
  className = '',
}: DataTableProps<T>) {
  const handleSort = (column: Column<T>) => {
    if (!column.sortable || !onSort) return;
    
    const key = column.key as string;
    const newOrder = sortKey === key && sortOrder === 'asc' ? 'desc' : 'asc';
    onSort(key, newOrder);
  };

  const getSortIcon = (column: Column<T>) => {
    if (!column.sortable) return null;
    
    const key = column.key as string;
    if (sortKey !== key) {
      return <FaSort className="ml-1 text-gray-400" />;
    }
    
    return sortOrder === 'asc' 
      ? <FaSortUp className="ml-1 text-[#245789]" />
      : <FaSortDown className="ml-1 text-[#245789]" />;
  };

  const getValue = (item: T, key: string): any => {
    const keys = key.split('.');
    let value: any = item;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value;
  };

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key as string}
                className={`px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider ${
                  column.sortable ? 'cursor-pointer hover:bg-gray-200' : ''
                } ${column.className || ''}`}
                onClick={() => handleSort(column)}
              >
                <div className="flex items-center">
                  {column.label}
                  {getSortIcon(column)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-6 text-center text-gray-600 font-medium"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                {columns.map((column) => (
                  <td
                    key={column.key as string}
                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                      column.className || ''
                    }`}
                  >
                    {column.render
                      ? column.render(getValue(item, column.key as string), item)
                      : getValue(item, column.key as string)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}