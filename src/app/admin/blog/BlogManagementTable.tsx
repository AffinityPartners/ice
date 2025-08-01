'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaEyeSlash,
  FaTags,
  FaSearch,
  FaFilter,
  FaSortUp,
  FaSortDown,
  FaSort,
  FaChartLine,
} from 'react-icons/fa';
import { format } from 'date-fns';
import ExportButton from '@/components/ui/ExportButton';
import { prepareBlogPostDataForExport } from '@/lib/export-utils';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  image: string | null;
  published: boolean;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  ogImage: string | null;
  canonicalUrl: string | null;
  featuredOrder: number | null;
  viewCount: number;
  readingTime: string | null;
  tags: string[];
  publishedAt: Date | null;
  categoryId: string | null;
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}

interface BlogManagementTableProps {
  initialPosts: BlogPost[];
  categories: BlogCategory[];
}

export default function BlogManagementTable({ initialPosts, categories }: BlogManagementTableProps) {
  const router = useRouter();
  const [posts, setPosts] = useState(initialPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [sortBy, setSortBy] = useState<'title' | 'createdAt' | 'viewCount'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [loading, setLoading] = useState(false);

  // Filter and sort posts
  const filteredPosts = posts
    .filter(post => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = categoryFilter === 'all' || post.categoryId === categoryFilter;
      
      const matchesStatus = 
        statusFilter === 'all' ||
        (statusFilter === 'published' && post.published) ||
        (statusFilter === 'draft' && !post.published);
      
      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'createdAt') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const togglePublished = async (postId: string, currentStatus: boolean) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/blog/${postId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          published: !currentStatus,
          publishedAt: !currentStatus ? new Date() : null 
        }),
      });

      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error('Error updating post:', error);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/admin/blog/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPosts(posts.filter(p => p.id !== postId));
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    } finally {
      setLoading(false);
    }
  };

  const SortButton = ({ column }: { column: typeof sortBy }) => {
    const isActive = sortBy === column;
    return (
      <button
        onClick={() => {
          if (isActive) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
          } else {
            setSortBy(column);
            setSortOrder('desc');
          }
        }}
        className="ml-1 text-gray-400 hover:text-gray-600"
      >
        {isActive ? (
          sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />
        ) : (
          <FaSort />
        )}
      </button>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Filters */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
          <div className="flex items-center space-x-3">
            <h2 className="text-lg font-medium text-gray-900">All Posts</h2>
            <ExportButton
              data={filteredPosts}
              filename={`blog-posts-${new Date().toISOString().split('T')[0]}`}
              prepareData={prepareBlogPostDataForExport}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#245789] focus:border-transparent"
              />
            </div>
            
            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#245789] focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#245789] focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  Title
                  <SortButton column="title" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  Created
                  <SortButton column="createdAt" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  Views
                  <SortButton column="viewCount" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPosts.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  No posts found
                </td>
              </tr>
            ) : (
              filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {post.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        /{post.slug}
                      </div>
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {post.tags.slice(0, 3).map(tag => (
                            <span
                              key={tag}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              <FaTags className="mr-1" />
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{post.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {post.category?.name || 'Uncategorized'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {post.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => togglePublished(post.id, post.published)}
                      disabled={loading}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        post.published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      } hover:opacity-80 disabled:opacity-50`}
                    >
                      {post.published ? (
                        <>
                          <FaEye className="mr-1" />
                          Published
                        </>
                      ) : (
                        <>
                          <FaEyeSlash className="mr-1" />
                          Draft
                        </>
                      )}
                    </button>
                    {post.featuredOrder && (
                      <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Featured #{post.featuredOrder}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(post.createdAt), 'MMM d, yyyy')}
                    {post.publishedAt && (
                      <div className="text-xs">
                        Published: {format(new Date(post.publishedAt), 'MMM d')}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <FaChartLine className="mr-1 text-gray-400" />
                      {post.viewCount.toLocaleString()}
                    </div>
                    {post.readingTime && (
                      <div className="text-xs text-gray-500">
                        {post.readingTime}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center space-x-3">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="text-gray-600 hover:text-gray-900"
                        title="View post"
                      >
                        <FaEye />
                      </Link>
                      <Link
                        href={`/admin/blog/${post.id}/edit`}
                        className="text-[#245789] hover:text-[#1a3e5f]"
                        title="Edit post"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => deletePost(post.id)}
                        disabled={loading}
                        className="text-red-600 hover:text-red-900 disabled:opacity-50"
                        title="Delete post"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {filteredPosts.length} of {posts.length} posts
          </div>
          <div className="text-sm text-gray-500">
            {posts.filter(p => p.published).length} published, {posts.filter(p => !p.published).length} drafts
          </div>
        </div>
      </div>
    </div>
  );
}