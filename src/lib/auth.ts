import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth-options';
import { redirect } from 'next/navigation';
import { Role } from '@prisma/client';

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/auth/signin');
  }
  return user;
}

export async function requireRole(role: Role) {
  const user = await requireAuth();
  if (user.role !== role) {
    redirect('/unauthorized');
  }
  return user;
}