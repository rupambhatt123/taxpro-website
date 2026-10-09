import type { Metadata } from "next";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";
import PageBanner from "../../../components/common/PageBanner";
import BlogSection from "../../../components/sections/BlogSection";

// Dynamic JSON data import
import rawSiteData from "../../../data/siteData.json";

const siteData = rawSiteData as any;
const blogSection =
  siteData.categories.TaxConsulting.sections.Blog.variants.TaxBlog1;
const siteName = siteData.common.siteName || "TaxPro";

// Dynamic SEO Metadata
export const metadata: Metadata = {
  title: `Our Blogs & Tax Updates | ${siteName}`,
  description:
    blogSection?.description ||
    "Stay informed with expert insights, tips and the latest updates on tax, finance and compliance.",
};

export default function BlogListingPage() {
  const pageTitle = blogSection?.badge || "Our Blogs";

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <PageBanner
        title={pageTitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: pageTitle },
        ]}
      />

      <BlogSection />

      <Footer />
    </main>
  );
}