/**
 * FAQ Category API Route (Single Category)
 * 
 * Handles operations for individual FAQ categories.
 * PUT: Update a category (admin only)
 * DELETE: Remove a category (admin only)
 */

import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { getSession } from '@/lib/auth';
import { db, faqCategories, faqs } from '@/db';

/**
 * PUT /api/admin/faq/categories/[id]
 * Updates a FAQ category. Requires admin authentication.
 * Only updates fields that are provided in the request.
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

    const data = await request.json();
    
    // Build update object with only provided fields
    const updateData: Record<string, unknown> = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.slug !== undefined) updateData.slug = data.slug;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.order !== undefined) updateData.order = data.order;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;

    const [category] = await db.update(faqCategories)
      .set(updateData)
      .where(eq(faqCategories.id, id))
      .returning();

    return NextResponse.json(category);
  } catch (error) {
    console.error('Error updating FAQ category:', error);
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/faq/categories/[id]
 * Removes a FAQ category. Requires admin authentication.
 * First uncategorizes all FAQs in this category, then deletes the category.
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

    // First, update all FAQs in this category to be uncategorized
    await db.update(faqs)
      .set({ categoryId: null })
      .where(eq(faqs.categoryId, id));

    // Then delete the category
    await db.delete(faqCategories).where(eq(faqCategories.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting FAQ category:', error);
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}
