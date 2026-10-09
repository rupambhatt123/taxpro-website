"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  FileSpreadsheet,
  Percent,
  TrendingUp,
  Calculator,
  FileText,
  Building2,
  Sparkles,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  LucideIcon,
} from "lucide-react";
import rawSiteData from "../../data/siteData.json";

// Safe dynamic JSON casting
const siteData = rawSiteData as any;

// Slug to Icon fallback mapping
const iconMap: Record<string, LucideIcon> = {
  "income-tax-return-filing": FileSpreadsheet,
  "itr-filing": FileSpreadsheet,
  "tax-consulting": FileSpreadsheet,
  "gst-registration-filing": Percent,
  "gst-compliance": Percent,
  "tax-planning": TrendingUp,
  "financial-planning": TrendingUp,
  "accounting-bookkeeping": Calculator,
  "corporate-tax": Calculator,
  "tds-return-filing": FileText,
  "business-advisory": FileText,
  "business-company-registration": Building2,
};

interface ServiceItem {
  slug: string;
  name?: string;
  title?: string;
  desc?: string;
  desc1?: string;
  description?: string;
  icon?: string;
}

interface ServicesData {
  badge?: string;
  title?: string;
  description?: string;
  items?: ServiceItem[];
}

interface ServicesProps {
  data?: ServicesData;
}

export default function Services({ data }: ServicesProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const content: ServicesData =
    data ||
    siteData.categories.TaxConsulting.sections.Services.variants.TaxServices1;

  const servicesList = content?.items || [];

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentSlide < servicesList.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
    if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  return (
    <section className="relative py-12 lg:py-16 bg-[#F8FCF9] overflow-hidden" id="services">
      {/* Background Decoratives */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#00A85912_1px,transparent_1px),linear-gradient(to_bottom,#00A85912_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" 
        />
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-gradient-to-b from-[#00A859]/20 via-[#00A859]/10 to-transparent rounded-full blur-[90px]" />
        <div className="absolute top-1/3 -left-24 w-[380px] h-[380px] bg-[#00A859]/15 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 -right-24 w-[420px] h-[420px] bg-[#0A1A2F]/10 rounded-full blur-[110px]" />
        <div className="absolute top-16 left-12 opacity-20 text-[#00A859] hidden lg:block">
          <Sparkles className="w-8 h-8" />
        </div>
        <div className="absolute bottom-20 right-16 opacity-20 text-[#00A859] hidden lg:block">
          <Sparkles className="w-10 h-10" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* ================= HEADER SECTION ================= */}
        <div className="flex flex-col items-center mb-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#E3F7EC] border border-[#00A859]/30 text-[#008A44] shadow-xs mb-4">
            <span className="w-2 h-2 rounded-full bg-[#00A859] animate-ping" />
            <span className="text-sm sm:text-base font-extrabold uppercase tracking-wider">
              {content.badge || "Our Services"}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#0A1A2F] tracking-tight leading-[1.18]">
            Comprehensive{" "}
            <span className="relative inline-block text-[#00A859]">
              {content.title || "Tax & Financial Services"}
              <svg
                className="absolute -bottom-2 left-0 w-full h-2 text-[#00A859]/30"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
              >
                <path d="M0,10 Q50,0 100,10" fill="none" stroke="currentColor" strokeWidth="4" />
              </svg>
            </span>
          </h2>

          <p className="mt-5 text-gray-600 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed">
            {content.description ||
              "We provide end-to-end tax and financial solutions to individuals, professionals and businesses, helping you stay compliant and achieve your financial goals."}
          </p>
        </div>

        {/* ================= 1. MOBILE SLIDER VIEW (md:hidden - ONLY 1 CARD VISIBLE) ================= */}
        <div 
          className="md:hidden relative w-full overflow-hidden px-1"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {servicesList.map((item) => {
              const Icon = iconMap[item.slug] || ShieldCheck;
              const cardTitle = item.title || item.name || "Tax Service";
              const cardDesc = item.desc || item.desc1 || item.description || "";

              return (
                <div key={item.slug} className="w-full flex-shrink-0 px-2">
                  <div className="relative bg-white/95 backdrop-blur-md p-7 rounded-3xl border border-gray-100 shadow-[0_8px_25px_rgb(0,0,0,0.05)] flex flex-col items-center justify-between text-center min-h-[350px]">
                    
                    <div className="flex flex-col items-center w-full">
                      <div className="w-16 h-16 rounded-2xl bg-[#EAF8F1] flex items-center justify-center text-[#00A859] mb-5 shadow-xs">
                        <Icon className="w-8 h-8 stroke-[2.2]" />
                      </div>

                      <h3 className="text-xl font-extrabold text-[#0A1A2F] mb-3 leading-snug">
                        {cardTitle}
                      </h3>

                      <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-6">
                        {cardDesc}
                      </p>
                    </div>

                    <Link
                      href={`/services/${item.slug}`}
                      className="inline-flex items-center gap-2 font-black text-xs text-[#00A859]"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots Navigation for Mobile */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 0))}
              aria-label="Previous service"
              disabled={currentSlide === 0}
              className="w-7 h-7 rounded-full bg-white border border-gray-200 text-gray-600 flex items-center justify-center disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5">
              {servicesList.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setCurrentSlide(dotIdx)}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === dotIdx
                      ? "w-6 bg-[#00A859]"
                      : "w-2 bg-gray-200"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentSlide((prev) => Math.min(prev + 1, servicesList.length - 1))}
              aria-label="Next service"
              disabled={currentSlide === servicesList.length - 1}
              className="w-7 h-7 rounded-full bg-white border border-gray-200 text-gray-600 flex items-center justify-center disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ================= 2. DESKTOP/TABLET GRID VIEW (hidden md:grid) ================= */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-center">
          {servicesList.map((item) => {
            const Icon = iconMap[item.slug] || ShieldCheck;
            const cardTitle = item.title || item.name || "Tax Service";
            const cardDesc = item.desc || item.desc1 || item.description || "";

            return (
              <div
                key={item.slug}
                className="group relative bg-white/95 backdrop-blur-md p-8 rounded-3xl border border-gray-100/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_-10px_rgba(0,168,89,0.18)] hover:border-emerald-300 transition-all duration-300 hover:-translate-y-2 flex flex-col items-center justify-between text-center overflow-hidden"
              >
                <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-[#00A859] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-3xl" />

                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#EAF8F1] flex items-center justify-center text-[#00A859] mb-6 group-hover:bg-[#00A859] group-hover:text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xs">
                    <Icon className="w-8 h-8 stroke-[2.2]" />
                  </div>

                  <h3 className="text-xl font-extrabold text-[#0A1A2F] group-hover:text-[#00A859] transition-colors duration-200 mb-3 leading-snug">
                    {cardTitle}
                  </h3>

                  <p className="text-gray-500 text-xs sm:text-[13.5px] leading-relaxed mb-6">
                    {cardDesc}
                  </p>
                </div>

                <Link
                  href={`/services/${item.slug}`}
                  className="mt-auto inline-flex items-center gap-2 font-black text-xs sm:text-sm text-[#0A1A2F] group-hover:text-[#00A859] transition-colors"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </Link>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}