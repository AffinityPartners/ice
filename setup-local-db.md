# Quick Local Database Setup

If your Supabase database is paused/inaccessible, you can quickly set up a local PostgreSQL database:

## Option 1: Resume Supabase (RECOMMENDED)
1. Go to https://supabase.com/dashboard
2. Select project `eophdwklcrvawvsqrypb`
3. Look for "Resume" or "Unpause" button
4. Click it to wake up the database

## Option 2: Local PostgreSQL Setup

```bash
# Install PostgreSQL
brew install postgresql@16
brew services start postgresql@16

# Create database
createdb ice_local_db

# Update your .env.local with local database URL:
DATABASE_URL="postgresql://$(whoami)@localhost:5432/ice_local_db?schema=public"
DIRECT_URL="postgresql://$(whoami)@localhost:5432/ice_local_db?schema=public"

# Push schema to create tables
npx prisma db push

# Test login again
```

## Option 3: Alternative Free Database
- Railway.app (free tier)
- PlanetScale (free tier)
- Neon.tech (free tier)

Your authentication will work immediately once the database is accessible!