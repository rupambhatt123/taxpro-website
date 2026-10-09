"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import rawSiteData from "../../data/siteData.json";

// Safe dynamic JSON casting
const siteData = rawSiteData as any;

export interface TestimonialItem {
  id?: number;
  quote: string;
  author?: string;
  name?: string;
  role: string;
  avatar: string;
  rating?: number;
}

interface TestimonialsData {
  badge?: string;
  titleLine1?: string;
  titleHighlight?: string;
  description?: string;
  items?: TestimonialItem[];
}

interface TestimonialsProps {
  data?: TestimonialsData;
}

export default function Testimonials({ data }: TestimonialsProps) {
  // Direct prop support ya JSON fallback
  const content: TestimonialsData =
    data ||
    siteData.categories.TaxConsulting.sections.Testimonials.variants
      .TaxTestimonials1;

  const testimonialList = content?.items || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonialList.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === testimonialList.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section
      className="relative w-full bg-[#FFFFFF] py-10 lg:py-12 overflow-hidden"
      id="testimonials"
    >
      {/* ================= SMOOTH BACKGROUND EFFECTS ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle Geometric Grid Mesh */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00A8590c_1px,transparent_1px),linear-gradient(to_bottom,#00A8590c_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)]" />

        {/* Floating Emerald Ambient Orbs */}
        <div className="absolute -top-20 left-1/4 w-[450px] h-[450px] bg-gradient-to-b from-[#00A859]/15 to-transparent rounded-full blur-[100px] animate-pulse-glow" />
        <div className="absolute top-1/3 -right-20 w-[400px] h-[400px] bg-[#00A859]/10 rounded-full blur-[110px] animate-float-slow" />
        <div
          className="absolute bottom-5 -left-20 w-[420px] h-[420px] bg-[#0A1A2F]/5 rounded-full blur-[120px] animate-float-slow"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ================= SECTION HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#E3F7EC] border border-[#00A859]/30 text-[#008A44] shadow-2xs mb-4">
            <span className="w-2 h-2 rounded-full bg-[#00A859] animate-ping" />
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider">
              {content.badge || "Our Clients Feedback"}
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#0A1A2F] tracking-tight leading-[1.18] mb-3">
            {content.titleLine1 || "What Our Clients"}{" "}
            <span className="text-[#00A859]">
              {content.titleHighlight || "Say About Us"}
            </span>
          </h2>

          <div className="w-12 h-1 bg-[#00A859] mx-auto mt-2 mb-4 rounded-full shadow-xs" />

          {/* Subtext */}
          <p className="text-gray-500 text-xs sm:text-sm sm:leading-relaxed max-w-xl mx-auto">
            {content.description ||
              "Trusted by individuals and businesses for reliable tax and financial consulting solutions."}
          </p>
        </div>

        {/* ================= 1. DESKTOP VIEW: 3 CARDS SIDE-BY-SIDE ================= */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {testimonialList.map((item, index) => {
            const clientName = item.author || item.name || "Satisfied Client";
            const starRating = item.rating || 5;

            return (
              <div
                key={index}
                className="group bg-white/95 backdrop-blur-xs p-7 sm:p-8 rounded-3xl border border-gray-100/90 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_18px_36px_-6px_rgba(0,168,89,0.12)] hover:border-emerald-200 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  {/* Card Top: Green Quote & Star Rating */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[#EAF8F1] text-[#00A859] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Quote className="w-5 h-5 fill-[#00A859]" />
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < starRating
                              ? "fill-amber-400 text-amber-400"
                              : "fill-gray-100 text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Quote Text */}
                  <p className="text-gray-600 text-xs sm:text-[13.5px] leading-relaxed mb-6 italic">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-gray-50 flex items-center gap-3.5">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden border border-emerald-100 flex-shrink-0">
                    <Image
                      src={item.avatar}
                      alt={clientName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-[#0A1A2F] leading-tight">
                      {clientName}
                    </h4>
                    <p className="text-[11.5px] text-gray-500 font-medium leading-tight mt-0.5">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= 2. MOBILE VIEW: 1 CARD WITH SLIDER & DOTS ================= */}
        {testimonialList.length > 0 && (
          <div className="md:hidden">
            <div className="overflow-hidden px-1">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonialList.map((item, index) => {
                  const clientName =
                    item.author || item.name || "Satisfied Client";
                  const starRating = item.rating || 5;

                  return (
                    <div key={index} className="w-full flex-shrink-0 px-2">
                      <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] flex flex-col justify-between min-h-[310px]">
                        <div>
                          <div className="flex items-center justify-between mb-5">
                            <div className="w-10 h-10 rounded-xl bg-[#EAF8F1] text-[#00A859] flex items-center justify-center">
                              <Quote className="w-5 h-5 fill-[#00A859]" />
                            </div>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < starRating
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
                              src={item.avatar}
                              alt={clientName}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="text-sm font-extrabold text-[#0A1A2F]">
                              {clientName}
                            </h4>
                            <p className="text-[11.5px] text-gray-500 font-medium">
                              {item.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile Navigation Arrows & Indicator Dots */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                onClick={prevSlide}
                aria-label="Previous slide"
                className="w-8 h-8 rounded-full border border-gray-200 bg-white text-gray-600 flex items-center justify-center hover:bg-gray-50 transition active:scale-90"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1.5">
                {testimonialList.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === i
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
        )}
      </div>
    </section>
  );
}