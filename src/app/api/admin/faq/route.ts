/**
 * FAQ API Route
 * 
 * Handles CRUD operations for FAQs.
 * GET: Retrieve all FAQs with category relations
 * POST: Create a new FAQ (admin only)
 */

import { NextRequest, NextResponse } from 'next/server';
import { asc, desc } from 'drizzle-orm';
import { db, faqs } from '@/db';
import { requireRole } from '@/lib/auth';

/**
 * GET /api/admin/faq
 * Retrieves all FAQs with their category information.
 * Requires admin authentication.
 * Results are ordered by category, then by order, then by creation date.
 */
export async function GET(request: NextRequest) {
  try {
    await requireRole('ADMIN');

    const allFaqs = await db.query.faqs.findMany({
      with: {
        category: true,
      },
      orderBy: [asc(faqs.categoryId), asc(faqs.order), desc(faqs.createdAt)],
    });

    return NextResponse.json(allFaqs);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch FAQs' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/faq
 * Creates a new FAQ.
 * Requires admin authentication.
 * Validates that question and answer are provided.
 */
export async function POST(request: NextRequest) {
  try {
    await requireRole('ADMIN');

    const body = await request.json();
    const { question, answer, categoryId, order, isActive } = body;

    // Validate required fields
    if (!question || !answer) {
      return NextResponse.json(
        { error: 'Question and answer are required' },
        { status: 400 }
      );
    }

    // Create the FAQ and return with category
    const [faq] = await db.insert(faqs).values({
      question,
      answer,
      categoryId: categoryId || null,
      order: order || 0,
      isActive: isActive !== false,
    }).returning();

    // Fetch the created FAQ with its category relation
    const faqWithCategory = await db.query.faqs.findFirst({
      where: (faqs, { eq }) => eq(faqs.id, faq.id),
      with: {
        category: true,
      },
    });

    return NextResponse.json(faqWithCategory);
  } catch (error) {
    console.error('Error creating FAQ:', error);
    return NextResponse.json(
      { error: 'Failed to create FAQ' },
      { status: 500 }
    );
  }
}
