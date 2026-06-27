import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import MarqueeStrip from '@/components/MarqueeStrip';
import HorizontalWork from '@/components/HorizontalWork';
import Numbers from '@/components/Numbers';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import CtaSection from '@/components/CtaSection';
import SiteFooter from '@/components/SiteFooter';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <MarqueeStrip />
        <HorizontalWork />
        <Numbers />
        <Services />
        <Testimonials />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
