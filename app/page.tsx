import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { BlogSection, ContactSection, FounderSection } from "@/components/sections/business-sections";
import { HeroSection } from "@/components/sections/hero-section";
import {
  ProblemSolutionSection,
  TrustSection,
  VisualImpactSection
} from "@/components/sections/premium-sections";

export default function Home() {
  return (
    <main className="site-shell min-h-screen overflow-hidden bg-void pt-[80px] text-frost selection:bg-ion/30 md:pt-[88px]">
      <SiteHeader />
      <div className="relative">
        <div className="site-aurora pointer-events-none absolute inset-x-0 top-0 h-[860px]" />
        <div className="relative">
          <HeroSection />
          <TrustSection />
          <ProblemSolutionSection />
          <VisualImpactSection />
          <FounderSection />
          <BlogSection />
          <ContactSection />
        </div>
      </div>
      <SiteFooter />
      <ScrollToTop />
    </main>
  );
}
