import AboutBanner from './AboutBanner';
import Mission from './Mission';
import CoreValues from './CoreValues';
import Perks from './Perks';
import WhyChooseUs from './WhyChooseUs';

/** Order follows a trust-building flow: who we are → proof → how we work → values → why us. */
export default function AboutUs() {
  return (
    <>
      <AboutBanner />
      <Mission />
      <CoreValues />
      <Perks />
      <WhyChooseUs />
    </>
  );
}
