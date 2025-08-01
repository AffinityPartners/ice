import { requireRole } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminLayout from './AdminLayout';

export default async function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    await requireRole('ADMIN');
  } catch {
    redirect('/unauthorized');
  }

  return <AdminLayout>{children}</AdminLayout>;
}