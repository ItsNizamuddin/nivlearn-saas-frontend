import { FacebookIcon, LinkedInIcon, WhatsAppIcon, XIcon } from '@/components/ui/BrandIcons';

/** Share buttons for one article. `url` must be absolute. */
export default function ShareLinks({ url, title }: { url: string; title: string }) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const platforms = [
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, Icon: FacebookIcon },
    { label: 'X', href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`, Icon: XIcon },
    { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, Icon: LinkedInIcon },
    { label: 'WhatsApp', href: `https://wa.me/?text=${t}%20${u}`, Icon: WhatsAppIcon },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-semibold text-prime-dark">Share this article</span>
      <ul className="flex gap-2">
        {platforms.map(({ label, href, Icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer nofollow"
              aria-label={`Share on ${label}`}
              className="flex size-11 items-center justify-center rounded-full border border-border-muted bg-surface text-prime-dark transition-colors duration-200 hover:border-prime hover:bg-prime hover:text-on-dark"
            >
              <Icon className="size-4" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
