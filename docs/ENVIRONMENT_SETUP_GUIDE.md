# Environment Setup Guide for ICE Admin Dashboard

## 📋 Quick Setup Checklist

1. ✅ Copy `.env.local` and fill in your values
2. ✅ Set up PostgreSQL database
3. ✅ Generate NextAuth secret
4. ✅ Add your admin email
5. ✅ (Optional) Configure Google OAuth
6. ✅ Run database migrations

## 🛠 Detailed Setup Instructions

### 1. Database Setup

#### Option A: Local PostgreSQL
```bash
# Install PostgreSQL (macOS with Homebrew)
brew install postgresql
brew services start postgresql

# Create database
createdb ice_db

# Your DATABASE_URL will be:
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/ice_db?schema=public"
```

#### Option B: Supabase (Recommended for production)
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings > Database
4. Copy the connection string
5. Replace `[YOUR-PASSWORD]` with your actual password

```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres?schema=public"
DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres?schema=public"
```

### 2. Generate NextAuth Secret

```bash
# Generate a secure secret
openssl rand -base64 32

# Add to .env.local:
NEXTAUTH_SECRET="your-generated-secret-here"
```

### 3. Set Your Admin Email

```env
# Replace with your actual email
ADMIN_EMAILS="your-email@example.com"

# For multiple admins:
ADMIN_EMAILS="admin1@example.com,admin2@example.com,admin3@example.com"
```

### 4. Google OAuth Setup (Optional but Recommended)

1. **Go to Google Cloud Console**
   - Visit [console.cloud.google.com](https://console.cloud.google.com)
   - Create new project or select existing

2. **Enable Google+ API**
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it

3. **Create OAuth Credentials**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Application type: "Web application"

4. **Add Authorized Redirect URIs**
   ```
   Development: http://localhost:3000/api/auth/callback/google
   Production: https://yourdomain.com/api/auth/callback/google
   ```

5. **Copy credentials to .env.local**
   ```env
   GOOGLE_CLIENT_ID="your-client-id"
   GOOGLE_CLIENT_SECRET="your-client-secret"
   ```

### 5. Supabase Setup (Optional - for file uploads)

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create new project

2. **Get API Keys**
   - Go to Settings > API
   - Copy the Project URL and anon public key

3. **Add to .env.local**
   ```env
   NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
   SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
   ```

4. **Set up Storage Bucket** (for images)
   - Go to Storage in Supabase dashboard
   - Create bucket named "uploads"
   - Set policies for public access

### 6. Run Database Migrations

```bash
# Generate Prisma client
npx prisma generate

# Run migrations to create tables
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to view database
npx prisma studio
```

## 🚀 Testing Your Setup

### 1. Start Development Server
```bash
npm run dev
```

### 2. Test Authentication
1. Visit `http://localhost:3000/auth/signin`
2. Sign in with Google or create credentials account

### 3. Become Admin
1. Visit `http://localhost:3000/api/admin/make-me-admin`
2. Should see success message if your email is in ADMIN_EMAILS

### 4. Access Dashboard
1. Visit `http://localhost:3000/admin`
2. You should see the admin dashboard!

## 🔒 Security Notes

### Environment Variables Security
- **Never commit `.env.local` to git** (it's in .gitignore)
- Use different secrets for development/production
- Rotate secrets regularly in production

### Database Security
- Use strong passwords
- Enable SSL in production
- Restrict database access to your application only

### Production Checklist
- [ ] Use strong NEXTAUTH_SECRET
- [ ] Set correct NEXTAUTH_URL for your domain
- [ ] Use production database with SSL
- [ ] Configure CORS properly
- [ ] Set up proper backup strategy
- [ ] Monitor logs for suspicious activity

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Test database connection
npx prisma db pull

# Reset database if needed
npx prisma migrate reset
```

### Authentication Issues
- Check NEXTAUTH_SECRET is set
- Verify NEXTAUTH_URL matches your domain
- Ensure Google OAuth redirect URIs are correct

### Admin Access Issues
- Verify your email is in ADMIN_EMAILS
- Check that make-me-admin endpoint was called successfully
- Look at database User table to confirm role is 'ADMIN'

### Common Error Messages

**"Database connection failed"**
- Check DATABASE_URL format
- Ensure database server is running
- Verify credentials are correct

**"NEXTAUTH_SECRET not found"**
- Make sure .env.local file exists
- Verify NEXTAUTH_SECRET is set
- Restart development server

**"Unauthorized access"**
- Sign in first at /auth/signin
- Visit /api/admin/make-me-admin
- Check your email is in ADMIN_EMAILS

## 📞 Need Help?

If you encounter issues:
1. Check the browser console for errors
2. Look at terminal logs for server errors
3. Verify all environment variables are set correctly
4. Test database connection with Prisma Studio

Your admin dashboard should now be fully functional! 🎉