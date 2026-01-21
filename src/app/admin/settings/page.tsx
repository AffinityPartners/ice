/**
 * Admin Settings Page
 * 
 * Provides interface for managing global application settings.
 * Settings control site-wide defaults for hero content, colors, and banners.
 */

import { db, globalConfig } from '@/db';
import GlobalSettingsForm from './GlobalSettingsForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Settings } from 'lucide-react';

export const dynamic = 'force-dynamic';

/**
 * Retrieves the global configuration, creating default values if none exist.
 */
async function getGlobalConfig() {
  let config = await db.query.globalConfig.findFirst();
  
  // Create default config if it doesn't exist
  if (!config) {
    const [newConfig] = await db.insert(globalConfig).values({
      defaultHeroHeading: "Your Emergency Information When It Matters Most",
      defaultHeroSubtext: "Secure, instant access to critical medical and contact information",
      defaultCtaText: "Get ICE Tracer Today",
      defaultPrimaryColor: "#245789",
      bannerActive: false,
    }).returning();
    
    config = newConfig;
  }
  
  return config;
}

/**
 * Main admin settings page component.
 * Displays the global settings form.
 */
export default async function GlobalSettingsPage() {
  const config = await getGlobalConfig();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Settings className="h-6 w-6 text-primary" />
          Global Settings
        </h1>
        <p className="text-muted-foreground">
          Configure site-wide settings and default values
        </p>
      </div>

      {/* Settings Form */}
      <Card>
        <CardHeader>
          <CardTitle>Site Configuration</CardTitle>
          <CardDescription>
            Manage global settings that apply across your entire website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GlobalSettingsForm initialConfig={config} />
        </CardContent>
      </Card>
    </div>
  );
}
