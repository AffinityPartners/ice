# ICE Admin Dashboard Setup Guide

## Overview
The admin dashboard has been integrated into your ICE project. This guide will help you complete the setup and start using the dashboard.

## 1. Environment Setup

Create a `.env.local` file in your project root with the following variables:

```env
# Database - PostgreSQL
DATABASE_URL="postgresql://username:password@localhost:5432/ice_db?schema=public"
DIRECT_URL="postgresql://username:password@localhost:5432/ice_db?schema=public"

# NextAuth
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Supabase (optional - for file storage)
NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""
SUPABASE_SERVICE_ROLE_KEY=""

# Admin Setup
ADMIN_EMAILS="your-email@example.com" # Comma-separated list of admin emails
```

## 2. Database Setup

1. Make sure PostgreSQL is installed and running
2. Create a new database:
   ```bash
   createdb ice_db
   ```

3. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

4. Run database migrations:
   ```bash
   npx prisma migrate dev --name init
   ```

5. (Optional) Open Prisma Studio to view your database:
   ```bash
   npm run db:studio
   ```

## 3. Authentication Setup

### Option A: Google OAuth (Recommended)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://icetracer.com/api/auth/callback/google` (for production)
6. Copy Client ID and Client Secret to `.env.local`

### Option B: Email/Password
The system supports email/password authentication. You'll need to create admin users manually:

1. Start the development server
2. Navigate to `/api/admin/make-me-admin` (you'll need to create this endpoint)
3. Or use Prisma Studio to manually set a user's role to ADMIN

## 4. Create Your First Admin User

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Visit http://localhost:3000/auth/signin

3. Sign in with Google (if configured) or create an account

4. If your email is in the ADMIN_EMAILS environment variable, you'll automatically be an admin

5. Otherwise, you'll need to manually update your user role in the database:
   ```sql
   UPDATE "User" SET role = 'ADMIN' WHERE email = 'your-email@example.com';
   ```

## 5. Accessing the Admin Dashboard

Once you're set up as an admin:
1. Go to http://localhost:3000/admin
2. You should see the admin dashboard

## 6. Available Features

The admin dashboard includes:
- **Dashboard Overview**: Stats and charts
- **Blog Management**: Create, edit, and manage blog posts
- **User Management**: View and manage users
- **FAQ Management**: Create and organize FAQs
- **Activity Logs**: Track admin actions
- **Global Settings**: Configure site-wide settings

## 7. Next Steps

### Complete the Integration
We still need to:
1. Set up all API routes (`/api/admin/*`)
2. Create remaining admin pages (users, blog, FAQ, etc.)
3. Add file upload functionality (if using Supabase)
4. Implement email notifications (if needed)

### Customize for ICE
- Update branding and colors
- Modify dashboard stats for ICE-specific metrics
- Add ICE-specific features (emergency contacts, medical info, etc.)

## 8. Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check DATABASE_URL format
- Try using DIRECT_URL in development

### Authentication Issues
- Verify NEXTAUTH_SECRET is set
- Check Google OAuth credentials
- Ensure callback URLs are correct

### Permission Errors
- Confirm user role is set to ADMIN in database
- Check that requireRole() middleware is working

## 9. Development Commands

```bash
# Start development server
npm run dev

# Open Prisma Studio
npm run db:studio

# Run database migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate

# Check for TypeScript errors
npm run type-check

# Format code
npm run format
```

## Need Help?

If you encounter issues:
1. Check the browser console for errors
2. Check the terminal for server-side errors
3. Verify all environment variables are set
4. Ensure all dependencies are installed

The dashboard is now partially set up. We need to continue adding the remaining features and API routes to make it fully functional.