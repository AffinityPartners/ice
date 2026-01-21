/**
 * FAQ API Route (Single FAQ)
 * 
 * Handles operations for individual FAQs.
 * GET: Retrieve a single FAQ by ID
 * PUT: Update a FAQ (admin only)
 * DELETE: Remove a FAQ (admin only)
 */

import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db, faqs } from '@/db';
import { requireRole } from '@/lib/auth';

/**
 * GET /api/admin/faq/[id]
 * Retrieves a single FAQ by ID with category information.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const faq = await db.query.faqs.findFirst({
      where: eq(faqs.id, id),
      with: {
        category: true,
      },
    });

    if (!faq) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
    }

    return NextResponse.json(faq);
  } catch (error) {
    console.error('Error fetching FAQ:', error);
    return NextResponse.json(
      { error: 'Failed to fetch FAQ' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/faq/[id]
 * Updates a FAQ. Requires admin authentication.
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await requireRole('ADMIN');

    const body = await request.json();
    const { question, answer, categoryId, order, isActive } = body;

    // Update the FAQ
    const [updatedFaq] = await db.update(faqs)
      .set({
        question,
        answer,
        categoryId: categoryId || null,
        order,
        isActive,
      })
      .where(eq(faqs.id, id))
      .returning();

    // Fetch with category relation
    const faqWithCategory = await db.query.faqs.findFirst({
      where: eq(faqs.id, updatedFaq.id),
      with: {
        category: true,
      },
    });

    return NextResponse.json(faqWithCategory);
  } catch (error) {
    console.error('Error updating FAQ:', error);
    return NextResponse.json(
      { error: 'Failed to update FAQ' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/faq/[id]
 * Removes a FAQ. Requires admin authentication.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await requireRole('ADMIN');

    await db.delete(faqs).where(eq(faqs.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    return NextResponse.json(
      { error: 'Failed to delete FAQ' },
      { status: 500 }
    );
  }
}
