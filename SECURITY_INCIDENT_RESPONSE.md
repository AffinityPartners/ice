# 🚨 SECURITY INCIDENT: Exposed Credentials

**Date:** August 1st, 2025, 18:39:28 UTC
**Severity:** HIGH
**Repository:** AffinityPartners/ice

## Exposed Secrets Detected by GitGuardian:

1. **Google OAuth2 Keys** ❌
2. **Supabase Service Role JWT** ❌ 
3. **Resend API Key** ❌
4. **PostgreSQL URI (Database)** ❌
5. **Generic High Entropy Secret (likely NEXTAUTH_SECRET)** ❌

## IMMEDIATE ACTION PLAN:

### 🔄 Step 1: Rotate ALL Credentials (DO THIS NOW!)

#### Google OAuth2:
- Go to: https://console.cloud.google.com/apis/credentials
- Delete the exposed OAuth2 client
- Create new OAuth2 credentials
- Update callback URLs for new client

#### Supabase:
- Go to: https://supabase.com/dashboard/project/eophdwklcrvawvsqrypb/settings/api
- Click "Regenerate" for Service Role Key
- Note: Anon key can remain (it's meant to be public)

#### Database:
- Reset Supabase database password
- Update connection strings with new password

#### NEXTAUTH_SECRET:
- Generate new secret: `openssl rand -base64 32`

#### Resend (if using):
- Go to Resend dashboard
- Revoke current API key
- Generate new API key

### 🧹 Step 2: Clean Git History
- Remove secrets from git history
- Force push cleaned history
- Invalidate GitHub caches

### 🔒 Step 3: Secure Environment Setup
- Update production environment variables
- Verify .gitignore excludes .env files
- Set up proper secrets management

## Status:
- [ ] Google OAuth2 credentials rotated
- [ ] Supabase service role key regenerated
- [ ] Database password reset
- [ ] NEXTAUTH_SECRET regenerated
- [ ] Resend API key rotated (if using)
- [ ] Git history cleaned
- [ ] Production environment updated
- [ ] Incident resolved