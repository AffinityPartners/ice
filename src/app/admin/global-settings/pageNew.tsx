'use client';

import { useState, useEffect } from 'react';
import { Save, Settings, Palette, FileText, Megaphone, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

interface GlobalConfig {
  id: string;
  siteName: string;
  siteDescription: string;
  defaultHeroHeading: string;
  defaultHeroSubtext: string;
  defaultCtaText: string;
  defaultPrimaryColor: string;
  defaultHeroImage: string | null;
  bannerText: string | null;
  bannerActive: boolean;
  updatedAt: Date;
}

export default function GlobalSettingsPage() {
  const [config, setConfig] = useState<GlobalConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<GlobalConfig>>({});
  const [previewColor, setPreviewColor] = useState('#245789');
  const { toast } = useToast();

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await fetch('/api/admin/global-config');
      if (!response.ok) throw new Error('Failed to fetch config');
      const data = await response.json();
      setConfig(data);
      setFormData(data);
      setPreviewColor(data.defaultPrimaryColor || '#245789');
    } catch (error) {
      console.error('Error fetching global config:', error);
      toast({
        title: 'Error',
        description: 'Failed to load global settings',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/admin/global-config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save config');

      const updatedConfig = await response.json();
      setConfig(updatedConfig);
      toast({
        title: 'Success',
        description: 'Global settings saved successfully',
      });
    } catch (error) {
      console.error('Error saving config:', error);
      toast({
        title: 'Error',
        description: 'Failed to save settings',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof GlobalConfig, value: any) => {
    setFormData({ ...formData, [field]: value });
    if (field === 'defaultPrimaryColor') {
      setPreviewColor(value);
    }
  };

  const resetToDefaults = () => {
    if (confirm('Are you sure you want to reset all settings to defaults?')) {
      const defaults = {
        siteName: 'ICE Tracer',
        siteDescription: 'Emergency Contact and Medical Information',
        defaultHeroHeading: 'Your Emergency Information When It Matters Most',
        defaultHeroSubtext: 'Secure, instant access to critical medical and contact information',
        defaultCtaText: 'Get ICE Tracer Today',
        defaultPrimaryColor: '#245789',
        defaultHeroImage: null,
        bannerText: null,
        bannerActive: false,
      };
      setFormData({ ...formData, ...defaults });
      setPreviewColor(defaults.defaultPrimaryColor);
    }
  };

  if (loading) {
    return <GlobalSettingsSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Settings className="h-6 w-6 text-primary" />
            Global Settings
          </h1>
          <p className="text-muted-foreground">
            Configure site-wide settings and default values
          </p>
        </div>
        <Button
          variant="outline"
          onClick={fetchConfig}
          disabled={loading}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Last Updated Alert */}
      {config && (
        <Alert>
          <Settings className="h-4 w-4" />
          <AlertTitle>Configuration Status</AlertTitle>
          <AlertDescription>
            Last updated: {new Date(config.updatedAt).toLocaleString()}
          </AlertDescription>
        </Alert>
      )}

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="announcement">Announcement</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                General Settings
              </CardTitle>
              <CardDescription>
                Basic site information and metadata
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  value={formData.siteName || ''}
                  onChange={(e) => handleChange('siteName', e.target.value)}
                  placeholder="Enter site name"
                />
                <p className="text-sm text-muted-foreground">
                  Displayed in browser tabs and SEO metadata
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={formData.siteDescription || ''}
                  onChange={(e) => handleChange('siteDescription', e.target.value)}
                  placeholder="Enter site description"
                  className="min-h-[100px]"
                />
                <p className="text-sm text-muted-foreground">
                  Used for SEO and social media sharing
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="defaultHeroHeading">Default Hero Heading</Label>
                <Input
                  id="defaultHeroHeading"
                  value={formData.defaultHeroHeading || ''}
                  onChange={(e) => handleChange('defaultHeroHeading', e.target.value)}
                  placeholder="Enter hero heading"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="defaultHeroSubtext">Default Hero Subtext</Label>
                <Textarea
                  id="defaultHeroSubtext"
                  value={formData.defaultHeroSubtext || ''}
                  onChange={(e) => handleChange('defaultHeroSubtext', e.target.value)}
                  placeholder="Enter hero subtext"
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="defaultCtaText">Default CTA Button Text</Label>
                <Input
                  id="defaultCtaText"
                  value={formData.defaultCtaText || ''}
                  onChange={(e) => handleChange('defaultCtaText', e.target.value)}
                  placeholder="Enter CTA text"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Appearance Settings
              </CardTitle>
              <CardDescription>
                Customize the visual appearance of your site
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="defaultPrimaryColor">Primary Brand Color</Label>
                <div className="flex gap-4 items-center">
                  <Input
                    id="defaultPrimaryColor"
                    type="color"
                    value={previewColor}
                    onChange={(e) => handleChange('defaultPrimaryColor', e.target.value)}
                    className="h-12 w-24 cursor-pointer"
                  />
                  <Input
                    value={formData.defaultPrimaryColor || ''}
                    onChange={(e) => handleChange('defaultPrimaryColor', e.target.value)}
                    placeholder="#245789"
                    className="flex-1"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Preview:</span>
                    <div 
                      className="h-12 w-24 rounded-md border shadow-sm"
                      style={{ backgroundColor: previewColor }}
                    />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  This color is used throughout the site for buttons, links, and accents
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="defaultHeroImage">Default Hero Image URL</Label>
                <Input
                  id="defaultHeroImage"
                  value={formData.defaultHeroImage || ''}
                  onChange={(e) => handleChange('defaultHeroImage', e.target.value)}
                  placeholder="https://example.com/hero-image.jpg"
                />
                <p className="text-sm text-muted-foreground">
                  Default background image for hero sections (leave empty for gradient)
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="announcement">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Megaphone className="h-5 w-5" />
                Announcement Banner
              </CardTitle>
              <CardDescription>
                Display important messages at the top of your site
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="bannerActive"
                  checked={formData.bannerActive || false}
                  onCheckedChange={(checked) => handleChange('bannerActive', checked)}
                />
                <Label htmlFor="bannerActive">Banner Active</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bannerText">Banner Text</Label>
                <Textarea
                  id="bannerText"
                  value={formData.bannerText || ''}
                  onChange={(e) => handleChange('bannerText', e.target.value)}
                  placeholder="Enter announcement text"
                  disabled={!formData.bannerActive}
                  className="min-h-[80px]"
                />
                <p className="text-sm text-muted-foreground">
                  This message will be displayed prominently at the top of every page
                </p>
              </div>

              {formData.bannerActive && formData.bannerText && (
                <Alert>
                  <Megaphone className="h-4 w-4" />
                  <AlertTitle>Preview</AlertTitle>
                  <AlertDescription>{formData.bannerText}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={resetToDefaults}
            >
              Reset to Defaults
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setFormData(config || {});
                  setPreviewColor(config?.defaultPrimaryColor || '#245789');
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function GlobalSettingsSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64 mt-2" />
      </div>
      
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}