'use client'

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  image: string
  imageAlt: string
  category: string
  readTime: string
  author?: string
}

interface BlogCardProps {
  post: BlogPost
  variant?: 'default' | 'horizontal' | 'featured'
  priority?: boolean
}

export function BlogCard({ post, variant = 'default', priority = false }: BlogCardProps) {
  const cardContent = (
    <>
      {variant === 'horizontal' ? (
        <div className="md:flex">
          <div className="md:w-1/3">
            <Image
              src={post.image}
              alt={post.imageAlt}
              width={300}
              height={200}
              className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
              priority={priority}
            />
          </div>
          <div className="md:w-2/3 p-6">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
              <div className="flex items-center space-x-3">
                <span className="bg-[#CA0015] text-white px-2 py-1 rounded text-xs font-medium">
                  {post.category}
                </span>
                <span>{post.date}</span>
              </div>
              <span>{post.readTime}</span>
            </div>
            <h3 className="text-xl font-bold text-[#245789] mb-3 group-hover:text-[#CA0015] transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-gray-700 leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
            {post.author && (
              <div className="mt-4 text-sm text-gray-600">
                By {post.author}
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="relative overflow-hidden">
            <Image
              src={post.image}
              alt={post.imageAlt}
              width={variant === 'featured' ? 800 : 600}
              height={variant === 'featured' ? 400 : 300}
              className={`w-full ${variant === 'featured' ? 'h-80' : 'h-64'} object-cover group-hover:scale-105 transition-transform duration-300`}
              priority={priority}
            />
            {/* Category Badge */}
            <div className="absolute top-4 left-4 bg-[#CA0015] text-white px-3 py-1 rounded-full text-sm font-medium">
              {post.category}
            </div>
          </div>
          <div className={`p-6 flex flex-col flex-grow ${variant === 'featured' ? 'p-8' : ''}`}>
            <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </div>
            <h3 className={`${variant === 'featured' ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'} font-bold text-[#245789] mb-4 group-hover:text-[#CA0015] transition-colors line-clamp-2`}>
              {post.title}
            </h3>
            <p className={`text-gray-700 leading-relaxed mb-4 flex-grow ${variant === 'featured' ? 'text-lg' : ''} line-clamp-3`}>
              {post.excerpt}
            </p>
            {post.author && (
              <div className="text-sm text-gray-600 mb-4">
                By {post.author}
              </div>
            )}
            <div className="flex items-center text-[#245789] font-medium group-hover:text-[#CA0015] transition-colors mt-auto">
              <span>Read More</span>
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </>
      )}
    </>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <Link href={`/blog/${post.id}`} className="block h-full">
        <div className={`
          bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group h-full 
          ${variant === 'default' ? 'flex flex-col' : ''}
          ${variant === 'featured' ? 'border-2 border-[#245789]/10' : ''}
        `}>
          {cardContent}
        </div>
      </Link>
    </motion.div>
  )
} 