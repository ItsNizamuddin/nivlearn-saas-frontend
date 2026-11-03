/**
 * Utility functions for NivLearn SaaS frontend
 */

/**
 * Combines multiple class names into a single string, filtering out falsy values.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

