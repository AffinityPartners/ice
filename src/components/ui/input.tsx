import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Input component optimized for mobile devices and accessibility.
 * 
 * Features:
 * - Prevents iOS zoom by maintaining 16px font size on mobile
 * - Proper touch targets with adequate padding for mobile interaction
 * - Enhanced focus states for better accessibility
 * - Responsive sizing that adapts to screen size
 * - Optimized input types for mobile keyboards (email, tel, etc.)
 * 
 * The component automatically prevents unwanted zoom behavior on iOS
 * while maintaining readable text sizes across all devices.
 */
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex min-h-[44px] w-full rounded-md border border-input bg-transparent px-3 py-2",
          "text-base shadow-sm transition-colors", // Always 16px to prevent iOS zoom
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "touch-manipulation", // Improves touch responsiveness
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
