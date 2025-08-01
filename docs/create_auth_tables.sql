-- Create authentication tables for NextAuth.js with Prisma
-- Run this in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Role enum
DO $$ BEGIN
    CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- User table
CREATE TABLE IF NOT EXISTS "User" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT,
    email TEXT UNIQUE,
    "emailVerified" TIMESTAMPTZ,
    image TEXT,
    role "Role" DEFAULT 'USER',
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW(),
    password TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    phone TEXT,
    bio TEXT
);

-- Account table (for OAuth providers)
CREATE TABLE IF NOT EXISTS "Account" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    provider TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    refresh_token TEXT,
    access_token TEXT,
    expires_at INTEGER,
    token_type TEXT,
    scope TEXT,
    id_token TEXT,
    session_state TEXT,
    UNIQUE(provider, "providerAccountId")
);

-- Session table
CREATE TABLE IF NOT EXISTS "Session" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "sessionToken" TEXT UNIQUE NOT NULL,
    "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    expires TIMESTAMPTZ NOT NULL
);

-- VerificationToken table
CREATE TABLE IF NOT EXISTS "VerificationToken" (
    identifier TEXT NOT NULL,
    token TEXT UNIQUE NOT NULL,
    expires TIMESTAMPTZ NOT NULL,
    UNIQUE(identifier, token)
);

-- Activity log table
CREATE TABLE IF NOT EXISTS "ActivityLog" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "actorId" TEXT NOT NULL REFERENCES "User"(id),
    "actorRole" "Role" NOT NULL,
    action TEXT NOT NULL,
    target JSONB NOT NULL,
    metadata JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Category table
CREATE TABLE IF NOT EXISTS "BlogCategory" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- Post table
CREATE TABLE IF NOT EXISTS "Post" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    image TEXT,
    published BOOLEAN DEFAULT false,
    author TEXT,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW(),
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "metaKeywords" TEXT,
    "ogImage" TEXT,
    "canonicalUrl" TEXT,
    "featuredOrder" INTEGER,
    "viewCount" INTEGER DEFAULT 0,
    "readingTime" INTEGER,
    tags TEXT[] DEFAULT '{}',
    "publishedAt" TIMESTAMPTZ,
    "categoryId" TEXT REFERENCES "BlogCategory"(id)
);

-- FAQ Category table
CREATE TABLE IF NOT EXISTS "FAQCategory" (
    id TEXT PRIMARY KEY DEFAULT substr(md5(random()::text || clock_timestamp()::text), 1, 25),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    "order" INTEGER DEFAULT 0,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- FAQ table
CREATE TABLE IF NOT EXISTS "FAQ" (
    id TEXT PRIMARY KEY DEFAULT substr(md5(random()::text || clock_timestamp()::text), 1, 25),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    "categoryId" TEXT REFERENCES "FAQCategory"(id),
    "order" INTEGER DEFAULT 0,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- Global Config table
CREATE TABLE IF NOT EXISTS "GlobalConfig" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "siteName" TEXT DEFAULT 'ICE',
    "siteDescription" TEXT DEFAULT 'In Case of Emergency Contact Information',
    "defaultHeroHeading" TEXT DEFAULT 'Your Emergency Information When It Matters Most',
    "defaultHeroSubtext" TEXT DEFAULT 'Secure, instant access to critical medical and contact information',
    "defaultCtaText" TEXT DEFAULT 'Get Started Today',
    "defaultPrimaryColor" TEXT DEFAULT '#3b82f6',
    "defaultHeroImage" TEXT,
    "bannerText" TEXT,
    "bannerActive" BOOLEAN DEFAULT false,
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "idx_user_email" ON "User"(email);
CREATE INDEX IF NOT EXISTS "idx_user_role" ON "User"(role);
CREATE INDEX IF NOT EXISTS "idx_post_published_publishedat" ON "Post"(published, "publishedAt");
CREATE INDEX IF NOT EXISTS "idx_post_slug" ON "Post"(slug);
CREATE INDEX IF NOT EXISTS "idx_post_category_id" ON "Post"("categoryId");
CREATE INDEX IF NOT EXISTS "idx_activity_log_actor_id" ON "ActivityLog"("actorId");
CREATE INDEX IF NOT EXISTS "idx_activity_log_actor_role" ON "ActivityLog"("actorRole");
CREATE INDEX IF NOT EXISTS "idx_activity_log_action" ON "ActivityLog"(action);
CREATE INDEX IF NOT EXISTS "idx_activity_log_created_at" ON "ActivityLog"("createdAt");
CREATE INDEX IF NOT EXISTS "idx_blog_category_slug" ON "BlogCategory"(slug);
CREATE INDEX IF NOT EXISTS "idx_faq_category_slug" ON "FAQCategory"(slug);
CREATE INDEX IF NOT EXISTS "idx_faq_category_id" ON "FAQ"("categoryId");

-- Create GIN index for tags array (if supported)
CREATE INDEX IF NOT EXISTS "idx_post_tags" ON "Post" USING GIN(tags);

-- Update function for timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_user_updated_at BEFORE UPDATE ON "User" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_post_updated_at BEFORE UPDATE ON "Post" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_category_updated_at BEFORE UPDATE ON "BlogCategory" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_faq_category_updated_at BEFORE UPDATE ON "FAQCategory" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_faq_updated_at BEFORE UPDATE ON "FAQ" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_global_config_updated_at BEFORE UPDATE ON "GlobalConfig" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default global config
INSERT INTO "GlobalConfig" (id) VALUES (gen_random_uuid()::text) ON CONFLICT DO NOTHING;

-- Success message
DO $$
BEGIN
    RAISE NOTICE 'Database schema created successfully! All tables and indexes are ready for NextAuth.js authentication.';
END $$;