import type { SpriteLogo as SpriteLogoData } from '@/lib/logoSprites';
import { cn } from '@/lib/utils';

/**
 * One logo cut from a sprite sheet.
 * `scale` resizes it: the outer box takes the scaled size, the inner sprite is
 * drawn at native size and scaled from the top-left so the cut-out stays exact.
 */
export default function SpriteLogo({
  logo,
  scale = 1,
  className,
}: {
  logo: SpriteLogoData;
  scale?: number;
  className?: string;
}) {
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
