import type { StaticImageData } from 'next/image';
import aiImg from '../../../public/corporate/courses/ai.webp';
import adsImg from '../../../public/corporate/courses/ads.webp';
import bootcampImg from '../../../public/corporate/courses/bootcamp.webp';
import chatgptImg from '../../../public/corporate/courses/chatgpt.webp';
import codeImg from '../../../public/corporate/courses/code.webp';
import contentImg from '../../../public/corporate/courses/content.webp';
import defaultImg from '../../../public/corporate/courses/default.webp';
import digitalMarketingImg from '../../../public/corporate/courses/digital-marketing.webp';
import internshipImg from '../../../public/corporate/courses/internship.webp';
import marketingImg from '../../../public/corporate/courses/marketing.webp';
import seoImg from '../../../public/corporate/courses/seo.webp';
import socialMediaImg from '../../../public/corporate/courses/social-media.webp';
import webImg from '../../../public/corporate/courses/web.webp';

/*
 * Cover photos for course cards, picked by keywords in the course name
 * (the CMS course icons are low-res). Photos: Unsplash (unsplash.com/license —
 * free for commercial use, no attribution needed).
 * Order matters: the first match wins, so specific topics come before broad ones.
 */
const COVERS: readonly [RegExp, StaticImageData][] = [
  [/chat\s?gpt|openai|\bgpt\b/i, chatgptImg],
  [/\bai\b|artificial intelligence|machine learning|prompt|generative/i, aiImg],
  [/intern/i, internshipImg],
  [/bootcamp/i, bootcampImg],
  [/social media|instagram|facebook|linkedin/i, socialMediaImg],
  [/google ads|\bppc\b|\bsem\b|paid|performance marketing|ads\b/i, adsImg],
  [/\bseo\b|search engine/i, seoImg],
  [/content|copywriting|blog/i, contentImg],
  [/wordpress|website|web design|shopify/i, webImg],
  [/developer|development|programming|full stack|coding|python|java|react|data/i, codeImg],
  [/digital marketing/i, digitalMarketingImg],
  [/marketing|email|brand/i, marketingImg],
];

export function courseCover(name: string): StaticImageData {
  return COVERS.find(([pattern]) => pattern.test(name))?.[1] ?? defaultImg;
}
