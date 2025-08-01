'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  loading?: boolean;
  color?: 'blue' | 'purple' | 'green' | 'orange' | 'pink' | 'indigo' | 'cyan';
}

export default function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
  loading = false,
  color = 'blue',
}: StatsCardProps) {
  const colorVariants = {
    blue: 'from-blue-50 to-blue-100 dark:from-blue-950/80 dark:to-blue-900/80',
    purple: 'from-purple-50 to-purple-100 dark:from-purple-950/80 dark:to-purple-900/80',
    green: 'from-green-50 to-green-100 dark:from-green-950/80 dark:to-green-900/80',
    orange: 'from-orange-50 to-orange-100 dark:from-orange-950/80 dark:to-orange-900/80',
    pink: 'from-pink-50 to-pink-100 dark:from-pink-950/80 dark:to-pink-900/80',
    indigo: 'from-indigo-50 to-indigo-100 dark:from-indigo-950/80 dark:to-indigo-900/80',
    cyan: 'from-cyan-50 to-cyan-100 dark:from-cyan-950/80 dark:to-cyan-900/80',
  };
  
  const iconColors = {
    blue: 'text-blue-600 dark:text-blue-400',
    purple: 'text-purple-600 dark:text-purple-400',
    green: 'text-green-600 dark:text-green-400',
    orange: 'text-orange-600 dark:text-orange-400',
    pink: 'text-pink-600 dark:text-pink-400',
    indigo: 'text-indigo-600 dark:text-indigo-400',
    cyan: 'text-cyan-600 dark:text-cyan-400',
  };
  if (loading) {
    return (
      <Card className={cn("relative overflow-hidden", className)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="h-4 w-24 bg-muted animate-pulse rounded" />
          <div className="h-8 w-8 bg-muted animate-pulse rounded" />
        </CardHeader>
        <CardContent>
          <div className="h-8 w-32 bg-muted animate-pulse rounded mb-2" />
          <div className="h-3 w-20 bg-muted animate-pulse rounded" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn(
      "relative overflow-hidden transition-all hover:shadow-xl hover:scale-[1.02]",
      className
    )}>
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br",
        colorVariants[color]
      )} />
      <div className="absolute inset-0 bg-white/80 dark:bg-gray-950/80" />
      <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-base font-semibold text-gray-800 dark:text-gray-200">
          {title}
        </CardTitle>
        <div className={cn(
          "h-10 w-10 rounded-xl flex items-center justify-center"
        )}>
          <Icon className={cn("h-5 w-5", iconColors[color])} />
        </div>
      </CardHeader>
      <CardContent className="relative">
        <div className="text-3xl font-bold tracking-tight mb-1">{value}</div>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">
            {description}
          </p>
        )}
        {trend && (
          <div className="flex items-center gap-2 mt-3">
            <div
              className={cn(
                "text-sm font-semibold flex items-center gap-1 px-2 py-1 rounded-full",
                trend.isPositive 
                  ? "text-green-800 bg-green-100 dark:text-green-300 dark:bg-green-900/50" 
                  : "text-red-800 bg-red-100 dark:text-red-300 dark:bg-red-900/50"
              )}
            >
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </div>
            <span className="text-sm text-muted-foreground">vs last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}