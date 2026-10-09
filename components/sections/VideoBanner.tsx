"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, ArrowUpRight, X } from "lucide-react";
import rawSiteData from "../../data/siteData.json";

// Safe dynamic JSON casting
const siteData = rawSiteData as any;

interface VideoBannerData {
  titleLine1?: string;
  titleLine2?: string;
  description?: string;
  bgImage?: string;
  videoUrl?: string;
  button?: {
    label: string;
    href: string;
  };
}

interface VideoBannerProps {
  data?: VideoBannerData;
}

export default function VideoBanner({ data }: VideoBannerProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Direct prop support ya JSON fallback
  const content: VideoBannerData =
    data ||
    siteData.categories.TaxConsulting.sections.VideoBanner.variants
      .TaxVideoBanner1;

  const titleLine1 =
    content?.titleLine1 || "We deliver expertise and help your";
  const titleLine2 = content?.titleLine2 || "business to grow up";
  const description =
    content?.description ||
    "There are many variations of passages available but the majority have suffered alteration in some form by injected humour words which don't look even slightly believable.";
  const bgImage =
    content?.bgImage ||
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=85";
  const videoUrl =
    content?.videoUrl ||
    "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";
  const button = content?.button || {
    label: "Contact Us",
    href: "/contact",
  };

  return (
    <>
      <section className="relative w-full min-h-[460px] sm:min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* ================= BACKGROUND IMAGE WITH DEEP CINEMATIC OVERLAY ================= */}
        <div className="absolute inset-0 z-0">
          <Image
            src={bgImage}
            alt="Corporate team collaboration"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-105 hover:scale-100 transition-transform duration-1000 ease-out"
          />
          {/* Deep Navy/Black Gradient Overlay for High Contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#07192C]/90 via-[#0A1A2F]/85 to-[#07192C]/90 backdrop-blur-[2px]" />

          {/* Ambient Glowing Orbs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#00A859]/15 rounded-full blur-[120px] pointer-events-none" />
        </div>

        {/* ================= CONTENT CONTAINER ================= */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center flex flex-col items-center">
          {/* 1. Animated Glowing Play Button */}
          <div className="relative mb-6 sm:mb-8">
            {/* Outer Continuous Pulse Wave */}
            <span className="absolute -inset-2 rounded-full bg-[#00A859]/40 animate-ping opacity-75" />
            <span className="absolute -inset-4 rounded-full bg-[#00A859]/20 animate-pulse-glow" />

            <button
              onClick={() => setIsOpen(true)}
              aria-label="Play corporate overview video"
              className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#00A859] hover:bg-[#00924D] text-white flex items-center justify-center shadow-[0_0_30px_rgba(0,168,89,0.6)] hover:shadow-[0_0_40px_rgba(0,168,89,0.85)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer group"
            >
              <Play className="w-7 h-7 fill-white translate-x-0.5 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* 2. Main Headline */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-black text-white tracking-tight leading-[1.2] mb-4 sm:mb-5 max-w-3xl">
            {titleLine1} <br className="hidden sm:inline" />
            <span className="text-white">{titleLine2}</span>
          </h2>

          {/* 3. Subtext Paragraph */}
          <p className="text-gray-300 text-xs sm:text-sm sm:leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-9 font-normal opacity-90">
            {description}
          </p>

          {/* 4. Animated Contact Us Button */}
          <Link
            href={button.href}
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#00A859] hover:bg-[#00924D] text-white text-xs sm:text-sm font-extrabold tracking-wider rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(0,168,89,0.35)] hover:shadow-[0_8px_30px_rgba(0,168,89,0.6)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>{button.label}</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </Link>
        </div>
      </section>

      {/* ================= OPTIONAL VIDEO MODAL POPUP ================= */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in">
          <div className="relative w-full max-w-3xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close video modal"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Responsive Video Frame */}
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src={videoUrl}
                title="Company Overview Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}