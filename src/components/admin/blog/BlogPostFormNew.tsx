'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import {
  Save,
  Loader2,
  X,
  Eye,
  Image,
  Tags,
  Search,
  Calendar,
  Clock,
  FileText,
  Link,
  EyeOff,
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { generateSlug } from '@/lib/utils';

// Dynamic import for client-side only component
const RichTextEditor = dynamic(() => import('./RichTextEditor'), {
  ssr: false,
  loading: () => (
    <div className="border border-border rounded-lg p-4 min-h-[400px] flex items-center justify-center">
      <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
    </div>
  ),
});

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}

interface BlogPostFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  categoryId: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogImage: string;
  canonicalUrl: string;
  published: boolean;
  featuredOrder: number | null;
  readingTime: string;
  publishedAt: string;
}

interface BlogPostFormProps {
  initialData?: Partial<BlogPostFormData>;
  postId?: string;
}

export default function BlogPostForm({ initialData, postId }: BlogPostFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [formData, setFormData] = useState<BlogPostFormData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image: '',
    categoryId: '',
    tags: [],
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    ogImage: '',
    canonicalUrl: '',
    published: false,
    featuredOrder: null,
    readingTime: '',
    publishedAt: new Date().toISOString().split('T')[0],
    ...initialData,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/blog/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast({
        title: 'Error',
        description: 'Failed to load categories',
        variant: 'destructive',
      });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'number') {
      setFormData({ ...formData, [name]: value ? parseInt(value) : null });
    } else {
      setFormData({ ...formData, [name]: value });
      
      // Auto-generate slug from title
      if (name === 'title' && !postId) {
        setFormData(prev => ({
          ...prev,
          slug: generateSlug(value),
          metaTitle: value,
        }));
      }
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = postId ? `/api/admin/blog/${postId}` : '/api/admin/blog';
      const method = postId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save blog post');
      }

      toast({
        title: 'Success',
        description: `Blog post ${postId ? 'updated' : 'created'} successfully`,
      });

      router.push('/admin/blog');
      router.refresh();
    } catch (error) {
      console.error('Error saving blog post:', error);
      toast({
        title: 'Error',
        description: 'Failed to save blog post',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      // In a real implementation, you would upload the file to a storage service
      // For now, we'll just show a message
      if (acceptedFiles.length > 0) {
        toast({
          title: 'Info',
          description: 'Image upload functionality needs to be implemented',
        });
      }
    },
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    },
    maxFiles: 1,
  });

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            {postId ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h1>
          <p className="text-muted-foreground">
            {postId ? 'Update your blog post content and settings' : 'Write and publish your content'}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin/blog')}
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {postId ? 'Update' : 'Create'} Post
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="content" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="media">Media & Meta</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Title, slug, and category for your blog post
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter blog post title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder="blog-post-url-slug"
                />
                <p className="text-sm text-muted-foreground">
                  The URL-friendly version of the title
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="categoryId">Category</Label>
                <Select
                  value={formData.categoryId}
                  onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  placeholder="Brief description of your blog post"
                  className="min-h-[100px]"
                />
                <p className="text-sm text-muted-foreground">
                  A short summary displayed in blog listings
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Content Editor */}
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
              <CardDescription>
                Write your blog post content using the rich text editor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RichTextEditor
                value={formData.content}
                onChange={(content) => {
                  setFormData({ 
                    ...formData, 
                    content,
                    readingTime: calculateReadingTime(content)
                  });
                }}
              />
              {formData.readingTime && (
                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Estimated reading time: {formData.readingTime}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
              <CardDescription>
                Add tags to help categorize and improve SEO
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add a tag"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <Button type="button" onClick={handleAddTag} variant="secondary">
                  <Tags className="mr-2 h-4 w-4" />
                  Add Tag
                </Button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map(tag => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="space-y-4">
          {/* Featured Image */}
          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
              <CardDescription>
                Upload a featured image for your blog post
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div
                {...getRootProps()}
                className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
              >
                <input {...getInputProps()} />
                <Image className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Drop an image here or click to select
                </p>
              </div>
              {formData.image && (
                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* SEO Meta */}
          <Card>
            <CardHeader>
              <CardTitle>SEO Metadata</CardTitle>
              <CardDescription>
                Optimize your post for search engines
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleInputChange}
                  placeholder="SEO-optimized title"
                />
                <p className="text-sm text-muted-foreground">
                  {formData.metaTitle.length}/60 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleInputChange}
                  placeholder="Brief description for search results"
                  className="min-h-[80px]"
                />
                <p className="text-sm text-muted-foreground">
                  {formData.metaDescription.length}/160 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="metaKeywords">Meta Keywords</Label>
                <Input
                  id="metaKeywords"
                  name="metaKeywords"
                  value={formData.metaKeywords}
                  onChange={handleInputChange}
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="ogImage">Open Graph Image</Label>
                <Input
                  id="ogImage"
                  name="ogImage"
                  value={formData.ogImage}
                  onChange={handleInputChange}
                  placeholder="https://example.com/og-image.jpg"
                />
                <p className="text-sm text-muted-foreground">
                  Image for social media sharing (1200x630px recommended)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="canonicalUrl">Canonical URL</Label>
                <Input
                  id="canonicalUrl"
                  name="canonicalUrl"
                  value={formData.canonicalUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/blog/post-slug"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          {/* Publishing Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Publishing Settings</CardTitle>
              <CardDescription>
                Control when and how your post is published
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="published">Publish Status</Label>
                  <p className="text-sm text-muted-foreground">
                    Make this post visible to the public
                  </p>
                </div>
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="publishedAt">Publish Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="publishedAt"
                    name="publishedAt"
                    type="date"
                    value={formData.publishedAt}
                    onChange={handleInputChange}
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="featuredOrder">Featured Order</Label>
                <Input
                  id="featuredOrder"
                  name="featuredOrder"
                  type="number"
                  value={formData.featuredOrder || ''}
                  onChange={handleInputChange}
                  placeholder="Leave empty for normal posts"
                />
                <p className="text-sm text-muted-foreground">
                  Lower numbers appear first in featured sections
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>
                See how your post will appear
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <Eye className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-2">
                    <p className="font-semibold">{formData.title || 'Untitled Post'}</p>
                    <p className="text-sm">{formData.excerpt || 'No excerpt provided'}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(formData.publishedAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formData.readingTime || 'Unknown read time'}
                      </span>
                      <span className="flex items-center gap-1">
                        {formData.published ? (
                          <>
                            <Eye className="h-3 w-3" />
                            Published
                          </>
                        ) : (
                          <>
                            <EyeOff className="h-3 w-3" />
                            Draft
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </form>
  );
}