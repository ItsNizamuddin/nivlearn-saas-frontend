import type { SpriteLogo as SpriteLogoData } from '@/lib/logoSprites';
import { cn } from '@/lib/utils';

/**
 * One logo cut from a sprite sheet.
 * `scale` resizes it: the outer box takes the scaled size, the inner sprite is
 * drawn at native size and scaled from the top-left so the cut-out stays exact.
 * `fit` (px) instead scales the logo to fit inside a fit×fit box, keeping its
 * aspect ratio — use it when a strip mixes square and wide logos.
 */
export default function SpriteLogo({
  logo,
  scale: fixedScale = 1,
  fit,
  className,
}: {
  logo: SpriteLogoData;
  scale?: number;
  fit?: number;
  className?: string;
}) {
  const scale = fit ? Math.min(fit / logo.width, fit / logo.height) : fixedScale;
  return (
    <span
      aria-hidden
      className={cn('block shrink-0 overflow-hidden', className)}
      style={{ width: logo.width * scale, height: logo.height * scale }}
    >
      <span
        className="block origin-top-left"
        style={{
          width: logo.width,
          height: logo.height,
          background: `url(${logo.sheet}) -${logo.x}px -${logo.y}px no-repeat`,
          transform: scale === 1 ? undefined : `scale(${scale})`,
        }}
      />
    </span>
  );
}
