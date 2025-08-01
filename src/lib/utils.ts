import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function optimizeGoogleImage(imageUrl: string | null | undefined, size: number = 400): string | null {
  if (!imageUrl) return null;

  // Check if this is a Google user profile image
  if (imageUrl.includes('googleusercontent.com')) {
    // Replace =s96-c or any size parameter with the desired size
    return imageUrl.replace(/=s\d+-c/, `=s${size}-c`);
  }

  return imageUrl;
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-')  // Replace spaces, underscores with hyphens
    .replace(/^-+|-+$/g, '');  // Remove leading/trailing hyphens
}
