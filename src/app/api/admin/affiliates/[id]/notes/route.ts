import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const notes = await prisma.affiliateNote.findMany({
      where: { affiliateId: id },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(notes);
  } catch (error) {
    console.error('Error fetching affiliate notes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notes' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, content, priority, category } = body;

    // Get the admin user
    const adminUser = await prisma.user.findUnique({
      where: { email: session.user.email! }
    });

    if (!adminUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const note = await prisma.affiliateNote.create({
      data: {
        affiliateId: id,
        authorId: adminUser.id,
        title,
        content,
        priority: priority || 'MEDIUM',
        category: category || 'GENERAL',
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          }
        }
      }
    });

    return NextResponse.json(note);
  } catch (error) {
    console.error('Error creating affiliate note:', error);
    return NextResponse.json(
      { error: 'Failed to create note' },
      { status: 500 }
    );
  }
}