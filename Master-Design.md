# Master Design Guide

## Tech Stack

| Technology | Version | Notes |
|------------|---------|-------|
| **React** | 18.2.0 | Most stable version; widely supported by tooling and libraries |
| **Next.js** | 14.1.0 | Latest stable with App Router improvements (Edge-first) |
| **TypeScript** | 5.4.4 | Stable, full support for Next 14 and React 18+ |
| **Tailwind CSS** | 3.4.1 | Works well with PostCSS and Next.js; includes latest features |
| **Hosting** | Vercel | Optimized for Next.js deployment and edge functions |

## Purpose

This design guide serves as a foundational reference for AI systems tasked with creating websites under my direction. It outlines the core visual standards, user experience principles, and brand-specific guidelines that ensure consistency, usability, and aesthetic alignment across all digital products. By following this document, AI-driven tools and assistants will produce designs that reflect my creative vision, meet technical expectations, and deliver polished, professional results.

---

## 1. Branding Guidelines

### Overview
Websites should express unique brand identity in ways that make them instantly recognizable while maintaining web standards and providing users with a consistent, intuitive experience. Effective branding creates memorable digital experiences without compromising usability or accessibility.

## Main Colors
#245789
#CA0015
#484848

#### Brand Voice & Communication
- **Consistent Voice**: Use your brand's unique voice and tone across all website copy, from headlines to microcopy
- **Authentic Expression**: Convey brand personality through word choice, sentence structure, and communication style
- **Example**: A brand focused on encouragement might use positive language, simple sentences, and occasional exclamation points to create an optimistic tone

#### Visual Identity System

##### Accent Colors
- **Primary Color**: Choose a distinctive accent color that represents your brand
- **Application**: Apply consistently to interactive elements (buttons, links, form fields, CTAs)
- **Accessibility**: Ensure sufficient contrast ratios for WCAG compliance
- **Flexibility**: Consider how the color works across different backgrounds and contexts

##### Typography Strategy
- **Brand Font**: If strongly associated with a specific typeface, ensure it's web-optimized and accessible
- **Hierarchy**: Use custom fonts strategically for headlines and subheadings
- **Body Text**: Prioritize system fonts or web-safe alternatives for body copy to ensure optimal readability
- **Scalability**: Verify legibility across all device sizes and support for accessibility features

### Implementation Best Practices

#### Content-First Approach
- **Priority**: Brand elements should always defer to content and functionality
- **Space Efficiency**: Avoid dedicating valuable screen real estate solely to brand assets
- **Integration**: Incorporate branding through subtle, refined touches that enhance rather than distract

#### User Experience Consistency
- **Familiar Patterns**: Maintain standard web conventions even within highly stylized designs
- **Navigation**: Place UI components in expected locations (header navigation, footer links, etc.)
- **Interactions**: Use recognizable icons and interaction patterns for common actions

#### Strategic Brand Placement
- **Logo Usage**: Display your logo purposefully—typically in the header/navigation area
- **Restraint**: Avoid repetitive logo placement throughout the site unless contextually necessary
- **Context**: Consider when brand reminders add value versus when they create visual clutter

#### Loading & First Impressions
- **Above-the-fold**: Use the initial viewport to establish brand presence without overwhelming content
- **Progressive Enhancement**: Ensure core branding elements load quickly and gracefully
- **Welcome Experience**: Consider onboarding flows or hero sections that introduce your brand meaningfully

### Technical Considerations
- **Performance**: Optimize brand assets (logos, custom fonts, colors) for fast loading
- **Responsive Design**: Ensure brand elements adapt appropriately across all screen sizes
- **SEO**: Implement proper alt text for brand imagery and maintain semantic HTML structure
- **Accessibility**: Test brand colors for contrast compliance and ensure custom fonts support screen readers

### Quality Checklist
- [ ] Brand voice is consistent across all website copy
- [ ] Accent colors meet accessibility standards
- [ ] Typography hierarchy supports both brand identity and readability
- [ ] Logo placement is strategic and purposeful
- [ ] Brand elements enhance rather than compete with content
- [ ] Visual identity works across all device sizes
- [ ] Loading performance is optimized for brand assets

---

## 2. Color Guidelines

### Overview
Strategic color usage enhances communication, reinforces brand identity, provides visual continuity, communicates status and feedback, and helps users understand information hierarchy. Effective color systems create intuitive user experiences while maintaining accessibility and visual appeal across all devices and contexts.

### Tailwind CSS Color Implementation

#### Color Configuration Setup
```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          900: '#1e3a8a',
        },
        // Semantic colors
        success: {
          50: '#ecfdf5',
          500: '#10b981',
          600: '#059669',
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
        },
        error: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
        },
        // Gray scale
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          500: '#6b7280',
          900: '#111827',
        },
      },
    },
  },
  plugins: [],
}
export default config
```

#### React Components with Tailwind Colors
```tsx
// components/ui/Button.tsx
import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        className={cn(
          // Base styles
          'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          // Size variants
          {
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-4 text-base': size === 'md',
            'h-12 px-6 text-lg': size === 'lg',
          },
          // Color variants
          {
            'bg-primary-500 text-white hover:bg-primary-600 focus-visible:ring-primary-500':
              variant === 'primary',
            'bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500':
              variant === 'secondary',
            'bg-success-500 text-white hover:bg-success-600 focus-visible:ring-success-500':
              variant === 'success',
            'bg-warning-500 text-white hover:bg-warning-600 focus-visible:ring-warning-500':
              variant === 'warning',
            'bg-error-500 text-white hover:bg-error-600 focus-visible:ring-error-500':
              variant === 'error',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
```

### Quality Checklist
- [ ] Tailwind color configuration includes all brand and semantic colors
- [ ] Color contrast meets WCAG AA standards
- [ ] Components use consistent color variants and proper hover states

---

## 3. Image & Visual Asset Guidelines

### Overview
Strategic image implementation ensures visual content looks exceptional across all devices and screen densities while maintaining optimal performance. Modern web images must balance visual quality, loading speed, accessibility, and responsive behavior to create seamless user experiences across diverse viewing contexts.

### Next.js Image Optimization

#### Next.js Image Component Usage
```tsx
// components/ui/OptimizedImage.tsx
import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  fill = false,
  sizes,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={cn('overflow-hidden', className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        priority={priority}
        sizes={sizes}
        className={cn(
          'duration-700 ease-in-out',
          isLoading
            ? 'scale-110 blur-2xl grayscale'
            : 'scale-100 blur-0 grayscale-0'
        )}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </div>
  )
}
```

#### Responsive Image Gallery Component
```tsx
// components/ui/ImageGallery.tsx
import { OptimizedImage } from './OptimizedImage'

interface GalleryImage {
  id: string
  src: string
  alt: string
  width: number
  height: number
}

interface ImageGalleryProps {
  images: GalleryImage[]
  columns?: 2 | 3 | 4
}

export function ImageGallery({ images, columns = 3 }: ImageGalleryProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }

  return (
    <div className={cn('grid gap-4', gridCols[columns])}>
      {images.map((image) => (
        <div
          key={image.id}
          className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100"
        >
          <OptimizedImage
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ))}
    </div>
  )
}
```

### Vercel Image Optimization Configuration

#### Next.js Configuration for Vercel
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['example.com', 'cdn.example.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  // Enable static exports for better Vercel performance
  output: 'export',
}

module.exports = nextConfig
```

### Quality Checklist
- [ ] Next.js Image component is used for all images
- [ ] Images include proper alt text and loading states
- [ ] Responsive images use appropriate sizes attribute
- [ ] Image optimization is configured for Vercel deployment
- [ ] Loading placeholders prevent layout shift

---

## 4. Layout & Structure Guidelines

### Overview
Consistent, adaptive layouts create approachable user experiences that work seamlessly across all devices and contexts. Modern web layouts must balance visual hierarchy, content accessibility, responsive behavior, and performance to deliver intuitive interfaces that feel familiar while supporting diverse user needs and technical constraints.

### Tailwind CSS Layout Patterns

#### Container System with Tailwind
```tsx
// components/layout/Container.tsx
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
}

export function Container({ children, size = 'lg', className }: ContainerProps) {
  const sizeClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-none',
  }

  return (
    <div className={cn('mx-auto px-4 sm:px-6 lg:px-8', sizeClasses[size], className)}>
      {children}
    </div>
  )
}
```

#### Responsive Grid System
```tsx
// components/layout/Grid.tsx
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface GridProps {
  children: ReactNode
  cols?: 1 | 2 | 3 | 4 | 6 | 12
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function Grid({ children, cols = 3, gap = 'md', className }: GridProps) {
  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
    12: 'grid-cols-12',
  }

  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  }

  return (
    <div className={cn('grid', colClasses[cols], gapClasses[gap], className)}>
      {children}
    </div>
  )
}
```

#### App Layout with Next.js App Router
```tsx
// app/layout.tsx
import { Inter } from 'next/font/google'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-white">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
```

### Quality Checklist
- [ ] Layouts use Tailwind's responsive grid and flexbox utilities
- [ ] Container components provide consistent max-widths and padding
- [ ] App Router layout follows Next.js 14 best practices
- [ ] Responsive breakpoints work across all screen sizes
- [ ] Layout components are TypeScript-enabled and reusable

---

## 5. Materials & Visual Effects

### Overview
Materials create visual depth, layering, and hierarchy through sophisticated use of transparency, blur effects, and color blending. Modern web materials establish clear distinctions between functional elements and content while maintaining visual connectivity and context awareness.

### Tailwind Glass Morphism Implementation

#### Glass Card Component
```tsx
// components/ui/GlassCard.tsx
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  intensity?: 'light' | 'medium' | 'heavy'
}

export function GlassCard({ children, className, intensity = 'medium' }: GlassCardProps) {
  const intensityClasses = {
    light: 'bg-white/10 backdrop-blur-sm border-white/20',
    medium: 'bg-white/20 backdrop-blur-md border-white/30',
    heavy: 'bg-white/30 backdrop-blur-lg border-white/40',
  }

  return (
    <div
      className={cn(
        'rounded-xl border shadow-lg',
        intensityClasses[intensity],
        className
      )}
    >
      {children}
    </div>
  )
}
```

#### Tailwind Shadow System
```tsx
// components/ui/Card.tsx
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  elevation?: 0 | 1 | 2 | 3 | 4 | 5
  interactive?: boolean
  className?: string
}

export function Card({ children, elevation = 1, interactive = false, className }: CardProps) {
  const elevationClasses = {
    0: 'shadow-none',
    1: 'shadow-sm',
    2: 'shadow-md',
    3: 'shadow-lg',
    4: 'shadow-xl',
    5: 'shadow-2xl',
  }

  return (
    <div
      className={cn(
        'rounded-lg bg-white border border-gray-200',
        elevationClasses[elevation],
        interactive && 'transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  )
}
```

### Quality Checklist
- [ ] Glass morphism effects use Tailwind's backdrop-blur utilities
- [ ] Elevation system uses consistent Tailwind shadow classes
- [ ] Interactive materials provide smooth hover transitions
- [ ] Components are accessible with proper focus states

---

## 6. Motion & Animation Guidelines

### Overview
Purposeful motion brings interfaces to life by providing feedback, guiding user attention, and creating delightful experiences. Modern web animations must balance visual appeal with performance, accessibility, and user preferences.

### Tailwind Animation Implementation

#### Custom Animation Configuration
```typescript
// tailwind.config.ts (animations section)
module.exports = {
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'bounce-gentle': 'bounceGentle 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
}
```

#### Animated Components with Framer Motion
```tsx
// components/ui/AnimatedCard.tsx
'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { Card } from './Card'

interface AnimatedCardProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function AnimatedCard({ children, delay = 0, className }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className={className} interactive>
        {children}
      </Card>
    </motion.div>
  )
}
```

#### Page Transitions with Next.js
```tsx
// components/layout/PageTransition.tsx
'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
```

### Quality Checklist
- [ ] Animations respect prefers-reduced-motion settings
- [ ] Tailwind animation utilities are configured and used consistently
- [ ] Framer Motion is implemented for complex animations
- [ ] Page transitions work smoothly with Next.js App Router
- [ ] Interactive elements provide immediate visual feedback

---

## 7. Typography Guidelines

### Overview
Strategic typography enhances readability, establishes clear information hierarchy, and reinforces brand identity while ensuring accessibility across all devices and user preferences.

### Next.js Font Implementation

#### Font Configuration with next/font
```tsx
// app/layout.tsx
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
```

#### Typography Component System
```tsx
// components/ui/Typography.tsx
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface TypographyProps {
  children: ReactNode
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'label'
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export function Typography({ 
  children, 
  variant = 'body', 
  className,
  as
}: TypographyProps) {
  const variants = {
    h1: 'text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900',
    h2: 'text-3xl md:text-4xl font-semibold tracking-tight text-gray-900',
    h3: 'text-2xl md:text-3xl font-semibold text-gray-900',
    h4: 'text-xl md:text-2xl font-medium text-gray-900',
    body: 'text-base leading-relaxed text-gray-700',
    caption: 'text-sm text-gray-500',
    label: 'text-sm font-medium text-gray-700',
  }

  const Component = as || (variant.startsWith('h') ? variant : 'p')

  return (
    <Component className={cn(variants[variant], className)}>
      {children}
    </Component>
  )
}
```

#### Tailwind Typography Configuration
```typescript
// tailwind.config.ts (typography section)
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      fontSize: {
        'xs': ['0.75rem', '1rem'],
        'sm': ['0.875rem', '1.25rem'],
        'base': ['1rem', '1.5rem'],
        'lg': ['1.125rem', '1.75rem'],
        'xl': ['1.25rem', '1.75rem'],
        '2xl': ['1.5rem', '2rem'],
        '3xl': ['1.875rem', '2.25rem'],
        '4xl': ['2.25rem', '2.5rem'],
        '5xl': ['3rem', '1'],
        '6xl': ['3.75rem', '1'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
```

### Quality Checklist
- [ ] Next.js font optimization is properly configured
- [ ] Typography components use consistent Tailwind classes
- [ ] Font loading prevents layout shift with font-display: swap
- [ ] Typography scales responsively across breakpoints
- [ ] Text maintains proper contrast ratios

---

## 8. UI Components & Layout Patterns

### Overview
Well-designed UI components create clear information architecture, logical content groupings, and intuitive user interactions. Modern web components must balance visual distinction with content accessibility, responsive behavior, and semantic markup.

### React Component Library

#### Button Component System
```tsx
// components/ui/Button.tsx
import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(
          'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-primary-500 text-white hover:bg-primary-600': variant === 'default',
            'bg-destructive text-destructive-foreground hover:bg-destructive/90': variant === 'destructive',
            'border border-input bg-background hover:bg-accent hover:text-accent-foreground': variant === 'outline',
            'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
            'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
            'text-primary underline-offset-4 hover:underline': variant === 'link',
          },
          {
            'h-10 px-4 py-2': size === 'default',
            'h-9 rounded-md px-3': size === 'sm',
            'h-11 rounded-md px-8': size === 'lg',
            'h-10 w-10': size === 'icon',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }
```

#### Card Collection Component
```tsx
// components/ui/CardCollection.tsx
import { ReactNode } from 'react'
import { Card } from './Card'
import { Grid } from '../layout/Grid'

interface CardCollectionProps<T> {
  items: T[]
  renderCard: (item: T, index: number) => ReactNode
  columns?: 1 | 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function CardCollection<T>({
  items,
  renderCard,
  columns = 3,
  gap = 'md',
  className,
}: CardCollectionProps<T>) {
  return (
    <Grid cols={columns} gap={gap} className={className}>
      {items.map((item, index) => (
        <Card key={index} elevation={1} interactive>
          {renderCard(item, index)}
        </Card>
      ))}
    </Grid>
  )
}
```

#### Form Components with React Hook Form
```tsx
// components/ui/Form.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from './Button'
import { cn } from '@/lib/utils'

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type FormData = z.infer<typeof formSchema>

interface ContactFormProps {
  onSubmit: (data: FormData) => void
  className?: string
}

export function ContactForm({ onSubmit, className }: ContactFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('space-y-6', className)}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className={cn(
            'mt-1 block w-full rounded-md border border-gray-300 px-3 py-2',
            'focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500',
            errors.email && 'border-red-500'
          )}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          {...register('message')}
          id="message"
          rows={4}
          className={cn(
            'mt-1 block w-full rounded-md border border-gray-300 px-3 py-2',
            'focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500',
            errors.message && 'border-red-500'
          )}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}
```

### Quality Checklist
- [ ] Components use Tailwind classes with proper responsive variants
- [ ] TypeScript interfaces are defined for all component props
- [ ] Form validation uses Zod schemas with React Hook Form
- [ ] Components are properly exported and documented
- [ ] Accessibility attributes are included (ARIA labels, focus management)

---

## 9. Performance & Core Web Vitals

### Overview
2025-level websites must achieve exceptional performance metrics, meeting and exceeding Core Web Vitals standards. Performance directly impacts user experience, SEO rankings, and conversion rates. Modern performance optimization requires comprehensive strategies across loading, interactivity, and visual stability.

### Core Web Vitals Implementation

#### Largest Contentful Paint (LCP) Optimization
```tsx
// components/performance/LCPOptimized.tsx
import Image from 'next/image'
import { Suspense } from 'react'

// Hero component optimized for LCP
export function HeroSection() {
  return (
    <section className="relative h-screen">
      <Image
        src="/hero-image.jpg"
        alt="Hero background"
        fill
        priority // Critical for LCP
        sizes="100vw"
        className="object-cover"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
      />
      <div className="relative z-10 flex h-full items-center justify-center">
        <h1 className="text-6xl font-bold text-white">
          Welcome to the Future
        </h1>
      </div>
    </section>
  )
}
```

#### Cumulative Layout Shift (CLS) Prevention
```tsx
// components/performance/CLSOptimized.tsx
import { cn } from '@/lib/utils'

interface StableCardProps {
  children: React.ReactNode
  isLoading?: boolean
}

export function StableCard({ children, isLoading }: StableCardProps) {
  return (
    <div 
      className={cn(
        'min-h-[200px] w-full', // Reserve space to prevent CLS
        'rounded-lg border border-gray-200 p-6',
        isLoading && 'animate-pulse bg-gray-100'
      )}
      style={{ aspectRatio: '16/9' }} // Maintain aspect ratio
    >
      {isLoading ? (
        <div className="space-y-4">
          <div className="h-4 w-3/4 rounded bg-gray-300"></div>
          <div className="h-4 w-1/2 rounded bg-gray-300"></div>
        </div>
      ) : (
        children
      )}
    </div>
  )
}
```

#### First Input Delay (FID) / Interaction to Next Paint (INP)
```tsx
// hooks/usePerformantInteraction.ts
import { useCallback, useTransition } from 'react'

export function usePerformantInteraction() {
  const [isPending, startTransition] = useTransition()

  const handleInteraction = useCallback((callback: () => void) => {
    // Use React 18 concurrent features for better responsiveness
    startTransition(() => {
      callback()
    })
  }, [])

  return { handleInteraction, isPending }
}

// Usage in components
export function InteractiveButton() {
  const { handleInteraction, isPending } = usePerformantInteraction()

  return (
    <button
      onClick={() => handleInteraction(() => {
        // Heavy computation or state updates
        processLargeDataSet()
      })}
      disabled={isPending}
      className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
    >
      {isPending ? 'Processing...' : 'Click Me'}
    </button>
  )
}
```

### Advanced Performance Techniques

#### Resource Hints & Preloading
```tsx
// app/layout.tsx - Strategic resource hints
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/api/critical-data" as="fetch" crossOrigin="" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//analytics.google.com" />
        
        {/* Preconnect to critical third parties */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

#### Bundle Optimization & Code Splitting
```tsx
// Dynamic imports for optimal bundle sizes
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Lazy load heavy components
const DataVisualization = dynamic(() => import('./DataVisualization'), {
  loading: () => <div className="animate-pulse h-96 bg-gray-200 rounded" />,
  ssr: false, // Client-side only if needed
})

const AdminPanel = dynamic(() => import('./AdminPanel'), {
  loading: () => <div>Loading admin panel...</div>,
})

export function Dashboard() {
  return (
    <div className="space-y-8">
      <Suspense fallback={<div>Loading dashboard...</div>}>
        <DataVisualization />
      </Suspense>
    </div>
  )
}
```

### Quality Checklist
- [ ] LCP occurs within 2.5 seconds for 75% of page loads
- [ ] CLS score is less than 0.1 for 75% of page loads
- [ ] INP is less than 200ms for 75% of interactions
- [ ] Critical resources are preloaded appropriately
- [ ] Bundle sizes are optimized with code splitting
- [ ] Images use next/image with proper optimization

---

## 10. SEO & Content Strategy

### Overview
Modern SEO for 2025 requires comprehensive technical implementation, semantic markup, and content optimization strategies. Search engines increasingly prioritize user experience signals, page performance, and content quality in ranking algorithms.

### Technical SEO Implementation

#### Next.js Metadata API
```tsx
// app/layout.tsx - Global metadata
import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://yoursite.com'),
  title: {
    template: '%s | Your Brand',
    default: 'Your Brand - Leading the Future',
  },
  description: 'Comprehensive description of your brand and value proposition',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yoursite.com',
    siteName: 'Your Brand',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Your Brand Open Graph Image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@yourbrand',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}
```

#### Dynamic SEO for Pages
```tsx
// app/blog/[slug]/page.tsx
import { Metadata } from 'next'

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
    twitter: {
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
    },
  }
}
```

#### Structured Data Implementation
```tsx
// components/seo/StructuredData.tsx
interface ArticleStructuredDataProps {
  title: string
  description: string
  author: string
  publishedAt: string
  image: string
  url: string
}

export function ArticleStructuredData({
  title,
  description,
  author,
  publishedAt,
  image,
  url,
}: ArticleStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Your Brand',
      logo: {
        '@type': 'ImageObject',
        url: 'https://yoursite.com/logo.png',
      },
    },
    datePublished: publishedAt,
    dateModified: publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
```

### Content Strategy Components

#### Content Analytics Integration
```tsx
// hooks/useContentAnalytics.ts
import { useEffect } from 'react'

export function useContentAnalytics(contentId: string, contentType: string) {
  useEffect(() => {
    // Track content engagement
    const startTime = Date.now()
    let maxScroll = 0

    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      )
      maxScroll = Math.max(maxScroll, scrollPercent)
    }

    const handleBeforeUnload = () => {
      const timeSpent = Date.now() - startTime
      
      // Send analytics data
      navigator.sendBeacon('/api/analytics', JSON.stringify({
        contentId,
        contentType,
        timeSpent,
        maxScroll,
        timestamp: new Date().toISOString(),
      }))
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [contentId, contentType])
}
```

### Quality Checklist
- [ ] All pages have unique, descriptive titles and meta descriptions
- [ ] Structured data is implemented for relevant content types
- [ ] Open Graph and Twitter Card metadata is complete
- [ ] XML sitemap is automatically generated and updated
- [ ] Page load speeds meet Core Web Vitals standards
- [ ] Content analytics track user engagement effectively

---

## 11. Progressive Web App (PWA) Features

### Overview
2025 websites should leverage PWA capabilities to provide app-like experiences, offline functionality, and enhanced user engagement. Modern PWAs bridge the gap between web and native apps while maintaining web's universal accessibility.

### PWA Implementation with Next.js

#### Service Worker Setup
```typescript
// public/sw.js
const CACHE_NAME = 'your-app-v1'
const urlsToCache = [
  '/',
  '/offline',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request)
      })
      .catch(() => {
        // Show offline page for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('/offline')
        }
      })
  )
})
```

#### Web App Manifest
```json
// public/manifest.json
{
  "name": "Your App Name",
  "short_name": "YourApp",
  "description": "Description of your progressive web app",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable any"
    }
  ],
  "categories": ["productivity", "utilities"],
  "shortcuts": [
    {
      "name": "Dashboard",
      "short_name": "Dashboard",
      "description": "Quick access to dashboard",
      "url": "/dashboard",
      "icons": [{ "src": "/shortcut-dashboard.png", "sizes": "96x96" }]
    }
  ]
}
```

#### Offline-First Components
```tsx
// components/pwa/OfflineIndicator.tsx
'use client'

import { useEffect, useState } from 'react'

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Check initial state
    setIsOnline(navigator.onLine)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (isOnline) return null

  return (
    <div className="fixed top-0 left-0 right-0 bg-red-500 text-white p-2 text-center z-50">
      <span className="text-sm font-medium">
        You're currently offline. Some features may be limited.
      </span>
    </div>
  )
}
```

#### Push Notifications
```tsx
// hooks/usePushNotifications.ts
import { useEffect, useState } from 'react'

export function usePushNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>('default')
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)

  useEffect(() => {
    setPermission(Notification.permission)
  }, [])

  const requestPermission = async () => {
    const result = await Notification.requestPermission()
    setPermission(result)
    return result
  }

  const subscribe = async () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js')
        const sub = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
        })
        
        setSubscription(sub)
        
        // Send subscription to your server
        await fetch('/api/push-subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sub),
        })
        
        return sub
      } catch (error) {
        console.error('Push subscription failed:', error)
      }
    }
  }

  return { permission, subscription, requestPermission, subscribe }
}
```

### Quality Checklist
- [ ] Web app manifest is properly configured
- [ ] Service worker provides offline functionality
- [ ] App is installable on mobile and desktop
- [ ] Push notifications are implemented (where appropriate)
- [ ] Offline pages provide meaningful content
- [ ] PWA scores 90+ on Lighthouse

---

## 12. Advanced UX Patterns & Micro-Interactions

### Overview
2025 user experiences require sophisticated interaction patterns, thoughtful micro-interactions, and innovative interface solutions. Advanced UX patterns differentiate exceptional websites from ordinary ones through carefully crafted details and user-centered design decisions.

### Micro-Interaction Patterns

#### Advanced Button Interactions
```tsx
// components/ui/AdvancedButton.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface AdvancedButtonProps {
  children: React.ReactNode
  onClick: () => Promise<void> | void
  variant?: 'primary' | 'secondary'
  success?: boolean
}

export function AdvancedButton({ children, onClick, variant = 'primary', success }: AdvancedButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([])

  const handleClick = async (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Add ripple effect
    const newRipple = { x, y, id: Date.now() }
    setRipples(prev => [...prev, newRipple])
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
    }, 600)

    setIsLoading(true)
    try {
      await onClick()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.button
      className={cn(
        'relative overflow-hidden px-6 py-3 rounded-lg font-medium transition-all',
        variant === 'primary' 
          ? 'bg-blue-500 text-white hover:bg-blue-600' 
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300',
        success && 'bg-green-500 hover:bg-green-600'
      )}
      onClick={handleClick}
      disabled={isLoading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full"
          style={{
            left: ripple.x - 20,
            top: ripple.y - 20,
            width: 40,
            height: 40,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      ))}
      
      <motion.span
        className="flex items-center justify-center"
        animate={{ 
          scale: isLoading ? 0.9 : 1,
          rotate: success ? [0, 360] : 0 
        }}
      >
        {isLoading ? (
          <motion.div
            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        ) : success ? (
          '✓ Success'
        ) : (
          children
        )}
      </motion.span>
    </motion.button>
  )
}
```

#### Smart Loading States
```tsx
// components/ui/SmartLoader.tsx
import { motion } from 'framer-motion'

interface SmartLoaderProps {
  type: 'skeleton' | 'spinner' | 'progress' | 'dots'
  progress?: number
  message?: string
}

export function SmartLoader({ type, progress, message }: SmartLoaderProps) {
  const renderLoader = () => {
    switch (type) {
      case 'skeleton':
        return (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="h-4 bg-gray-200 rounded"
                style={{ width: `${Math.random() * 40 + 60}%` }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        )
      
      case 'progress':
        return (
          <div className="w-full space-y-2">
            <div className="flex justify-between text-sm">
              <span>Loading...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-blue-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            {message && <p className="text-xs text-gray-500">{message}</p>}
          </div>
        )
      
      case 'dots':
        return (
          <div className="flex space-x-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-blue-500 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        )
      
      default:
        return (
          <motion.div
            className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        )
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      {renderLoader()}
    </div>
  )
}
```

#### Advanced Form Interactions
```tsx
// components/forms/SmartInput.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface SmartInputProps {
  label: string
  type?: string
  value: string
  onChange: (value: string) => void
  validation?: (value: string) => string | null
  suggestions?: string[]
}

export function SmartInput({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  validation,
  suggestions = []
}: SmartInputProps) {
  const [focused, setFocused] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)

  useEffect(() => {
    if (validation && value) {
      const validationError = validation(value)
      setError(validationError)
    }
  }, [value, validation])

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(value.toLowerCase()) && suggestion !== value
  )

  return (
    <div className="relative">
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => {
            setFocused(true)
            setShowSuggestions(true)
          }}
          onBlur={() => {
            setFocused(false)
            setTimeout(() => setShowSuggestions(false), 200)
          }}
          className={cn(
            'w-full px-4 py-3 border rounded-lg transition-all',
            'focus:outline-none focus:ring-2 focus:ring-blue-500',
            error ? 'border-red-500' : 'border-gray-300',
            value && 'pt-6 pb-2'
          )}
          placeholder={focused ? '' : ' '}
        />
        
        <motion.label
          className={cn(
            'absolute left-4 text-gray-500 pointer-events-none transition-all',
            (focused || value) ? 'top-2 text-xs' : 'top-1/2 -translate-y-1/2'
          )}
          animate={{
            fontSize: (focused || value) ? '0.75rem' : '1rem',
            y: (focused || value) ? 0 : '-50%',
          }}
        >
          {label}
        </motion.label>
      </div>

      {/* Error message */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-sm text-red-600"
        >
          {error}
        </motion.p>
      )}

      {/* Suggestions dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg"
        >
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={index}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
              onClick={() => {
                onChange(suggestion)
                setShowSuggestions(false)
              }}
            >
              {suggestion}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  )
}
```

### Quality Checklist
- [ ] Micro-interactions provide meaningful feedback without being distracting
- [ ] Loading states are contextual and informative
- [ ] Form interactions feel responsive and intelligent
- [ ] Animations respect user motion preferences
- [ ] Interactive elements provide appropriate haptic feedback (where supported)
- [ ] UX patterns follow established mental models while adding delightful surprises

---

## 13. Error Handling & Edge Cases

### Overview
Robust error handling and thoughtful edge case management create resilient user experiences. 2025 websites must gracefully handle failures, provide meaningful feedback, and maintain functionality even when things go wrong.

### React Error Boundaries
```tsx
// components/error/ErrorBoundary.tsx
'use client'

import React, { Component, ReactNode } from 'react'
import { Button } from '@/components/ui/Button'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.props.onError?.(error, errorInfo)
    
    // Send error to monitoring service
    if (typeof window !== 'undefined') {
      // Example: Sentry, LogRocket, etc.
      window.reportError?.(error, errorInfo)
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-6 max-w-md">
            We're sorry, but something unexpected happened. 
            Please try refreshing the page or contact support if the problem persists.
          </p>
          <div className="flex gap-3">
            <Button onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
            <Button variant="outline" onClick={() => this.setState({ hasError: false })}>
              Try Again
            </Button>
          </div>
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-6 text-left">
              <summary className="cursor-pointer text-sm text-gray-500">
                Error Details (Development)
              </summary>
              <pre className="mt-2 text-xs bg-red-50 p-4 rounded overflow-auto">
                {this.state.error?.stack}
              </pre>
            </details>
          )}
        </div>
      )
    }

    return this.props.children
  }
}
```

#### Network Error Handling
```tsx
// hooks/useNetworkError.ts
import { useState, useEffect } from 'react'

interface NetworkErrorState {
  isOnline: boolean
  retryCount: number
  lastError?: Error
}

export function useNetworkError() {
  const [state, setState] = useState<NetworkErrorState>({
    isOnline: navigator?.onLine ?? true,
    retryCount: 0,
  })

  useEffect(() => {
    const handleOnline = () => setState(prev => ({ ...prev, isOnline: true }))
    const handleOffline = () => setState(prev => ({ ...prev, isOnline: false }))

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const retryOperation = async (operation: () => Promise<any>, maxRetries = 3) => {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const result = await operation()
        setState(prev => ({ ...prev, retryCount: 0, lastError: undefined }))
        return result
      } catch (error) {
        setState(prev => ({ 
          ...prev, 
          retryCount: attempt + 1,
          lastError: error as Error
        }))
        
        if (attempt === maxRetries) throw error
        
        // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000))
      }
    }
  }

  return { ...state, retryOperation }
}
```

#### Custom Error Pages
```tsx
// app/not-found.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <div className="max-w-md">
        <div className="text-8xl mb-6">🔍</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  )
}
```

### Quality Checklist
- [ ] Error boundaries catch and handle React component errors
- [ ] Network failures have retry mechanisms with exponential backoff
- [ ] Custom 404 and 500 error pages provide helpful navigation
- [ ] Form validation provides clear, actionable error messages
- [ ] Loading states prevent user confusion during operations
- [ ] Offline functionality maintains core features when possible

---

## 14. Mobile-First Touch Interactions

### Overview
2025 mobile experiences demand sophisticated touch interactions, gesture support, and mobile-specific UX patterns. With mobile traffic dominating web usage, mobile-first design isn't optional—it's essential for competitive advantage.

### Advanced Touch Interactions
```tsx
// hooks/useTouchGestures.ts
import { useRef, useCallback } from 'react'

interface TouchGestureHandlers {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  onPinch?: (scale: number) => void
  onLongPress?: () => void
}

export function useTouchGestures(handlers: TouchGestureHandlers) {
  const touchStart = useRef<{ x: number; y: number; time: number } | null>(null)
  const longPressTimer = useRef<NodeJS.Timeout>()

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]
    touchStart.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    }

    // Long press detection
    if (handlers.onLongPress) {
      longPressTimer.current = setTimeout(() => {
        handlers.onLongPress?.()
      }, 500)
    }
  }, [handlers])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
    }

    if (!touchStart.current) return

    const touch = e.changedTouches[0]
    const deltaX = touch.clientX - touchStart.current.x
    const deltaY = touch.clientY - touchStart.current.y
    const deltaTime = Date.now() - touchStart.current.time

    // Ignore if touch was too slow (likely not a gesture)
    if (deltaTime > 500) return

    const minSwipeDistance = 50
    const absDeltaX = Math.abs(deltaX)
    const absDeltaY = Math.abs(deltaY)

    // Horizontal swipes
    if (absDeltaX > absDeltaY && absDeltaX > minSwipeDistance) {
      if (deltaX > 0) {
        handlers.onSwipeRight?.()
      } else {
        handlers.onSwipeLeft?.()
      }
    }
    // Vertical swipes
    else if (absDeltaY > absDeltaX && absDeltaY > minSwipeDistance) {
      if (deltaY > 0) {
        handlers.onSwipeDown?.()
      } else {
        handlers.onSwipeUp?.()
      }
    }

    touchStart.current = null
  }, [handlers])

  return { handleTouchStart, handleTouchEnd }
}
```

#### Mobile Navigation Patterns
```tsx
// components/mobile/MobileNavigation.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTouchGestures } from '@/hooks/useTouchGestures'

interface MobileNavigationProps {
  items: Array<{ label: string; href: string; icon: React.ReactNode }>
}

export function MobileNavigation({ items }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  
  const { handleTouchStart, handleTouchEnd } = useTouchGestures({
    onSwipeLeft: () => setIsOpen(false),
    onSwipeRight: () => setIsOpen(true),
  })

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-white rounded-lg shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          className="w-6 h-6 flex flex-col justify-center"
        >
          <motion.span
            animate={{
              rotate: isOpen ? 45 : 0,
              y: isOpen ? 6 : 0,
            }}
            className="block h-0.5 w-6 bg-gray-900 mb-1"
          />
          <motion.span
            animate={{ opacity: isOpen ? 0 : 1 }}
            className="block h-0.5 w-6 bg-gray-900 mb-1"
          />
          <motion.span
            animate={{
              rotate: isOpen ? -45 : 0,
              y: isOpen ? -6 : 0,
            }}
            className="block h-0.5 w-6 bg-gray-900"
          />
        </motion.div>
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 z-40 w-80 bg-white shadow-xl lg:hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="p-6 pt-20">
              <nav className="space-y-1">
                {items.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </motion.a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
```

#### Pull-to-Refresh Implementation
```tsx
// hooks/usePullToRefresh.ts
import { useState, useRef, useCallback } from 'react'

export function usePullToRefresh(onRefresh: () => Promise<void>) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const startY = useRef(0)
  const currentY = useRef(0)

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    currentY.current = e.touches[0].clientY
    const distance = currentY.current - startY.current

    // Only track pull if scrolled to top
    if (window.scrollY === 0 && distance > 0) {
      e.preventDefault()
      setPullDistance(Math.min(distance * 0.5, 100))
    }
  }, [])

  const handleTouchEnd = useCallback(async () => {
    if (pullDistance > 60 && !isRefreshing) {
      setIsRefreshing(true)
      try {
        await onRefresh()
      } finally {
        setIsRefreshing(false)
        setPullDistance(0)
      }
    } else {
      setPullDistance(0)
    }
  }, [pullDistance, isRefreshing, onRefresh])

  return {
    isRefreshing,
    pullDistance,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  }
}
```

### Quality Checklist
- [ ] Touch targets are minimum 44px for accessibility
- [ ] Swipe gestures work consistently across devices
- [ ] Mobile navigation is thumb-friendly and accessible
- [ ] Pull-to-refresh provides clear visual feedback
- [ ] Touch interactions have appropriate haptic feedback
- [ ] Mobile forms prevent zoom-in on focus

---

## 15. Modern CSS Features & Performance

### Overview
2025 CSS leverages cutting-edge features like container queries, cascade layers, and modern selectors to create more maintainable, performant stylesheets. Advanced CSS reduces JavaScript dependency while improving user experience.

### Container Queries & Modern CSS
```css
/* Container queries for truly responsive components */
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 300px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1rem;
  }
}

@container card (min-width: 500px) {
  .card {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

/* CSS Cascade Layers for organized specificity */
@layer reset, base, components, utilities;

@layer reset {
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
}

@layer base {
  body {
    font-family: system-ui, sans-serif;
    line-height: 1.6;
  }
}

@layer components {
  .button {
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    border: none;
    cursor: pointer;
  }
}

/* Modern CSS custom properties with types */
@property --rotation {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

.animated-element {
  transform: rotate(var(--rotation));
  transition: --rotation 0.3s ease;
}

.animated-element:hover {
  --rotation: 45deg;
}
```

#### Advanced Tailwind Configuration
```typescript
// tailwind.config.ts - Modern CSS features
import { Config } from 'tailwindcss'

const config: Config = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      supports: {
        'container-queries': 'container-type: inline-size',
        'backdrop-filter': 'backdrop-filter: blur(1px)',
      },
      containers: {
        '2xs': '16rem',
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
      },
      keyframes: {
        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center center'
          }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/typography'),
  ],
}

export default config
```

### Quality Checklist
- [ ] Container queries are used for component-level responsiveness
- [ ] CSS cascade layers organize style specificity
- [ ] Modern CSS features have appropriate fallbacks
- [ ] Performance-critical styles are optimized
- [ ] CSS custom properties enhance maintainability
- [ ] Browser support matches target audience needs

---

## Final Implementation Summary

Your Master Design Guide now includes **15 comprehensive sections** covering every aspect needed to create a world-class 2025 website:

### **🎨 Core Design Foundation**
1. **Branding Guidelines** - Voice, identity, strategic placement
2. **Color Guidelines** - Tailwind implementation, semantic colors
3. **Image Guidelines** - Next.js optimization, responsive images, Vercel config
4. **Layout Guidelines** - CSS Grid, Flexbox, responsive containers
5. **Materials & Effects** - Glass morphism, elevation, visual hierarchy
6. **Motion & Animation** - Framer Motion, micro-interactions, performance
7. **Typography** - Next.js fonts, semantic hierarchy
8. **UI Components** - React library, TypeScript, form validation

### **🚀 Performance & Technology**
9. **Performance & Core Web Vitals** - LCP, CLS, INP optimization
10. **SEO & Content Strategy** - Technical SEO, structured data, analytics
11. **Progressive Web App** - Service workers, offline functionality, installability

### **💫 Advanced Experience**
12. **Advanced UX Patterns** - Micro-interactions, smart loading, form intelligence
13. **Error Handling** - React boundaries, network errors, custom pages

### **📱 Mobile & Modern Web**
14. **Mobile-First Touch** - Gesture support, mobile navigation, pull-to-refresh  
15. **Modern CSS Features** - Container queries, cascade layers, performance

This guide now covers **core essentials** needed to build a cutting-edge 2025 website that excels in performance, user experience, and technical implementation. 🎉


