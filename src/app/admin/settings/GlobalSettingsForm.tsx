'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Save,
  Loader2,
  Palette,
  Megaphone,
  User,
  Image,
  Quote,
  Mail,
  Phone,
  Link2,
  RotateCcw,
  Upload,
  X,
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

interface GlobalConfig {
  id: string;
  defaultHeroHeading: string;
  defaultHeroSubtext: string;
  defaultCtaText: string;
  defaultPrimaryColor: string;
  defaultHeroImage: string | null;
  bannerText: string | null;
  bannerActive: boolean;
  firstName: string | null;
  lastName: string | null;
  contactEmail: string | null;
  phoneNumber: string | null;
  ctaProfileImage: string | null;
  ctaQuote: string | null;
  scheduleCallLink: string | null;
  ctaButtonLink: string | null;
}

interface GlobalSettingsFormProps {
  initialConfig: GlobalConfig;
}

export default function GlobalSettingsForm({ initialConfig }: GlobalSettingsFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState(initialConfig);
  const [previewColor, setPreviewColor] = useState(initialConfig.defaultPrimaryColor);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setConfig({ ...config, [name]: checked });
    } else {
      setConfig({ ...config, [name]: value });
      if (name === 'defaultPrimaryColor') {
        setPreviewColor(value);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/settings/global', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });

      if (!response.ok) {
        throw new Error('Failed to update settings');
      }

      toast({
        title: 'Success',
        description: 'Global settings updated successfully',
      });

      router.refresh();
    } catch (error) {
      console.error('Error updating settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to update settings',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (files: File[], field: 'defaultHeroImage' | 'ctaProfileImage') => {
    if (files.length === 0) return;

    const file = files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('field', field);

    try {
      // In a real implementation, you would upload to a storage service
      // For now, we'll just show a message
      toast({
        title: 'Info',
        description: 'Image upload functionality needs to be implemented',
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload image',
        variant: 'destructive',
      });
    }
  };

  const { getRootProps: getHeroProps, getInputProps: getHeroInputProps } = useDropzone({
    onDrop: (files) => handleImageUpload(files, 'defaultHeroImage'),
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    },
    maxFiles: 1,
  });

  const { getRootProps: getCtaProps, getInputProps: getCtaInputProps } = useDropzone({
    onDrop: (files) => handleImageUpload(files, 'ctaProfileImage'),
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    },
    maxFiles: 1,
  });

  const resetToDefaults = () => {
    if (confirm('Are you sure you want to reset all settings to defaults?')) {
      setConfig({
        ...config,
        defaultHeroHeading: "Your Emergency Information When It Matters Most",
        defaultHeroSubtext: "Secure, instant access to critical medical and contact information",
        defaultCtaText: "Get ICE Tracer Today",
        defaultPrimaryColor: "#245789",
      });
      setPreviewColor("#245789");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="cta">CTA Section</TabsTrigger>
          <TabsTrigger value="banner">Banner</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="defaultHeroHeading">Hero Heading</Label>
              <Input
                id="defaultHeroHeading"
                name="defaultHeroHeading"
                value={config.defaultHeroHeading}
                onChange={handleChange}
                placeholder="Enter hero heading text"
              />
              <p className="text-sm text-muted-foreground">
                Main heading displayed on the homepage hero section
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="defaultHeroSubtext">Hero Subtext</Label>
              <Textarea
                id="defaultHeroSubtext"
                name="defaultHeroSubtext"
                value={config.defaultHeroSubtext}
                onChange={handleChange}
                placeholder="Enter hero subtext"
                className="min-h-[100px]"
              />
              <p className="text-sm text-muted-foreground">
                Supporting text displayed below the hero heading
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="defaultCtaText">CTA Button Text</Label>
              <Input
                id="defaultCtaText"
                name="defaultCtaText"
                value={config.defaultCtaText}
                onChange={handleChange}
                placeholder="Enter CTA button text"
              />
              <p className="text-sm text-muted-foreground">
                Text displayed on the main call-to-action button
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ctaButtonLink">CTA Button Link</Label>
              <Input
                id="ctaButtonLink"
                name="ctaButtonLink"
                type="url"
                value={config.ctaButtonLink || ''}
                onChange={handleChange}
                placeholder="https://example.com"
              />
              <p className="text-sm text-muted-foreground">
                URL where the CTA button should link to
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="branding" className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="defaultPrimaryColor">Primary Color</Label>
              <div className="flex gap-4 items-center">
                <Input
                  id="defaultPrimaryColor"
                  name="defaultPrimaryColor"
                  type="color"
                  value={previewColor}
                  onChange={handleChange}
                  className="h-12 w-24 cursor-pointer"
                />
                <Input
                  value={config.defaultPrimaryColor}
                  onChange={handleChange}
                  name="defaultPrimaryColor"
                  placeholder="#245789"
                  className="flex-1"
                />
                <div 
                  className="h-12 w-24 rounded-md border"
                  style={{ backgroundColor: previewColor }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Primary brand color used throughout the site
              </p>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Hero Background Image</Label>
              <div
                {...getHeroProps()}
                className={cn(
                  "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer",
                  "hover:border-primary transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                )}
              >
                <input {...getHeroInputProps()} />
                <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Drop an image here or click to select
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
              {config.defaultHeroImage && (
                <div className="flex items-center gap-2 mt-2">
                  <p className="text-sm">Current: {config.defaultHeroImage}</p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setConfig({ ...config, defaultHeroImage: null })}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="cta" className="space-y-6">
          <Alert>
            <Quote className="h-4 w-4" />
            <AlertDescription>
              Configure the call-to-action section that appears on various pages
            </AlertDescription>
          </Alert>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={config.firstName || ''}
                onChange={handleChange}
                placeholder="John"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={config.lastName || ''}
                onChange={handleChange}
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  value={config.contactEmail || ''}
                  onChange={handleChange}
                  placeholder="contact@example.com"
                  className="pl-9"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={config.phoneNumber || ''}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  className="pl-9"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ctaQuote">CTA Quote</Label>
            <Textarea
              id="ctaQuote"
              name="ctaQuote"
              value={config.ctaQuote || ''}
              onChange={handleChange}
              placeholder="Enter an inspiring quote or message"
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="scheduleCallLink">Schedule Call Link</Label>
            <div className="relative">
              <Link2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="scheduleCallLink"
                name="scheduleCallLink"
                type="url"
                value={config.scheduleCallLink || ''}
                onChange={handleChange}
                placeholder="https://calendly.com/your-link"
                className="pl-9"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>CTA Profile Image</Label>
            <div
              {...getCtaProps()}
              className={cn(
                "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer",
                "hover:border-primary transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              )}
            >
              <input {...getCtaInputProps()} />
              <User className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                Drop a profile image or click to select
              </p>
            </div>
            {config.ctaProfileImage && (
              <div className="flex items-center gap-2 mt-2">
                <p className="text-sm">Current: {config.ctaProfileImage}</p>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setConfig({ ...config, ctaProfileImage: null })}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="banner" className="space-y-6">
          <Alert>
            <Megaphone className="h-4 w-4" />
            <AlertDescription>
              Configure the announcement banner that appears at the top of the site
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="bannerActive"
                checked={config.bannerActive}
                onCheckedChange={(checked) => setConfig({ ...config, bannerActive: checked })}
              />
              <Label htmlFor="bannerActive">Banner Active</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bannerText">Banner Text</Label>
              <Textarea
                id="bannerText"
                name="bannerText"
                value={config.bannerText || ''}
                onChange={handleChange}
                placeholder="Enter announcement text"
                disabled={!config.bannerActive}
                className="min-h-[80px]"
              />
              <p className="text-sm text-muted-foreground">
                Text displayed in the announcement banner when active
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Separator className="my-6" />

      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={resetToDefaults}
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset to Defaults
        </Button>
        <Button
          type="submit"
          disabled={loading}
        >
          {loading ? (
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
    </form>
  );
}