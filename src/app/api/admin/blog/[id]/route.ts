import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ActivityLogger } from '@/lib/activity-logger';

// GET /api/admin/blog/[id] - Get single post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const { id } = await params;
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
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

// PUT /api/admin/blog/[id] - Update entire post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
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
      const existingPost = await prisma.post.findFirst({
        where: {
          slug,
          NOT: { id },
        },
      });

      if (existingPost) {
        return NextResponse.json(
          { error: 'A post with this slug already exists' },
          { status: 400 }
        );
      }
    }

    const post = await prisma.post.update({
      where: { id },
      data: {
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
      },
    });

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

// PATCH /api/admin/blog/[id] - Partial update (e.g., publish/unpublish)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const { id } = await params;
    const session = await getSession();
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    const post = await prisma.post.update({
      where: { id },
      data: body,
    });

    // Log specific activities
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

// DELETE /api/admin/blog/[id] - Delete post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const { id } = await params;
    const session = await getSession();
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get post info before deletion for logging
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    await prisma.post.delete({
      where: { id },
    });

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