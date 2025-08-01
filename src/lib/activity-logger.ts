import { prisma } from './prisma';
import { Role } from '@prisma/client';

export type ActivityAction =
  // Blog actions
  | 'created_blog_post'
  | 'updated_blog_post'
  | 'published_blog_post'
  | 'unpublished_blog_post'
  | 'deleted_blog_post'
  | 'created_blog_category'
  | 'updated_blog_category'
  | 'deleted_blog_category'
  // FAQ actions
  | 'created_faq'
  | 'updated_faq'
  | 'deleted_faq'
  | 'created_faq_category'
  | 'updated_faq_category'
  | 'deleted_faq_category'
  // Global settings
  | 'updated_global_settings'
  // Auth actions
  | 'admin_login'
  | 'admin_logout'
  | 'affiliate_login'
  | 'user_login'
  | 'password_reset_requested'
  | 'password_reset_completed'
  // User management
  | 'created_user'
  | 'updated_user'
  | 'deleted_user'
  | 'changed_user_role'
  | 'USER_ROLE_CHANGED'
  | 'USER_DELETED'
  // Affiliate actions
  | 'affiliate_created'
  | 'affiliate_updated'
  | 'affiliate_deleted'
  | 'AFFILIATE_ACTIVATED'
  | 'AFFILIATE_DEACTIVATED'
  | 'affiliate_note_added'
  | 'affiliate_note_deleted'
  // Payout actions
  | 'payout_processed'
  | 'payout_failed'
  | 'payout_cancelled'
  // Stripe actions
  | 'stripe_account_created'
  | 'stripe_account_updated'
  | 'stripe_onboarding_started'
  | 'stripe_onboarding_completed';

interface LogActivityParams {
  actorId: string;
  actorRole: Role;
  action: ActivityAction;
  target?: any;
  metadata?: Record<string, any>;
  req?: Request;
}

export async function logActivity({
  actorId,
  actorRole,
  action,
  target,
  metadata,
  req
}: LogActivityParams) {
  try {
    let ipAddress: string | undefined;
    let userAgent: string | undefined;

    if (req) {
      // Get IP address from headers
      ipAddress = req.headers.get('x-forwarded-for')?.split(',')[0] ||
                  req.headers.get('x-real-ip') ||
                  undefined;
      userAgent = req.headers.get('user-agent') || undefined;
    }

    await prisma.activityLog.create({
      data: {
        actorId,
        actorRole,
        action,
        target,
        metadata,
        ipAddress,
        userAgent
      }
    });
  } catch (error: any) {
    // Log to console but don't throw - we don't want logging failures to break the app
    console.error('Failed to log activity:', {
      error: error.message,
      code: error.code,
      actorId,
      actorRole,
      action,
      target
    });

    // Log the full error in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Full error:', error);
    }
  }
}

// Convenience functions for common actions
export const ActivityLogger = {
  blogPost: {
    created: (userId: string, role: Role, postTitle: string, postId: string) =>
      logActivity({ actorId: userId, actorRole: role, action: 'created_blog_post', target: { title: postTitle }, metadata: { postId } }),

    updated: (userId: string, role: Role, postTitle: string, postId: string, changes?: any) =>
      logActivity({ actorId: userId, actorRole: role, action: 'updated_blog_post', target: { title: postTitle }, metadata: { postId, changes } }),

    published: (userId: string, role: Role, postTitle: string, postId: string) =>
      logActivity({ actorId: userId, actorRole: role, action: 'published_blog_post', target: { title: postTitle }, metadata: { postId } }),

    unpublished: (userId: string, role: Role, postTitle: string, postId: string) =>
      logActivity({ actorId: userId, actorRole: role, action: 'unpublished_blog_post', target: { title: postTitle }, metadata: { postId } }),

    deleted: (userId: string, role: Role, postTitle: string, postId: string) =>
      logActivity({ actorId: userId, actorRole: role, action: 'deleted_blog_post', target: { title: postTitle }, metadata: { postId } })
  },

  auth: {
    adminLogin: (userId: string, email: string, req?: Request) =>
      logActivity({ actorId: userId, actorRole: 'ADMIN', action: 'admin_login', target: { email }, req }),
    
    affiliateLogin: (userId: string, email: string, req?: Request) =>
      logActivity({ actorId: userId, actorRole: 'AFFILIATE', action: 'affiliate_login', target: { email }, req }),
    
    userLogin: (userId: string, email: string, req?: Request) =>
      logActivity({ actorId: userId, actorRole: 'USER', action: 'user_login', target: { email }, req }),
  },

  globalSettings: {
    updated: (userId: string, changes?: any) =>
      logActivity({ actorId: userId, actorRole: 'ADMIN', action: 'updated_global_settings', metadata: { changes } })
  },

  user: {
    roleChanged: (adminId: string, targetUserId: string, newRole: Role, targetEmail?: string) =>
      logActivity({ 
        actorId: adminId, 
        actorRole: 'ADMIN', 
        action: 'USER_ROLE_CHANGED', 
        target: `user:${targetUserId}`,
        metadata: { userId: targetUserId, newRole, userEmail: targetEmail }
      }),
    
    deleted: (adminId: string, targetUserId: string, targetEmail?: string, targetName?: string) =>
      logActivity({ 
        actorId: adminId, 
        actorRole: 'ADMIN', 
        action: 'USER_DELETED', 
        target: `user:${targetUserId}`,
        metadata: { 
          deletedUserId: targetUserId, 
          deletedUserEmail: targetEmail,
          deletedUserName: targetName
        }
      }),
  },

  affiliate: {
    created: (userId: string, role: Role, affiliateId: string, affiliateName: string) =>
      logActivity({ 
        actorId: userId, 
        actorRole: role, 
        action: 'affiliate_created', 
        target: `affiliate:${affiliateId}`,
        metadata: { affiliateId, affiliateName }
      }),
    
    updated: (userId: string, role: Role, affiliateId: string, changes?: any) =>
      logActivity({ 
        actorId: userId, 
        actorRole: role, 
        action: 'affiliate_updated', 
        target: `affiliate:${affiliateId}`,
        metadata: { affiliateId, changes }
      }),
    
    activated: (adminId: string, affiliateId: string, affiliateName?: string) =>
      logActivity({ 
        actorId: adminId, 
        actorRole: 'ADMIN', 
        action: 'AFFILIATE_ACTIVATED', 
        target: `affiliate:${affiliateId}`,
        metadata: { affiliateId, affiliateName }
      }),
    
    deactivated: (adminId: string, affiliateId: string, affiliateName?: string) =>
      logActivity({ 
        actorId: adminId, 
        actorRole: 'ADMIN', 
        action: 'AFFILIATE_DEACTIVATED', 
        target: `affiliate:${affiliateId}`,
        metadata: { affiliateId, affiliateName }
      }),
  },

  payout: {
    processed: (adminId: string, affiliateId: string, amount: number, transferId: string) =>
      logActivity({ 
        actorId: adminId, 
        actorRole: 'ADMIN', 
        action: 'payout_processed', 
        target: `affiliate:${affiliateId}`,
        metadata: { affiliateId, amount, transferId }
      }),
    
    failed: (adminId: string, affiliateId: string, amount: number, error: string) =>
      logActivity({ 
        actorId: adminId, 
        actorRole: 'ADMIN', 
        action: 'payout_failed', 
        target: `affiliate:${affiliateId}`,
        metadata: { affiliateId, amount, error }
      }),
  },

  stripe: {
    accountCreated: (userId: string, stripeAccountId: string) =>
      logActivity({ 
        actorId: userId, 
        actorRole: 'AFFILIATE', 
        action: 'stripe_account_created', 
        metadata: { stripeAccountId }
      }),
    
    onboardingStarted: (userId: string, stripeAccountId: string) =>
      logActivity({ 
        actorId: userId, 
        actorRole: 'AFFILIATE', 
        action: 'stripe_onboarding_started', 
        metadata: { stripeAccountId }
      }),
    
    onboardingCompleted: (userId: string, stripeAccountId: string) =>
      logActivity({ 
        actorId: userId, 
        actorRole: 'AFFILIATE', 
        action: 'stripe_onboarding_completed', 
        metadata: { stripeAccountId }
      }),
  }
};