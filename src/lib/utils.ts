import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Linear interpolation between two values
 * @param start Starting value
 * @param end Ending value
 * @param amount Normalized progress (0-1)
 * @returns Interpolated value between start and end
 */
export function lerp(start: number, end: number, amount: number): number {
  return start + (end - start) * amount
}
