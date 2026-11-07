import type { ReactNode } from 'react';
import Image, { type StaticImageData } from 'next/image';
import Container from '@/components/layout/Container';
import BrandBackdrop from '@/components/ui/BrandBackdrop';
import Glow from '@/components/ui/Glow';
import { cn } from '@/lib/utils';

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Buttons / links under the description. */
  actions?: ReactNode;
  /** Illustration shown beside the text (hidden on small screens if `imageDesktopOnly`). */
  image?: StaticImageData;
  imageAlt?: string;
  imageDesktopOnly?: boolean;
  imageClassName?: string;
  imageContainerClassName?: string;
  /** Photo behind the text, darkened for contrast. */
  backgroundImage?: StaticImageData;
  align?: 'left' | 'center';
  children?: ReactNode;
}

/** Dark navy page header shared by the static pages. */
export default function PageHero({
  eyebrow,
  title,
  description,
  actions,
  image,
  imageAlt = '',
  imageDesktopOnly,
  imageClassName,
  imageContainerClassName,
  backgroundImage,
  align = 'left',
  children,
}: PageHeroProps) {
  const centered = align === 'center' && !image;

  return (
    <section className="relative overflow-hidden bg-prime-dark">
      {backgroundImage ? (
        <>
          <Image src={backgroundImage} alt="" fill preload sizes="100vw" className="object-cover" />
          <div aria-hidden className="absolute inset-0 bg-linear-to-r from-prime-dark via-prime-dark/85 to-prime-dark/40" />
        </>
      ) : (
        <>
          <Glow />
          {/* Brand mark only when the right side is free (no illustration). */}
          {!image && <BrandBackdrop tone="dark" className="hidden md:block" />}
        </>
      )}

      <Container
        className={cn(
          'relative grid items-center gap-8 sm:gap-10',
          image ? 'pt-12 pb-0 sm:pt-16 sm:pb-0 lg:grid-cols-2 lg:gap-16 lg:py-0' : 'py-16 md:py-20',
        )}
      >
        <div className={cn(image && 'lg:py-20', centered && 'mx-auto max-w-3xl text-center')}>
          {eyebrow && (
            <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-prime-yellow uppercase sm:text-sm">
              <span aria-hidden className="h-0.5 w-6 rounded-full bg-brand-orange" />
              {eyebrow}
            </p>
          )}
          <h1 className="text-3xl font-bold tracking-tight text-balance text-on-dark sm:text-4xl lg:text-5xl">{title}</h1>
          {description && (
            <p className={cn('mt-5 text-base leading-relaxed text-pretty text-on-dark/80 sm:text-lg', !centered && 'max-w-2xl')}>
              {description}
            </p>
          )}
          {actions && (
            <div className={cn('mt-8 flex flex-wrap gap-3', centered && 'justify-center')}>{actions}</div>
          )}
          {children}
        </div>

        {image && (
          <div className={cn('flex justify-center self-end', imageDesktopOnly && 'hidden lg:flex', imageContainerClassName)}>
            <Image
              src={image}
              alt={imageAlt}
              preload
              sizes="(min-width: 1024px) 45vw, 90vw"
              className={cn('block h-auto max-h-72 w-auto sm:max-h-96 lg:max-h-120', imageClassName)}
            />
          </div>
        )}
      </Container>
    </section>
  );
}
