import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/auth';

// GET /api/admin/faq/[id] - Get single FAQ
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const faq = await prisma.fAQ.findUnique({
      where: { id },
      include: {
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

// PUT /api/admin/faq/[id] - Update FAQ
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await requireRole('ADMIN');

    const body = await request.json();
    const { question, answer, categoryId, order, isActive } = body;

    const faq = await prisma.fAQ.update({
      where: { id },
      data: {
        question,
        answer,
        categoryId: categoryId || null,
        order,
        isActive,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(faq);
  } catch (error) {
    console.error('Error updating FAQ:', error);
    return NextResponse.json(
      { error: 'Failed to update FAQ' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/faq/[id] - Delete FAQ
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await requireRole('ADMIN');

    await prisma.fAQ.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    return NextResponse.json(
      { error: 'Failed to delete FAQ' },
      { status: 500 }
    );
  }
}