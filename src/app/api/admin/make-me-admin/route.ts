import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { prisma } from '@/lib/prisma';

// IMPORTANT: This is a setup route - secure or remove after initial admin creation
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Get allowed emails from environment variable
    const allowedEmails = process.env.ADMIN_EMAILS?.split(',').map(email => email.trim()) || [];
    
    // If no ADMIN_EMAILS are set, allow the first user to become admin
    if (allowedEmails.length === 0) {
      const adminCount = await prisma.user.count({ where: { role: 'ADMIN' } });
      if (adminCount > 0) {
        return NextResponse.json({ 
          error: 'Admin already exists. Only the first user can become admin when ADMIN_EMAILS is not set.' 
        }, { status: 403 });
      }
    } else if (!allowedEmails.includes(session.user.email)) {
      return NextResponse.json({ 
        error: 'Not authorized. Your email must be in the ADMIN_EMAILS environment variable.' 
      }, { status: 403 });
    }

    // Check if already admin
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (user?.role === 'ADMIN') {
      return NextResponse.json({ message: 'Already an admin' });
    }

    // Update to admin
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { role: 'ADMIN' },
    });

    return NextResponse.json({
      message: 'Success! You are now an admin. Please sign out and sign back in.',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    console.error('Make admin error:', error);
    return NextResponse.json(
      { error: 'Failed to update role' },
      { status: 500 }
    );
  }
}