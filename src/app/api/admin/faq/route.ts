import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireRole } from '@/lib/auth';

// GET /api/admin/faq - Get all FAQs
export async function GET(request: NextRequest) {
  try {
    await requireRole('ADMIN');

    const faqs = await prisma.fAQ.findMany({
      include: {
        category: true,
      },
      orderBy: [{ categoryId: 'asc' }, { order: 'asc' }, { createdAt: 'desc' }],
    });

    return NextResponse.json(faqs);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch FAQs' },
      { status: 500 }
    );
  }
}

// POST /api/admin/faq - Create new FAQ
export async function POST(request: NextRequest) {
  try {
    const user = await requireRole('ADMIN');

    const body = await request.json();
    const { question, answer, categoryId, order, isActive } = body;

    if (!question || !answer) {
      return NextResponse.json(
        { error: 'Question and answer are required' },
        { status: 400 }
      );
    }

    const faq = await prisma.fAQ.create({
      data: {
        question,
        answer,
        categoryId: categoryId || null,
        order: order || 0,
        isActive: isActive !== false,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(faq);
  } catch (error) {
    console.error('Error creating FAQ:', error);
    return NextResponse.json(
      { error: 'Failed to create FAQ' },
      { status: 500 }
    );
  }
}