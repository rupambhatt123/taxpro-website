"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FileSearch,
  BarChart3,
  Award,
  Users2,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  LucideIcon,
} from "lucide-react";
import rawSiteData from "../../data/siteData.json";

// Safe dynamic JSON casting
const siteData = rawSiteData as any;

// Dynamic string to Lucide icon resolver
const iconMap: Record<string, LucideIcon> = {
  fileSearch: FileSearch,
  barChart: BarChart3,
  award: Award,
  users: Users2,
  trendingUp: TrendingUp,
  shieldCheck: ShieldCheck,
};

interface StepItem {
  step: string;
  title: string;
  desc: string;
  icon: string;
}

interface BottomStatItem {
  value: string;
  label: string;
  icon: string;
}

interface WhyChooseUsData {
  badge?: string;
  titleLine1?: string;
  titleLine2?: string;
  titleHighlight?: string;
  desc1?: string;
  desc2?: string;
  button?: {
    label: string;
    href: string;
  };
  centerImage?: string;
  bottomStats?: BottomStatItem[];
  steps?: StepItem[];
}

interface WhyChooseUsProps {
  data?: WhyChooseUsData;
}

export default function WhyChooseUs({ data }: WhyChooseUsProps) {
  // Direct prop support ya JSON fallback
  const content: WhyChooseUsData =
    data ||
    siteData.categories.TaxConsulting.sections.WhyChooseUs.variants
      .TaxWhyChooseUs1;

  const stepsList = content?.steps || [];
  const bottomStatsList = content?.bottomStats || [];
  const centerImage = content?.centerImage || "/a1.png";
  const button = content?.button || {
    label: "More About Us",
    href: "/about",
  };

  return (
    <section
      className="relative w-full bg-[#FFFFFF] py-8 sm:py-10 lg:py-10 overflow-hidden"
      id="why-choose-us"
    >
      {/* Background Subtle Geometric Grid & Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00A8590c_1px,transparent_1px),linear-gradient(to_bottom,#00A8590c_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)]" />
        <div className="absolute top-10 right-10 w-[450px] h-[450px] bg-[#00A859]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-sky-400/5 rounded-full blur-[110px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* ================= LEFT CONTENT COLUMN (4 COLS) ================= */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            {/* Pill Badge */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#E3F7EC] border border-[#00A859]/30 text-[#008A44] shadow-2xs mb-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A859] animate-ping" />
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider">
                  {content?.badge || "Why Choose Us"}
                </span>
              </div>
            </div>

            {/* Main Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-black text-[#0A1A2F] tracking-tight leading-[1.18] mb-2.5">
              {content?.titleLine1 || "We Understand that"} <br />
              {content?.titleLine2 || "Every Business"}{" "}
              <span className="text-[#00A859]">
                {content?.titleHighlight || "is Unique"}
              </span>
            </h2>

            {/* Green Accent Divider Bar */}
            <div className="w-12 h-1 bg-[#00A859] rounded-full mb-3.5 shadow-xs" />

            {/* Subtext Paragraphs */}
            <p className="text-gray-700 text-xs sm:text-[14px] font-normal leading-relaxed mb-3">
              {content?.desc1 ||
                "We take the time to understand your business, financial goals, and challenges to provide personalized tax and financial solutions."}
            </p>

            <p className="text-gray-500 text-xs sm:text-[13px] leading-relaxed mb-5">
              {content?.desc2 ||
                "Our experienced team combines industry expertise with practical insights to help you stay compliant, reduce tax liabilities, and achieve long-term financial growth."}
            </p>

            {/* ================= BADA & HIGHLIGHTED MORE ABOUT US BUTTON ================= */}
            <div className="mb-6">
              <Link
                href={button.href}
                className="group inline-flex items-center gap-3.5 px-8 sm:px-9 py-3.5 sm:py-4 bg-[#0A1A2F] hover:bg-[#00A859] text-white text-xs sm:text-sm font-black tracking-wider uppercase rounded-xl transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-[#00A859]/30 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                <span>{button.label}</span>
                <ArrowRight className="w-4 h-4 stroke-[3] transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </div>

            {/* 3 Bottom Horizontal Stats */}
            <div className="pt-4 border-t border-gray-100 grid grid-cols-3 gap-2 sm:gap-3">
              {bottomStatsList.map((stat, sIdx) => {
                const IconComponent = iconMap[stat.icon] || Users2;
                return (
                  <div
                    key={sIdx}
                    className={`flex items-center gap-2.5 ${
                      sIdx > 0 ? "border-l border-gray-100 pl-2 sm:pl-3" : ""
                    }`}
                  >
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#EAF8F1] flex items-center justify-center text-[#00A859] flex-shrink-0">
                      <IconComponent className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-black text-[#0A1A2F] leading-none">
                        {stat.value}
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-gray-500 font-medium leading-tight mt-1">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ================= CENTER STYLISH IMAGE COLUMN ================= */}
          <div className="lg:col-span-4 relative flex items-center justify-center py-2">
            {/* Top Dot Grid Accent */}
            <div className="absolute -top-2 left-6 grid grid-cols-4 gap-1.5 opacity-35 pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A859]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A859]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A859]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A859]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A859]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A859]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A859]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A859]" />
            </div>

            {/* Fluid Ambient Glows */}
            <div className="absolute -top-3 -right-3 w-40 h-40 bg-sky-100/70 rounded-full blur-xl pointer-events-none" />
            <div className="absolute -bottom-3 -left-3 w-44 h-44 bg-emerald-100/70 rounded-full blur-xl pointer-events-none" />

            {/* Asymmetric Curved Frame */}
            <div className="relative w-full h-[340px] sm:h-[400px] lg:h-[410px] rounded-tl-[44px] rounded-br-[44px] rounded-tr-2xl rounded-bl-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.06)] border-4 border-white z-10 group bg-gray-50">
              <Image
                src={centerImage}
                alt="Business Consultation Discussion"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>

            {/* Sparkle Accent */}
            <div className="absolute -bottom-2 right-2 text-[#00A859] opacity-30 pointer-events-none">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>

          {/* ================= RIGHT 3 STEP CARDS COLUMN ================= */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {stepsList.map((step, idx) => {
              const StepIcon = iconMap[step.icon] || Award;
              return (
                <div
                  key={idx}
                  className="group relative bg-white/95 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-[0_3px_15px_-3px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_28px_-6px_rgba(0,168,89,0.12)] hover:border-emerald-200 transition-all duration-300 hover:-translate-y-0.5 flex items-start gap-3.5"
                >
                  {/* Mint-Green Icon Frame */}
                  <div className="w-12 h-12 rounded-xl bg-[#EAF8F1] flex items-center justify-center text-[#00A859] flex-shrink-0 group-hover:bg-[#00A859] group-hover:text-white transition-all duration-300 shadow-2xs group-hover:scale-105 group-hover:rotate-2">
                    <StepIcon className="w-6 h-6 stroke-[2]" />
                  </div>

                  {/* Card Content */}
                  <div className="flex-1">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-600 text-[11px] sm:text-xs font-black mb-1">
                      {step.step}
                    </span>

                    {/* Step Title */}
                    <h3 className="text-sm sm:text-base font-extrabold text-[#0A1A2F] group-hover:text-[#00A859] transition-colors leading-snug mb-1">
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-gray-500 text-xs sm:text-[13px] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}