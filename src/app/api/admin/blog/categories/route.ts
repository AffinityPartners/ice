import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ActivityLogger } from '@/lib/activity-logger';

// GET /api/admin/blog/categories - Get all blog categories
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const categories = await prisma.blogCategory.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { posts: true }
        }
      }
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST /api/admin/blog/categories - Create a new blog category
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, slug, description, isActive = true } = body;

    // Check if slug already exists
    const existing = await prisma.blogCategory.findUnique({
      where: { slug }
    });

    if (existing) {
      return NextResponse.json(
        { error: 'A category with this slug already exists' },
        { status: 400 }
      );
    }

    const category = await prisma.blogCategory.create({
      data: {
        name,
        slug,
        description,
        isActive
      }
    });

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