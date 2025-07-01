import { type ClassValue, clsx} from 'clsx';
import { twMerge} from 'tailwind-merge';

export function cn(...inputs: ClassValue[0]) {
  return twMerge(clsx(inputs))}



