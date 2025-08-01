import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const categories = await prisma.fAQCategory.findMany({
      orderBy: { order: 'asc' },
      include: {
        _count: {
          select: { faqs: true }
        }
      }
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching FAQ categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    
    const category = await prisma.fAQCategory.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description || null,
        order: data.order,
        isActive: data.isActive ?? true,
      }
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error('Error creating FAQ category:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}