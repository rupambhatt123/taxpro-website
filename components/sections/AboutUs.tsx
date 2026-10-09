"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Users2,
  ShieldCheck,
  FileCheck2,
  TrendingUp,
  ArrowRight,
  LucideIcon,
  Sparkles,
} from "lucide-react";
import rawSiteData from "../../data/siteData.json";

// Safe dynamic JSON casting
const siteData = rawSiteData as any;

const iconMap: Record<string, LucideIcon> = {
  users: Users2,
  shield: ShieldCheck,
  fileCheck: FileCheck2,
  trendingUp: TrendingUp,
};

interface FeatureItem {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
}

interface AboutData {
  badge: string;
  titleLine1: string;
  titleHighlight: string;
  highlightBoxText: string;
  description: string;
  images: {
    top: string;
    bottomLeft: string;
    bottomRight: string;
  };
  features: FeatureItem[];
  button: {
    label: string;
    href: string;
  };
}

interface AboutUsProps {
  data?: AboutData;
}

export default function AboutUs({ data }: AboutUsProps) {
  const content: AboutData =
    data || siteData.categories.TaxConsulting.sections.About.variants.TaxAbout1;

  return (
    <section
      id="about"
      className="relative w-full bg-[#FFFFFF] py-10 sm:py-12 lg:py-12 overflow-hidden"
    >
      {/* ================= MOVING / AMBIENT BACKGROUND ANIMATION ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle grid mesh */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00A8590c_1px,transparent_1px),linear-gradient(to_bottom,#00A8590c_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)]" />

        {/* Floating animated glowing orbs */}
        <div className="absolute -top-16 -left-16 w-80 h-80 bg-[#00A859]/10 rounded-full blur-[90px] animate-pulse" />
        <div
          className="absolute top-1/2 -right-20 w-96 h-96 bg-[#00A859]/10 rounded-full blur-[100px] animate-pulse"
          style={{ animationDuration: "5s" }}
        />

        {/* Left Side Green Pill Shape with gentle float/pulse */}
        <div
          className="absolute left-0 top-1/2 -translate-y-8 w-3 h-16 bg-[#00A859] rounded-r-full hidden sm:block animate-pulse shadow-sm"
          aria-hidden="true"
        />

        {/* Ambient Sparkle accent */}
        <div className="absolute top-12 right-16 text-[#00A859]/20 hidden lg:block animate-bounce">
          <Sparkles className="w-6 h-6" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ================= LEFT: 3-PHOTO MOSAIC (WITH HOVER ZOOM) ================= */}
          <div className="lg:col-span-6 flex flex-col gap-3.5">
            {/* Top Large Photo */}
            <div className="group relative w-full h-[250px] sm:h-[290px] lg:h-[310px] rounded-3xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50 transition-all duration-300 hover:shadow-md">
              <Image
                src={content.images?.top || "/a3.jpg"}
                alt="Corporate Tax Consulting Team"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover object-[center_28%] transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#061B2E]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Bottom 2 Photos (42% / 58% Ratio) */}
            <div className="grid grid-cols-12 gap-3.5 h-[175px] sm:h-[195px] lg:h-[205px]">
              <div className="col-span-5 group relative w-full h-full rounded-3xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50 transition-all duration-300 hover:shadow-md">
                <Image
                  src={content.images?.bottomLeft || "/a1.png"}
                  alt="Tax Consultants Reviewing Document"
                  fill
                  sizes="(max-width: 1024px) 50vw, 250px"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div className="col-span-7 group relative w-full h-full rounded-3xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50 transition-all duration-300 hover:shadow-md">
                <Image
                  src={content.images?.bottomRight || "/a2.png"}
                  alt="Financial Audit and Accounting Calculation"
                  fill
                  sizes="(max-width: 1024px) 50vw, 350px"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* ================= RIGHT: CONTENT ================= */}
          <div className="lg:col-span-6 flex flex-col justify-start">
            
            {/* 1. BADA & HIGHLIGHTED ABOUT US BADGE */}
            <div>
              <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#E8F8F0] border border-[#00A859]/35 text-[#008A44] shadow-xs hover:bg-[#d8f4e6] hover:border-[#00A859] transition-all duration-300 mb-3 cursor-default">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00A859] animate-ping" />
                <span className="text-xs sm:text-sm font-black uppercase tracking-wider">
                  {content.badge || "About Us"}
                </span>
              </div>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-black text-[#0A1A2F] tracking-tight leading-[1.18] mb-4">
              {content.titleLine1} <br />
              with <span className="text-[#00A859]">{content.titleHighlight}</span>
            </h2>

            {/* Green Bordered Callout Box */}
            <div className="bg-[#F8FAF9] border-l-[4px] border-[#00A859] px-5 py-3.5 rounded-r-xl mb-4 shadow-2xs">
              <p className="text-xs sm:text-[14px] text-gray-700 font-medium leading-relaxed">
                {content.highlightBoxText}
              </p>
            </div>

            {/* Subtext Paragraph */}
            <p className="text-gray-600 text-xs sm:text-[13.5px] leading-relaxed mb-5">
              {content.description}
            </p>

            {/* ================= 2. CHAR POINTS KE BADE ICONS + HOVER EFFECT ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
              {content.features?.map((item) => {
                const IconComponent = iconMap[item.icon] || Users2;
                return (
                  <div
                    key={item.id}
                    className="group/item flex items-center gap-3.5 p-3 rounded-2xl bg-white border border-transparent hover:border-gray-100 hover:bg-[#F8FCF9] hover:shadow-sm transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                  >
                    {/* Bada Icon Box + Color Invert on Card Hover */}
                    <div className="w-13 h-13 rounded-2xl bg-[#EAF8F1] group-hover/item:bg-[#00A859] flex items-center justify-center text-[#00A859] group-hover/item:text-white flex-shrink-0 shadow-xs transition-all duration-300 group-hover/item:rotate-3 group-hover/item:scale-105">
                      <IconComponent className="w-6 h-6 stroke-[2.3] transition-transform duration-300" />
                    </div>
                    <div>
                      <h4 className="text-[14px] sm:text-[14.5px] font-black text-[#0A1A2F] group-hover/item:text-[#00A859] leading-snug transition-colors duration-200">
                        {item.title}
                      </h4>
                      <p className="text-[12px] text-gray-400 font-medium leading-snug mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ================= 3. BADA EXPLORE SERVICES BUTTON ================= */}
            {content.button && (
              <div>
                <Link
                  href={content.button.href || "/services"}
                  className="group inline-flex items-center gap-3.5 px-9 py-4 bg-[#0A1A2F] hover:bg-[#00A859] text-white text-xs sm:text-sm font-black tracking-wider uppercase rounded-xl transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-[#00A859]/30 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                >
                  <span>{content.button.label}</span>
                  <ArrowRight className="w-4 h-4 stroke-[3] transition-transform duration-300 group-hover:translate-x-1.5" />
                </Link>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}