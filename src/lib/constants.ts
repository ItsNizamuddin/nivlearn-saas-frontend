/**
 * Application-wide constants and configuration
 */

export const SITE_CONFIG = {
  name: "NivLearn",
  description: "Advanced Learning Platform for High-Growth Skills",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://nivlearn.com",
  apiBaseUrl: process.env.API_BASE_URL || "https://api.skilldeck.net/api/v1",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "About Us", href: "/about-us" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact-us" },
] as const;

