import Image from 'next/image';
import wordmark from '../../../public/logo.webp';
import full from '../../../public/nivlearn-logo-full.webp';

/*
 * `wordmark` — horizontal "nivlearn" (navbar).
 * `full` — stacked mark + wordmark + tagline on a white rounded tile (footer).
 * `width`/`height` only drive srcset + reserved space; size it with a height
 * class (e.g. `h-8`) and the width follows the aspect ratio.
 */
const VARIANTS = {
  wordmark: { src: wordmark, alt: 'NivLearn', width: 209, height: 40, sizes: '(max-width: 640px) 146px, (max-width: 1024px) 180px, 209px' },
  full: { src: full, alt: 'NivLearn - A New Way to Learn', width: 148, height: 120, sizes: '(max-width: 640px) 120px, 148px' },
} as const;

export default function BrandLogo({
  variant = 'wordmark',
  className = 'h-8',
  preload = false,
}: {
  variant?: keyof typeof VARIANTS;
  className?: string;
  preload?: boolean;
}) {
  const { src, alt, width, height, sizes } = VARIANTS[variant];
  return <Image src={src} alt={alt} width={width} height={height} sizes={sizes} priority={preload} className={`w-auto ${className}`} />;
}
