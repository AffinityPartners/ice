# 🚨 URGENT: Credential Rotation Checklist

**STATUS: Git history cleaned ✅**  
**Next: Rotate ALL credentials immediately**

## 1. 🔐 Supabase (HIGHEST PRIORITY)
**URL:** https://supabase.com/dashboard/project/eophdwklcrvawvsqrypb/settings/api

### Database Password:
- [ ] Go to Database settings → Reset password
- [ ] Update DATABASE_URL and DIRECT_URL with new password

### Service Role Key:
- [ ] Click "Regenerate" next to Service Role Key
- [ ] Copy new SUPABASE_SERVICE_ROLE_KEY
- [ ] Update your .env.local file

---

## 2. 🌐 Google OAuth
**URL:** https://console.cloud.google.com/apis/credentials

- [ ] Find OAuth2 client: `7537346488-48m4jf7kcvbe8j8pl5qo94htvegnuso2`
- [ ] Delete the exposed client
- [ ] Create new OAuth2 client
- [ ] Set callback URLs:
  - `http://localhost:3000/api/auth/callback/google`
  - `https://icetracer.com/api/auth/callback/google`
- [ ] Copy new GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET

---

## 3. 🔑 NextAuth Secret
```bash
# Generate new secret
openssl rand -base64 32
```
- [ ] Replace NEXTAUTH_SECRET in .env.local

---

## 4. 📧 Resend API (if using)
**URL:** https://resend.com/api-keys

- [ ] Revoke key: `re_DmEA5mtQ_ACa11iJWY2QNL5jf4qS89P85`
- [ ] Generate new API key
- [ ] Update RESEND_API_KEY

---

## 5. 🔄 Update Environment Files

### Create new .env.local:
```bash
# Copy template
cp .env.example .env.local

# Edit with your new credentials
nano .env.local  # or use your preferred editor
```

### For Production (Vercel):
- [ ] Update all environment variables in Vercel dashboard
- [ ] Redeploy application

---

## 6. ✅ Verification Steps

After rotating credentials:
- [ ] Test local development: `npm run dev`
- [ ] Test authentication: Login with Google
- [ ] Test database: Check admin dashboard
- [ ] Test deployment: Verify Vercel build succeeds
- [ ] Monitor logs for any remaining issues

---

## ⚠️ IMPORTANT NOTES:

1. **Old credentials are compromised** - Assume they could be used maliciously
2. **Work quickly** - The faster you rotate, the smaller the risk window
3. **Test everything** - Ensure the app works with new credentials
4. **Monitor usage** - Watch for unusual activity on your accounts

---

## 🛡️ Prevention Measures Implemented:

✅ Removed .env files from git  
✅ Cleaned git history  
✅ Updated .gitignore to block all .env files  
✅ Added .env.example template  
✅ Force-pushed clean history to GitHub  

**The repository is now secure** - focus on credential rotation!