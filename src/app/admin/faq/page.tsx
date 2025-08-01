'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Edit, Trash2, Eye, EyeOff, Plus, Search, Tags, HelpCircle, GripVertical } from 'lucide-react';
import { format } from 'date-fns';
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
  DialogTrigger,
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

interface FAQ {
  id: string;
  question: string;
  answer: string;
  isActive: boolean | null;
  order: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<any[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    categoryId: '',
    isActive: true,
    order: 0
  });
  const [savingFAQ, setSavingFAQ] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchFAQs();
    fetchCategories();
  }, []);

  const fetchFAQs = async () => {
    try {
      const response = await fetch('/api/admin/faq');
      if (!response.ok) throw new Error('Failed to fetch FAQs');
      const data = await response.json();
      setFaqs(data);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      toast({
        title: 'Error',
        description: 'Failed to load FAQs',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/faq/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) {
      return;
    }

    setDeletingId(id);
    try {
      const response = await fetch(`/api/admin/faq/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete FAQ');

      toast({
        title: 'Success',
        description: 'FAQ deleted successfully',
      });

      setFaqs(faqs.filter(faq => faq.id !== id));
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete FAQ',
        variant: 'destructive',
      });
    } finally {
      setDeletingId(null);
    }
  };

  const toggleFAQStatus = async (faq: FAQ) => {
    try {
      const response = await fetch(`/api/admin/faq/${faq.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !faq.isActive }),
      });

      if (!response.ok) throw new Error('Failed to update FAQ');

      const updatedFAQ = await response.json();
      setFaqs(faqs.map(f => f.id === faq.id ? updatedFAQ : f));

      toast({
        title: 'Success',
        description: `FAQ ${updatedFAQ.isActive ? 'activated' : 'deactivated'}`,
      });
    } catch (error) {
      console.error('Error updating FAQ:', error);
      toast({
        title: 'Error',
        description: 'Failed to update FAQ status',
        variant: 'destructive',
      });
    }
  };

  const handleSave = async () => {
    setSavingFAQ(true);
    
    try {
      const url = editingFAQ 
        ? `/api/admin/faq/${editingFAQ.id}`
        : '/api/admin/faq';
      const method = editingFAQ ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save FAQ');

      const savedFAQ = await response.json();

      if (editingFAQ) {
        setFaqs(faqs.map(f => f.id === savedFAQ.id ? savedFAQ : f));
      } else {
        setFaqs([savedFAQ, ...faqs]);
      }

      toast({
        title: 'Success',
        description: `FAQ ${editingFAQ ? 'updated' : 'created'} successfully`,
      });

      setDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error saving FAQ:', error);
      toast({
        title: 'Error',
        description: 'Failed to save FAQ',
        variant: 'destructive',
      });
    } finally {
      setSavingFAQ(false);
    }
  };

  const resetForm = () => {
    setFormData({
      question: '',
      answer: '',
      categoryId: '',
      isActive: true,
      order: 0
    });
    setEditingFAQ(null);
  };

  const openEditDialog = (faq: FAQ) => {
    setEditingFAQ(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      categoryId: faq.category?.id || '',
      isActive: faq.isActive ?? true,
      order: faq.order ?? 0
    });
    setDialogOpen(true);
  };

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category?.id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <FAQSkeleton />;
  }

  return (
    <div className="space-y-6">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="action" onClick={() => resetForm()} className="hidden">
            <Plus className="mr-2 h-4 w-4" />
            Add FAQ
          </Button>
        </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>{editingFAQ ? 'Edit FAQ' : 'Add New FAQ'}</DialogTitle>
              <DialogDescription>
                {editingFAQ ? 'Update the FAQ details below' : 'Create a new frequently asked question'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="question">Question</Label>
                <Input
                  id="question"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="Enter the question"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="answer">Answer</Label>
                <Textarea
                  id="answer"
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  placeholder="Enter the answer"
                  className="min-h-[150px]"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
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
                              <Button variant="action" onClick={handleSave} disabled={savingFAQ || !formData.question || !formData.answer}>
                  {savingFAQ ? 'Saving...' : editingFAQ ? 'Update' : 'Create'}
                </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total FAQs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{faqs.length}</div>
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
              {faqs.filter(f => f.isActive).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
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
              {faqs.filter(f => !f.isActive).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Table */}
      <Card>
        <CardHeader>
          <CardTitle>All FAQs</CardTitle>
          <CardDescription>
            View and manage all frequently asked questions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Question</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFAQs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      No FAQs found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredFAQs.map((faq, index) => (
                    <TableRow key={faq.id}>
                      <TableCell>
                        <GripVertical className="h-4 w-4 text-muted-foreground" />
                      </TableCell>
                      <TableCell>
                        <div className="max-w-md">
                          <div className="font-medium flex items-center gap-2">
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                            {faq.question}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                            {faq.answer}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {faq.category ? (
                          <Badge variant="secondary">
                            <Tags className="mr-1 h-3 w-3" />
                            {faq.category.name}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFAQStatus(faq)}
                          className="h-8 px-2"
                        >
                          {faq.isActive ? (
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
                      <TableCell>
                        {faq.updatedAt && (
                          <span className="text-sm text-muted-foreground">
                            {format(new Date(faq.updatedAt), 'MMM d, yyyy')}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(faq)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(faq.id)}
                            disabled={deletingId === faq.id}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
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

function FAQSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-24" />
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