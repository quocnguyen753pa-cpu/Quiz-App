import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Lấy ngẫu nhiên m phần tử từ một mảng.
 * @param items Danh sách gốc
 * @param count Số phần tử cần lấy
 */
export function randomSample<T>(items: readonly T[], count: number): T[] {
  if (count < 0 || count > items.length) {
    throw new Error("count must be between 0 and items.length");
  }

  const shuffled = [...items];

  // Fisher-Yates Shuffle
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
}