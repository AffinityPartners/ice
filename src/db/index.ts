/**
 * Drizzle Database Client
 * 
 * This module creates and exports a singleton Drizzle ORM instance connected to PostgreSQL.
 * Uses the postgres.js driver for optimal performance with Supabase/PostgreSQL.
 * 
 * The client is cached in development to prevent multiple instances during hot reloading.
 * In production, a single instance is created per server process.
 * 
 * Environment variables required:
 * - DATABASE_URL: Connection string for the pooled connection (Supabase Transaction mode)
 * - DIRECT_URL: Optional direct connection string (bypasses pgBouncer for migrations)
 */

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Global cache for the database client to prevent multiple instances in development
const globalForDb = globalThis as unknown as {
  db: ReturnType<typeof drizzle<typeof schema>> | undefined;
  client: ReturnType<typeof postgres> | undefined;
};

/**
 * Gets the appropriate database URL based on environment.
 * In development, prefers DIRECT_URL to avoid pgBouncer prepared statement issues.
 * In production, uses DATABASE_URL with connection pooling.
 */
const getDatabaseUrl = (): string => {
  // In development, prefer DIRECT_URL to avoid pgBouncer issues
  if (process.env.NODE_ENV === 'development' && process.env.DIRECT_URL) {
    return process.env.DIRECT_URL;
  }

  const url = process.env.DATABASE_URL || '';
  if (!url) {
    throw new Error('DATABASE_URL environment variable is required');
  }

  return url;
};

/**
 * Creates a new postgres client with appropriate settings.
 * Configures prepare: false for Supabase compatibility with transaction pooling.
 */
const createClient = () => {
  const connectionString = getDatabaseUrl();
  
  return postgres(connectionString, {
    // Disable prepared statements for compatibility with pgBouncer/Supabase transaction mode
    prepare: false,
    // Connection pool settings
    max: process.env.NODE_ENV === 'production' ? 10 : 1,
    idle_timeout: 20,
    connect_timeout: 10,
  });
};

// Create or reuse the postgres client
const client = globalForDb.client ?? createClient();

// Create or reuse the Drizzle instance with full schema for relations
export const db = globalForDb.db ?? drizzle(client, { 
  schema,
  logger: process.env.NODE_ENV === 'development',
});

// Cache in development to prevent multiple instances during hot reload
if (process.env.NODE_ENV !== 'production') {
  globalForDb.db = db;
  globalForDb.client = client;
}

// Re-export schema for convenience
export * from './schema';

// Default export for backwards compatibility
export default db;
