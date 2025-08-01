'use client';

import { useState, useEffect } from 'react';
import {
  Edit,
  Trash2,
  Tags,
  Search,
  Plus,
  Filter,
  Eye,
  EyeOff,
  HelpCircle,
  ArrowUpDown,
  X,
  Check,
  Loader2,
  ListOrdered,
  GripVertical,
} from 'lucide-react';
import { generateSlug } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface FAQCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  order: number;
  isActive: boolean;
  createdAt?: string | Date;
  _count?: {
    faqs: number;
  };
}

export default function FAQCategoriesPage() {
  const [categories, setCategories] = useState<FAQCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<FAQCategory | null>(null);
  const [editingInline, setEditingInline] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'order' | 'name' | 'faqs'>('order');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [reordering, setReordering] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    isActive: true,
    order: 0
  });

  const [inlineFormData, setInlineFormData] = useState({
    name: '',
    slug: '',
    description: '',
  });

  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/faq/categories');
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
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category? All FAQs in this category will be unassigned.')) {
      return;
    }

    setDeletingId(id);
    try {
      const response = await fetch(`/api/admin/faq/categories/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete category');

      toast({
        title: 'Success',
        description: 'Category deleted successfully',
      });

      setCategories(categories.filter(cat => cat.id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete category',
        variant: 'destructive',
      });
    } finally {
      setDeletingId(null);
    }
  };

  const toggleCategoryStatus = async (category: FAQCategory) => {
    try {
      const response = await fetch(`/api/admin/faq/categories/${category.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !category.isActive }),
      });

      if (!response.ok) throw new Error('Failed to update category');

      const updatedCategory = await response.json();
      setCategories(categories.map(c => c.id === category.id ? updatedCategory : c));

      toast({
        title: 'Success',
        description: `Category ${updatedCategory.isActive ? 'activated' : 'deactivated'}`,
      });
    } catch (error) {
      console.error('Error updating category:', error);
      toast({
        title: 'Error',
        description: 'Failed to update category status',
        variant: 'destructive',
      });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    
    try {
      const url = editingCategory 
        ? `/api/admin/faq/categories/${editingCategory.id}`
        : '/api/admin/faq/categories';
      const method = editingCategory ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save category');

      const savedCategory = await response.json();

      if (editingCategory) {
        setCategories(categories.map(c => c.id === savedCategory.id ? savedCategory : c));
      } else {
        setCategories([...categories, savedCategory]);
      }

      toast({
        title: 'Success',
        description: `Category ${editingCategory ? 'updated' : 'created'} successfully`,
      });

      setDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error saving category:', error);
      toast({
        title: 'Error',
        description: 'Failed to save category',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleInlineSave = async (category: FAQCategory) => {
    try {
      const response = await fetch(`/api/admin/faq/categories/${category.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...inlineFormData,
          isActive: category.isActive,
          order: category.order
        }),
      });

      if (!response.ok) throw new Error('Failed to update category');

      const updatedCategory = await response.json();
      setCategories(categories.map(c => c.id === category.id ? updatedCategory : c));

      toast({
        title: 'Success',
        description: 'Category updated successfully',
      });

      setEditingInline(null);
    } catch (error) {
      console.error('Error updating category:', error);
      toast({
        title: 'Error',
        description: 'Failed to update category',
        variant: 'destructive',
      });
    }
  };

  const handleOrderUpdate = async (categoryId: string, newOrder: number) => {
    try {
      const response = await fetch(`/api/admin/faq/categories/${categoryId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: newOrder }),
      });

      if (!response.ok) throw new Error('Failed to update order');

      fetchCategories();
    } catch (error) {
      console.error('Error updating order:', error);
      toast({
        title: 'Error',
        description: 'Failed to update order',
        variant: 'destructive',
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      isActive: true,
      order: categories.length
    });
    setEditingCategory(null);
  };

  const openEditDialog = (category: FAQCategory) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
      isActive: category.isActive,
      order: category.order
    });
    setDialogOpen(true);
  };

  const startInlineEdit = (category: FAQCategory) => {
    setEditingInline(category.id);
    setInlineFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
    });
  };

  const cancelInlineEdit = () => {
    setEditingInline(null);
    setInlineFormData({
      name: '',
      slug: '',
      description: '',
    });
  };

  // Filter and sort categories
  const filteredCategories = categories
    .filter(category => {
      const matchesSearch = 
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (category.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
      
      const matchesStatus = filterStatus === 'all' ||
        (filterStatus === 'active' && category.isActive) ||
        (filterStatus === 'inactive' && !category.isActive);
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'faqs':
          return (b._count?.faqs || 0) - (a._count?.faqs || 0);
        case 'order':
        default:
          return a.order - b.order;
      }
    });

  if (loading) {
    return <CategoriesSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">FAQ Categories</h1>
          <p className="text-muted-foreground">
            Organize FAQs into categories
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <Button onClick={() => { resetForm(); setDialogOpen(true); }}>
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>{editingCategory ? 'Edit Category' : 'Add New Category'}</DialogTitle>
              <DialogDescription>
                {editingCategory ? 'Update the category details below' : 'Create a new FAQ category'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    const slug = generateSlug(name);
                    setFormData({ ...formData, name, slug });
                  }}
                  placeholder="e.g., General Questions"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g., general-questions"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of this category"
                  className="min-h-[100px]"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
                <Label htmlFor="active">Active</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving || !formData.name || !formData.slug}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : editingCategory ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {categories.filter(c => c.isActive).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total FAQs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {categories.reduce((sum, cat) => sum + (cat._count?.faqs || 0), 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Inactive
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {categories.filter(c => !c.isActive).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Categories</CardTitle>
          <CardDescription>
            View and manage FAQ categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterStatus} onValueChange={(v: any) => setFilterStatus(v)}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="order">Order</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="faqs">FAQ Count</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant={reordering ? "default" : "outline"}
              size="sm"
              onClick={() => setReordering(!reordering)}
            >
              <ListOrdered className="mr-2 h-4 w-4" />
              {reordering ? 'Done' : 'Reorder'}
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>FAQs</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      No categories found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCategories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>
                        {reordering ? (
                          <Input
                            type="number"
                            value={category.order}
                            onChange={(e) => handleOrderUpdate(category.id, parseInt(e.target.value) || 0)}
                            className="w-16 h-8"
                            min="0"
                          />
                        ) : (
                          <GripVertical className="h-4 w-4 text-muted-foreground" />
                        )}
                      </TableCell>
                      <TableCell>
                        {editingInline === category.id ? (
                          <div className="space-y-2">
                            <Input
                              value={inlineFormData.name}
                              onChange={(e) => {
                                const name = e.target.value;
                                const slug = generateSlug(name);
                                setInlineFormData({ ...inlineFormData, name, slug });
                              }}
                              className="h-8"
                              autoFocus
                            />
                            <Textarea
                              value={inlineFormData.description}
                              onChange={(e) => setInlineFormData({ ...inlineFormData, description: e.target.value })}
                              placeholder="Description"
                              className="min-h-[60px]"
                            />
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleInlineSave(category)}
                                disabled={!inlineFormData.name}
                              >
                                <Check className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={cancelInlineEdit}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <div className="font-medium flex items-center gap-2">
                              <Tags className="h-4 w-4 text-muted-foreground" />
                              {category.name}
                            </div>
                            {category.description && (
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {category.description}
                              </p>
                            )}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        {editingInline === category.id ? (
                          <Input
                            value={inlineFormData.slug}
                            onChange={(e) => setInlineFormData({ ...inlineFormData, slug: e.target.value })}
                            className="h-8"
                          />
                        ) : (
                          <code className="text-sm bg-muted px-1 py-0.5 rounded">
                            {category.slug}
                          </code>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          <HelpCircle className="mr-1 h-3 w-3" />
                          {category._count?.faqs || 0}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleCategoryStatus(category)}
                          className="h-8 px-2"
                          disabled={editingInline === category.id}
                        >
                          {category.isActive ? (
                            <Badge variant="default">
                              <Eye className="mr-1 h-3 w-3" />
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="outline">
                              <EyeOff className="mr-1 h-3 w-3" />
                              Inactive
                            </Badge>
                          )}
                        </Button>
                      </TableCell>
                      <TableCell className="text-right">
                        {editingInline === category.id ? null : (
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => startInlineEdit(category)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(category.id)}
                              disabled={deletingId === category.id}
                            >
                              {deletingId === category.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CategoriesSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
      
      <div className="grid gap-4 md:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-20" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-96 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}