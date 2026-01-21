/**
 * Blog Posts API Route
 * 
 * Handles CRUD operations for blog posts.
 * GET: Retrieve all posts with category relations
 * POST: Create a new blog post (admin only)
 */

import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { getSession } from '@/lib/auth';
import { db, posts } from '@/db';
import { ActivityLogger } from '@/lib/activity-logger';

/**
 * GET /api/admin/blog
 * Retrieves all blog posts with their category information.
 * Results are ordered by creation date (newest first).
 */
export async function GET() {
  try {
    const allPosts = await db.query.posts.findMany({
      with: {
        category: true,
      },
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });

    return NextResponse.json(allPosts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/blog
 * Creates a new blog post.
 * Requires admin authentication.
 * Validates slug uniqueness before creation.
 */
export async function POST(request: NextRequest) {
  try {
    // Check authentication and admin role
    const session = await getSession();
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request body
    const body = await request.json();
    const {
      title,
      slug,
      excerpt,
      content,
      image,
      author,
      published,
      categoryId,
      metaTitle,
      metaDescription,
      metaKeywords,
      ogImage,
      canonicalUrl,
      tags,
      featuredOrder,
      readingTime,
      publishedAt,
    } = body;

    // Check if slug is unique
    const existingPost = await db.query.posts.findFirst({
      where: eq(posts.slug, slug),
    });

    if (existingPost) {
      return NextResponse.json(
        { error: 'A post with this slug already exists' },
        { status: 400 }
      );
    }

    // Create post using Drizzle
    const [post] = await db.insert(posts).values({
      title,
      slug,
      excerpt: excerpt || null,
      content,
      image: image || null,
      author: author || session.user.name || session.user.email || 'Admin',
      published: published || false,
      categoryId: categoryId || null,
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || excerpt || null,
      metaKeywords: metaKeywords || null,
      ogImage: ogImage || image || null,
      canonicalUrl: canonicalUrl || null,
      tags: tags || [],
      featuredOrder: featuredOrder || null,
      readingTime: readingTime || null,
      publishedAt: published && publishedAt ? new Date(publishedAt) : null,
    }).returning();

    // Log the activity
    await ActivityLogger.blogPost.created(
      session.user.id,
      'ADMIN',
      post.title,
      post.id
    );

    if (published) {
      await ActivityLogger.blogPost.published(
        session.user.id,
        'ADMIN',
        post.title,
        post.id
      );
    }

    return NextResponse.json({
      success: true,
      post,
    });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
