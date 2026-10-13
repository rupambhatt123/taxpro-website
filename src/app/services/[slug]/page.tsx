import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Navbar from "../../../../components/layout/Navbar";
import Footer from "../../../../components/layout/Footer";
import PageBanner from "../../../../components/common/PageBanner";
import rawSiteData from "../../../../data/siteData.json";
import {
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Coins,
  ShieldCheck,
  Users2,
  TrendingUp,
  Briefcase,
  PiggyBank,
  ShieldAlert,
  FileSpreadsheet,
  FileCheck2,
  BarChart3,
  Building2,
  Calculator,
  Receipt,
  SearchCheck,
  FileSearch,
  Scale,
  Users,
  LucideIcon,
} from "lucide-react";

const siteData = rawSiteData as any;
const common = siteData.common || {};
const siteName = common.siteName || "TaxPro";
const taxCategory = siteData.categories?.TaxConsulting || {};
const jsonServicesDetail = taxCategory.servicesDetail || {};
const jsonSlugAliases = taxCategory.slugAliases || {};

const iconMap: Record<string, LucideIcon> = {
  "tax-consulting": Briefcase,
  "financial-planning": PiggyBank,
  "business-advisory": ShieldAlert,
  "gst-compliance": FileSpreadsheet,
  "itr-filing": FileCheck2,
  "corporate-tax": Building2,
  "investment-planning": BarChart3,
  "company-registration": Building2,
  "accounting-bookkeeping": Calculator,
  "payroll-services": Receipt,
  "audit-assurance": SearchCheck,
};

const defaultFeatureIcons: LucideIcon[] = [Coins, ShieldCheck, Users2, TrendingUp];
const subOfferingIcons: LucideIcon[] = [FileSearch, FileSpreadsheet, Users, Scale];

interface PageProps {
  params: Promise<{ slug: string }>;
}

function getServiceData(slug: string) {
  const targetKey = jsonSlugAliases[slug] || slug;
  const service = jsonServicesDetail[targetKey] || jsonServicesDetail["tax-consulting"] || {};

  return {
    targetKey,
    titleFirst: service.titleFirst || "Our",
    titleSecond: service.titleSecond || "Service",
    subtitle: service.subtitle || "",
    mainImage: service.mainImage || "/s1.jpg",
    overviewP1: service.overviewP1 || "",
    overviewP2: service.overviewP2 || "",
    whyImage: service.whyImage || "/a1.png",
    whyPoints: (service.whyPoints as string[]) || [],
    subOfferings: (service.subOfferings as { title: string; desc: string }[]) || [],
    features: (service.features as { label: string }[]) || [],
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const currentService = getServiceData(slug);

  return {
    title: `${currentService.titleFirst} ${currentService.titleSecond} | ${siteName}`,
    description: currentService.subtitle,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const currentService = getServiceData(slug);

  const navServices =
    taxCategory?.sections?.Header?.variants?.TaxHeader1?.navLinks?.find(
      (link: any) => link.title?.toLowerCase().includes("service")
    )?.children || [];

  const dynamicSidebarList =
    navServices.length > 0
      ? navServices.map((item: any) => {
          const itemSlug = item.path.replace("/services/", "");
          return {
            slug: itemSlug,
            title: item.title,
            icon: iconMap[itemSlug] || Briefcase,
          };
        })
      : Object.keys(jsonServicesDetail).map((key) => ({
          slug: key,
          title: `${jsonServicesDetail[key].titleFirst} ${jsonServicesDetail[key].titleSecond}`,
          icon: iconMap[key] || Briefcase,
        }));

  const dynamicServiceTitle =
    dynamicSidebarList.find((s: any) => s.slug === currentService.targetKey)?.title ||
    `${currentService.titleFirst} ${currentService.titleSecond}`;

  const phoneNumber = common.phone || "+1 000 000 000";
  const emailAddress = common.email || "info@xyz.com";
  const officeAddress = common.address || "";

  return (
    <main className="min-h-screen bg-[#FBFDFA]">
      <Navbar />

      <PageBanner
        title={dynamicServiceTitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Our Services", href: "/services" },
          { label: dynamicServiceTitle },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-[#0A1A2F] px-6 py-5">
                <h3 className="text-white font-bold text-lg tracking-wide">
                  Our Services
                </h3>
                <div className="w-10 h-0.5 bg-[#00A859] mt-2 rounded-full" />
              </div>

              <div className="p-3 space-y-1.5">
                {dynamicSidebarList.map((item: any) => {
                  const isActive = item.slug === currentService.targetKey;
                  const Icon = item.icon || Briefcase;

                  return (
                    <Link
                      key={item.slug}
                      href={`/services/${item.slug}`}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition ${
                        isActive
                          ? "bg-[#00A859] text-white shadow-sm"
                          : "bg-white text-[#0A1A2F] hover:bg-[#F4FAF6] hover:text-[#00A859]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`w-4 h-4 ${
                            isActive ? "text-white" : "text-[#0A1A2F]"
                          }`}
                        />
                        <span>{item.title}</span>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 ${
                          isActive ? "text-white" : "text-gray-400"
                        }`}
                      />
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-[#0A1A2F] px-6 py-5">
                <h3 className="text-white font-bold text-lg tracking-wide">
                  Get In Touch
                </h3>
                <div className="w-10 h-0.5 bg-[#00A859] mt-2 rounded-full" />
              </div>

              <div className="p-6 space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#00A859] text-white flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-500 font-medium">
                      Call Us
                    </p>
                    <p className="text-sm font-bold text-[#0A1A2F]">
                      {phoneNumber}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#00A859] text-white flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-500 font-medium">
                      Email Us
                    </p>
                    <p className="text-sm font-bold text-[#0A1A2F]">
                      {emailAddress}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#00A859] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-500 font-medium">
                      Our Location
                    </p>
                    <p className="text-xs font-semibold text-[#0A1A2F] leading-snug">
                      {officeAddress}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-sm">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A1A2F] tracking-tight">
              {currentService.titleFirst}{" "}
              <span className="text-[#00A859]">{currentService.titleSecond}</span>
            </h1>
            <p className="text-gray-500 text-sm mt-3 leading-relaxed">
              {currentService.subtitle}
            </p>

            <div className="relative h-[280px] sm:h-[380px] w-full rounded-2xl overflow-hidden mt-6 mb-6 shadow-sm bg-gray-50">
              <Image
                src={currentService.mainImage}
                alt={`${currentService.titleFirst} ${currentService.titleSecond}`}
                fill
                priority
                className="object-cover"
              />
            </div>

            {currentService.features.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 rounded-2xl bg-[#F6FBF8] border border-gray-100 overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-gray-200 mb-10">
                {currentService.features.map((feat: any, idx: number) => {
                  const FeatIcon = defaultFeatureIcons[idx % defaultFeatureIcons.length];
                  return (
                    <div
                      key={idx}
                      className="p-4 text-center flex flex-col items-center justify-center"
                    >
                      <FeatIcon className="w-6 h-6 text-[#00A859] mb-2" />
                      <span className="text-xs font-bold text-[#0A1A2F]">
                        {feat.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            <div>
              <h2 className="text-2xl font-bold text-[#0A1A2F]">Overview</h2>
              <div className="w-12 h-1 bg-[#00A859] mt-2 mb-4 rounded-full" />

              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {currentService.overviewP1}
              </p>

              {currentService.overviewP2 && (
                <p className="text-gray-600 text-sm leading-relaxed mb-8">
                  {currentService.overviewP2}
                </p>
              )}
            </div>

            {currentService.whyPoints.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch mb-12">
                <div className="relative h-64 md:h-auto rounded-2xl overflow-hidden shadow-sm min-h-[220px] bg-gray-50">
                  <Image
                    src={currentService.whyImage}
                    alt="Consultation Analysis"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="bg-[#EBF7F1] p-6 rounded-2xl flex flex-col justify-center">
                  <h3 className="font-bold text-base text-[#0A1A2F] mb-1">
                    Why Choose Our <br />
                    <span className="text-[#00A859]">
                      {currentService.titleFirst} {currentService.titleSecond} Services?
                    </span>
                  </h3>
                  <p className="text-xs text-gray-500 mb-4">
                    Tax laws and regulations keep changing, and it can be complex to keep up. Professional consultation helps you:
                  </p>
                  <div className="space-y-2.5">
                    {currentService.whyPoints.map((text, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2.5 text-xs font-semibold text-gray-800"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#00A859] flex-shrink-0" />
                        <span>{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentService.subOfferings.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-[#0A1A2F]">
                  Our {currentService.titleFirst} {currentService.titleSecond} Services Include
                </h2>
                <div className="w-12 h-1 bg-[#00A859] mt-2 mb-6 rounded-full" />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {currentService.subOfferings.map((card, i) => {
                    const SubIcon = subOfferingIcons[i % subOfferingIcons.length];
                    return (
                      <div
                        key={i}
                        className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition text-center flex flex-col items-center"
                      >
                        <div className="w-12 h-12 rounded-full bg-[#EAF8F1] flex items-center justify-center text-[#00A859] mb-3">
                          <SubIcon className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-[#0A1A2F] text-sm mb-2">
                          {card.title}
                        </h4>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          {card.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}