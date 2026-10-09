import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "../../../../components/layout/Navbar";
import Footer from "../../../../components/layout/Footer";
import PageBanner from "../../../../components/common/PageBanner";
import {
  User,
  Calendar,
  ChevronRight,
  FileText,
  TrendingUp,
  ShieldCheck,
  Users,
  BarChart3,
  Building2,
  CheckCircle2,
} from "lucide-react";
import rawSiteData from "../../../../data/siteData.json";

const siteData = rawSiteData as any;
const blogSection = siteData.categories.TaxConsulting.sections.Blog.variants.TaxBlog1;
const allPosts = blogSection.posts || [];
const siteName = siteData.common.siteName || "TaxPro";

// Right Sidebar Categories Data
const categories = [
  { name: "Tax Updates", count: "12", icon: FileText },
  { name: "Financial Planning", count: "08", icon: TrendingUp },
  { name: "GST & Compliance", count: "10", icon: ShieldCheck },
  { name: "Business Advisory", count: "06", icon: Users },
  { name: "Investment Tips", count: "09", icon: BarChart3 },
  { name: "Company Formation", count: "05", icon: Building2 },
];

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Dynamic SEO Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = allPosts.find((p: any) => p.slug === slug);

  if (!post) {
    return {
      title: `Blog Not Found | ${siteName}`,
    };
  }

  return {
    title: `${post.title} | ${siteName}`,
    description: post.description || post.summary || "Read this article on our blog.",
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // JSON se current post search karein
  const post = allPosts.find((p: any) => p.slug === slug);

  // Agar post na mile toh 404 show karein
  if (!post) {
    notFound();
  }

  // Sidebar ke recent posts (current post ko chhodkar baki 3)
  const recentPosts = allPosts.filter((p: any) => p.slug !== slug).slice(0, 3);

  // Date format fallback
  const formattedDate =
    post.date || `${post.dateDay || "01"} ${post.dateMonth || "Jan"} 2026`;

  return (
    <main className="min-h-screen bg-[#FBFDFA]">
      <Navbar />

      {/* Dynamic Top Banner with Breadcrumbs */}
      <PageBanner
        title={post.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Our Blogs", href: "/blog" },
          { label: post.title },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* ================= LEFT MAIN BLOG CONTENT (8 COLS) ================= */}
          <article className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-sm">
            
            {/* Category Tag */}
            <span className="inline-block bg-[#E8F8F0] text-[#00A859] text-xs font-semibold px-3.5 py-1.5 rounded-full mb-4">
              Tax Updates
            </span>

            {/* Main Blog Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0A1A2F] leading-snug tracking-tight mb-4">
              {post.title}
            </h1>

            {/* Author & Date Meta */}
            <div className="flex items-center gap-6 text-xs text-gray-500 mb-8 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#00A859]" />
                <span className="font-medium text-gray-700">By {post.author || "Admin"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#00A859]" />
                <span>{formattedDate}</span>
              </div>
            </div>

            {/* Main Featured Image */}
            <div className="relative h-[260px] sm:h-[380px] w-full rounded-2xl overflow-hidden mb-8 shadow-sm bg-gray-50">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Post Description / Intro */}
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
              {post.description || post.summary}
            </p>

            {/* Section 1 */}
            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0A1A2F] flex items-center gap-2 mb-3">
                <span className="w-1.5 h-6 bg-[#00A859] rounded-full inline-block" />
                Understanding Key Regulatory Highlights
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Staying compliant and making strategic choices requires a thorough understanding of ongoing tax reforms. 
                Whether managing corporate balance sheets or personal portfolio returns, timely adjustments ensure minimal liability 
                and penalty-free financial operations.
              </p>
            </div>

            {/* Section 2: Checkbox Highlights */}
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0A1A2F] flex items-center gap-2 mb-3">
                <span className="w-1.5 h-6 bg-[#00A859] rounded-full inline-block" />
                Key Compliance Takeaways
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
                Essential checkpoints every taxpayer and enterprise should monitor:
              </p>

              <div className="bg-[#EBF7F1] p-6 rounded-2xl space-y-3 mb-8">
                {[
                  "Optimized deduction claiming under active statutory sections.",
                  "Routine reconciliation of accounts to prevent last-minute notices.",
                  "Strategic advance tax planning across designated quarterly schedules.",
                  "Streamlined filing documentation for instant audit preparedness.",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm font-medium text-gray-800">
                    <CheckCircle2 className="w-4 h-4 text-[#00A859] flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3 */}
            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0A1A2F] flex items-center gap-2 mb-3">
                <span className="w-1.5 h-6 bg-[#00A859] rounded-full inline-block" />
                Expert Tips for Financial Execution
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Consulting with seasoned advisory professionals ensures that both personal exemptions and corporate 
                tax strategies are maximized without regulatory risk.
              </p>
            </div>

          </article>

          {/* ================= RIGHT SIDEBAR (STICKY - 4 COLS) ================= */}
          <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
            
            {/* Box 1: Categories Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-[#0A1A2F] px-6 py-5">
                <h3 className="text-white font-bold text-lg tracking-wide">Categories</h3>
                <div className="w-10 h-0.5 bg-[#00A859] mt-2 rounded-full" />
              </div>

              <div className="p-4 divide-y divide-gray-100">
                {categories.map((cat, i) => {
                  const Icon = cat.icon;
                  return (
                    <Link
                      key={i}
                      href={`/blog?category=${encodeURIComponent(cat.name)}`}
                      className="flex items-center justify-between py-3.5 px-2 hover:text-[#00A859] text-gray-700 transition group"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-[#00A859] group-hover:scale-110 transition" />
                        <span className="text-xs sm:text-sm font-semibold">{cat.name}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="bg-[#F0F5F2] text-gray-500 group-hover:bg-[#E8F8F0] group-hover:text-[#00A859] text-[11px] font-bold px-2 py-0.5 rounded-full transition">
                          {cat.count}
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#00A859] group-hover:translate-x-0.5 transition" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Box 2: Recent Posts Card (Dynamic from JSON) */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-[#0A1A2F] px-6 py-5">
                <h3 className="text-white font-bold text-lg tracking-wide">Recent Posts</h3>
                <div className="w-10 h-0.5 bg-[#00A859] mt-2 rounded-full" />
              </div>

              <div className="p-4 space-y-4">
                {recentPosts.map((rPost: any, i: number) => {
                  const rDate =
                    rPost.date || `${rPost.dateDay || "01"} ${rPost.dateMonth || "Jan"} 2026`;

                  return (
                    <Link
                      key={i}
                      href={`/blog/${rPost.slug}`}
                      className="flex items-center gap-4 group p-2 rounded-xl hover:bg-[#F6FBF8] transition"
                    >
                      <div className="relative w-20 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                        <Image
                          src={rPost.image}
                          alt={rPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition duration-300"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-[#0A1A2F] leading-snug line-clamp-2 group-hover:text-[#00A859] transition mb-1.5">
                          {rPost.title}
                        </h4>
                        <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                          <Calendar className="w-3 h-3 text-[#00A859]" />
                          <span>{rDate}</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

          </aside>

        </div>
      </div>

      <Footer />
    </main>
  );
}