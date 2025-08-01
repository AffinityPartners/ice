import { prisma } from '@/lib/prisma';
import BlogPostForm from '@/components/admin/blog/BlogPostForm';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditBlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const post = await prisma.post.findUnique({
    where: { id: resolvedParams.id },
    include: { category: true },
  });

  if (!post) {
    notFound();
  }

  const initialData = {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || '',
    content: post.content,
    image: post.image || '',
    categoryId: post.categoryId || '',
    tags: post.tags || [],
    metaTitle: post.metaTitle || '',
    metaDescription: post.metaDescription || '',
    metaKeywords: post.metaKeywords || '',
    ogImage: post.ogImage || '',
    canonicalUrl: post.canonicalUrl || '',
    published: post.published,
    featuredOrder: post.featuredOrder,
    readingTime: String(post.readingTime || ''),
    publishedAt: post.publishedAt ? post.publishedAt.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
  };

  return <BlogPostForm initialData={initialData} postId={resolvedParams.id} />;
}