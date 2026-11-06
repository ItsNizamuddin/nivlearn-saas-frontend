import Image, { type StaticImageData } from 'next/image';
import LeadCta from '@/components/forms/LeadCta';
import BrandBackdrop from '@/components/ui/BrandBackdrop';
import { buttonClass } from '@/components/ui/button';
import type { LeadFormKey } from '@/lib/leadForms';
import { cn } from '@/lib/utils';

interface CtaBannerProps {
  title: string;
  description?: string;
  actionLabel: string;
  /** Lead form the button opens. */
  form: LeadFormKey;
  image?: StaticImageData;
  className?: string;
}

/** Rounded navy call-to-action strip whose button opens the lead form, with an optional cut-out image. */
export default function CtaBanner({ title, description, actionLabel, form, image, className }: CtaBannerProps) {
  return (
    <div className={cn('relative rounded-2xl bg-prime-dark shadow-card', className)}>
      {/* Own clip box: the cut-out image is allowed to overflow the top. Mark shows only where the image doesn't. */}
      <div aria-hidden className={cn('pointer-events-none absolute inset-0 overflow-hidden rounded-2xl', image && 'lg:hidden')}>
        <BrandBackdrop tone="dark" size="sm" />
      </div>
      <div className="relative flex flex-col items-start gap-6 p-8 sm:p-10 md:flex-row md:items-center md:justify-between lg:px-14 lg:pr-72">
        <div>
          <p className="font-heading text-2xl font-bold text-on-dark sm:text-3xl">{title}</p>
          {description && <p className="mt-2 text-on-dark/80">{description}</p>}
        </div>
        <LeadCta form={form} className={buttonClass('accent', 'lg', 'shrink-0')}>
          {actionLabel}
        </LeadCta>
      </div>
      {image && (
        <Image
          src={image}
          alt=""
          sizes="256px"
          className="pointer-events-none absolute right-6 bottom-0 hidden h-[115%] w-auto lg:block"
        />
      )}
    </div>
  );
}
