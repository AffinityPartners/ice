/**
 * Blog Post API Route (Single Post)
 * 
 * Handles operations for individual blog posts.
 * GET: Retrieve a single post by ID
 * PUT: Full update of a post (admin only)
 * PATCH: Partial update (e.g., publish/unpublish) (admin only)
 * DELETE: Remove a post (admin only)
 */

import { NextRequest, NextResponse } from 'next/server';
import { eq, and, ne } from 'drizzle-orm';
import { getSession } from '@/lib/auth';
import { db, posts } from '@/db';
import { ActivityLogger } from '@/lib/activity-logger';

/**
 * GET /api/admin/blog/[id]
 * Retrieves a single blog post by ID with category information.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const post = await db.query.posts.findFirst({
      where: eq(posts.id, id),
      with: {
        category: true,
      },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/blog/[id]
 * Updates an entire blog post. Requires admin authentication.
 * Validates slug uniqueness (excluding the current post).
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const session = await getSession();
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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

    // Check if slug is unique (excluding current post)
    if (slug) {
      const existingPost = await db.query.posts.findFirst({
        where: and(
          eq(posts.slug, slug),
          ne(posts.id, id)
        ),
      });

      if (existingPost) {
        return NextResponse.json(
          { error: 'A post with this slug already exists' },
          { status: 400 }
        );
      }
    }

    // Update the post using Drizzle
    const [post] = await db.update(posts)
      .set({
        title,
        slug,
        excerpt: excerpt || null,
        content,
        image: image || null,
        author,
        published,
        categoryId: categoryId || null,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        metaKeywords: metaKeywords || null,
        ogImage: ogImage || null,
        canonicalUrl: canonicalUrl || null,
        tags: tags || [],
        featuredOrder: featuredOrder || null,
        readingTime: readingTime || null,
        publishedAt: published && publishedAt ? new Date(publishedAt) : null,
      })
      .where(eq(posts.id, id))
      .returning();

    // Log the activity
    await ActivityLogger.blogPost.updated(
      session.user.id,
      'ADMIN',
      post.title,
      post.id,
      body
    );

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/blog/[id]
 * Partial update for a blog post (e.g., publish/unpublish).
 * Requires admin authentication.
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const session = await getSession();
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Update with partial data
    const [post] = await db.update(posts)
      .set(body)
      .where(eq(posts.id, id))
      .returning();

    // Log specific activities for publish/unpublish
    if (body.published !== undefined) {
      if (body.published) {
        await ActivityLogger.blogPost.published(
          session.user.id,
          'ADMIN',
          post.title,
          post.id
        );
      } else {
        await ActivityLogger.blogPost.unpublished(
          session.user.id,
          'ADMIN',
          post.title,
          post.id
        );
      }
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/blog/[id]
 * Removes a blog post. Requires admin authentication.
 * Logs the deletion for audit purposes.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const session = await getSession();
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get post info before deletion for logging
    const post = await db.query.posts.findFirst({
      where: eq(posts.id, id),
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Delete the post
    await db.delete(posts).where(eq(posts.id, id));

    // Log the activity
    await ActivityLogger.blogPost.deleted(
      session.user.id,
      'ADMIN',
      post.title,
      post.id
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}
