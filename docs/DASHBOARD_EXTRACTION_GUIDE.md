# Backend Dashboard Extraction Guide

This guide provides comprehensive instructions for extracting the admin dashboard from this project and implementing it in another site. The dashboard includes features for affiliate management, blog/FAQ management, user management, activity logs, analytics, and global settings.

## Table of Contents
1. [Overview](#overview)
2. [Required Files and Directories](#required-files-and-directories)
3. [Dependencies](#dependencies)
4. [Database Schema](#database-schema)
5. [Environment Variables](#environment-variables)
6. [Step-by-Step Extraction Process](#step-by-step-extraction-process)
7. [API Integration](#api-integration)
8. [Customization Points](#customization-points)
9. [Testing Checklist](#testing-checklist)

## Overview

The admin dashboard is a comprehensive management system built with:
- **Next.js 15.4.1** (App Router)
- **React 18.3.1**
- **TypeScript 5.7.3**
- **Prisma 5.22.0** (Database ORM)
- **NextAuth v4** (Authentication)
- **Tailwind CSS** (Styling)
- **Recharts** (Data visualization)
- **Framer Motion** (Animations)

### Key Features
- Dashboard overview with statistics
- Affiliate management with notes system
- Blog post management with categories
- FAQ management with categories
- User management
- Activity logs tracking
- Global settings configuration
- Web analytics
- Admin profile management

## Required Files and Directories

### 1. Frontend Components (`/src/app/admin/`)
Copy the entire admin directory:
```
src/app/admin/
├── layout.tsx                    # Admin layout wrapper
├── AdminLayout.tsx               # Main admin navigation and layout
├── page.tsx                      # Dashboard overview page
├── activity/
│   └── page.tsx                  # Activity logs page
├── affiliate-activity/
│   └── page.tsx                  # Affiliate-specific activity logs
├── affiliates/
│   ├── page.tsx                  # Affiliates list page
│   ├── DeleteAffiliateButton.tsx # Delete affiliate component
│   └── [id]/
│       └── edit/
│           └── page.tsx          # Edit affiliate page
├── blog/
│   ├── page.tsx                  # Blog posts list
│   ├── new/
│   │   └── page.tsx              # Create new blog post
│   ├── [id]/
│   │   └── edit/
│   │       └── page.tsx          # Edit blog post
│   └── categories/
│       └── page.tsx              # Blog categories management
├── faq/
│   ├── page.tsx                  # FAQ list
│   └── categories/
│       └── page.tsx              # FAQ categories management
├── global-settings/
│   └── page.tsx                  # Global configuration page
├── profile/
│   └── page.tsx                  # Admin profile management
├── revalidate/
│   └── page.tsx                  # Cache revalidation page
├── users/
│   └── page.tsx                  # User management page
└── web-analytics/
    └── page.tsx                  # Analytics dashboard
```

### 2. Admin-Specific Components (`/src/components/admin/`)
```
src/components/admin/
├── AffiliateNotesBadge.tsx       # Badge showing note count
├── AffiliateNotesButton.tsx      # Button to open notes modal
├── AffiliateNotesModal.tsx       # Modal for managing affiliate notes
├── AffiliateNotesTooltip.tsx     # Tooltip preview of notes
├── AffiliateTableWithSearch.tsx  # Searchable affiliate table
├── FAQEditModal.tsx              # Modal for editing FAQs
└── StatsCard.tsx                 # Reusable statistics card
```

### 3. API Routes (`/src/app/api/admin/`)
Copy all admin API routes:
```
src/app/api/admin/
├── activity-logs/
│   └── route.ts                  # GET activity logs
├── add-isactive-column/
│   └── route.ts                  # Database migration helper
├── affiliates/
│   ├── [id]/
│   │   ├── route.ts              # GET/PUT/DELETE affiliate
│   │   └── notes/
│   │       └── route.ts          # POST affiliate notes
│   └── notes/
│       └── [noteId]/
│           └── route.ts          # PUT/DELETE affiliate note
├── blog/
│   ├── route.ts                  # GET/POST blog posts
│   ├── [id]/
│   │   └── route.ts              # GET/PUT/DELETE blog post
│   └── categories/
│       ├── route.ts              # GET/POST blog categories
│       └── [id]/
│           └── route.ts          # PUT/DELETE blog category
├── faq/
│   ├── route.ts                  # GET/POST FAQs
│   ├── [id]/
│   │   └── route.ts              # PUT/DELETE FAQ
│   └── categories/
│       ├── route.ts              # GET/POST FAQ categories
│       └── [id]/
│           └── route.ts          # PUT/DELETE FAQ category
├── global-config/
│   └── route.ts                  # GET global configuration
├── make-me-admin/
│   └── route.ts                  # Helper to make user admin
├── migrate/
│   └── route.ts                  # Database migration helpers
├── profile/
│   └── route.ts                  # GET/PUT admin profile
├── revalidate/
│   └── route.ts                  # POST cache revalidation
├── test-activity-logs/
│   └── route.ts                  # Test activity logging
└── update-global-config/
    └── route.ts                  # POST update global config
```

### 4. Shared Components Used by Admin
```
src/components/ui/
├── AnimatedComponents.tsx        # Animation wrappers
├── Button.tsx                    # Reusable button component
├── Dialog.tsx                    # Modal dialog component
├── LoadingSpinner.tsx            # Loading states
├── CopyButton.tsx                # Copy to clipboard button
└── ... (other UI components as needed)
```

### 5. Authentication & Libraries (`/src/lib/`)
```
src/lib/
├── auth.ts                       # Authentication helpers
├── auth-options.ts               # NextAuth configuration
├── prisma.ts                     # Prisma client instance
├── activity-logger.ts            # Activity logging utilities
├── utils.ts                      # Utility functions
├── storage.ts                    # File storage utilities
├── resend.ts                     # Email service (if needed)
├── supabase.ts                   # Supabase client
└── supabase-admin.ts             # Supabase admin client
```

### 6. Type Definitions
```
src/types/
└── next-auth.d.ts                # NextAuth type extensions
```

### 7. Database Schema
Copy relevant parts from `prisma/schema.prisma`:
- User model (with role field)
- Account model (for OAuth)
- Session model
- Affiliate model
- Post model (for blog)
- FAQ model
- BlogCategory model
- FAQCategory model
- ActivityLog model
- AffiliateNote model
- GlobalConfig model

## Dependencies

Add these to your `package.json`:

### Core Dependencies
```json
{
  "dependencies": {
    "@auth/prisma-adapter": "^2.10.0",
    "@prisma/client": "5.22.0",
    "@supabase/supabase-js": "^2.52.0",
    "bcryptjs": "^2.4.3",
    "next": "15.4.1",
    "next-auth": "^4.24.11",
    "prisma": "5.22.0",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "react-icons": "^5.5.0",
    "recharts": "^3.1.0",
    "framer-motion": "^12.23.9",
    "tailwind-merge": "^2.6.0",
    "clsx": "^2.1.1",
    "class-variance-authority": "^0.7.1"
  }
}
```

### Dev Dependencies
```json
{
  "devDependencies": {
    "@types/node": "^20.14.10",
    "@types/react": "^18.3.23",
    "@types/react-dom": "^18.3.7",
    "@types/bcryptjs": "^2.4.6",
    "typescript": "5.7.3",
    "tailwindcss": "^3.4.17",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47"
  }
}
```

## Database Schema

Create these Prisma models in your `schema.prisma`:

```prisma
enum Role {
  ADMIN
  AFFILIATE
  USER
}

model User {
  id            String          @id @default(cuid())
  name          String?
  email         String?         @unique
  emailVerified DateTime?
  image         String?
  role          Role            @default(USER)
  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt
  password      String?
  firstName     String?
  lastName      String?
  phone         String?
  bio           String?
  accounts      Account[]
  activityLogs  ActivityLog[]
  sessions      Session[]
  // Add other relations as needed
}

model ActivityLog {
  id         String   @id @default(cuid())
  actorId    String
  actorRole  Role
  action     String
  target     Json
  metadata   Json?
  ipAddress  String?
  userAgent  String?
  createdAt  DateTime @default(now())
  user       User     @relation(fields: [actorId], references: [id])
}

// Add other models as needed (Post, FAQ, etc.)
```

## Environment Variables

Add these to your `.env.local`:

```env
# Database
DATABASE_URL="your-database-url"
DIRECT_URL="your-direct-database-url"

# NextAuth
NEXTAUTH_SECRET="generate-a-secret"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Supabase (if using for storage)
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Email (if needed)
RESEND_API_KEY="your-resend-api-key"
```

## Step-by-Step Extraction Process

### 1. Set Up Base Project
```bash
# Create new Next.js project with same versions
npx create-next-app@latest my-admin-dashboard --typescript --tailwind --app

# Install required dependencies
npm install @prisma/client@5.22.0 prisma@5.22.0 next-auth@4.24.11 # ... etc
```

### 2. Copy Files
1. Copy entire `/src/app/admin/` directory
2. Copy `/src/app/api/admin/` directory
3. Copy `/src/components/admin/` directory
4. Copy required UI components from `/src/components/ui/`
5. Copy `/src/lib/` files (auth, prisma, utils, etc.)
6. Copy `/src/types/next-auth.d.ts`

### 3. Set Up Database
1. Copy relevant models from `prisma/schema.prisma`
2. Run `npx prisma generate`
3. Run `npx prisma migrate dev` to create tables

### 4. Configure Authentication
1. Set up NextAuth with the copied `auth-options.ts`
2. Add authentication middleware to protect admin routes
3. Configure OAuth providers if needed

### 5. Update Configuration Files
1. Update `tailwind.config.js` with any custom configurations
2. Update `next.config.js` if needed
3. Set up environment variables

## API Integration

### Authentication Middleware
All admin routes should check for admin role:

```typescript
const session = await getSession();
if (!session?.user || session.user.role !== 'ADMIN') {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

### Activity Logging
The dashboard includes comprehensive activity logging. Ensure the ActivityLogger is properly imported and used in API routes.

### File Storage
If using file uploads (for blog images, etc.), configure your storage solution (Supabase, S3, etc.)

## Customization Points

### 1. Branding & Terminology
Search and replace these terms:
- "bed bug insurance" → your product/service
- "affiliates" → your user type (if different)
- Company-specific references

### 2. Navigation & Features
Edit `AdminLayout.tsx` to:
- Add/remove navigation items
- Change icons
- Modify the sidebar structure

### 3. Dashboard Overview
Edit `/admin/page.tsx` to:
- Change statistics displayed
- Modify charts and data visualizations
- Update welcome messages

### 4. Color Scheme
Update Tailwind classes throughout:
- Primary color: `blue-600` → your color
- Secondary colors as needed

### 5. API Endpoints
Update API routes to match your business logic:
- Modify data models
- Change validation rules
- Add custom endpoints

## Testing Checklist

### Authentication
- [ ] Admin can sign in
- [ ] Non-admin users are redirected
- [ ] Session persists correctly

### Dashboard Features
- [ ] Dashboard statistics load correctly
- [ ] Charts display properly
- [ ] Navigation works between all pages

### CRUD Operations
- [ ] Create operations work (blog posts, FAQs, etc.)
- [ ] Read/list operations display data
- [ ] Update operations save changes
- [ ] Delete operations remove data

### Activity Logging
- [ ] User actions are logged
- [ ] Activity logs display correctly
- [ ] Filtering/searching works

### Responsive Design
- [ ] Mobile navigation works
- [ ] Tables are responsive
- [ ] Forms work on mobile

### Performance
- [ ] Pages load quickly
- [ ] API responses are fast
- [ ] No memory leaks

## Common Issues & Solutions

### Issue: Authentication not working
- Check NEXTAUTH_SECRET is set
- Verify callback URLs in OAuth providers
- Ensure database connection is working

### Issue: API routes return 500 errors
- Check database connection string
- Verify Prisma schema matches database
- Check for missing environment variables

### Issue: Styles not applying
- Ensure Tailwind is configured correctly
- Check for CSS module conflicts
- Verify all required CSS files are imported

### Issue: File uploads failing
- Check storage bucket permissions
- Verify API keys are correct
- Ensure file size limits are appropriate

## Maintenance Notes

1. **Keep dependencies updated** - Regular updates for security
2. **Monitor activity logs** - Set up alerts for suspicious activity
3. **Database backups** - Regular backups of user data
4. **Performance monitoring** - Track API response times
5. **Error tracking** - Implement error reporting (Sentry, etc.)

---

This extraction guide provides everything needed to successfully extract and implement the admin dashboard in a new project. Remember to thoroughly test all features and customize according to your specific requirements.
