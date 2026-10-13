"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, ChevronDown, ArrowRight, Menu, X } from "lucide-react";
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
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdownIdx, setOpenDropdownIdx] = useState<number | null>(null);

  const headerData =
    data ||
    siteData.categories.TaxConsulting.sections.Header.variants.TaxHeader1;
  const phoneNumber = phone || siteData.common.phone || "0123456789";
  const siteName = siteData.common.siteName || "TaxPro";

  const toggleMobileDropdown = (idx: number) => {
    setOpenDropdownIdx(openDropdownIdx === idx ? null : idx);
  };

  const navLinks: NavLinkItem[] = (headerData.navLinks || []).filter(
    (link: NavLinkItem) =>
      link.title.toLowerCase() !== "contact us" &&
      link.title.toLowerCase() !== "contact"
  );

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-22 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src={headerData.logo || "/image.png"}
            alt={`${siteName} Logo`}
            width={210}
            height={58}
            priority
            className="h-11 sm:h-13 w-auto object-contain"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-7 lg:gap-8 font-semibold text-[15px] text-[#0A1A2F]">
          {navLinks.map((link: NavLinkItem, idx: number) => {
            const isActive =
              link.path === "/"
                ? pathname === "/"
                : pathname ? pathname.startsWith(link.path) : false;

            if (link.children && link.children.length > 0) {
              return (
                <div key={`nav-parent-${idx}`} className="relative group py-6">
                  <Link
                    href={link.path}
                    className={`flex items-center gap-1.5 transition-colors ${
                      isActive
                        ? "text-[#0A1A2F]"
                        : "text-[#0A1A2F]/85 hover:text-[#00A859]"
                    }`}
                  >
                    <span>{link.title}</span>
                    <ChevronDown className="w-4 h-4 text-gray-500 transition-transform duration-200 group-hover:rotate-180" />
                  </Link>

                  {isActive && (
                    <span className="absolute bottom-4 left-0 right-0 h-[2.5px] bg-[#00A859] rounded-full" />
                  )}

                  <div className="absolute top-full left-0 hidden group-hover:block w-64 bg-white border border-gray-100 shadow-xl rounded-xl p-2 z-50">
                    {link.children.map((child: NavChild, childIdx: number) => (
                      <Link
                        key={`nav-child-${childIdx}`}
                        href={child.path}
                        className="block px-3.5 py-2 text-xs text-gray-700 hover:bg-[#EAF8F1] hover:text-[#00A859] rounded-lg transition font-medium"
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <div key={`nav-item-${idx}`} className="relative py-6">
                <Link
                  href={link.path}
                  className={`transition-colors ${
                    isActive
                      ? "text-[#0A1A2F]"
                      : "text-[#0A1A2F]/85 hover:text-[#00A859]"
                  }`}
                >
                  {link.title}
                </Link>

                {isActive && (
                  <span className="absolute bottom-4 left-0 right-0 h-[2.5px] bg-[#00A859] rounded-full" />
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden lg:flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#EBF7F1] flex items-center justify-center text-[#0A1A2F]">
              <Phone className="w-4 h-4 text-[#0A1A2F] fill-current" />
            </div>
            <div className="leading-tight">
              <p className="text-[14px] font-bold text-[#0A1A2F] tracking-tight">
                {phoneNumber}
              </p>
              <p className="text-[11px] text-gray-400 font-medium">
                Talk to Our Experts
              </p>
            </div>
          </div>

          <Link
            href={headerData.ctaButton?.path || "/contact"}
            className="bg-[#00A859] hover:bg-[#00C868] text-white px-5 sm:px-6 py-2.5 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-sm hover:shadow-md hover:shadow-[#00C868]/30 active:scale-95"
          >
            <span>{headerData.ctaButton?.text || "Contact Us"}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </Link>

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

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-2 shadow-xl max-h-[80vh] overflow-y-auto">
          {navLinks.map((link: NavLinkItem, idx: number) => {
            const hasChildren = link.children && link.children.length > 0;
            const isDropdownOpen = openDropdownIdx === idx;

            if (hasChildren) {
              return (
                <div key={`m-nav-${idx}`} className="rounded-xl bg-gray-50/80 border border-gray-100 p-2">
                  <div className="flex items-center justify-between">
                    <Link
                      href={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-xs font-bold text-[#0A1A2F] hover:text-[#00A859] py-1.5 px-2"
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
                      {link.children?.map((child: NavChild, cIdx: number) => (
                        <Link
                          key={`m-child-${cIdx}`}
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
                key={`m-link-${idx}`}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-3 text-xs font-bold text-[#0A1A2F] hover:text-[#00A859] hover:bg-[#EAF8F1] rounded-lg transition"
              >
                {link.title}
              </Link>
            );
          })}

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