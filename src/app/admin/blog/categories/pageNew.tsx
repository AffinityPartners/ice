'use client';

import { useState, useEffect } from 'react';
import { 
  Tags, 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X,
  Check,
  AlertCircle
} from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  _count?: {
    posts: number;
  };
}

export default function BlogCategoriesPage() {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [addingNew, setAddingNew] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<BlogCategory | null>(null);
  const [formData, setFormData] = useState({
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
      const response = await fetch('/api/admin/blog/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        throw new Error('Failed to fetch categories');
      }
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

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();
  };

  const handleEdit = (category: BlogCategory) => {
    setEditingId(category.id);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || '',
    });
  };

  const handleSave = async (id?: string) => {
    const isNew = !id;
    const url = isNew ? '/api/admin/blog/categories' : `/api/admin/blog/categories/${id}`;
    
    try {
      const response = await fetch(url, {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const savedCategory = await response.json();
        
        if (isNew) {
          setCategories([savedCategory, ...categories]);
          setAddingNew(false);
        } else {
          setCategories(categories.map(cat => 
            cat.id === id ? savedCategory : cat
          ));
          setEditingId(null);
        }

        toast({
          title: 'Success',
          description: `Category ${isNew ? 'created' : 'updated'} successfully`,
        });

        setFormData({ name: '', slug: '', description: '' });
      } else {
        throw new Error('Failed to save category');
      }
    } catch (error) {
      console.error('Error saving category:', error);
      toast({
        title: 'Error',
        description: 'Failed to save category',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async () => {
    if (!categoryToDelete) return;

    try {
      const response = await fetch(`/api/admin/blog/categories/${categoryToDelete.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCategories(categories.filter(cat => cat.id !== categoryToDelete.id));
        toast({
          title: 'Success',
          description: 'Category deleted successfully',
        });
      } else {
        throw new Error('Failed to delete category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete category',
        variant: 'destructive',
      });
    } finally {
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
    }
  };

  const toggleActive = async (category: BlogCategory) => {
    try {
      const response = await fetch(`/api/admin/blog/categories/${category.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !category.isActive }),
      });

      if (response.ok) {
        const updatedCategory = await response.json();
        setCategories(categories.map(cat => 
          cat.id === category.id ? updatedCategory : cat
        ));
        toast({
          title: 'Success',
          description: `Category ${updatedCategory.isActive ? 'activated' : 'deactivated'}`,
        });
      } else {
        throw new Error('Failed to update category status');
      }
    } catch (error) {
      console.error('Error toggling category status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update category status',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return <CategoriesSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Blog Categories</h1>
          <p className="text-muted-foreground">
            Manage categories for your blog posts
          </p>
        </div>
        <Button
          onClick={() => setAddingNew(true)}
          disabled={addingNew}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      {/* Categories Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Categories</CardTitle>
          <CardDescription>
            {categories.length} {categories.length === 1 ? 'category' : 'categories'} total
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Posts</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {addingNew && (
                  <TableRow>
                    <TableCell>
                      <Input
                        value={formData.name}
                        onChange={(e) => {
                          const name = e.target.value;
                          setFormData({
                            ...formData,
                            name,
                            slug: generateSlug(name),
                          });
                        }}
                        placeholder="Category name"
                        className="max-w-[200px]"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        placeholder="category-slug"
                        className="max-w-[200px]"
                      />
                    </TableCell>
                    <TableCell>
                      <Textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Description (optional)"
                        className="max-w-[300px] h-20"
                      />
                    </TableCell>
                    <TableCell>0</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Active</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleSave()}
                          disabled={!formData.name || !formData.slug}
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setAddingNew(false);
                            setFormData({ name: '', slug: '', description: '' });
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
                
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      {editingId === category.id ? (
                        <Input
                          value={formData.name}
                          onChange={(e) => {
                            const name = e.target.value;
                            setFormData({
                              ...formData,
                              name,
                              slug: generateSlug(name),
                            });
                          }}
                          className="max-w-[200px]"
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <Tags className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{category.name}</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === category.id ? (
                        <Input
                          value={formData.slug}
                          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                          className="max-w-[200px]"
                        />
                      ) : (
                        <code className="text-sm bg-muted px-2 py-1 rounded">
                          {category.slug}
                        </code>
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === category.id ? (
                        <Textarea
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          className="max-w-[300px] h-20"
                        />
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          {category.description || '-'}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {category._count?.posts || 0} posts
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={category.isActive ? 'default' : 'secondary'}
                        className="cursor-pointer"
                        onClick={() => toggleActive(category)}
                      >
                        {category.isActive ? (
                          <>
                            <Check className="mr-1 h-3 w-3" />
                            Active
                          </>
                        ) : (
                          <>
                            <X className="mr-1 h-3 w-3" />
                            Inactive
                          </>
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {editingId === category.id ? (
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleSave(category.id)}
                            disabled={!formData.name || !formData.slug}
                          >
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingId(null);
                              setFormData({ name: '', slug: '', description: '' });
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEdit(category)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setCategoryToDelete(category);
                              setDeleteDialogOpen(true);
                            }}
                            disabled={Boolean(category._count?.posts && category._count.posts > 0)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                
                {categories.length === 0 && !addingNew && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="text-muted-foreground">
                        <AlertCircle className="mx-auto h-8 w-8 mb-2" />
                        <p>No categories found</p>
                        <p className="text-sm">Create your first category to get started</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{categoryToDelete?.name}"? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
      
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}