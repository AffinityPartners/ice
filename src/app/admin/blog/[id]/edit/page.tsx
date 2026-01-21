/**
 * Edit Blog Post Page
 * 
 * Server component that fetches a blog post by ID and renders the edit form.
 * Redirects to 404 if the post is not found.
 */

import { eq } from 'drizzle-orm';
import { db, posts } from '@/db';
import BlogPostForm from '@/components/admin/blog/BlogPostForm';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Renders the blog post edit page.
 * Fetches the post data server-side and passes it to the form component.
 */
export default async function EditBlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  
  // Fetch the post with its category using Drizzle
  const post = await db.query.posts.findFirst({
    where: eq(posts.id, resolvedParams.id),
    with: { category: true },
  });

  if (!post) {
    notFound();
  }

  // Transform post data into form-compatible format
  const initialData = {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || '',
    content: post.content,
    image: post.image || '',
    categoryId: post.categoryId || '',
    tags: post.tags || [],
    metaTitle: post.metaTitle || '',
    metaDescription: post.metaDescription || '',
    metaKeywords: post.metaKeywords || '',
    ogImage: post.ogImage || '',
    canonicalUrl: post.canonicalUrl || '',
    published: post.published,
    featuredOrder: post.featuredOrder,
    readingTime: String(post.readingTime || ''),
    publishedAt: post.publishedAt ? post.publishedAt.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
  };

  return <BlogPostForm initialData={initialData} postId={resolvedParams.id} />;
}
