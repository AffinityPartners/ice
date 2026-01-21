/**
 * Drizzle Kit Configuration
 * 
 * This file configures Drizzle Kit for database migrations, schema generation,
 * and the Drizzle Studio database browser.
 * 
 * Commands:
 * - npm run db:generate - Generate migration files from schema changes
 * - npm run db:push - Push schema changes directly to database (dev only)
 * - npm run db:studio - Open Drizzle Studio database browser
 */

import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  // Path to the schema file(s)
  schema: './src/db/schema.ts',
  
  // Output directory for generated migration files
  out: './drizzle',
  
  // Database dialect
  dialect: 'postgresql',
  
  // Database connection configuration
  dbCredentials: {
    // Use DIRECT_URL for migrations to bypass pgBouncer
    url: process.env.DIRECT_URL || process.env.DATABASE_URL || '',
  },
  
  // Verbose output for debugging
  verbose: true,
  
  // Strict mode for safer migrations
  strict: true,
});
