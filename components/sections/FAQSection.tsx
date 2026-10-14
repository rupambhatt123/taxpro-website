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
  LucideIcon,
} from "lucide-react";
import rawSiteData from "../../data/siteData.json";

const siteData = rawSiteData as any;

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

interface FAQSectionProps {
  faqData?: any;
}

export default function FAQSection({ faqData }: FAQSectionProps) {
  const faqContent =
    faqData || siteData.categories.TaxConsulting.sections.FAQ.variants.TaxFAQ1;

  const faqsList: FAQItem[] = faqContent?.items || [];
  const pillars: PillarItem[] = faqContent?.pillars || [];

  const [openFaq, setOpenFaq] = useState<string>("01");

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? "" : id);
  };

  return (
    <div id="faq" className="w-full bg-[#FBFDFA] overflow-hidden">
      <section className="pt-6 sm:pt-8 lg:pt-10 pb-12 sm:pb-14 lg:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#E3F7EC] border border-[#00A859]/30 text-[#008A44] shadow-2xs mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A859] animate-ping" />
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider">
              {faqContent.badge || "FAQ"}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-black text-[#0A1A2F] tracking-tight leading-[1.18] mb-2">
            {faqContent.titleLine1 || "Popular"}{" "}
            <span className="text-[#00A859]">
              {faqContent.titleHighlight || "Questions"}
            </span>
          </h2>

          <div className="w-12 h-1 bg-[#00A859] mx-auto mt-1.5 mb-3 rounded-full shadow-xs" />

          <p className="text-gray-500 text-xs sm:text-sm sm:leading-relaxed max-w-xl mx-auto">
            {faqContent.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
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

          <div className="lg:col-span-5 lg:sticky lg:top-24 self-start bg-white rounded-3xl border border-gray-100 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)] p-3.5 sm:p-4">
            <div className="relative h-[380px] sm:h-[460px] w-full rounded-2xl overflow-hidden bg-gray-50">
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
          </div>
        </div>
      </section>
    </div>
  );
}