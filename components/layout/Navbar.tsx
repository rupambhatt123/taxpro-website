"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, ChevronDown, ArrowRight, Menu, X } from "lucide-react";
// Relative path import (red line issue fix)
import rawSiteData from "../../data/siteData.json";

interface NavChild {
  title: string;
  path: string;
}

interface NavLinkItem {
  title: string;
  path: string;
  children?: NavChild[];
}

interface NavbarProps {
  data?: {
    logo: string;
    navLinks: NavLinkItem[];
    ctaButton: {
      text: string;
      path: string;
    };
  };
  phone?: string;
}

const siteData = rawSiteData as any;

export default function Navbar({ data, phone }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdownIdx, setOpenDropdownIdx] = useState<number | null>(null);

  const headerData =
    data ||
    siteData.categories.TaxConsulting.sections.Header.variants.TaxHeader1;
  const phoneNumber = phone || siteData.common.phone;
  const siteName = siteData.common.siteName;

  const toggleMobileDropdown = (idx: number) => {
    setOpenDropdownIdx(openDropdownIdx === idx ? null : idx);
  };

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={headerData.logo || "/image.png"}
            alt={`${siteName} Logo`}
            width={220}
            height={64}
            priority
            className="h-12 sm:h-16 w-auto object-contain"
          />
        </Link>

        {/* Desktop Dynamic Navigation Menu */}
        <nav className="hidden md:flex items-center gap-8 font-semibold text-sm text-gray-700">
          {headerData.navLinks.map((link: NavLinkItem, idx: number) => {
            // Dropdown Link with Children
            if (link.children && link.children.length > 0) {
              return (
                <div key={idx} className="relative group py-6">
                  <Link
                    href={link.path}
                    className="flex items-center gap-1.5 hover:text-[#00A859] transition font-semibold"
                  >
                    <span>{link.title}</span>
                    <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                  </Link>

                  {/* Dropdown Menu Container */}
                  <div className="absolute top-full left-0 hidden group-hover:block w-72 bg-white border border-gray-100 shadow-xl rounded-2xl p-2 z-50 max-h-[420px] overflow-y-auto">
                    <Link
                      href={link.path}
                      className="block px-4 py-2.5 text-xs font-bold text-[#00A859] bg-[#E8F8F0] rounded-xl hover:bg-[#d8f4e6] transition mb-1"
                    >
                      ✦ All {link.title}
                    </Link>
                    <div className="h-px bg-gray-100 my-1" />

                    {link.children.map((child: NavChild, childIdx: number) => (
                      <Link
                        key={childIdx}
                        href={child.path}
                        className="block px-4 py-2.5 text-xs text-gray-700 hover:bg-[#EAF8F1] hover:text-[#00A859] rounded-lg transition font-medium"
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            // Normal Link
            return (
              <Link
                key={idx}
                href={link.path}
                className="hover:text-[#00A859] transition"
              >
                {link.title}
              </Link>
            );
          })}
        </nav>

        {/* Contact Info & Right Action Buttons */}
        <div className="flex items-center gap-3 sm:gap-6">
          <div className="hidden lg:flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#EBF7F1] flex items-center justify-center text-[#0A1A2F]">
              <Phone className="w-4 h-4 text-[#0A1A2F]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#0A1A2F]">{phoneNumber}</p>
              <p className="text-[11px] text-gray-400">Talk to Our Experts</p>
            </div>
          </div>

          <Link
            href={headerData.ctaButton?.path || "/contact"}
            className="bg-[#00A859] hover:bg-emerald-600 text-white px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-1.5 sm:gap-2 transition shadow-sm active:scale-95"
          >
            <span>{headerData.ctaButton?.text || "Contact Us"}</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Link>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="md:hidden w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:text-[#00A859] hover:bg-gray-50 transition cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-[#00A859]" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

      </div>

      {/* ================= MOBILE COLLAPSIBLE DRAWER ================= */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-2 shadow-xl max-h-[80vh] overflow-y-auto">
          {headerData.navLinks.map((link: NavLinkItem, idx: number) => {
            const hasChildren = link.children && link.children.length > 0;
            const isDropdownOpen = openDropdownIdx === idx;

            if (hasChildren) {
              return (
                <div key={idx} className="rounded-xl bg-gray-50/80 border border-gray-100 p-2">
                  <div className="flex items-center justify-between">
                    <Link
                      href={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-xs font-bold uppercase text-[#0A1A2F] hover:text-[#00A859] py-1.5 px-2"
                    >
                      {link.title}
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggleMobileDropdown(idx)}
                      className="p-1.5 text-gray-500 hover:text-[#00A859]"
                      aria-label={`Toggle ${link.title} menu`}
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isDropdownOpen ? "rotate-180 text-[#00A859]" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {isDropdownOpen && (
                    <div className="mt-2 pt-2 border-t border-gray-200 space-y-1 pl-2">
                      <Link
                        href={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-1.5 px-2 text-xs font-bold text-[#00A859] rounded-md hover:bg-emerald-50"
                      >
                        ✦ All {link.title}
                      </Link>
                      {link.children?.map((child: NavChild, cIdx: number) => (
                        <Link
                          key={cIdx}
                          href={child.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-1.5 px-2 text-xs font-medium text-gray-600 hover:text-[#00A859] hover:bg-emerald-50 rounded-md"
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={idx}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-3 text-xs font-bold uppercase text-[#0A1A2F] hover:text-[#00A859] hover:bg-[#EAF8F1] rounded-lg transition"
              >
                {link.title}
              </Link>
            );
          })}

          {/* Mobile Quick Phone Contact */}
          <div className="pt-3 border-t border-gray-100 flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-[#EAF8F1] flex items-center justify-center text-[#00A859] flex-shrink-0">
              <Phone className="w-4 h-4 fill-current" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#0A1A2F]">{phoneNumber}</p>
              <p className="text-[11px] text-gray-400">Talk to Our Experts</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}