import Marquee from '@/components/ui/Marquee';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import SpriteLogo from '@/components/ui/SpriteLogo';
import { CLIENT_LOGOS } from '@/lib/logoSprites';

/** "Trusted by Fortune 100…" heading + scrolling client-logo strip (Instructor, Corporate). */
export default function TrustedBy() {
  return (
    <Section tone="light">
      <SectionHeading
        align="center"
        eyebrow="Our clients"
        title="Trusted by Fortune 100 and Leading Global Enterprises"
        description="We are trusted by Fortune 100 and the leading global enterprises, due to our immersive and experiential training programs, designed to make a tangible impact. With a diverse clientele of over 730 SMEs, we deliver exceptional content and expertise, ensuring every training session upholds the highest standards of quality and effectiveness."
      />
      <div className="mt-12 rounded-2xl bg-surface py-8 shadow-sm">
        <Marquee label="Client logos" duration={50}>
          {CLIENT_LOGOS.map((logo, i) => (
            <SpriteLogo key={i} logo={logo} className="self-center" />
          ))}
        </Marquee>
      </div>
    </Section>
  );
}
