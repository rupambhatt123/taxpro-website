"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { User, MessageSquare, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import rawSiteData from "../../data/siteData.json";

// Safe dynamic JSON casting
const siteData = rawSiteData as any;

export interface BlogPost {
  id: number;
  dateDay?: string;
  dateMonth?: string;
  date?: string;
  image: string;
  author: string;
  comments?: string;
  title: string;
  description?: string;
  summary?: string;
  slug: string;
}

interface BlogData {
  badge: string;
  titleLine1: string;
  titleHighlight: string;
  description: string;
  button?: {
    label: string;
    href: string;
  };
  posts: BlogPost[];
}

interface BlogSectionProps {
  data?: BlogData;
}

export default function BlogSection({ data }: BlogSectionProps) {
  // Direct prop support ya JSON fallback
  const content: BlogData =
    data || siteData.categories.TaxConsulting.sections.Blog.variants.TaxBlog1;

  const posts = content.posts || [];
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(posts.length / 3));

  const startIndex = (currentPage - 1) * 3;

  return (
    <section className="relative py-10 lg:py-12 bg-[#FBFDFA] overflow-hidden" id="blog">
      
      {/* Background Soft Glow Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-36 -right-36 w-[500px] h-[500px] bg-[#00A859]/[0.08] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-48 w-[450px] h-[450px] bg-emerald-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 right-1/4 w-[400px] h-[400px] bg-[#00A859]/[0.05] rounded-full blur-2xl pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header: Dynamic from JSON */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#E3F7EC] border border-[#00A859]/30 text-[#008A44] shadow-2xs mb-4">
            <span className="w-2 h-2 rounded-full bg-[#00A859] animate-ping" />
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider">
              {content.badge}
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-black text-[#0A1A2F] tracking-tight leading-[1.18] mb-3">
            {content.titleLine1} <span className="text-[#00A859]">{content.titleHighlight}</span>
          </h2>
          
          <div className="w-12 h-1 bg-[#00A859] mx-auto mt-2 mb-4 rounded-full shadow-xs" />
          
          <p className="text-gray-500 text-xs sm:text-sm sm:leading-relaxed max-w-xl mx-auto">
            {content.description}
          </p>
        </div>

        {/* Cards Section */}
        <div className="flex md:grid md:grid-cols-3 gap-6 lg:gap-8 overflow-x-auto md:overflow-visible pb-6 md:pb-0 snap-x snap-mandatory scrollbar-none">
          {posts.map((item: BlogPost, index: number) => {
            const isVisibleOnDesktop = index >= startIndex && index < startIndex + 3;

            // Date fallback logic
            const day = item.dateDay || (item.date ? item.date.split(" ")[1]?.replace(",", "") : "01");
            const month = item.dateMonth || (item.date ? item.date.split(" ")[0]?.slice(0, 3) : "Jan");

            return (
              <div
                key={item.id}
                className={`min-w-[86vw] sm:min-w-[340px] md:min-w-0 snap-center bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-300 flex flex-col p-4 group ${
                  isVisibleOnDesktop ? "md:flex" : "md:hidden"
                }`}
              >
                {/* Blog Image + Date Badge */}
                <div className="relative h-56 w-full rounded-xl overflow-hidden mb-4 bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 85vw, 400px"
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-[#00A859] text-white rounded-lg px-2.5 py-1 text-center shadow-md">
                    <span className="block text-base font-extrabold leading-tight">{day}</span>
                    <span className="block text-[10px] font-medium leading-none uppercase">{month}</span>
                  </div>
                </div>

                {/* Author & Comments */}
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3 px-1">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#00A859]" />
                    <span>By {item.author}</span>
                  </div>
                  {item.comments && (
                    <div className="flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-[#00A859]" />
                      <span>{item.comments}</span>
                    </div>
                  )}
                </div>

                {/* Title & Description */}
                <div className="flex-1 px-1">
                  <h3 className="text-lg font-bold text-[#0A1A2F] leading-snug line-clamp-2 group-hover:text-[#00A859] transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-6">
                    {item.description || item.summary}
                  </p>
                </div>

                {/* Read More CTA */}
                <div className="mt-auto px-1 pb-1">
                  <Link
                    href={`/blog/${item.slug}`}
                    className="inline-flex items-center gap-2 bg-[#00A859] hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-all shadow-sm"
                  >
                    Read More <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Pagination & View All CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100 pt-6">
          
          {/* Pagination Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              aria-label="Previous Page"
              className="w-9 h-9 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-xs cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-lg text-xs font-bold transition shadow-xs cursor-pointer ${
                  currentPage === page
                    ? "bg-[#00A859] text-white shadow-sm"
                    : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              aria-label="Next Page"
              className="w-9 h-9 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-xs cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* View All Button */}
          <Link
            href={content.button?.href || "/blog"}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#00A859] text-[#00A859] hover:bg-[#00A859] hover:text-white text-xs font-bold transition shadow-xs"
          >
            {content.button?.label || "View All Blogs"} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}