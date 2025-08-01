import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ActivityLogger } from '@/lib/activity-logger';

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        category: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

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
    const existingPost = await prisma.post.findUnique({
      where: { slug },
    });

    if (existingPost) {
      return NextResponse.json(
        { error: 'A post with this slug already exists' },
        { status: 400 }
      );
    }

    // Create post
    const post = await prisma.post.create({
      data: {
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
      },
    });

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