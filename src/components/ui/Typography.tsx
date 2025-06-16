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
    h1: 'text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900',
    h2: 'text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900',
    h3: 'text-xl md:text-2xl font-bold text-gray-900',
    h4: 'text-lg md:text-xl font-normal text-gray-900',
    body: 'text-base text-gray-700',
    caption: 'text-sm text-gray-500',
    label: 'text-sm font-normal text-gray-700',
  }

  const Component = as || (variant.startsWith('h') ? variant : 'p')

  return (
    <Component className={cn(variants[variant], className)}>
      {children}
    </Component>
  )
} 