import Image from "next/image";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBannerProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
}

export default function PageBanner({ title, breadcrumbs }: PageBannerProps) {
  return (
    <section className="relative w-full min-h-[220px] h-[240px] sm:h-[280px] lg:h-[320px] flex items-center overflow-hidden bg-[#0A1A2F]">
      {/* 1. Background Corporate Image with Responsive Placement */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1920&q=80"
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center sm:object-[center_28%] brightness-90"
        />

        {/* 2. Soft Blue Overlay (Text readability & visible office background) */}
        <div className="absolute inset-0 bg-[#0A1A2F]/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A2F]/80 via-[#0A1A2F]/50 to-[#0A1A2F]/20 sm:to-transparent" />
      </div>

      {/* 3. Text & Breadcrumb Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-6">
        <div className="max-w-2xl">
          {/* Breadcrumbs (Home ▸ Contact Us / Services) */}
          <nav className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-gray-200 mb-2 sm:mb-3 drop-shadow-sm">
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <div key={index} className="flex items-center gap-1.5 sm:gap-2">
                  {item.href && !isLast ? (
                    <Link
                      href={item.href}
                      className="hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className={isLast ? "text-white" : "text-gray-200"}>
                      {item.label}
                    </span>
                  )}

                  {!isLast && (
                    <span className="text-[#00A859] text-[11px] sm:text-xs font-bold">
                      ▸
                    </span>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Banner Title */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight drop-shadow-md leading-tight uppercase">
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
}