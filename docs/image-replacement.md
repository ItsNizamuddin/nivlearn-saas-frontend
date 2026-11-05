# Image replacement plan (NevoLearn → NivLearn)

Every image below was carried over from the NevoLearn project. Generate a new one and save it
**at the same path and file name** (as `.webp`), then the code needs no change.

Export at **2× the listed size** (sharp on retina), WebP quality ~80.

## Shared style (paste before every photo prompt)

> Professional, natural-light corporate photography, modern bright office in India, diverse
> Indian and international professionals aged 25–45, smart-casual to business attire, genuine
> expressions, shallow depth of field, clean uncluttered background, subtle brand colours in
> the scene (royal blue #005CCF, deep navy #002972, warm orange #FE8702 accents), high
> resolution, photorealistic. No text, no logos, no watermarks, no brand names on screens or
> clothing.

For **cut-out** images ("transparent" below): generate on a plain pure-white background, then
remove the background (remove.bg / Photoshop) and export WebP with alpha.

## Shared style for illustrations

> Flat vector illustration, clean minimal style, limited palette of royal blue #005CCF, deep
> navy #002972, sky blue #01B1FC and orange #FE8702 on white, soft rounded shapes, no
> gradients-heavy effects, no text, no logos.

---

## A. Generate: photos and illustrations (35 images)

### Home page — `components/page-comp/home-page/Banner.tsx`

| # | File | Size (export) | Prompt |
|---|---|---|---|
| 1 | `public/home/banvideo.webp` | | | ✅ Done: user-generated image. |
| 2 | `public/home/enrolled.webp` | | | ✅ Done: user-generated image. |

### About Us — `components/about-us/data.ts`

| # | File | Size (export) | Prompt |
|---|---|---|---|
| 3 | `public/aboutus/banvideo.webp` | 1090×646 (5:3) | Video poster for the "perks" section. A small group of learners in a modern classroom watching an instructor present on a large screen, candid, one learner smiling at camera side. (Must differ from #1.) |
| 4 | `public/aboutus/mission1.webp` | 554×902 (portrait 3:5) | "Professional Training". Instructor standing beside a whiteboard addressing a seated group of professionals in a glass-walled training room, vertical composition. |
| 5 | `public/aboutus/mission2.webp` | 554×902 | "Corporate Excellence". Confident business team walking together through a modern office lobby, vertical composition, motion and energy. |
| 6 | `public/aboutus/mission3.webp` | 554×902 | "Skill Development". Young professional at a desk working through an online course on a laptop, notes and sticky notes around, focused, vertical composition. |
| 7 | `public/aboutus/mission4.webp` | 554×902 | "Leadership Programs". Senior leader mentoring two younger colleagues around a standing table, thoughtful discussion, vertical composition. |
| 8 | `public/aboutus/mission5.webp` | 554×902 | "Technical Training". Software trainer explaining code on a large wall screen to learners with laptops (code blurred, no readable text), vertical composition. |
| 9 | `public/aboutus/mission6.webp` | 554×902 | "Soft Skills". Woman presenting ideas to colleagues in a workshop, sticky notes on a glass wall, engaged audience, vertical composition. |
| 10 | `public/aboutus/whychooseus.webp` | 1512×1008 (3:2) | Friendly corporate trainer presenting at a flip chart in a bright training room with a laptop on the table, looking toward learners off-frame. |

### Accreditations — `components/accreditations/data.ts`

| # | File | Size (export) | Prompt |
|---|---|---|---|
| 11 | `public/accredation/accredations.webp` | 3840×648 (very wide banner, text goes on top) | Close-up of a hand signing an official certificate with a fountain pen on a desk, deep navy colour grade, dark and moody so white text is readable over it, subject on the right third. |
| 12 | `public/accredation/certificateimg.webp` | 750×582 | *Illustration style.* A proud professional standing beside a large framed certificate with a rosette seal, simple line-art figure. |

### Corporate — `components/corporate/data.ts`

| # | File | Size (export) | Prompt |
|---|---|---|---|
| 13 | `public/corporate/banner.webp` | | | ✅ Done: user-generated image. |
| 14 | `public/corporate/transform.webp` | | | ✅ Done: user-generated dashboard. |
| 15 | `public/corporate/perform.webp` | | | ✅ Done: Unsplash stock photo. |
| 16 | `public/corporate/CTA.webp` | | | ✅ Done: user-generated image. |
| 17 | `public/corporate/Story/img.webp` | | | ✅ Done: Unsplash stock photo. |
| 18 | `public/corporate/why.webp` | | | ✅ Done: Unsplash stock photo. |
| 19 | `public/corporate/g/img1.webp` | | | ✅ Done: Unsplash stock photo. |
| 20 | `public/corporate/g/img2.webp` | | | ✅ Done: Unsplash stock photo. |
| 21 | `public/corporate/g/img3.webp` | | | ✅ Done: Unsplash stock photo. |
| 22 | `public/corporate/g/img4.webp` | | | ✅ Done: Unsplash stock photo. |

### Hire From Us — `components/hire-from-us/data.ts`

| # | File | Size (export) | Prompt |
|---|---|---|---|
| 23 | `public/hire.webp` | | | ✅ Done: replaced with user-supplied photo (checkerboard removed, transparent). |
| 24 | `public/hirefromus/image.webp` | | | ✅ Done: Unsplash stock photo. |
| 25 | `public/hirefromus/image1.webp` | | | ✅ Done: Unsplash stock photo. |
| 26 | `public/hirefromus/image2.webp` | | | ✅ Done: Unsplash stock photo. |
| 27 | `public/hirefromus/image3.webp` | | | ✅ Done: Unsplash stock photo. |
| 28 | `public/hirefromus/image4.webp` | | | ✅ Done: Unsplash stock photo. |
| 29 | `public/hirefromus/image5.webp` | | | ✅ Done: Unsplash stock photo. |
| 30 | `public/hirefromus/image6.webp` | | | ✅ Done: Unsplash stock photo. |
| 31 | `public/hirefromus/image7.webp` | | | ✅ Done: Unsplash stock photo. |
| 32 | `public/hirefromus/speak.webp` | 562×396 | *Illustration style.* An orange and navy megaphone with sound lines and a blank ribbon banner coming out of it (add "Free of Cost" text in code, not in the image). |

### Shared CTAs / forms

| # | File | Size (export) | Used in | Prompt |
|---|---|---|---|---|
| 33 | `public/CourseCat/cta1.webp` | 562×606, **transparent** | Become an Instructor, Blog, legal pages CTA | Happy young woman sitting cross-legged with a laptop on her lap, waving, casual grey top and jeans, full body, pure white background. |
| 34 | ~~`public/home/testsection/womanimg.webp`~~ | | Become an Instructor hero | ✅ Done: replaced by `public/become-an-instructor/hero.webp` (user-supplied photo). |
| 35 | `public/Forms/popup.webp` | 1000×1000 | Lead form popup (`components/forms/LeadModal.tsx`) | *Illustration style.* A friendly learning advisor at a desk with a computer and headset, chat bubbles floating, plant on the side. |

---

## B. ✅ Done: replaced with Lucide icons in code (image files deleted)

These are small single-colour icons. AI icons look inconsistent; we already use `lucide-react`,
so swap them in code (themeable via CSS variables, no image files).

| File(s) | Suggested Lucide icon |
|---|---|
| `aboutus/aboutus_sprites.webp` (5 icons) | `Users`, `CalendarCheck`, `BadgeCheck`, `BookOpenCheck`, `Handshake` |
| `aboutus/whychooseus/expertise` / `customization` / `decision-making` / `technical-support` | `GraduationCap`, `SlidersHorizontal`, `Split`, `Headset` |
| `contactus/getintouch/addressIcon` / `chat` / `corporate` / `support` | `MapPin`, `MessagesSquare`, `Building2`, `MessageCircleQuestion` |
| `contactus/getintouch/whatsapplogo` | use existing `WhatsAppIcon` in `components/ui/BrandIcons.tsx` |
| `corporate/Story/Link`, `Link-1`…`Link-4`, `Link-6` | `TrendingUp`, `Rocket`, `BriefcaseBusiness`, `Command`, `FilePen`, `CircleDollarSign` |
| `corporate/analy`, `assess`, `upskill`, `sale` | `CodeXml`, `LayoutPanelLeft`, `Layers` (old file reused the code icon), `Headphones` |
| `corporate/bulb`, `career`, `xp` | `Lightbulb`, `BriefcaseBusiness`, `MessageSquareQuote` |
| `corporate/glob`, `part`, `pro` | `Globe`, `Handshake`, `TrendingUp` |
| `corporate/benfits/*` (5) | `ChartNoAxesCombined`, `HeartHandshake`, `ThumbsUp`, `Magnet`, `Settings` |
| `corporate/why1`…`why4` | `Ticket`, `ChartPie`, `UserSearch`, `Crosshair` |

## C. Don't generate: draw as CSS/SVG

| File | Replacement |
|---|---|
| `public/home/pattern.webp` | dot grid via CSS `radial-gradient` background |
| `public/home/underline.webp` | small inline SVG brush stroke in brand orange |
| `public/contactus/country/Uk.webp`, `Unitedstatesofamerica.webp`, `india.webp` | inline SVG flags (national flags are public domain) or the MIT `flag-icons` set |

## D. Cannot be generated: third-party logos (need official files and permission)

AI must **not** recreate these. Download from each organisation's official brand kit, and only
show them if NivLearn has the right (accredited partner / real client).

| File | Contents | Action |
|---|---|---|
| `public/CourseLogos/courselogosprite.webp` | Certification badges: PRINCE2, ITIL 4, Scrum.org (PSM/PSPO/PSD/PAL), PMI (PMP/CAPM/PMI-ACP), Scrum Alliance (CSM/CSPO/A-CSM…), SAFe (SP/SA/SSM), ICAgile | Get official badges per accreditation body |
| `public/accredation/pmilogo.webp` | PMI logo | PMI brand kit (Authorized Training Partner only) |
| `public/accredation/scrum_Alliance.webp` | Scrum Alliance logo | Scrum Alliance brand kit |
| `public/sprites/CorpVerticalSprites.webp` | ~40 client logos (Siemens, UBS, Philips, Orange…) | **Confirm these are NivLearn's clients.** If not, remove the section. |
| `public/sprites/HomeBannerSpritesLogos.webp` | Client logos (SAP, HSBC, Intel, Shell…) + 3 people photos | Same as above; replace the 3 people photos with generated headshots |

## E. Unused, safe to delete

- ~~`public/corporate/Story/Link-5.webp`~~ (deleted)
- `public/corporate/corporateMobile.webp`
