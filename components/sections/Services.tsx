"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  FileSpreadsheet,
  Receipt,
  TrendingUp,
  Calculator,
  FileCheck2,
  Building2,
  Scale,
  Landmark,
  ShieldAlert,
  Coins,
  Briefcase,
  FileText,
  Sparkles,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  LucideIcon,
} from "lucide-react";
import rawSiteData from "../../data/siteData.json";

const siteData = rawSiteData as any;

const iconMap: Record<string, LucideIcon> = {
  "income-tax-return-filing": FileSpreadsheet,
  "itr-filing": FileSpreadsheet,
  "tax-consulting": Calculator,
  "gst-registration-filing": Receipt,
  "gst-compliance": Receipt,
  "tax-planning": TrendingUp,
  "financial-planning": TrendingUp,
  "accounting-bookkeeping": Calculator,
  "corporate-tax": Landmark,
  "tds-return-filing": FileCheck2,
  "business-advisory": Briefcase,
  "business-company-registration": Building2,
  "audit-assurance": Scale,
  "statutory-audit": Scale,
  "tax-dispute-resolution": ShieldAlert,
  "payroll-management": Coins,
  "compliance-services": ShieldCheck,
  tax: FileSpreadsheet,
  gst: Receipt,
  accounting: Calculator,
  audit: Scale,
  planning: TrendingUp,
  advisory: Briefcase,
  corporate: Landmark,
  registration: Building2,
  tds: FileCheck2,
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

  const resolveIcon = (item: ServiceItem): LucideIcon => {
    if (item.icon && iconMap[item.icon.toLowerCase()]) {
      return iconMap[item.icon.toLowerCase()];
    }

    const slug = (item.slug || "").toLowerCase();
    if (iconMap[slug]) {
      return iconMap[slug];
    }

    const title = (item.title || item.name || "").toLowerCase();
    if (title.includes("gst")) return Receipt;
    if (title.includes("itr") || title.includes("income tax")) return FileSpreadsheet;
    if (title.includes("accounting") || title.includes("bookkeeping")) return Calculator;
    if (title.includes("planning")) return TrendingUp;
    if (title.includes("audit")) return Scale;
    if (title.includes("company") || title.includes("registration")) return Building2;
    if (title.includes("corporate")) return Landmark;
    if (title.includes("tds")) return FileCheck2;
    if (title.includes("advisory") || title.includes("consulting")) return Briefcase;

    return ShieldCheck;
  };

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-[#F8FCF9] overflow-hidden" id="services">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#00A85912_1px,transparent_1px),linear-gradient(to_bottom,#00A85912_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" 
        />
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-b from-[#00A859]/20 via-[#00A859]/10 to-transparent rounded-full blur-[90px]" />
        <div className="absolute top-1/3 -left-24 w-[350px] h-[350px] bg-[#00A859]/15 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 -right-24 w-[380px] h-[380px] bg-[#0A1A2F]/10 rounded-full blur-[110px]" />
        <div className="absolute top-12 left-12 opacity-20 text-[#00A859] hidden lg:block">
          <Sparkles className="w-7 h-7" />
        </div>
        <div className="absolute bottom-14 right-16 opacity-20 text-[#00A859] hidden lg:block">
          <Sparkles className="w-8 h-8" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="flex flex-col items-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E3F7EC] border border-[#00A859]/30 text-[#008A44] shadow-xs mb-3">
            <span className="w-2 h-2 rounded-full bg-[#00A859] animate-ping" />
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider">
              {content.badge || "Our Services"}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-black text-[#0A1A2F] tracking-tight leading-[1.18]">
            Comprehensive{" "}
            <span className="relative inline-block text-[#00A859]">
              {content.title || "Tax & Financial Services"}
              <svg
                className="absolute -bottom-1.5 left-0 w-full h-2 text-[#00A859]/30"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
              >
                <path d="M0,10 Q50,0 100,10" fill="none" stroke="currentColor" strokeWidth="4" />
              </svg>
            </span>
          </h2>

          <p className="mt-3 text-gray-600 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed">
            {content.description ||
              "We provide end-to-end tax and financial solutions to individuals, professionals and businesses, helping you stay compliant and achieve your financial goals."}
          </p>
        </div>

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
              const Icon = resolveIcon(item);
              const cardTitle = item.title || item.name || "Tax Service";
              const cardDesc = item.desc || item.desc1 || item.description || "";

              return (
                <div key={item.slug} className="w-full flex-shrink-0 px-2">
                  <div className="relative bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-gray-100 shadow-[0_6px_20px_rgb(0,0,0,0.04)] flex flex-col items-center justify-between text-center min-h-[310px]">
                    <div className="flex flex-col items-center w-full">
                      <div className="w-14 h-14 rounded-2xl bg-[#EAF8F1] flex items-center justify-center text-[#00A859] mb-4 shadow-xs">
                        <Icon className="w-7 h-7 stroke-[2]" />
                      </div>

                      <h3 className="text-lg font-extrabold text-[#0A1A2F] mb-2 leading-snug">
                        {cardTitle}
                      </h3>

                      <p className="text-gray-500 text-xs sm:text-[13px] leading-relaxed mb-4">
                        {cardDesc}
                      </p>
                    </div>

                    <Link
                      href={`/services/${item.slug}`}
                      className="inline-flex items-center gap-1.5 font-black text-xs text-[#00A859]"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-2 mt-5">
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

        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-center items-stretch">
          {servicesList.map((item) => {
            const Icon = resolveIcon(item);
            const cardTitle = item.title || item.name || "Tax Service";
            const cardDesc = item.desc || item.desc1 || item.description || "";

            return (
              <div
                key={item.slug}
                className="group relative bg-white/95 backdrop-blur-md p-6 sm:p-7 rounded-2xl border border-gray-100/90 shadow-[0_6px_25px_rgb(0,0,0,0.04)] hover:shadow-[0_16px_36px_-8px_rgba(0,168,89,0.16)] hover:border-emerald-300 transition-all duration-300 hover:-translate-y-1.5 flex flex-col items-center justify-between text-center overflow-hidden"
              >
                <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-transparent via-[#00A859] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />

                <div className="flex flex-col items-center w-full">
                  <div className="w-14 h-14 rounded-2xl bg-[#EAF8F1] flex items-center justify-center text-[#00A859] mb-4 group-hover:bg-[#00A859] group-hover:text-white group-hover:scale-105 transition-all duration-300 shadow-xs">
                    <Icon className="w-7 h-7 stroke-[1.9]" />
                  </div>

                  <h3 className="text-lg font-extrabold text-[#0A1A2F] group-hover:text-[#00A859] transition-colors duration-200 mb-2 leading-snug">
                    {cardTitle}
                  </h3>

                  <p className="text-gray-500 text-xs sm:text-[13px] leading-relaxed mb-5">
                    {cardDesc}
                  </p>
                </div>

                <Link
                  href={`/services/${item.slug}`}
                  className="mt-auto inline-flex items-center gap-1.5 font-bold text-xs sm:text-[13px] text-[#0A1A2F] group-hover:text-[#00A859] transition-colors"
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