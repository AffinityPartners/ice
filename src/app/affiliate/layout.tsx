import { requireRole } from '@/lib/auth';
import AffiliateLayout from './AffiliateLayout';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole('AFFILIATE');

  return <AffiliateLayout>{children}</AffiliateLayout>;
}