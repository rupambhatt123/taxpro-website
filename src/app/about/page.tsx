import type { Metadata } from "next";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";
import PageBanner from "../../../components/common/PageBanner";
import AboutUs from "../../../components/sections/AboutUs";
import StatsCounter from "../../../components/sections/StatsCounter";
import WhyChooseUs from "../../../components/sections/WhyChooseUs";
import Testimonials from "../../../components/sections/Testimonials";

// Dynamic JSON data import
import rawSiteData from "../../../data/siteData.json";

const siteData = rawSiteData as any;
const aboutSection = siteData.categories.TaxConsulting.sections.About.variants.TaxAbout1;
const siteName = siteData.common.siteName || "TaxPro";

// Dynamic SEO Metadata
export const metadata: Metadata = {
  title: `About Us | ${siteName}`,
  description: aboutSection?.highlightBoxText || "Learn more about our team and consulting services.",
};

export default function AboutPage() {
  const pageTitle = aboutSection?.badge || "About Us";

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <PageBanner
        title={pageTitle}
        breadcrumbs={[{ label: pageTitle }]}
      />

      <AboutUs />

      <StatsCounter />

      <WhyChooseUs />

      <Testimonials />

      <Footer />
    </main>
  );
}