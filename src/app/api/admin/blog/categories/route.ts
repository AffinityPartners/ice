/**
 * Blog Categories API Route
 * 
 * Handles CRUD operations for blog categories.
 * GET: Retrieve all categories with post counts
 * POST: Create a new category (admin only)
 */

import { NextRequest, NextResponse } from 'next/server';
import { eq, asc, count } from 'drizzle-orm';
import { getSession } from '@/lib/auth';
import { db, blogCategories, posts } from '@/db';
import { ActivityLogger } from '@/lib/activity-logger';

/**
 * GET /api/admin/blog/categories
 * Retrieves all blog categories with post counts.
 * Requires admin authentication.
 * Results are ordered alphabetically by name.
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get categories with post counts using a subquery
    const categories = await db.query.blogCategories.findMany({
      orderBy: [asc(blogCategories.name)],
      with: {
        posts: true,
      },
    });

    // Transform to include _count format for backward compatibility
    const categoriesWithCount = categories.map(cat => ({
      ...cat,
      _count: {
        posts: cat.posts.length
      },
      posts: undefined // Remove the full posts array from response
    }));

    return NextResponse.json(categoriesWithCount);
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/blog/categories
 * Creates a new blog category.
 * Requires admin authentication.
 * Validates slug uniqueness before creation.
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, slug, description, isActive = true } = body;

    // Check if slug already exists
    const existing = await db.query.blogCategories.findFirst({
      where: eq(blogCategories.slug, slug),
    });

    if (existing) {
      return NextResponse.json(
        { error: 'A category with this slug already exists' },
        { status: 400 }
      );
    }

    // Create the category
    const [category] = await db.insert(blogCategories).values({
      name,
      slug,
      description,
      isActive
    }).returning();

    // Log the activity
    await ActivityLogger.blogPost.created(
      session.user.id,
      'ADMIN',
      `Blog category: ${category.name}`,
      category.id
    );

    return NextResponse.json(category);
  } catch (error) {
    console.error('Error creating blog category:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}
