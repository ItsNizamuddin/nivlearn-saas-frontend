# Image replacement plan (NevoLearn → NivLearn)

Images carried over from the NevoLearn project must be replaced. Save each new image **at the
same path and file name** (as `.webp`) and the code needs no change.

Export at **2× the listed size** (sharp on retina), WebP quality ~80.

**Status:** ✅ Replaced · ⏳ Pending · 🚫 Needs official file / permission (do not generate)

Last updated: 2026-11-05

## Summary

| Group | ✅ Replaced | ⏳ Pending | 🚫 Official file needed |
|---|---|---|---|
| A. Photos & illustrations | 37 | 1 | – |
| B. Small icons (→ Lucide) | 37 | 1 sprite | – |
| C. CSS / SVG decorations | 0 | 5 | – |
| D. Third-party logos | – | – | 5 |

---

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

## ⏳ Pending — to generate (1)

| # | File | Used in | Size (export) | Prompt |
|---|---|---|---|---|
| 36 | `public/sprites/home.webp` — 5 avatar faces only | Home page (sprite in `app/sprits.css`) | 5 × 96×96 | Five tight circular headshots of smiling young Indian professionals (3 men, 2 women), plain light backgrounds. Can reuse the faces from `public/home/enrolled.webp`. |

---

## ✅ Replaced (37)

### Home

| File | Replaced with |
|---|---|
| `public/home/enrolled.webp` | User-generated 5-headshot strip |
| `public/home/womanimg.webp` | User-generated businesswoman cut-out ("Join Our Training Courses" card) |
| `public/home/whoweare.webp` | Supplied photo `84730.jpg` ⚠️ looks like a Freepik file — add "Image by Freepik" credit or use a premium licence |
| `public/home/about.webp` | Removed. Now `about-advisor-blur.webp` (default) + `about-advisor-mark.webp` (hover), user-generated |

### Become an Instructor

| File | Replaced with |
|---|---|
| `public/home/testsection/womanimg.webp` | Removed. Hero now uses `public/become-an-instructor/hero.webp` (user-supplied) |

### Corporate

| File | Replaced with |
|---|---|
| `public/corporate/banner.webp` | User-generated collage |
| `public/corporate/transform.webp` | User-generated learning dashboard |
| `public/corporate/CTA.webp` | User-generated team photo (Fortune 100 section) |
| `public/corporate/perform.webp` | Unsplash stock |
| `public/corporate/Story/img.webp` | Unsplash stock |
| `public/corporate/why.webp` | Unsplash stock |
| `public/corporate/g/img1.webp` … `img4.webp` (4) | Unsplash stock |

### Hire From Us

| File | Replaced with |
|---|---|
| `public/hire.webp` | User-supplied photo (fake checkerboard background removed) |
| `public/hirefromus/image.webp` … `image7.webp` (8) | Unsplash stock |

### About Us, Accreditations, Hire From Us, shared (user-generated, 2026-11-05)

| File | Replaced with |
|---|---|
| `public/aboutus/mission1.webp` … `mission6.webp` (6) | Generated portraits (training, team, online learning, mentoring, code class, workshop) |
| `public/aboutus/banvideo.webp` | Generated classroom presentation |
| `public/aboutus/whychooseus.webp` | Generated trainer at flip chart |
| `public/accredation/accredations.webp` | Generated hand signing certificate (navy) |
| `public/accredation/certificateimg.webp` | Generated certificate illustration |
| `public/hirefromus/speak.webp` | Generated megaphone + ribbon (transparent) |
| `public/CourseCat/cta-learner.webp` | Generated waving woman with laptop (transparent) |
| `public/Forms/lead-advisor-photo.webp` | Generated photo: smiling advisor with headset waving |

### Other replacements

| Item | Replaced with |
|---|---|
| Blog cover images | Now come from the CMS (no local files) |
| Corporate course-card photos | Section now reuses the home page course listing (CMS images) |

Unsplash photos: [Unsplash License](https://unsplash.com/license) — free for commercial use, no
attribution needed.

---

## B. Small icons → Lucide icons

✅ **Replaced (37):** all icon images on About Us, Contact Us and Corporate are now `lucide-react`
icons in code; the image files were deleted. (About Us core-values sprite, Why-choose-us icons,
Contact Us channel icons + WhatsApp badge, Corporate story/benefit/why-us/highlight/stat icons.)

⏳ **Pending:** the icons inside `public/sprites/home.webp` (home page features — graduation cap,
certificate, checklist, lock, lightbulb, coffee cup, etc.). Swap for Lucide icons in the home
components, like the other pages.

---

## C. ⏳ Pending — draw in CSS / SVG (don't generate)

| File | Used in | Replacement |
|---|---|---|
| `public/home/pattern.webp` | Home banner | Dot grid via CSS `radial-gradient` |
| `public/home/bgpattern.webp` | Home "practice tests" cards | Subtle CSS pattern |
| `public/home/underline.webp` | Home banners | Small inline SVG brush stroke in brand orange |
| `public/contactus/country/Uk.webp`, `Unitedstatesofamerica.webp`, `india.webp` | Contact Us | Inline SVG flags (public domain) or the MIT `flag-icons` set |

`public/default.webp` (generic grey image placeholder for course cards) is neutral — no change needed.

---

## D. 🚫 Third-party logos — need official files and permission

AI must **not** recreate these. Download from each organisation's brand kit and show them only if
NivLearn has the right (accredited partner / real client).

| File | Contents | Action |
|---|---|---|
| `public/CourseLogos/courselogosprite.webp` and duplicate `public/sprites/courselogosprite.webp` | Certification badges: PRINCE2, ITIL 4, Scrum.org, PMI, Scrum Alliance, SAFe, ICAgile | Official badges per accreditation body; keep one copy |
| `public/accredation/pmilogo.webp` | PMI logo | PMI brand kit (Authorized Training Partner only) |
| `public/accredation/scrum_Alliance.webp` | Scrum Alliance logo | Scrum Alliance brand kit |
| `public/sprites/CorpVerticalSprites.webp` | ~40 client logos (Siemens, UBS, Philips…) | **Confirm these are NivLearn's clients.** If not, remove the sections |
| `public/sprites/HomeBannerSpritesLogos.webp` | Client logos (SAP, HSBC, Intel, Shell…) + 3 people photos | Same as above; replace the 3 photos with generated headshots |

---

## E. Unused files — deleted

`public/corporate/corporateMobile.webp`, `public/home/banvideo.webp`,
`public/logo-with-tagline.png`, `public/logo-with-tagline.webp`, `public/corporate/Story/Link-5.webp`.
