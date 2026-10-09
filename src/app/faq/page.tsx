import type { Metadata } from "next";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";
import PageBanner from "../../../components/common/PageBanner";
import FAQSection from "../../../components/sections/FAQSection";
import rawSiteData from "../../../data/siteData.json";

const siteData = rawSiteData as any;
const faqSectionData =
  siteData.categories.TaxConsulting.sections.FAQ.variants.TaxFAQ1;
const siteName = siteData.common.siteName || "TaxPro";

// Dynamic SEO Metadata
export const metadata: Metadata = {
  title: `Frequently Asked Questions | ${siteName}`,
  description:
    faqSectionData?.description ||
    "Find answers to common questions about our tax consulting services and financial solutions.",
};

export default function FaqPage() {
  const pageTitle = faqSectionData?.badge || "FAQ";

  return (
    <main className="min-h-screen bg-[#FBFDFA] overflow-x-hidden">
      <Navbar />

      {/* Dynamic Top Banner */}
      <PageBanner
        title={pageTitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: pageTitle },
        ]}
      />

      {/* 100% Dynamic Reusable FAQ + Stats + Testimonials Section */}
      <FAQSection />

      <Footer />
    </main>
  );
}