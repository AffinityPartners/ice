'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { FaSearch, FaSortAmountDown, FaTimes, FaFlag, FaExclamationTriangle, FaCircle, FaUsers, FaEye, FaChartLine, FaHandshake, FaEdit } from 'react-icons/fa';
import AffiliateNotesBadge from './AffiliateNotesBadge';
import AffiliateNotesButton from './AffiliateNotesButton';
import DeleteAffiliateButton from '@/app/admin/affiliates/DeleteAffiliateButton';
import ExportButton from '@/components/ui/ExportButton';
import { prepareAffiliateDataForExport } from '@/lib/export-utils';

type SortOption = 'name' | 'email' | 'created' | 'priority' | 'performance' | 'visits';
type SortDirection = 'asc' | 'desc';

interface Affiliate {
  id: string;
  userId: string;
  slug: string;
  companyName: string | null;
  isActive: boolean | null;
  user: {
    email: string | null;
    name: string | null;
  };
  referrals: any[];
  visits: number;
  conversions: number;
  createdAt: Date;
}

interface NoteSummary {
  affiliateId: string;
  totalNotes: number;
  unresolvedNotes: number;
  highestPriority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT' | null;
}

interface AffiliateTableWithSearchProps {
  affiliates: Affiliate[];
  deleteAction: any;
}

const priorityOrder = { URGENT: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };

export default function AffiliateTableWithSearch({ affiliates, deleteAction }: AffiliateTableWithSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('created');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [noteSummaries, setNoteSummaries] = useState<Record<string, NoteSummary>>({});

  // Fetch note summaries for all affiliates
  const fetchNoteSummaries = useCallback(async () => {
    try {
      const summaries: Record<string, NoteSummary> = {};

      await Promise.all(
        affiliates.map(async (affiliate) => {
          try {
            const response = await fetch(`/api/admin/affiliates/${affiliate.id}/notes`);
            if (response.ok) {
              const notes = await response.json();
              const unresolvedNotes = notes.filter((note: any) => !note.isResolved);

              let highestPriority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT' | null = null;
              if (unresolvedNotes.length > 0) {
                const priorities = unresolvedNotes.map((note: any) => note.priority);
                if (priorities.includes('URGENT')) highestPriority = 'URGENT';
                else if (priorities.includes('HIGH')) highestPriority = 'HIGH';
                else if (priorities.includes('MEDIUM')) highestPriority = 'MEDIUM';
                else if (priorities.includes('LOW')) highestPriority = 'LOW';
              }

              summaries[affiliate.id] = {
                affiliateId: affiliate.id,
                totalNotes: notes.length,
                unresolvedNotes: unresolvedNotes.length,
                highestPriority,
              };
            }
          } catch (error) {
            console.error(`Failed to fetch notes for affiliate ${affiliate.id}:`, error);
          }
        })
      );

      setNoteSummaries(summaries);
    } catch (error) {
      console.error('Failed to fetch note summaries:', error);
    }
  }, [affiliates]);

  // Fetch note summaries on mount
  useEffect(() => {
    fetchNoteSummaries();
  }, [fetchNoteSummaries]);

  const filteredAndSortedAffiliates = useMemo(() => {
    let filtered = affiliates;

    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = affiliates.filter(affiliate => {
        const name = (affiliate.companyName || affiliate.user.name || '').toLowerCase();
        const email = (affiliate.user.email || '').toLowerCase();
        const slug = affiliate.slug.toLowerCase();

        return name.includes(search) ||
               email.includes(search) ||
               slug.includes(search);
      });
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'name':
          const nameA = (a.companyName || a.user.name || '').toLowerCase();
          const nameB = (b.companyName || b.user.name || '').toLowerCase();
          comparison = nameA.localeCompare(nameB);
          break;

        case 'email':
          comparison = (a.user.email || '').localeCompare(b.user.email || '');
          break;

        case 'created':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;

        case 'priority':
          const priorityA = noteSummaries[a.id]?.highestPriority;
          const priorityB = noteSummaries[b.id]?.highestPriority;
          const valueA = priorityA ? priorityOrder[priorityA] : 0;
          const valueB = priorityB ? priorityOrder[priorityB] : 0;
          comparison = valueA - valueB;
          break;

        case 'performance':
          const rateA = a.visits > 0 ? (a.conversions / a.visits) : 0;
          const rateB = b.visits > 0 ? (b.conversions / b.visits) : 0;
          comparison = rateA - rateB;
          break;

        case 'visits':
          comparison = a.visits - b.visits;
          break;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return sorted;
  }, [affiliates, searchTerm, sortBy, sortDirection, noteSummaries]);

  const handleSortChange = (newSortBy: SortOption) => {
    if (sortBy === newSortBy) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortDirection('desc');
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const getSortIcon = (option: SortOption) => {
    if (sortBy !== option) return null;
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  const getPriorityIcon = (priority: string | null) => {
    switch (priority) {
      case 'URGENT': return <FaExclamationTriangle className="text-red-500" />;
      case 'HIGH': return <FaFlag className="text-orange-500" />;
      case 'MEDIUM': return <FaCircle className="text-[#245789]" />;
      case 'LOW': return <FaCircle className="text-gray-500" />;
      default: return <FaCircle className="text-gray-300" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Sort Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search Input */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search affiliates by name, email, or slug..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#245789] focus:border-transparent"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-3">
            <ExportButton
              data={affiliates}
              filename={`affiliates-${new Date().toISOString().split('T')[0]}`}
              prepareData={prepareAffiliateDataForExport}
            />
            <FaSortAmountDown className="text-gray-400 w-4 h-4" />
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => handleSortChange('name')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  sortBy === 'name'
                    ? 'bg-[#245789]/10 text-[#245789] border border-[#245789]/20'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Name {getSortIcon('name')}
              </button>
              <button
                onClick={() => handleSortChange('priority')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                  sortBy === 'priority'
                    ? 'bg-red-100 text-red-700 border border-red-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {getPriorityIcon(sortBy === 'priority' ? 'HIGH' : null)}
                Priority {getSortIcon('priority')}
              </button>
              <button
                onClick={() => handleSortChange('performance')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  sortBy === 'performance'
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Performance {getSortIcon('performance')}
              </button>
              <button
                onClick={() => handleSortChange('visits')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  sortBy === 'visits'
                    ? 'bg-[#CA0015]/10 text-[#CA0015] border border-[#CA0015]/20'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Visits {getSortIcon('visits')}
              </button>
              <button
                onClick={() => handleSortChange('created')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  sortBy === 'created'
                    ? 'bg-gray-700 text-white border border-gray-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Date {getSortIcon('created')}
              </button>
            </div>
          </div>
        </div>

        {/* Priority Legend - only show when sorting by priority */}
        {sortBy === 'priority' && (
          <div className="mt-4 flex items-center justify-end text-xs text-gray-600">
            <span className="mr-2">Priority levels:</span>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <FaExclamationTriangle className="text-red-500 w-3 h-3" />
                <span>Urgent</span>
              </div>
              <div className="flex items-center gap-1">
                <FaFlag className="text-orange-500 w-3 h-3" />
                <span>High</span>
              </div>
              <div className="flex items-center gap-1">
                <FaCircle className="text-[#245789] w-3 h-3" />
                <span>Medium</span>
              </div>
              <div className="flex items-center gap-1">
                <FaCircle className="text-gray-500 w-3 h-3" />
                <span>Low</span>
              </div>
            </div>
          </div>
        )}

        {/* Search Results Info - only show when searching */}
        {searchTerm && (
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredAndSortedAffiliates.length} results matching "<span className="font-medium text-gray-900">{searchTerm}</span>"
          </div>
        )}
      </div>

      {/* Affiliates Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <FaUsers className="mr-2 text-gray-600" />
              All Affiliates
            </h2>
            <div className="flex items-center gap-3">
              {searchTerm && (
                <span className="text-sm text-gray-600">
                  {filteredAndSortedAffiliates.length} of {affiliates.length} shown
                </span>
              )}
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#245789] text-white">
                {affiliates.length}
              </span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Affiliate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Slug / Landing Page
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedAffiliates.map(affiliate => (
                <tr key={affiliate.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {affiliate.companyName ||
                            affiliate.user.name ||
                            'No name'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {affiliate.user.email}
                        </div>
                      </div>
                      <div className="ml-3">
                        <AffiliateNotesBadge affiliateId={affiliate.id} />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      href={`/affiliate/${affiliate.slug}`}
                      target="_blank"
                      className="text-sm font-medium text-[#245789] hover:text-[#1a3e5f] transition-colors font-mono"
                    >
                      /{affiliate.slug}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm space-y-1">
                      <div className="flex items-center text-gray-900">
                        <FaEye className="mr-1 text-gray-400 text-xs" />
                        <span className="font-medium">{affiliate.visits}</span>
                        <span className="ml-1 text-gray-500">visits</span>
                      </div>
                      <div className="flex items-center text-gray-900">
                        <FaChartLine className="mr-1 text-gray-400 text-xs" />
                        <span className="font-medium">{affiliate.conversions}</span>
                        <span className="ml-1 text-gray-500">conversions</span>
                        {affiliate.visits > 0 && (
                          <span className="text-xs ml-1 text-green-600 font-medium">
                            ({((affiliate.conversions / affiliate.visits) * 100).toFixed(1)}%)
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-gray-900">
                        <FaHandshake className="mr-1 text-gray-400 text-xs" />
                        <span className="font-medium">{affiliate.referrals.length}</span>
                        <span className="ml-1 text-gray-500">referrals</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(affiliate.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <AffiliateNotesButton
                        affiliateId={affiliate.id}
                        affiliateName={affiliate.companyName || affiliate.user.name || 'Unnamed Affiliate'}
                      />
                      <Link
                        href={`/admin/affiliates/${affiliate.id}/edit`}
                        className="inline-flex items-center text-[#245789] hover:text-[#1a3e5f] transition-colors"
                      >
                        <FaEdit className="mr-1" />
                        Edit
                      </Link>
                      <DeleteAffiliateButton
                        affiliateId={affiliate.id}
                        deleteAction={deleteAction}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredAndSortedAffiliates.length === 0 && (
            <div className="text-center py-12">
              <FaUsers className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-sm font-medium text-gray-900 mb-1">No affiliates found</h3>
              <p className="text-sm text-gray-500">
                {searchTerm
                  ? "Try adjusting your search criteria or clear the search to see all affiliates."
                  : "Get started by creating your first affiliate account."
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}