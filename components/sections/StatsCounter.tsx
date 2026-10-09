"use client";

import { useEffect, useRef, useState } from "react";
import {
  HandCoins,
  ThumbsUp,
  Headset,
  Trophy,
  Smile,
  FolderCheck,
  Award,
  Users2,
  LucideIcon,
} from "lucide-react";
import rawSiteData from "../../data/siteData.json";

// Safe dynamic JSON casting
const siteData = rawSiteData as any;

// Dynamic string to Lucide icon resolver
const iconMap: Record<string, LucideIcon> = {
  coins: HandCoins,
  thumbsUp: ThumbsUp,
  headset: Headset,
  trophy: Trophy,
  smile: Smile,
  folder: FolderCheck,
  award: Award,
  users: Users2,
};

interface StatItem {
  value: string;
  label: string;
  icon: string;
}

interface StatsCounterData {
  items: StatItem[];
}

interface StatsCounterProps {
  data?: StatsCounterData;
}

// Subcomponent: Count-up animation
function CounterNumber({ value }: { value: string }) {
  const [currentVal, setCurrentVal] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  // Separate digits from text/symbols (e.g., "150k" -> 150 & "k")
  const targetNumber = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          
          const duration = 2000; // 2 seconds
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            // Ease-out cubic calculation
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            setCurrentVal(Math.floor(easeOutProgress * targetNumber));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCurrentVal(targetNumber);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [targetNumber]);

  return (
    <span ref={elementRef} className="text-2xl sm:text-3xl lg:text-[34px] font-black text-white tracking-tight leading-none">
      {currentVal}
      {suffix}
    </span>
  );
}

export default function StatsCounter({ data }: StatsCounterProps) {
  const content: StatsCounterData =
    data ||
    siteData.categories.TaxConsulting.sections.StatsCounter.variants.TaxStatsCounter1;

  const statsList = content?.items || [];

  return (
    <section className="relative w-full bg-[#008A44] py-8 sm:py-10 overflow-hidden">
      {/* Background Decorative Curves & Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full border border-white/10" />
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-600/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {statsList.map((item, index) => {
            const Icon = iconMap[item.icon] || Trophy;

            return (
              <div
                key={index}
                className="group flex items-center gap-4 bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 px-5 py-4 rounded-2xl transition-all duration-300 hover:-translate-y-1 shadow-sm"
              >
                {/* Circular White Badge with Sky-Blue Icon */}
                <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center text-sky-500 flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300">
                  <Icon className="w-7 h-7 stroke-[2]" />
                </div>

                {/* Counter Value & Label */}
                <div className="flex flex-col">
                  <CounterNumber value={item.value} />
                  <span className="text-xs sm:text-sm font-semibold text-white/95 mt-1 tracking-wide">
                    {item.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}