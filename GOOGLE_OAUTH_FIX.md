# 🔧 Fix Google OAuth redirect_uri_mismatch Error

## The Problem:
You're getting `Error 400: redirect_uri_mismatch` because:
1. Your old Google OAuth credentials were compromised and need rotating
2. The redirect URIs in Google Console don't match what NextAuth is trying to use

## ✅ Solution: Create New OAuth Credentials

### Step 1: Go to Google Console
**URL:** https://console.cloud.google.com/apis/credentials

### Step 2: Delete Old Credentials (Security Requirement)
- Find the OAuth2 client: `7537346488-48m4jf7kcvbe8j8pl5qo94htvegnuso2`
- Click on it and select "DELETE"
- This removes the compromised credentials

### Step 3: Create New OAuth2 Client
1. Click **"+ CREATE CREDENTIALS"** → **"OAuth 2.0 Client IDs"**
2. **Application type:** Web application
3. **Name:** ICE Application (or any name you prefer)

### Step 4: Configure Redirect URIs
Add these **EXACT** URIs in the "Authorized redirect URIs" section:

**For Local Development:**
```
http://localhost:3000/api/auth/callback/google
```

**For Production (replace with your domain):**
```
https://your-domain.vercel.app/api/auth/callback/google
```

### Step 5: Configure Authorized Origins
Add these in "Authorized JavaScript origins":

**Local:**
```
http://localhost:3000
```

**Production:**
```
https://your-domain.vercel.app
```

### Step 6: Save and Copy Credentials
1. Click **"CREATE"**
2. Copy the **Client ID** and **Client Secret**
3. Keep this popup open - you'll need these values

### Step 7: Update Your .env.local
```bash
# Replace with your NEW credentials
GOOGLE_CLIENT_ID="your-new-client-id-here"
GOOGLE_CLIENT_SECRET="your-new-client-secret-here"
```

### Step 8: Restart Development Server
```bash
# Kill existing server
lsof -ti:3000 | xargs kill -9

# Start fresh
npm run dev
```

### Step 9: Test Login
- Go to http://localhost:3000
- Try Google sign-in
- Should work without redirect_uri_mismatch error

## 🔍 Common Issues:

**Still getting redirect_uri_mismatch?**
- Double-check the redirect URI is EXACTLY: `http://localhost:3000/api/auth/callback/google`
- No trailing slashes
- Check for typos
- Make sure you saved the Google Console settings

**Wrong domain in production?**
- Update the production redirect URI with your actual Vercel domain
- Format: `https://your-app-name.vercel.app/api/auth/callback/google`

## ✅ This Also Completes Your Security Rotation!
By doing this, you've rotated your Google OAuth credentials as required by the GitGuardian security alerts. ✅