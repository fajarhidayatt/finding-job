import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { supabaseGetFile } from './supabase';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getImageSrc = (
  image: string | undefined,
  username: string
): string => {
  if (image) {
    const { url } = supabaseGetFile(image, 'images');
    return url;
  }

  return `https://ui-avatars.com/api/?name=${username}`;
};
