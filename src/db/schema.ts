/**
 * Drizzle ORM Schema
 * 
 * This file defines all database tables, enums, and relations for the ICE Tracer application.
 * Converted from Prisma schema to Drizzle ORM format.
 * 
 * Tables: 17 total
 * - Authentication: users, accounts, sessions, verificationTokens
 * - Content: posts, blogCategories, faqs, faqCategories
 * - System: activityLogs, globalConfig, passwordResetTokens
 * - Affiliates: affiliates, referrals, commissionLogs, payoutLogs, affiliateNotes
 */

import { relations } from 'drizzle-orm';
import {
  pgTable,
  pgEnum,
  text,
  varchar,
  timestamp,
  boolean,
  integer,
  json,
  uuid,
  index,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

// ============================================================================
// ENUMS
// ============================================================================

/**
 * User role enum - determines access levels throughout the application
 */
export const roleEnum = pgEnum('Role', ['ADMIN', 'USER', 'AFFILIATE']);

/**
 * Referral status enum - tracks the lifecycle of affiliate referrals
 */
export const referralStatusEnum = pgEnum('ReferralStatus', ['PENDING', 'CONVERTED', 'CANCELLED', 'EXPIRED']);

/**
 * Note priority enum - for affiliate notes importance levels
 */
export const notePriorityEnum = pgEnum('NotePriority', ['LOW', 'MEDIUM', 'HIGH', 'URGENT']);

/**
 * Note category enum - categorizes affiliate notes by type
 */
export const noteCategoryEnum = pgEnum('NoteCategory', [
  'GENERAL',
  'COMPLIANCE',
  'PAYMENT',
  'PERFORMANCE',
  'COMMUNICATION',
  'TECHNICAL',
  'MARKETING',
]);

// Export enum value types for use in application code
export type Role = (typeof roleEnum.enumValues)[number];
export type ReferralStatus = (typeof referralStatusEnum.enumValues)[number];
export type NotePriority = (typeof notePriorityEnum.enumValues)[number];
export type NoteCategory = (typeof noteCategoryEnum.enumValues)[number];

// ============================================================================
// AUTHENTICATION TABLES (NextAuth)
// ============================================================================

/**
 * Users table - core user entity with role-based access control
 * Supports both OAuth and credentials-based authentication
 */
export const users = pgTable(
  'User',
  {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: text('name'),
    email: text('email').unique(),
    emailVerified: timestamp('emailVerified', { mode: 'date' }),
    image: text('image'),
    role: roleEnum('role').default('USER').notNull(),
    createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updatedAt', { mode: 'date' }).defaultNow().notNull().$onUpdate(() => new Date()),
    password: text('password'),
    firstName: text('firstName'),
    lastName: text('lastName'),
    phone: text('phone'),
    bio: text('bio'),
  },
  (table) => [
    index('idx_user_email').on(table.email),
    index('idx_user_role').on(table.role),
  ]
);

/**
 * Accounts table - stores OAuth provider account information
 * Links external OAuth accounts to internal user records
 */
export const accounts = pgTable(
  'Account',
  {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (table) => [
    uniqueIndex('Account_provider_providerAccountId_key').on(table.provider, table.providerAccountId),
  ]
);

/**
 * Sessions table - stores active user sessions for NextAuth
 */
export const sessions = pgTable('Session', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  sessionToken: text('sessionToken').unique().notNull(),
  userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

/**
 * Verification tokens table - for email verification and password reset flows
 */
export const verificationTokens = pgTable(
  'VerificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').unique().notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (table) => [
    uniqueIndex('VerificationToken_identifier_token_key').on(table.identifier, table.token),
  ]
);

// ============================================================================
// BLOG TABLES
// ============================================================================

/**
 * Blog categories table - organizes blog posts into categories
 */
export const blogCategories = pgTable(
  'BlogCategory',
  {
    id: varchar('id', { length: 255 }).primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: text('name').notNull(),
    slug: text('slug').unique().notNull(),
    description: text('description'),
    isActive: boolean('isActive').default(true),
    createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow(),
    updatedAt: timestamp('updatedAt', { mode: 'date' }).defaultNow().$onUpdate(() => new Date()),
  },
  (table) => [
    index('idx_blog_category_slug').on(table.slug),
  ]
);

/**
 * Posts table - blog posts with SEO metadata and category relations
 */
export const posts = pgTable(
  'Post',
  {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    title: text('title').notNull(),
    slug: text('slug').unique().notNull(),
    excerpt: text('excerpt'),
    content: text('content').notNull(),
    image: text('image'),
    published: boolean('published').default(false).notNull(),
    author: text('author'),
    createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updatedAt', { mode: 'date' }).defaultNow().notNull().$onUpdate(() => new Date()),
    metaTitle: text('metaTitle'),
    metaDescription: text('metaDescription'),
    metaKeywords: text('metaKeywords'),
    ogImage: text('ogImage'),
    canonicalUrl: text('canonicalUrl'),
    featuredOrder: integer('featuredOrder'),
    viewCount: integer('viewCount').default(0),
    readingTime: integer('readingTime'),
    tags: text('tags').array().default([]),
    publishedAt: timestamp('publishedAt', { mode: 'date' }),
    categoryId: varchar('categoryId', { length: 255 }).references(() => blogCategories.id),
  },
  (table) => [
    index('idx_post_published_publishedat').on(table.published, table.publishedAt),
    index('idx_post_slug').on(table.slug),
    index('idx_post_category_id').on(table.categoryId),
  ]
);

// ============================================================================
// FAQ TABLES
// ============================================================================

/**
 * FAQ categories table - organizes FAQs into logical groups
 */
export const faqCategories = pgTable(
  'FAQCategory',
  {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: text('name').notNull(),
    slug: text('slug').unique().notNull(),
    description: text('description'),
    order: integer('order').default(0),
    isActive: boolean('isActive').default(true),
    createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow(),
    updatedAt: timestamp('updatedAt', { mode: 'date' }).defaultNow().$onUpdate(() => new Date()),
  },
  (table) => [
    index('idx_faq_category_slug').on(table.slug),
  ]
);

/**
 * FAQs table - stores frequently asked questions with category relations
 */
export const faqs = pgTable(
  'FAQ',
  {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    question: text('question').notNull(),
    answer: text('answer').notNull(),
    categoryId: text('categoryId').references(() => faqCategories.id, { onUpdate: 'no action' }),
    order: integer('order').default(0),
    isActive: boolean('isActive').default(true),
    createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow(),
    updatedAt: timestamp('updatedAt', { mode: 'date' }).defaultNow().$onUpdate(() => new Date()),
  },
  (table) => [
    index('idx_faq_category_id').on(table.categoryId),
  ]
);

// ============================================================================
// SYSTEM TABLES
// ============================================================================

/**
 * Activity logs table - tracks all user actions for auditing
 * Records who did what, when, and from where
 */
export const activityLogs = pgTable(
  'ActivityLog',
  {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    actorId: text('actorId').notNull().references(() => users.id, { onDelete: 'cascade' }),
    actorRole: roleEnum('actorRole').notNull(),
    action: text('action').notNull(),
    target: text('target'),
    metadata: json('metadata'),
    ipAddress: text('ipAddress'),
    userAgent: text('userAgent'),
    createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow().notNull(),
  },
  (table) => [
    index('idx_activity_log_actor_id').on(table.actorId),
    index('idx_activity_log_actor_role').on(table.actorRole),
    index('idx_activity_log_action').on(table.action),
    index('idx_activity_log_created_at').on(table.createdAt),
  ]
);

/**
 * Global config table - stores application-wide settings
 * Single row table for site-wide configuration
 */
export const globalConfig = pgTable('GlobalConfig', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  defaultHeroHeading: text('defaultHeroHeading').default('Your Emergency Information When It Matters Most').notNull(),
  defaultHeroSubtext: text('defaultHeroSubtext').default('Secure, instant access to critical medical and contact information').notNull(),
  defaultCtaText: text('defaultCtaText').default('Get ICE Tracer Today').notNull(),
  defaultPrimaryColor: text('defaultPrimaryColor').default('#245789').notNull(),
  defaultHeroImage: text('defaultHeroImage'),
  bannerText: text('bannerText'),
  bannerActive: boolean('bannerActive').default(false).notNull(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).defaultNow().notNull().$onUpdate(() => new Date()),
  firstName: text('firstName'),
  lastName: text('lastName'),
  contactEmail: text('contactEmail'),
  phoneNumber: text('phoneNumber'),
  ctaProfileImage: text('ctaProfileImage'),
  ctaQuote: text('ctaQuote'),
  scheduleCallLink: text('scheduleCallLink'),
  ctaButtonLink: text('ctaButtonLink'),
});

/**
 * Password reset tokens table - handles password reset flow
 */
export const passwordResetTokens = pgTable(
  'PasswordResetToken',
  {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    email: text('email').notNull(),
    token: text('token').unique().notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
    createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow().notNull(),
  },
  (table) => [
    index('PasswordResetToken_email_idx').on(table.email),
  ]
);

// ============================================================================
// AFFILIATE TABLES
// ============================================================================

/**
 * Affiliates table - stores affiliate partner profiles and Stripe Connect data
 * Links to users table and contains customization options for landing pages
 */
export const affiliates = pgTable(
  'Affiliate',
  {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    userId: text('userId').unique().notNull().references(() => users.id, { onDelete: 'cascade' }),
    slug: text('slug').unique().notNull(),
    companyName: text('companyName'),
    logoUrl: text('logoUrl'),
    primaryColor: text('primaryColor').default('#245789'),
    heroHeading: text('heroHeading'),
    heroSubtext: text('heroSubtext'),
    ctaText: text('ctaText'),
    visits: integer('visits').default(0).notNull(),
    conversions: integer('conversions').default(0).notNull(),
    createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updatedAt', { mode: 'date' }).defaultNow().notNull().$onUpdate(() => new Date()),
    isActive: boolean('isActive').default(true),
    firstName: text('firstName'),
    lastName: text('lastName'),
    contactEmail: text('contactEmail'),
    ctaProfileImage: text('ctaProfileImage'),
    ctaQuote: text('ctaQuote'),
    scheduleCallLink: text('scheduleCallLink'),
    businessName: text('businessName'),
    website: text('website'),
    socialMedia: json('socialMedia').default({}),
    bio: text('bio'),
    phoneNumber: varchar('phoneNumber', { length: 255 }),
    ctaButtonLink: text('ctaButtonLink'),
    // Stripe Connect fields
    stripeAccountId: text('stripe_account_id').unique(),
    stripeOnboardingComplete: boolean('stripe_onboarding_complete').default(false),
    stripeDashboardUrl: text('stripe_dashboard_url'),
    stripeChargesEnabled: boolean('stripe_charges_enabled').default(false),
    stripePayoutsEnabled: boolean('stripe_payouts_enabled').default(false),
    stripeDisabledReason: text('stripe_disabled_reason'),
    stripeOnboardingUrl: text('stripe_onboarding_url'),
    totalEarnedCents: integer('total_earned_cents').default(0),
    unpaidBalanceCents: integer('unpaid_balance_cents').default(0),
    lastPayoutDate: timestamp('last_payout_date', { mode: 'date', precision: 6 }),
    lastPayoutAmountCents: integer('last_payout_amount_cents'),
    adminNotes: text('admin_notes'),
    flaggedForReview: boolean('flagged_for_review').default(false),
    notifyOnPayout: boolean('notify_on_payout').default(true),
    notifyOnReferral: boolean('notify_on_referral').default(true),
  },
  (table) => [
    index('Affiliate_businessName_idx').on(table.businessName),
    index('Affiliate_stripeAccountId_idx').on(table.stripeAccountId),
  ]
);

/**
 * Referrals table - tracks customer referrals from affiliates
 */
export const referrals = pgTable('Referral', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  affiliateId: text('affiliateId').notNull().references(() => affiliates.id, { onDelete: 'cascade' }),
  customerEmail: text('customerEmail').notNull(),
  customerName: text('customerName'),
  status: referralStatusEnum('status').default('PENDING').notNull(),
  policyNumber: text('policyNumber'),
  commission: integer('commission'),
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).defaultNow().notNull().$onUpdate(() => new Date()),
});

/**
 * Commission logs table - tracks all commission events for affiliates
 * Uses snake_case naming to match existing database schema
 */
export const commissionLogs = pgTable('commission_log', {
  id: uuid('id').primaryKey().defaultRandom(),
  affiliateId: text('affiliate_id').references(() => affiliates.id, { onDelete: 'no action', onUpdate: 'no action' }),
  referralId: text('referral_id').references(() => referrals.id, { onDelete: 'no action', onUpdate: 'no action' }),
  amountCents: integer('amount_cents'),
  source: text('source'),
  createdAt: timestamp('created_at', { mode: 'date', precision: 6 }).defaultNow(),
  isPaid: boolean('is_paid').default(false),
});

/**
 * Payout logs table - tracks all payout transactions to affiliates
 * Uses snake_case naming to match existing database schema
 */
export const payoutLogs = pgTable('payout_log', {
  id: uuid('id').primaryKey().defaultRandom(),
  affiliateId: text('affiliate_id').references(() => affiliates.id, { onDelete: 'no action', onUpdate: 'no action' }),
  stripeTransferId: text('stripe_transfer_id'),
  amountCents: integer('amount_cents'),
  createdAt: timestamp('created_at', { mode: 'date', precision: 6 }).defaultNow(),
  status: text('status'),
  notes: text('notes'),
});

/**
 * Affiliate notes table - admin notes attached to affiliate accounts
 */
export const affiliateNotes = pgTable(
  'AffiliateNote',
  {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    affiliateId: text('affiliateId').notNull().references(() => affiliates.id, { onDelete: 'cascade' }),
    authorId: text('authorId').notNull().references(() => users.id, { onDelete: 'cascade' }),
    title: text('title').notNull(),
    content: text('content').notNull(),
    priority: notePriorityEnum('priority').default('MEDIUM').notNull(),
    category: noteCategoryEnum('category').default('GENERAL').notNull(),
    isResolved: boolean('isResolved').default(false).notNull(),
    createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updatedAt', { mode: 'date' }).defaultNow().notNull().$onUpdate(() => new Date()),
  },
  (table) => [
    index('AffiliateNote_affiliateId_idx').on(table.affiliateId),
    index('AffiliateNote_authorId_idx').on(table.authorId),
    index('AffiliateNote_priority_idx').on(table.priority),
    index('AffiliateNote_category_idx').on(table.category),
    index('AffiliateNote_createdAt_idx').on(table.createdAt),
    index('AffiliateNote_isResolved_idx').on(table.isResolved),
  ]
);

// ============================================================================
// RELATIONS
// ============================================================================

/**
 * User relations - connects users to their accounts, sessions, activity, and affiliate profile
 */
export const usersRelations = relations(users, ({ many, one }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  activityLogs: many(activityLogs),
  affiliate: one(affiliates, {
    fields: [users.id],
    references: [affiliates.userId],
  }),
  affiliateNotes: many(affiliateNotes),
}));

/**
 * Account relations - links OAuth accounts to users
 */
export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

/**
 * Session relations - links sessions to users
 */
export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

/**
 * Blog category relations - connects categories to their posts
 */
export const blogCategoriesRelations = relations(blogCategories, ({ many }) => ({
  posts: many(posts),
}));

/**
 * Post relations - connects posts to their category
 */
export const postsRelations = relations(posts, ({ one }) => ({
  category: one(blogCategories, {
    fields: [posts.categoryId],
    references: [blogCategories.id],
  }),
}));

/**
 * FAQ category relations - connects categories to their FAQs
 */
export const faqCategoriesRelations = relations(faqCategories, ({ many }) => ({
  faqs: many(faqs),
}));

/**
 * FAQ relations - connects FAQs to their category
 */
export const faqsRelations = relations(faqs, ({ one }) => ({
  category: one(faqCategories, {
    fields: [faqs.categoryId],
    references: [faqCategories.id],
  }),
}));

/**
 * Activity log relations - connects logs to the actor user
 */
export const activityLogsRelations = relations(activityLogs, ({ one }) => ({
  actor: one(users, {
    fields: [activityLogs.actorId],
    references: [users.id],
  }),
}));

/**
 * Affiliate relations - connects affiliates to users, referrals, commissions, payouts, and notes
 */
export const affiliatesRelations = relations(affiliates, ({ one, many }) => ({
  user: one(users, {
    fields: [affiliates.userId],
    references: [users.id],
  }),
  referrals: many(referrals),
  commissionLogs: many(commissionLogs),
  payoutLogs: many(payoutLogs),
  notes: many(affiliateNotes),
}));

/**
 * Referral relations - connects referrals to affiliates and commission logs
 */
export const referralsRelations = relations(referrals, ({ one, many }) => ({
  affiliate: one(affiliates, {
    fields: [referrals.affiliateId],
    references: [affiliates.id],
  }),
  commissionLogs: many(commissionLogs),
}));

/**
 * Commission log relations - connects commissions to affiliates and referrals
 */
export const commissionLogsRelations = relations(commissionLogs, ({ one }) => ({
  affiliate: one(affiliates, {
    fields: [commissionLogs.affiliateId],
    references: [affiliates.id],
  }),
  referral: one(referrals, {
    fields: [commissionLogs.referralId],
    references: [referrals.id],
  }),
}));

/**
 * Payout log relations - connects payouts to affiliates
 */
export const payoutLogsRelations = relations(payoutLogs, ({ one }) => ({
  affiliate: one(affiliates, {
    fields: [payoutLogs.affiliateId],
    references: [affiliates.id],
  }),
}));

/**
 * Affiliate note relations - connects notes to affiliates and authors
 */
export const affiliateNotesRelations = relations(affiliateNotes, ({ one }) => ({
  affiliate: one(affiliates, {
    fields: [affiliateNotes.affiliateId],
    references: [affiliates.id],
  }),
  author: one(users, {
    fields: [affiliateNotes.authorId],
    references: [users.id],
  }),
}));
