"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  ChevronRight, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronUp 
} from "lucide-react";
import rawSiteData from "../../data/siteData.json";

// Safe dynamic JSON casting
const siteData = rawSiteData as any;

export default function Footer() {
  const common = siteData.common || {};
  const headerVariant =
    siteData.categories?.TaxConsulting?.sections?.Header?.variants?.TaxHeader1 || {};
  const footerVariant =
    siteData.categories?.TaxConsulting?.sections?.Footer?.variants?.TaxFooter1 || {};
  const servicesList =
    siteData.categories?.TaxConsulting?.sections?.Services?.variants?.TaxServices1?.items || [];
  const navLinks = headerVariant.navLinks || [];

  // Strictly dynamic data from JSON (Footer variant first, then common)
  const siteName = common.siteName || "";
  const logoSrc = footerVariant.logo || headerVariant.logo || common.logo || "/image.png";
  const phoneNumber = footerVariant.phone || common.phone;
  const emailAddress = footerVariant.email || common.email;
  const officeAddress = footerVariant.location || footerVariant.address || common.address;
  const brandDescription = footerVariant.about || footerVariant.description || common.description;
  const copyrightText = footerVariant.copyright || common.copyright || `© ${new Date().getFullYear()} ${siteName}. All Rights Reserved.`;

  // Dynamic social links from JSON
  const socialLinks = common.socialLinks || footerVariant.socialLinks || {};

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-[#051626] text-white pt-16 sm:pt-20 pb-8 overflow-hidden">
      
      {/* ================= 1. BACKGROUND GLOW & WAVE CURVE ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -bottom-28 -left-28 w-[580px] h-[380px] bg-gradient-to-tr from-[#00A859]/30 via-[#008A44]/15 to-transparent rounded-full blur-[85px] -rotate-12" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[220px] bg-sky-500/5 rounded-full blur-[100px]" />

        <svg
          className="absolute bottom-0 left-0 w-[460px] h-auto opacity-25 text-[#00A859]"
          viewBox="0 0 500 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-40 190 C140 120, 220 50, 480 190 L500 220 L-40 220 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14">
          
          {/* ================= Column 1: Brand Info & Socials (4 Cols) ================= */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src={logoSrc}
                alt={`${siteName} Logo`}
                width={190}
                height={52}
                priority
                className="h-12 sm:h-13 w-auto object-contain"
              />
            </Link>

            {brandDescription && (
              <p className="text-gray-300 text-sm sm:text-[14.5px] leading-relaxed max-w-sm font-normal">
                {brandDescription}
              </p>
            )}

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-1">
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:scale-110 transition shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}

              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-full bg-[#0A66C2] flex items-center justify-center text-white hover:scale-110 transition shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </a>
              )}

              {(socialLinks.twitter || socialLinks.x) && (
                <a
                  href={socialLinks.twitter || socialLinks.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter / X"
                  className="w-9 h-9 rounded-full bg-black border border-gray-700 flex items-center justify-center text-white hover:scale-110 transition shadow-sm"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              )}

              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white hover:scale-110 transition shadow-sm"
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>
              )}

              {socialLinks.youtube && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-full bg-[#FF0000] flex items-center justify-center text-white hover:scale-110 transition shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* ================= Column 2: Our Services (3 Cols) ================= */}
          <div className="lg:col-span-3 space-y-4">
            <div>
              <h3 className="text-lg sm:text-[19px] font-black text-white tracking-wide">Our Services</h3>
              <div className="w-10 h-1 bg-[#00A859] mt-2 rounded-full" />
            </div>
            
            <ul className="space-y-3 pt-2 text-sm sm:text-[14.5px] text-gray-300">
              {servicesList.map((item: any, i: number) => (
                <li key={item.slug || i}>
                  <Link
                    href={`/services/${item.slug}`}
                    className="flex items-center gap-2 hover:text-[#00A859] transition-colors group"
                  >
                    <ChevronRight className="w-4 h-4 text-[#00A859] group-hover:translate-x-1 transition-transform" />
                    <span>{item.name || item.heading || item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ================= Column 3: Quick Links (2 Cols) ================= */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h3 className="text-lg sm:text-[19px] font-black text-white tracking-wide">Quick Links</h3>
              <div className="w-10 h-1 bg-[#00A859] mt-2 rounded-full" />
            </div>

            <ul className="space-y-3 pt-2 text-sm sm:text-[14.5px] text-gray-300">
              {navLinks.map((item: any, i: number) => (
                <li key={i}>
                  <Link
                    href={item.path}
                    className="flex items-center gap-2 hover:text-[#00A859] transition-colors group"
                  >
                    <ChevronRight className="w-4 h-4 text-[#00A859] group-hover:translate-x-1 transition-transform" />
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ================= Column 4: Contact Us (3 Cols) ================= */}
          <div className="lg:col-span-3 space-y-4">
            <div>
              <h3 className="text-lg sm:text-[19px] font-black text-white tracking-wide">Contact Us</h3>
              <div className="w-10 h-1 bg-[#00A859] mt-2 rounded-full" />
            </div>

            <div className="space-y-4 pt-2">
              {/* Email */}
              {emailAddress && (
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#11293E] flex items-center justify-center text-[#00A859] flex-shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-[15px] font-bold text-white leading-tight">{emailAddress}</p>
                    <p className="text-xs text-gray-400 mt-1">Drop us an email</p>
                  </div>
                </div>
              )}

              {/* Phone */}
              {phoneNumber && (
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#11293E] flex items-center justify-center text-[#00A859] flex-shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-[15px] font-bold text-white leading-tight">{phoneNumber}</p>
                    <p className="text-xs text-gray-400 mt-1">Give us a call</p>
                  </div>
                </div>
              )}

              {/* Address */}
              {officeAddress && (
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#11293E] flex items-center justify-center text-[#00A859] flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-[14px] font-semibold text-white leading-snug">
                      {officeAddress}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">Our Office Location</p>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* ================= Bottom Line Bar & Scroll To Top ================= */}
        <div className="border-t border-gray-800/80 pt-6 flex items-center justify-between">
          <p className="text-xs sm:text-sm text-gray-400">
            {copyrightText}
          </p>

          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="w-10 h-10 rounded-full bg-[#00A859] hover:bg-emerald-600 text-white flex items-center justify-center transition-all duration-300 shadow-lg hover:-translate-y-1 cursor-pointer"
          >
            <ChevronUp className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </footer>
  );
}