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
    h1: 'text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white',
    h2: 'text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white',
    h3: 'text-xl md:text-2xl font-semibold text-gray-900 dark:text-white',
    h4: 'text-lg md:text-xl font-medium text-gray-900 dark:text-white',
    body: 'text-base leading-relaxed text-gray-700 dark:text-gray-300',
    caption: 'text-sm text-gray-500 dark:text-gray-400',
    label: 'text-sm font-medium text-gray-700 dark:text-gray-300',
  }

  const Component = as || (variant.startsWith('h') ? variant : 'p')

  return (
    <Component className={cn(variants[variant], className)}>
      {children}
    </Component>
  )
} 