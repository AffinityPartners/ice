import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Use direct connection in development to avoid pgBouncer prepared statement issues
const getDatabaseUrl = () => {
  // In development, prefer DIRECT_URL to avoid pgBouncer issues
  if (process.env.NODE_ENV === 'development' && process.env.DIRECT_URL) {
    return process.env.DIRECT_URL;
  }

  const url = process.env.DATABASE_URL || '';
  if (!url) return url;

  // For production or if DIRECT_URL not available, use pooled with anti-cache settings
  let cleanUrl = url.replace(/[?&]statement_cache_size=\d+/g, '');
  cleanUrl = cleanUrl.replace(/[?&]prepared_statements=(true|false)/g, '');

  const separator = cleanUrl.includes('?') ? '&' : '?';
  return `${cleanUrl}${separator}statement_cache_size=0&prepared_statements=false`;
};

export const prisma = globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: getDatabaseUrl(),
      },
    },
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Prevent multiple instances during hot reloading
export default prisma;