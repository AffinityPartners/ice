#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');

async function linkGoogleAccount() {
  const prisma = new PrismaClient();
  
  const email = 'kole726@gmail.com';
  const googleAccountId = '107840742057220422806';

  try {
    console.log('🔍 Checking for existing user with email:', email);
    
    // Find the existing user
    const existingUser = await prisma.user.findUnique({
      where: { email },
      include: { accounts: true }
    });

    if (!existingUser) {
      console.log('❌ No user found with this email');
      return;
    }

    console.log('✅ Found user:', existingUser.id);
    console.log('   Name:', existingUser.name);
    console.log('   Role:', existingUser.role);
    console.log('   Existing accounts:', existingUser.accounts.length);

    // Check if Google account already linked
    const hasGoogleAccount = existingUser.accounts.some(
      account => account.provider === 'google'
    );

    if (hasGoogleAccount) {
      console.log('✅ Google account already linked!');
      return;
    }

    console.log('\n🔗 Linking Google account...');
    
    // Create the Google account link
    const googleAccount = await prisma.account.create({
      data: {
        userId: existingUser.id,
        type: 'oauth',
        provider: 'google',
        providerAccountId: googleAccountId,
        // These will be updated on next login
        access_token: '',
        expires_at: 0,
        token_type: 'Bearer',
        scope: 'openid email profile',
        id_token: '',
      }
    });

    console.log('✅ Google account linked successfully!');
    console.log('\n🎉 You can now log in with Google!');
    console.log('   Go to: http://localhost:3000/auth/signin');
    console.log('   Click: "Continue with Google"');

    // Also update the user to ADMIN if it's your email
    if (existingUser.role !== 'ADMIN') {
      await prisma.user.update({
        where: { id: existingUser.id },
        data: { role: 'ADMIN' }
      });
      console.log('\n🛡️  Also upgraded your account to ADMIN role!');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

linkGoogleAccount();