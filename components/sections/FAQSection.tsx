"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronDown,
  Users2,
  ShieldCheck,
  FileCheck2,
  TrendingUp,
  FolderCheck,
  Smile,
  Headphones,
  Award,
  HandCoins,
  ThumbsUp,
  Headset,
  Trophy,
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  LucideIcon,
} from "lucide-react";
import rawSiteData from "../../data/siteData.json";

// Safe dynamic JSON casting
const siteData = rawSiteData as any;

// Dynamic Icon Map for Pillars & Stats
const iconMap: Record<string, LucideIcon> = {
  users: Users2,
  shield: ShieldCheck,
  fileCheck: FileCheck2,
  trendingUp: TrendingUp,
  coins: HandCoins,
  thumbsUp: ThumbsUp,
  headset: Headset,
  trophy: Trophy,
  folder: FolderCheck,
  smile: Smile,
  headphones: Headphones,
  award: Award,
};

interface FAQItem {
  id?: string;
  question: string;
  answer: string;
}

interface PillarItem {
  title1: string;
  title2: string;
  icon: string;
}

interface StatItem {
  value: string;
  label: string;
  icon: string;
}

interface TestimonialItem {
  id?: number;
  quote: string;
  name?: string;
  author?: string;
  role: string;
  avatar?: string;
  rating?: number;
}

interface FAQSectionProps {
  faqData?: any;
  statsData?: any;
  testimonialsData?: any;
}

export default function FAQSection({
  faqData,
  statsData,
  testimonialsData,
}: FAQSectionProps) {
  // Extract JSON fallbacks
  const faqContent =
    faqData || siteData.categories.TaxConsulting.sections.FAQ.variants.TaxFAQ1;
  const statsContent =
    statsData ||
    siteData.categories.TaxConsulting.sections.StatsCounter.variants
      .TaxStatsCounter1;
  const testimonialsContent =
    testimonialsData ||
    siteData.categories.TaxConsulting.sections.Testimonials.variants
      .TaxTestimonials1;

  const faqsList: FAQItem[] = faqContent?.items || [];
  const pillars: PillarItem[] = faqContent?.pillars || [];
  const statsList: StatItem[] = statsContent?.items || [];
  const testimonialsList: TestimonialItem[] = testimonialsContent?.items || [];

  const [openFaq, setOpenFaq] = useState<string>("01");
  const [currentSlide, setCurrentSlide] = useState(0);

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? "" : id);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? testimonialsList.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === testimonialsList.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div id="faq" className="w-full bg-[#FBFDFA] overflow-hidden">
      
      {/* ================= 1. POPULAR QUESTIONS ================= */}
      <section className="py-10 lg:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#E3F7EC] border border-[#00A859]/30 text-[#008A44] shadow-2xs mb-4">
            <span className="w-2 h-2 rounded-full bg-[#00A859] animate-ping" />
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider">
              {faqContent.badge || "FAQ"}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#0A1A2F] tracking-tight leading-[1.18] mb-3">
            {faqContent.titleLine1 || "Popular"}{" "}
            <span className="text-[#00A859]">
              {faqContent.titleHighlight || "Questions"}
            </span>
          </h2>

          <div className="w-12 h-1 bg-[#00A859] mx-auto mt-2 mb-4 rounded-full shadow-xs" />

          <p className="text-gray-500 text-xs sm:text-sm sm:leading-relaxed max-w-xl mx-auto">
            {faqContent.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Accordion List (7 Cols) */}
          <div className="lg:col-span-7 space-y-3.5">
            {faqsList.map((faq, index) => {
              const faqId =
                faq.id || (index < 9 ? `0${index + 1}` : `${index + 1}`);
              const isOpen = openFaq === faqId;

              return (
                <div
                  key={faqId}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "bg-[#EAF8F1] border-emerald-300 shadow-sm"
                      : "bg-white border-gray-100 hover:border-emerald-200 shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faqId)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left gap-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                          isOpen
                            ? "bg-[#00A859] text-white shadow-xs"
                            : "bg-[#EAF8F1] text-[#00A859]"
                        }`}
                      >
                        {faqId}
                      </span>
                      <span className="font-semibold text-[#0A1A2F] text-sm sm:text-[15px] leading-snug">
                        {faq.question}
                      </span>
                    </div>

                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? "rotate-180 text-[#00A859]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-[13.5px] text-gray-600 leading-relaxed pl-14 sm:pl-[4.2rem] pr-6 border-t border-emerald-200/50 mt-1">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Sticky Sidebar Image + 4 Pillars (5 Cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 self-start bg-white rounded-3xl border border-gray-100 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)] p-3.5 sm:p-4">
            <div className="relative h-[320px] sm:h-[380px] w-full rounded-2xl overflow-hidden mb-3.5 bg-gray-50">
              <Image
                src={
                  faqContent.sidebarImage ||
                  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80"
                }
                alt="Tax Consulting Expert"
                fill
                priority
                className="object-cover object-top"
              />
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#F4FAF6] p-3 rounded-2xl">
              {pillars.map((pillar, pIdx) => {
                const IconComponent = iconMap[pillar.icon] || Users2;
                return (
                  <div
                    key={pIdx}
                    className="flex flex-col items-center text-center p-1.5"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#00A859] shadow-xs mb-1.5">
                      <IconComponent className="w-4.5 h-4.5 stroke-[2.2]" />
                    </div>
                    <span className="text-[11px] font-bold text-[#0A1A2F] leading-tight">
                      {pillar.title1}
                      <br />
                      {pillar.title2}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ================= 2. GREEN STATS BAR ================= */}
      <section className="bg-[#007F43] py-8 sm:py-10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {statsList.map((stat, sIdx) => {
              const IconComponent = iconMap[stat.icon] || Trophy;
              return (
                <div
                  key={sIdx}
                  className="bg-[#00713B]/80 border border-emerald-600/40 rounded-2xl p-4 sm:p-5 flex items-center gap-4 shadow-sm"
                >
                  <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center text-[#00A859] flex-shrink-0 shadow-md">
                    <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none">
                      {stat.value}
                    </p>
                    <p className="text-xs sm:text-sm text-emerald-100 font-medium mt-1">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 3. WHAT OUR CLIENTS SAY ================= */}
      <section className="py-10 lg:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#E3F7EC] border border-[#00A859]/30 text-[#008A44] shadow-2xs mb-4">
            <span className="w-2 h-2 rounded-full bg-[#00A859] animate-ping" />
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider">
              {testimonialsContent.badge || "Our Clients Feedback"}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#0A1A2F] tracking-tight leading-[1.18] mb-3">
            {testimonialsContent.titleLine1 || "What Our Clients"}{" "}
            <span className="text-[#00A859]">
              {testimonialsContent.titleHighlight || "Say About Us"}
            </span>
          </h2>

          <div className="w-12 h-1 bg-[#00A859] mx-auto mt-2 mb-4 rounded-full shadow-xs" />

          <p className="text-gray-500 text-xs sm:text-sm sm:leading-relaxed max-w-xl mx-auto">
            {testimonialsContent.description}
          </p>
        </div>

        {/* Desktop View: Grid 3 Cards */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {testimonialsList.map((item, i) => (
            <div
              key={i}
              className="group bg-white/95 backdrop-blur-xs p-7 sm:p-8 rounded-3xl border border-gray-100 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_18px_36px_-6px_rgba(0,168,89,0.12)] hover:border-emerald-200 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF8F1] flex items-center justify-center text-[#00A859]">
                    <Quote className="w-5 h-5 fill-current" />
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className={`w-4 h-4 ${
                          starIndex < (item.rating || 5)
                            ? "fill-amber-400 text-amber-400"
                            : "fill-gray-100 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-gray-600 text-xs sm:text-[13.5px] leading-relaxed mb-6 italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex items-center gap-3.5">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 border border-emerald-100">
                    <Image
                      src={
                        item.avatar ||
                        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                      }
                      alt={item.name || item.author || "Client"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-[#0A1A2F] leading-tight">
                      {item.name || item.author}
                    </h4>
                    <p className="text-[11.5px] text-gray-500 font-medium leading-tight mt-0.5">
                      {item.role}
                    </p>
                  </div>
                </div>

                <Quote className="w-6 h-6 text-[#00A859]/20 fill-current" />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View: Carousel */}
        <div className="md:hidden">
          <div className="overflow-hidden px-1">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonialsList.map((item, index) => (
                <div key={index} className="w-full flex-shrink-0 px-2">
                  <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] flex flex-col justify-between min-h-[310px]">
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-10 h-10 rounded-xl bg-[#EAF8F1] text-[#00A859] flex items-center justify-center">
                          <Quote className="w-5 h-5 fill-current" />
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < (item.rating || 5)
                                  ? "fill-amber-400 text-amber-400"
                                  : "fill-gray-100 text-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <p className="text-gray-600 text-[13px] leading-relaxed mb-6 italic">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-50 flex items-center gap-3">
                      <div className="relative w-11 h-11 rounded-full overflow-hidden border border-emerald-100 flex-shrink-0">
                        <Image
                          src={
                            item.avatar ||
                            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                          }
                          alt={item.name || item.author || "Client"}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-[#0A1A2F]">
                          {item.name || item.author}
                        </h4>
                        <p className="text-[11.5px] text-gray-500 font-medium">
                          {item.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="w-8 h-8 rounded-full border border-gray-200 bg-white text-gray-600 flex items-center justify-center hover:bg-gray-50 transition active:scale-90"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5">
              {testimonialsList.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === i
                      ? "w-6 bg-[#00A859]"
                      : "w-2 bg-gray-200 hover:bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="w-8 h-8 rounded-full border border-gray-200 bg-white text-gray-600 flex items-center justify-center hover:bg-gray-50 transition active:scale-90"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </section>

    </div>
  );
}