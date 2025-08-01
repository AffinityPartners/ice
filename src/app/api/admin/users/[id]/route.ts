import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Don't allow deleting your own account
    const adminUser = await prisma.user.findUnique({
      where: { email: session.user.email! }
    });

    if (adminUser?.id === id) {
      return NextResponse.json(
        { error: 'Cannot delete your own account' },
        { status: 400 }
      );
    }

    // Get user details before deletion for logging
    const userToDelete = await prisma.user.findUnique({
      where: { id: id },
      include: { affiliate: true }
    });

    if (!userToDelete) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Delete user (cascades will handle related records)
    await prisma.user.delete({
      where: { id: id },
    });

    // Log the action
    if (adminUser) {
      const { ActivityLogger } = await import('@/lib/activity-logger');
      await ActivityLogger.user.deleted(
        adminUser.id,
        id,
        userToDelete.email || undefined,
        userToDelete.name || undefined
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}