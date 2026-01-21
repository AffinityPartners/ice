/**
 * FAQ Categories API Route
 * 
 * Handles CRUD operations for FAQ categories.
 * GET: Retrieve all categories with FAQ counts
 * POST: Create a new category (admin only)
 */

import { NextRequest, NextResponse } from 'next/server';
import { asc } from 'drizzle-orm';
import { getSession } from '@/lib/auth';
import { db, faqCategories } from '@/db';

/**
 * GET /api/admin/faq/categories
 * Retrieves all FAQ categories with FAQ counts.
 * Requires admin authentication.
 * Results are ordered by the order field.
 */
export async function GET() {
  try {
    const session = await getSession();
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get categories with their FAQs to count them
    const categories = await db.query.faqCategories.findMany({
      orderBy: [asc(faqCategories.order)],
      with: {
        faqs: true,
      },
    });

    // Transform to include _count format for backward compatibility
    const categoriesWithCount = categories.map(cat => ({
      ...cat,
      _count: {
        faqs: cat.faqs.length
      },
      faqs: undefined // Remove the full faqs array from response
    }));

    return NextResponse.json(categoriesWithCount);
  } catch (error) {
    console.error('Error fetching FAQ categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/faq/categories
 * Creates a new FAQ category.
 * Requires admin authentication.
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    
    const [category] = await db.insert(faqCategories).values({
      name: data.name,
      slug: data.slug,
      description: data.description || null,
      order: data.order,
      isActive: data.isActive ?? true,
    }).returning();

    return NextResponse.json(category);
  } catch (error) {
    console.error('Error creating FAQ category:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}
