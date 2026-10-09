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

// Safe dynamic JSON casting
const siteData = rawSiteData as any;
const common = siteData.common || {};
const siteName = common.siteName || "TaxPro";

const iconMap: Record<string, LucideIcon> = {
  "tax-consulting": Briefcase,
  "financial-planning": PiggyBank,
  "business-advisory": ShieldAlert,
  "gst-compliance": FileSpreadsheet,
  "itr-filing": FileCheck2,
  "investment-planning": BarChart3,
  "company-registration": Building2,
  "accounting-bookkeeping": Calculator,
  "payroll-services": Receipt,
  "audit-assurance": SearchCheck,
};

// Aliases mapping
const slugAliases: Record<string, string> = {
  "income-tax-return-filing": "itr-filing",
  "gst-registration-filing": "gst-compliance",
  "tax-planning": "tax-consulting",
  "tds-return-filing": "tax-consulting",
  "business-company-registration": "company-registration",
};

// Comprehensive service details
const servicesDataMap: Record<
  string,
  {
    titleFirst: string;
    titleSecond: string;
    subtitle: string;
    mainImage: string;
    overviewP1: string;
    overviewP2: string;
    whyImage: string;
    whyPoints: string[];
    subOfferings: { title: string; desc: string }[];
  }
> = {
  "tax-consulting": {
    titleFirst: "Tax",
    titleSecond: "Consulting",
    subtitle:
      "Expert tax consulting services to help you stay compliant, optimize tax savings and make smarter financial decisions.",
    mainImage:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    overviewP1:
      "Our tax consulting services are designed to help individuals and businesses manage their tax responsibilities efficiently. We provide expert guidance on tax planning, compliance, and advisory to ensure you make the most of available benefits while staying fully compliant with the latest tax laws and regulations.",
    overviewP2:
      "Whether you are a salaried individual, a self-employed professional, or a growing business, our team offers personalized solutions tailored to your financial goals and industry requirements.",
    whyImage:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
    whyPoints: [
      "Minimize your tax liability legally",
      "Stay compliant with government regulations",
      "Make informed financial decisions",
      "Avoid penalties and legal issues",
      "Plan for long-term financial growth",
    ],
    subOfferings: [
      {
        title: "Tax Planning",
        desc: "Strategic planning to minimize your tax liability and maximize savings.",
      },
      {
        title: "Tax Compliance",
        desc: "Assistance with filing returns and meeting all regulatory requirements.",
      },
      {
        title: "Advisory Services",
        desc: "Expert advice on direct and indirect tax matters for individuals and businesses.",
      },
      {
        title: "Dispute Resolution",
        desc: "Support in handling tax notices, audits and disputes with authorities.",
      },
    ],
  },
  "financial-planning": {
    titleFirst: "Financial",
    titleSecond: "Planning",
    subtitle:
      "Comprehensive financial roadmaps designed to secure your long-term wealth, optimize cash flow, and achieve financial freedom.",
    mainImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    overviewP1:
      "Our financial planning experts help you design robust strategies that bridge current earning power with future financial independence. We evaluate your assets, debts, and projected income to formulate customized growth blueprints.",
    overviewP2:
      "From retirement planning and emergency cushions to debt management, we align every financial decision with your personalized life priorities and milestones.",
    whyImage:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    whyPoints: [
      "Tailored roadmaps for distinct life milestones",
      "Disciplined cash flow and expense management",
      "Risk mitigation and inflation protection",
      "Goal-based retirement corpus creation",
      "Periodic reviews to align with market shifts",
    ],
    subOfferings: [
      {
        title: "Wealth Creation",
        desc: "Systematic capital compounding through disciplined portfolio allocation.",
      },
      {
        title: "Retirement Roadmap",
        desc: "Securing financial independence and passive income streams.",
      },
      {
        title: "Debt Optimization",
        desc: "Strategic restructuring of liabilities to eliminate high-interest debts.",
      },
      {
        title: "Emergency Planning",
        desc: "Protecting family assets against unexpected medical or economic shocks.",
      },
    ],
  },
  "business-advisory": {
    titleFirst: "Business",
    titleSecond: "Advisory",
    subtitle:
      "Strategic consulting to elevate business performance, scale operations sustainably, and navigate complex business challenges.",
    mainImage:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80",
    overviewP1:
      "We partner with startups, SMEs, and expanding enterprises to evaluate operational bottlenecks, formulate growth frameworks, and optimize capital utilization.",
    overviewP2:
      "Our experienced consultants leverage industry benchmarks and quantitative financial data to help you capture market opportunities while minimizing operational vulnerabilities.",
    whyImage:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    whyPoints: [
      "Pragmatic business frameworks tailored to your industry",
      "Actionable market feasibility and revenue diagnostics",
      "Cost optimization without compromising product quality",
      "Investor pitch-deck and fundraising advisory",
      "Risk management and corporate restructuring models",
    ],
    subOfferings: [
      {
        title: "Growth Strategy",
        desc: "Scaling operations sustainably while preserving margin profitability.",
      },
      {
        title: "Financial Modeling",
        desc: "Forecasting operational revenue and cash requirements accurately.",
      },
      {
        title: "Due Diligence",
        desc: "Thorough auditing and valuation support for mergers and investments.",
      },
      {
        title: "Operational Turnaround",
        desc: "Eliminating inefficiencies to restore bottom-line health.",
      },
    ],
  },
  "gst-compliance": {
    titleFirst: "GST &",
    titleSecond: "Compliance",
    subtitle:
      "End-to-end Goods and Services Tax advisory, registration, seamless reconciliations, and penalty-free return filings.",
    mainImage:
      "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80",
    overviewP1:
      "GST compliance requires disciplined tracking of sales invoices, purchase registers, and input tax credit adjustments. We ensure your enterprise satisfies all statutory deadlines without disruption.",
    overviewP2:
      "We run advanced 2A/2B reconciliations every month to ensure zero leakage of Input Tax Credit, protecting your working capital from avoidable tax outgo.",
    whyImage:
      "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=800&q=80",
    whyPoints: [
      "Accurate filing of GSTR-1, GSTR-3B, and annual GSTR-9 returns",
      "100% Input Tax Credit reconciliation to eliminate cash leakage",
      "Complete exemption from late-filing fees and penalties",
      "Proactive response handling for departmental GST notices",
      "Expert classification under accurate HSN/SAC codes and rate slabs",
    ],
    subOfferings: [
      {
        title: "GST Registration",
        desc: "Expedited GSTIN allotment for fresh businesses and branches.",
      },
      {
        title: "Monthly Filings",
        desc: "Meticulous calculation and timely return submission every tax cycle.",
      },
      {
        title: "ITC Reconciliation",
        desc: "Matching purchase registers against supplier portal uploads.",
      },
      {
        title: "Notice Rectification",
        desc: "Resolving mismatches, scrutiny letters, and demand rectifications.",
      },
    ],
  },
  "itr-filing": {
    titleFirst: "ITR",
    titleSecond: "Filing",
    subtitle:
      "Hassle-free, accurate Income Tax Return filing for salaried individuals, professionals, and corporate entities.",
    mainImage:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    overviewP1:
      "Filing your Income Tax Return shouldn't be stressful. We ensure every legitimate deduction under Sections 80C to 80U is claimed to maximize your refund and eliminate defective-return notices.",
    overviewP2:
      "Whether you have capital gains from shares/real estate, multi-state freelance income, or complex corporate profit splits, our experienced tax professionals handle the filing seamlessly.",
    whyImage:
      "https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&w=800&q=80",
    whyPoints: [
      "Maximum tax refund realization through exhaustive deduction checks",
      "Zero error rate on capital gains and crypto income calculations",
      "Filing strictly prior to deadlines to prevent Section 234F penalties",
      "AIS and 26AS reconciliation to prevent scrutiny notices",
      "Digital verification and acknowledgement slip generation",
    ],
    subOfferings: [
      {
        title: "Salaried ITR",
        desc: "Form 16 based swift tax computation and return submission.",
      },
      {
        title: "Capital Gains Tax",
        desc: "Accurate computation for stock markets, mutual funds, and properties.",
      },
      {
        title: "Corporate Tax Return",
        desc: "Audited return preparation for Private Limited and LLP firms.",
      },
      {
        title: "Defective Notice Help",
        desc: "Resolving 139(9) defects and filing updated/revised returns.",
      },
    ],
  },
  "investment-planning": {
    titleFirst: "Investment",
    titleSecond: "Planning",
    subtitle:
      "Strategic asset allocation and portfolio structuring designed to outpace inflation and compound wealth safely.",
    mainImage:
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80",
    overviewP1:
      "Smart investing is about balancing risk appetite with compounding returns. We analyze your time horizons to design balanced, diversified portfolios across equity, debt, and liquid instruments.",
    overviewP2:
      "We help you avoid speculative pitfalls by adhering to disciplined asset allocation models that systematically grow capital over 3, 5, and 10-year horizons.",
    whyImage:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
    whyPoints: [
      "Asset allocation tailored to your specific risk tolerance",
      "Tax-efficient investment instruments to boost net yield",
      "Portfolio rebalancing during volatile market cycles",
      "Elimination of overlapping and underperforming funds",
      "Transparent wealth performance reporting and tracking",
    ],
    subOfferings: [
      {
        title: "Mutual Funds & SIPs",
        desc: "Handpicked equity and debt schemes aligned with your goals.",
      },
      {
        title: "Tax Saving Funds",
        desc: "Maximizing Section 80C benefits through high-performing ELSS.",
      },
      {
        title: "Fixed Income Assets",
        desc: "Securing stable returns through government bonds and corporate FDs.",
      },
      {
        title: "Portfolio Healthcheck",
        desc: "In-depth review of existing investments to optimize returns.",
      },
    ],
  },
  "company-registration": {
    titleFirst: "Company",
    titleSecond: "Registration",
    subtitle:
      "Fast, seamless incorporation for Private Limited, LLP, OPC, and Partnership businesses with full ROC compliance.",
    mainImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    overviewP1:
      "Turning your entrepreneurial vision into a legitimate corporate entity is effortless with our incorporation experts. We handle name approval, SPICe+ forms, digital signatures, and DIN registrations.",
    overviewP2:
      "We draft MCA-compliant Articles of Association (AOA) and Memorandums of Association (MOA), helping you obtain your Certificate of Incorporation, PAN, and TAN without bureaucratic delay.",
    whyImage:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    whyPoints: [
      "End-to-end incorporation paperwork handled completely online",
      "Government-compliant drafting of MOA, AOA, and partnership deeds",
      "Dedicated DIN, DSC, and ROC approval assistance",
      "Free PAN, TAN, and current bank account opening facilitation",
      "Post-incorporation guidance on first-year statutory compliance",
    ],
    subOfferings: [
      {
        title: "Private Limited Co.",
        desc: "The gold standard for startups seeking equity funding and scale.",
      },
      {
        title: "LLP Incorporation",
        desc: "Ideal for professional partnerships needing limited liability protection.",
      },
      {
        title: "One Person Co. (OPC)",
        desc: "Corporate stature with 100% sole owner control.",
      },
      {
        title: "MSME / Startup India",
        desc: "Unlocking government tax holidays, seed grants, and subsidies.",
      },
    ],
  },
  "accounting-bookkeeping": {
    titleFirst: "Accounting &",
    titleSecond: "Bookkeeping",
    subtitle:
      "Accurate, audit-ready financial bookkeeping to maintain ledger clarity and give you complete control over your business numbers.",
    mainImage:
      "https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=1200&q=80",
    overviewP1:
      "A clean set of financial books is the foundation of every thriving company. We record day-to-day purchases, sales, invoices, and bank statements with precision on cloud platforms.",
    overviewP2:
      "Our bookkeeping services ensure your P&L, balance sheets, and cash flow forecasts are always accurate and ready for investors, banks, or statutory tax audits.",
    whyImage:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    whyPoints: [
      "Audit-ready ledgers maintained on modern cloud software",
      "Prompt bank and payment gateway reconciliation",
      "Real-time visibility into cash flow and receivable aging",
      "Accurate P&L and Balance Sheet reports generated monthly",
      "Reduced administrative costs with outsourced efficiency",
    ],
    subOfferings: [
      {
        title: "Daily Bookkeeping",
        desc: "Timely recording of incoming payments, vendor bills, and vouchers.",
      },
      {
        title: "Bank Reconciliation",
        desc: "Eliminating ledger-bank discrepancies on a recurring schedule.",
      },
      {
        title: "Financial Reporting",
        desc: "Monthly management information systems (MIS) and balance sheets.",
      },
      {
        title: "Cloud Accounting",
        desc: "Setup and migration to QuickBooks, Zoho Books, or Tally Prime.",
      },
    ],
  },
  "payroll-services": {
    titleFirst: "Payroll",
    titleSecond: "Services",
    subtitle:
      "Complete payroll processing, salary disbursement structures, and statutory compliance covering PF, ESI, and TDS.",
    mainImage:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    overviewP1:
      "Managing employee payroll requires precise handling of salary structures, leave deductions, overtime, and statutory contributions. We automate your monthly payroll workflow end-to-end.",
    overviewP2:
      "From generating employee pay slips to depositing EPF, ESI, and Professional Tax, we safeguard your company against labor law defaults and non-compliance fines.",
    whyImage:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
    whyPoints: [
      "100% timely salary processing and payslip generation",
      "Zero-defect computation of PF, ESIC, and Professional Tax",
      "Form 16 generation and employee tax declaration management",
      "Custom compensation structuring to maximize take-home pay",
      "Full compliance with state and central labor regulations",
    ],
    subOfferings: [
      {
        title: "Monthly Payroll",
        desc: "Automated calculations of deductions, bonuses, and gross salaries.",
      },
      {
        title: "EPF & ESIC Filings",
        desc: "Monthly challan generation and statutory compliance deposits.",
      },
      {
        title: "Payslip Portal",
        desc: "Direct distribution of password-protected payslips to employees.",
      },
      {
        title: "Labor Law Compliance",
        desc: "Annual returns and regulatory compliance documentation.",
      },
    ],
  },
  "audit-assurance": {
    titleFirst: "Audit &",
    titleSecond: "Assurance",
    subtitle:
      "Independent, rigorous audit and assurance services that build stakeholder trust and verify financial integrity.",
    mainImage:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    overviewP1:
      "Our audit and assurance services provide independent verification of your financial statements, identifying operational vulnerabilities and assuring regulatory compliance.",
    overviewP2:
      "We conduct statutory audits, internal financial control assessments, and tax audits that give investors, directors, and banks unconditional confidence in your reported numbers.",
    whyImage:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    whyPoints: [
      "Unbiased evaluation of internal controls and financial statements",
      "Strict compliance with MCA and Income Tax audit standards",
      "Early detection of accounting inconsistencies and compliance leaks",
      "Comprehensive management letters detailing actionable risk insights",
      "Stronger financial credibility with banking and investment partners",
    ],
    subOfferings: [
      {
        title: "Statutory Audit",
        desc: "Mandatory corporate auditing under the Companies Act guidelines.",
      },
      {
        title: "Tax Audit (44AB)",
        desc: "Exhaustive audits to ensure compliance with Income Tax limits.",
      },
      {
        title: "Internal Controls",
        desc: "Evaluating operational systems to prevent fraud and financial leakage.",
      },
      {
        title: "Stock & Asset Audit",
        desc: "Physical asset verification and inventory reconciliation.",
      },
    ],
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Dynamic SEO Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const targetKey = slugAliases[slug] || slug;
  const currentService =
    servicesDataMap[targetKey] || servicesDataMap["tax-consulting"];

  const title = `${currentService.titleFirst} ${currentService.titleSecond} | ${siteName}`;
  const description = currentService.subtitle;

  return {
    title,
    description,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Resolve mapped or direct slug
  const targetKey = slugAliases[slug] || slug;

  // Safe Fallback
  const currentService =
    servicesDataMap[targetKey] || servicesDataMap["tax-consulting"];

  // Extract dynamic sidebar services list from JSON Header navLinks
  const navServices =
    siteData.categories?.TaxConsulting?.sections?.Header?.variants?.TaxHeader1?.navLinks?.find(
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
      : [
          { slug: "tax-consulting", title: "Tax Consulting", icon: Briefcase },
          { slug: "financial-planning", title: "Financial Planning", icon: PiggyBank },
          { slug: "business-advisory", title: "Business Advisory", icon: ShieldAlert },
          { slug: "gst-compliance", title: "GST & Compliance", icon: FileSpreadsheet },
          { slug: "itr-filing", title: "ITR Filing", icon: FileCheck2 },
          { slug: "investment-planning", title: "Investment Planning", icon: BarChart3 },
          { slug: "company-registration", title: "Company Registration", icon: Building2 },
          { slug: "accounting-bookkeeping", title: "Accounting & Bookkeeping", icon: Calculator },
          { slug: "payroll-services", title: "Payroll Services", icon: Receipt },
          { slug: "audit-assurance", title: "Audit & Assurance", icon: SearchCheck },
        ];

  // Dynamic Service Title for Banner
  const dynamicServiceTitle =
    dynamicSidebarList.find((s: any) => s.slug === targetKey)?.title ||
    `${currentService.titleFirst} ${currentService.titleSecond}`;

  // Common contact info
  const phoneNumber = common.phone || "123-456-7890";
  const emailAddress = common.email || "info@taxpro.com";
  const officeAddress =
    common.address ||
    "8708 Technology Forest Pl Suite 125-G, The Woodlands, TX 77381";

  return (
    <main className="min-h-screen bg-[#FBFDFA]">
      <Navbar />

      {/* Dynamic PageBanner Title and Breadcrumb */}
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
          
          {/* ================= LEFT SIDEBAR (STICKY) ================= */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* 1. Our Services Box (Dynamic) */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-[#0A1A2F] px-6 py-5">
                <h3 className="text-white font-bold text-lg tracking-wide">
                  Our Services
                </h3>
                <div className="w-10 h-0.5 bg-[#00A859] mt-2 rounded-full" />
              </div>

              <div className="p-3 space-y-1.5">
                {dynamicSidebarList.map((item: any) => {
                  const isActive = item.slug === targetKey;
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

            {/* 2. Get In Touch Box (Dynamic Common Data) */}
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

          {/* ================= RIGHT MAIN CONTENT ================= */}
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

            <div className="grid grid-cols-2 sm:grid-cols-4 rounded-2xl bg-[#F6FBF8] border border-gray-100 overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-gray-200 mb-10">
              <div className="p-4 text-center flex flex-col items-center justify-center">
                <Coins className="w-6 h-6 text-[#00A859] mb-2" />
                <span className="text-xs font-bold text-[#0A1A2F]">
                  Reduce Tax Liability
                </span>
              </div>
              <div className="p-4 text-center flex flex-col items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-[#00A859] mb-2" />
                <span className="text-xs font-bold text-[#0A1A2F]">
                  Stay Compliant
                </span>
              </div>
              <div className="p-4 text-center flex flex-col items-center justify-center">
                <Users2 className="w-6 h-6 text-[#00A859] mb-2" />
                <span className="text-xs font-bold text-[#0A1A2F]">
                  Expert Guidance
                </span>
              </div>
              <div className="p-4 text-center flex flex-col items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[#00A859] mb-2" />
                <span className="text-xs font-bold text-[#0A1A2F]">
                  Strategic Planning
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#0A1A2F]">Overview</h2>
              <div className="w-12 h-1 bg-[#00A859] mt-2 mb-4 rounded-full" />

              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {currentService.overviewP1}
              </p>

              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                {currentService.overviewP2}
              </p>
            </div>

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

            <div>
              <h2 className="text-xl font-bold text-[#0A1A2F]">
                Our {currentService.titleFirst} {currentService.titleSecond} Services Include
              </h2>
              <div className="w-12 h-1 bg-[#00A859] mt-2 mb-6 rounded-full" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {currentService.subOfferings.map((card, i) => {
                  const icons = [FileSearch, FileSpreadsheet, Users, Scale];
                  const SubIcon = icons[i % icons.length];
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

          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}