import { Nav } from '@/components/nav';
import { Hero } from '@/components/hero/hero';
// import { Trust } from '@/components/sections/trust';
import { Statement } from '@/components/sections/statement';
import { Showcase } from '@/components/sections/showcase';
import { AiAgent } from '@/components/sections/ai-agent';
import { Features } from '@/components/sections/features';
import { Pricing } from '@/components/sections/pricing';
import { Faq } from '@/components/sections/faq';
import { FinalCta } from '@/components/sections/final-cta';
import { Footer } from '@/components/sections/footer';

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        {/* <Trust /> */}
        <Statement />
        <Showcase />
        <AiAgent />
        <Features />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
