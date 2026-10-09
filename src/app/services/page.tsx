import type { Metadata } from "next";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";
import PageBanner from "../../../components/common/PageBanner";
import Services from "../../../components/sections/Services";

// Dynamic JSON import
import rawSiteData from "../../../data/siteData.json";

const siteData = rawSiteData as any;
const servicesSection =
  siteData.categories?.TaxConsulting?.sections?.Services?.variants
    ?.TaxServices1;
const siteName = siteData.common?.siteName || "TaxPro";

// Dynamic SEO Metadata
export const metadata: Metadata = {
  title: `Our Services | ${siteName}`,
  description:
    servicesSection?.description ||
    "Explore our comprehensive tax and financial consulting services.",
};

export default function ServicesPage() {
  const pageTitle = servicesSection?.badge || "Our Services";

  return (
    <main className="min-h-screen bg-white">
      {/* 1. Header Navigation */}
      <Navbar />

      {/* 2. Top Page Banner with Breadcrumb: Home ▸ Our Services */}
      <PageBanner
        title={pageTitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: pageTitle },
        ]}
      />

      {/* 3. Comprehensive Tax & Financial Services Grid */}
      <div className="relative overflow-hidden">
        {/* Decorative Background Dotted Patterns & Ambient Glow */}
        <div className="absolute top-10 left-6 w-28 h-28 opacity-30 pointer-events-none hidden md:block">
          <div className="grid grid-cols-4 gap-3">
            {[...Array(16)].map((_, i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-teal-400 block"
              />
            ))}
          </div>
        </div>

        <div className="absolute top-40 right-0 w-72 h-72 rounded-full bg-teal-50 -z-10 blur-3xl opacity-70 pointer-events-none" />

        <Services />
      </div>

      {/* 4. Footer */}
      <Footer />
    </main>
  );
}