import 'server-only';
import { z } from 'zod';

const envSchema = z.object({
  API_BASE_URL: z
    .string()
    .default('https://api.skilldeck.net/api/v1')
    .transform((val) => val.replace(/['";]+$/, '')),
  API_KEY: z
    .string()
    .default('')
    .transform((val) => val.replace(/['";]+$/, '')),
  NEXT_SITE_URL: z
    .string()
    .default('http://localhost:3000'),

  CLOUDFLARE_API_TOKEN: z
    .string()
    .default('')
    .transform((val) => val?.trim().replace(/^['"]|['"]$/g, '') || ''),
  CLOUDFLARE_ZONE_ID: z
    .string()
    .default('')
    .transform((val) => val?.trim().replace(/^['"]|['"]$/g, '') || ''),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z
    .string()
    .default('')
    .transform((val) => val?.trim().replace(/^['"]|['"]$/g, '') || ''),
  TURNSTILE_SECRET_KEY: z
    .string()
    .default('')
    .transform((val) => val?.trim().replace(/^['"]|['"]$/g, '') || ''),
  REVALIDATE_SECRET: z.string().default(''),
});

const parsedEnv = envSchema.safeParse({
  API_BASE_URL: process.env.API_BASE_URL,
  API_KEY: process.env.API_KEY,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  CLOUDFLARE_API_TOKEN: process.env.CLOUDFLARE_API_TOKEN,
  CLOUDFLARE_ZONE_ID: process.env.CLOUDFLARE_ZONE_ID,
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
  REVALIDATE_SECRET: process.env.REVALIDATE_SECRET,
});

if (!parsedEnv.success) {
  console.error('Invalid environment variables:', parsedEnv.error.format());
  throw new Error('Invalid environment variables');
}

export const env = parsedEnv.data;
