/**
 * Logo sprite positions, generated from the old site's sprits.css.
 * One image per group = one request for every logo in it.
 */
export interface SpriteLogo {
  sheet: string;
  width: number;
  height: number;
  x: number;
  y: number;
}

/** Client company logos (old 'HomeBannerSprites'). */
export const CLIENT_LOGOS: readonly SpriteLogo[] = [
  { sheet: '/sprites/HomeBannerSpritesLogos.webp', width: 24, height: 24, x: 10, y: 246 }, // bg-HomeBannerSprites__9_
  { sheet: '/sprites/HomeBannerSpritesLogos.webp', width: 67, height: 18, x: 94, y: 66 }, // bg-HomeBannerSprites__10_
  { sheet: '/sprites/HomeBannerSpritesLogos.webp', width: 34, height: 22, x: 247, y: 136 }, // bg-HomeBannerSprites__11_
  { sheet: '/sprites/HomeBannerSpritesLogos.webp', width: 73, height: 24, x: 94, y: 10 }, // bg-HomeBannerSprites__12_
  { sheet: '/sprites/HomeBannerSpritesLogos.webp', width: 24, height: 24, x: 54, y: 246 }, // bg-HomeBannerSprites__13_
  { sheet: '/sprites/HomeBannerSpritesLogos.webp', width: 44, height: 22, x: 247, y: 54 }, // bg-HomeBannerSprites__14_
  { sheet: '/sprites/HomeBannerSpritesLogos.webp', width: 50, height: 24, x: 247, y: 10 }, // bg-HomeBannerSprites__15_
  { sheet: '/sprites/HomeBannerSpritesLogos.webp', width: 27, height: 24, x: 187, y: 108 }, // bg-HomeBannerSprites__16_
  { sheet: '/sprites/HomeBannerSpritesLogos.webp', width: 54, height: 24, x: 10, y: 170 }, // bg-HomeBannerSprites__17_
  { sheet: '/sprites/HomeBannerSpritesLogos.webp', width: 52, height: 24, x: 84, y: 170 }, // bg-HomeBannerSprites__18_
  { sheet: '/sprites/HomeBannerSpritesLogos.webp', width: 44, height: 20, x: 247, y: 96 }, // bg-HomeBannerSprites__19_
  { sheet: '/sprites/HomeBannerSpritesLogos.webp', width: 64, height: 24, x: 10, y: 66 }, // bg-HomeBannerSprites__20_
  { sheet: '/sprites/HomeBannerSpritesLogos.webp', width: 25, height: 24, x: 130, y: 110 }, // bg-HomeBannerSprites
  { sheet: '/sprites/HomeBannerSpritesLogos.webp', width: 52, height: 24, x: 156, y: 170 }, // bg-HomeBannerSprites__1_
  { sheet: '/sprites/HomeBannerSpritesLogos.webp', width: 63, height: 12, x: 10, y: 214 }, // bg-HomeBannerSprites__2_
  { sheet: '/sprites/HomeBannerSpritesLogos.webp', width: 64, height: 36, x: 10, y: 10 }, // bg-HomeBannerSprites__3_
  { sheet: '/sprites/HomeBannerSpritesLogos.webp', width: 39, height: 18, x: 187, y: 70 }, // bg-HomeBannerSprites__4_
  { sheet: '/sprites/HomeBannerSpritesLogos.webp', width: 24, height: 24, x: 98, y: 246 }, // bg-HomeBannerSprites__5_
  { sheet: '/sprites/HomeBannerSpritesLogos.webp', width: 40, height: 40, x: 10, y: 110 }, // bg-HomeBannerSprites__6_
  { sheet: '/sprites/HomeBannerSpritesLogos.webp', width: 40, height: 40, x: 70, y: 110 }, // bg-HomeBannerSprites__7_
  { sheet: '/sprites/HomeBannerSpritesLogos.webp', width: 40, height: 40, x: 187, y: 10 }, // bg-HomeBannerSprites__8_
];

/** Corporate client logos (old 'CorpVertical'). */
export const INDUSTRY_LOGOS: readonly SpriteLogo[] = [
  { sheet: '/sprites/CorpVerticalSprites.webp', width: 105, height: 52, x: 10, y: 10 }, // bg-CorpVertical__2_
  { sheet: '/sprites/CorpVerticalSprites.webp', width: 105, height: 52, x: 135, y: 10 }, // bg-CorpVertical__3_
  { sheet: '/sprites/CorpVerticalSprites.webp', width: 105, height: 52, x: 10, y: 82 }, // bg-CorpVertical__4_
  { sheet: '/sprites/CorpVerticalSprites.webp', width: 105, height: 52, x: 135, y: 82 }, // bg-CorpVertical__5_
  { sheet: '/sprites/CorpVerticalSprites.webp', width: 105, height: 52, x: 10, y: 154 }, // bg-CorpVertical__6_
  { sheet: '/sprites/CorpVerticalSprites.webp', width: 105, height: 52, x: 135, y: 154 }, // bg-CorpVertical__7_
  { sheet: '/sprites/CorpVerticalSprites.webp', width: 105, height: 52, x: 260, y: 10 }, // bg-CorpVertical__8_
  { sheet: '/sprites/CorpVerticalSprites.webp', width: 105, height: 52, x: 260, y: 82 }, // bg-CorpVertical__9_
  { sheet: '/sprites/CorpVerticalSprites.webp', width: 105, height: 52, x: 260, y: 154 }, // bg-CorpVertical__10_
  { sheet: '/sprites/CorpVerticalSprites.webp', width: 105, height: 52, x: 10, y: 226 }, // bg-CorpVertical__11_
  { sheet: '/sprites/CorpVerticalSprites.webp', width: 105, height: 52, x: 135, y: 226 }, // bg-CorpVertical__12_
  { sheet: '/sprites/CorpVerticalSprites.webp', width: 105, height: 52, x: 260, y: 226 }, // bg-CorpVertical__13_
  { sheet: '/sprites/CorpVerticalSprites.webp', width: 105, height: 52, x: 10, y: 298 }, // bg-CorpVertical__14_
  { sheet: '/sprites/CorpVerticalSprites.webp', width: 105, height: 52, x: 135, y: 298 }, // bg-CorpVertical__15_
  { sheet: '/sprites/CorpVerticalSprites.webp', width: 105, height: 52, x: 260, y: 298 }, // bg-CorpVertical__16_
  { sheet: '/sprites/CorpVerticalSprites.webp', width: 105, height: 52, x: 385, y: 10 }, // bg-CorpVertical__17_
  { sheet: '/sprites/CorpVerticalSprites.webp', width: 105, height: 52, x: 385, y: 82 }, // bg-CorpVertical__18_
  { sheet: '/sprites/CorpVerticalSprites.webp', width: 105, height: 52, x: 385, y: 154 }, // bg-CorpVertical__19_
  { sheet: '/sprites/CorpVerticalSprites.webp', width: 105, height: 52, x: 385, y: 226 }, // bg-CorpVertical__20_
  { sheet: '/sprites/CorpVerticalSprites.webp', width: 105, height: 52, x: 385, y: 298 }, // bg-CorpVertical__21_
  { sheet: '/sprites/CorpVerticalSprites.webp', width: 105, height: 52, x: 10, y: 370 }, // bg-CorpVertical__22_
  { sheet: '/sprites/CorpVerticalSprites.webp', width: 105, height: 52, x: 135, y: 370 }, // bg-CorpVertical__23_
  { sheet: '/sprites/CorpVerticalSprites.webp', width: 105, height: 52, x: 260, y: 370 }, // bg-CorpVertical__24_
  { sheet: '/sprites/CorpVerticalSprites.webp', width: 105, height: 52, x: 385, y: 370 }, // bg-CorpVertical__25_
  { sheet: '/sprites/CorpVerticalSprites.webp', width: 105, height: 52, x: 510, y: 10 }, // bg-CorpVertical__26_
  { sheet: '/sprites/CorpVerticalSprites.webp', width: 105, height: 52, x: 510, y: 82 }, // bg-CorpVertical__27_
  { sheet: '/sprites/CorpVerticalSprites.webp', width: 105, height: 52, x: 510, y: 154 }, // bg-CorpVertical__28_
  { sheet: '/sprites/CorpVerticalSprites.webp', width: 105, height: 52, x: 510, y: 226 }, // bg-CorpVertical__29_
  { sheet: '/sprites/CorpVerticalSprites.webp', width: 105, height: 52, x: 510, y: 298 }, // bg-CorpVertical
  { sheet: '/sprites/CorpVerticalSprites.webp', width: 105, height: 52, x: 510, y: 370 }, // bg-CorpVertical__1_
];

/** Certification body logos (old 'course1..20'). */
export const CERT_LOGOS: readonly SpriteLogo[] = [
  { sheet: '/CourseLogos/courselogosprite.webp', width: 100, height: 100, x: 503, y: 250 }, // course1
  { sheet: '/CourseLogos/courselogosprite.webp', width: 101, height: 100, x: 503, y: 130 }, // course2
  { sheet: '/CourseLogos/courselogosprite.webp', width: 100, height: 100, x: 503, y: 370 }, // course3
  { sheet: '/CourseLogos/courselogosprite.webp', width: 101, height: 100, x: 10, y: 250 }, // course4
  { sheet: '/CourseLogos/courselogosprite.webp', width: 101, height: 100, x: 131, y: 250 }, // course5
  { sheet: '/CourseLogos/courselogosprite.webp', width: 101, height: 100, x: 252, y: 250 }, // course6
  { sheet: '/CourseLogos/courselogosprite.webp', width: 89, height: 100, x: 10, y: 490 }, // course7
  { sheet: '/CourseLogos/courselogosprite.webp', width: 88, height: 100, x: 119, y: 490 }, // course8
  { sheet: '/CourseLogos/courselogosprite.webp', width: 88, height: 100, x: 227, y: 490 }, // course9
  { sheet: '/CourseLogos/courselogosprite.webp', width: 101, height: 100, x: 382, y: 10 }, // course10
  { sheet: '/CourseLogos/courselogosprite.webp', width: 101, height: 100, x: 382, y: 130 }, // course11
  { sheet: '/CourseLogos/courselogosprite.webp', width: 101, height: 100, x: 382, y: 250 }, // course12
  { sheet: '/CourseLogos/courselogosprite.webp', width: 101, height: 100, x: 10, y: 370 }, // course13
  { sheet: '/CourseLogos/courselogosprite.webp', width: 101, height: 100, x: 131, y: 370 }, // course14
  { sheet: '/CourseLogos/courselogosprite.webp', width: 102, height: 100, x: 260, y: 10 }, // course15
  { sheet: '/CourseLogos/courselogosprite.webp', width: 102, height: 100, x: 260, y: 130 }, // course16
  { sheet: '/CourseLogos/courselogosprite.webp', width: 199, height: 100, x: 10, y: 130 }, // course17
  { sheet: '/CourseLogos/courselogosprite.webp', width: 101, height: 100, x: 252, y: 370 }, // course18
  { sheet: '/CourseLogos/courselogosprite.webp', width: 101, height: 100, x: 373, y: 370 }, // course19
  { sheet: '/CourseLogos/courselogosprite.webp', width: 101, height: 100, x: 503, y: 10 }, // course20
];

