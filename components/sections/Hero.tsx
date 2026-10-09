"use client";

import Image from "next/image";
import Link from "next/link";
import rawSiteData from "../../data/siteData.json";

// Safe dynamic JSON casting
const siteData = rawSiteData as any;

interface BannerButton {
  label: string;
  href: string;
}

interface HeroData {
  badge?: string;
  titleLine1?: string;
  titleHighlight?: string;
  titleLine2?: string;
  description?: string;
  backgroundImage?: string;
  buttons?: BannerButton[];
}

interface HeroProps {
  data?: HeroData;
}

export default function Hero({ data }: HeroProps) {
  // Direct prop support ya fallback to JSON
  const content: HeroData =
    data ||
    siteData.categories.TaxConsulting.sections.Banner.variants.TaxBanner1;

  const titleLine1 = content.titleLine1 || "Maximize Your Growth with";
  const titleHighlight = content.titleHighlight || "Expert Tax Advice";
  const titleLine2 = content.titleLine2 || "& Compliance";
  const description =
    content.description ||
    "Simplify your tax journey with our reliable, strategic and transparent financial consulting services tailored for individuals and businesses.";
  const heroImage = content.backgroundImage || "/hero.png";
  const primaryButton = content.buttons?.[0] || {
    label: "EXPLORE SERVICES",
    href: "/services",
  };

  return (
    <section className="relative w-full bg-[#07192C] text-white overflow-hidden min-h-[560px] sm:min-h-[600px] lg:min-h-[640px] flex items-center">
      
      {/* ================= 1. MOBILE-ONLY BACKGROUND IMAGE & GRADIENT OVERLAY ================= */}
      <div className="absolute inset-0 z-0 block lg:hidden">
        <Image
          src={heroImage}
          alt="Business Accounting Consultation"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />
        {/* Deep contrast overlay so white text stays 100% readable on phone */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07192C] via-[#07192C]/90 to-[#07192C]/75" />
      </div>

      {/* ================= 2. AMBIENT GLOW ORBS & TEXTURE ================= */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#00A859]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[40%] w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Lines Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Geometric Angle Accent */}
      <div
        className="absolute -bottom-24 -left-24 w-80 h-80 sm:w-96 sm:h-96 bg-[#030D17] rotate-45 pointer-events-none opacity-90 shadow-2xl hidden sm:block"
        aria-hidden="true"
      />

      {/* ================= 3. RESPONSIVE CONTENT GRID ================= */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-stretch relative z-10">
        
        {/* Left Content Column */}
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center px-5 sm:px-10 lg:pl-16 xl:pl-28 py-14 sm:py-16 lg:py-20">
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[56px] font-black tracking-tight leading-[1.15] text-white">
            {titleLine1} <br />
            <span className="inline-block bg-[#008A44] text-white px-3 sm:px-4 py-1 rounded-sm my-1.5 font-black shadow-sm">
              {titleHighlight}
            </span>{" "}
            <br />
            <span>{titleLine2}</span>
          </h1>

          <p className="mt-5 text-gray-300 text-xs sm:text-sm sm:leading-relaxed max-w-lg">
            {description}
          </p>

          <div className="mt-7 sm:mt-8">
            <Link
              href={primaryButton.href}
              className="inline-flex items-center justify-center bg-[#00A859] hover:bg-[#00924D] transition-all duration-300 shadow-[0_8px_25px_-5px_rgba(0,168,89,0.4)] hover:shadow-[0_12px_30px_-5px_rgba(0,168,89,0.6)] hover:-translate-y-0.5 active:translate-y-0 text-white px-7 sm:px-8 py-3.5 rounded-xl font-black text-xs sm:text-sm tracking-wider uppercase cursor-pointer"
            >
              {primaryButton.label}
            </Link>
          </div>
        </div>

        {/* Right Column (Desktop Only: Side-by-Side Edge-to-Edge Image) */}
        <div className="hidden lg:block lg:col-span-6 xl:col-span-6 relative min-h-full w-full overflow-hidden">
          <div className="relative w-full h-full transform transition-transform duration-700 ease-out hover:scale-105">
            <Image
              src={heroImage}
              alt="Business Accounting Consultation"
              fill
              priority
              sizes="50vw"
              className="object-cover object-center lg:object-left-top"
            />
          </div>
          {/* Subtle blending gradient into the left dark panel */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#07192C] to-transparent pointer-events-none" />
        </div>

      </div>
    </section>
  );
}