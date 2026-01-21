/**
 * Affiliate Notes API Route
 * 
 * Handles CRUD operations for affiliate notes.
 * GET: Retrieve all notes for an affiliate
 * POST: Create a new note for an affiliate
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { eq, desc } from 'drizzle-orm';
import { authOptions } from '@/lib/auth-options';
import { db, users, affiliateNotes } from '@/db';

/**
 * GET /api/admin/affiliates/[id]/notes
 * Retrieves all notes for a specific affiliate, ordered by creation date.
 * Includes author information for each note.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const session = await getServerSession(authOptions);
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get notes with author information
    const notes = await db.query.affiliateNotes.findMany({
      where: eq(affiliateNotes.affiliateId, id),
      with: {
        author: true,
      },
      orderBy: [desc(affiliateNotes.createdAt)]
    });

    // Transform to include only necessary author fields
    const transformedNotes = notes.map(note => ({
      ...note,
      author: {
        name: note.author.name,
        email: note.author.email,
      }
    }));

    return NextResponse.json(transformedNotes);
  } catch (error) {
    console.error('Error fetching affiliate notes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notes' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/affiliates/[id]/notes
 * Creates a new note for an affiliate.
 * Requires admin authentication.
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const session = await getServerSession(authOptions);
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, content, priority, category } = body;

    // Get the admin user
    const adminUser = await db.query.users.findFirst({
      where: eq(users.email, session.user.email!)
    });

    if (!adminUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Create the note
    const [note] = await db.insert(affiliateNotes).values({
      affiliateId: id,
      authorId: adminUser.id,
      title,
      content,
      priority: priority || 'MEDIUM',
      category: category || 'GENERAL',
    }).returning();

    // Fetch with author to return complete data
    const noteWithAuthor = await db.query.affiliateNotes.findFirst({
      where: eq(affiliateNotes.id, note.id),
      with: {
        author: true,
      },
    });

    return NextResponse.json({
      ...noteWithAuthor,
      author: {
        name: noteWithAuthor?.author.name,
        email: noteWithAuthor?.author.email,
      }
    });
  } catch (error) {
    console.error('Error creating affiliate note:', error);
    return NextResponse.json(
      { error: 'Failed to create note' },
      { status: 500 }
    );
  }
}
