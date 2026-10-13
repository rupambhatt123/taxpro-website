"use client";

import Image from "next/image";
import Link from "next/link";
import rawSiteData from "../../data/siteData.json";

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
  const content: HeroData =
    data ||
    siteData.categories.TaxConsulting.sections.Banner.variants.TaxBanner1;

  const titleLine1 = content.titleLine1 || "We Provide Best";
  const titleHighlight = content.titleHighlight || "Accounting";
  const titleLine2 = content.titleLine2 || "& Tax Service For You";
  const description =
    content.description ||
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud";
  const heroImage = content.backgroundImage || "/hero.png";
  const primaryButton = content.buttons?.[0] || {
    label: "GET STARTED",
    href: "/services",
  };

  return (
    <section className="relative w-full bg-[#0A1A2F] text-white overflow-hidden min-h-[520px] sm:min-h-[560px] lg:min-h-[600px] flex items-center">
      <div className="absolute inset-0 z-0 block lg:hidden">
        <Image
          src={heroImage}
          alt="Business Accounting Consultation"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A2F] via-[#0A1A2F]/90 to-[#0A1A2F]/75" />
      </div>

      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#00A859]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[40%] w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div
        className="absolute -bottom-24 -left-24 w-80 h-80 sm:w-96 sm:h-96 bg-[#061324] rotate-45 pointer-events-none opacity-90 shadow-2xl hidden sm:block"
        aria-hidden="true"
      />

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-stretch relative z-10">
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center px-6 sm:px-10 lg:pl-16 xl:pl-24 py-12 sm:py-16 lg:py-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] xl:text-[52px] font-bold tracking-tight leading-[1.2] text-white">
            {titleLine1} <br />
            <span className="inline-block bg-[#00A859] text-white px-3 sm:px-4 py-1 rounded-sm my-1.5 font-bold shadow-xs">
              {titleHighlight}
            </span>{" "}
            <br />
            <span>{titleLine2}</span>
          </h1>

          <p className="mt-5 text-gray-300 text-xs sm:text-[14px] leading-relaxed max-w-lg font-normal">
            {description}
          </p>

          <div className="mt-6 sm:mt-8">
            <Link
              href={primaryButton.href}
              className="inline-flex items-center justify-center bg-[#00A859] hover:bg-[#00C868] transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#00C868]/30 hover:-translate-y-0.5 active:translate-y-0 text-white px-7 sm:px-8 py-3.5 rounded-sm font-bold text-xs sm:text-sm tracking-wider uppercase cursor-pointer"
            >
              {primaryButton.label}
            </Link>
          </div>
        </div>

        <div className="hidden lg:block lg:col-span-6 xl:col-span-6 relative min-h-full w-full overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              src={heroImage}
              alt="Business Accounting Consultation"
              fill
              priority
              sizes="50vw"
              className="object-cover object-center lg:object-left-top"
            />
          </div>
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0A1A2F] to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}