"use client";

import { useState } from "react";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";
import PageBanner from "../../../components/common/PageBanner";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import rawSiteData from "../../../data/siteData.json";

const siteData = rawSiteData as any;

export default function ContactPage() {
  const common = siteData.common || {};
  const contactVariant =
    siteData.categories?.TaxConsulting?.sections?.Contact?.variants?.TaxContact1 || {};

  // 1. Dynamic Titles & Headers from JSON
  const badgeText = contactVariant.badge || "CONTACT US";
  const titleLine1 = contactVariant.titleLine1 || "";
  const titleLine2 = contactVariant.titleLine2 || "";
  const titleHighlight = contactVariant.titleHighlight || "";
  const descriptionText = contactVariant.description || "";

  // 2. Dynamic Contact Cards
  const phoneNumber = contactVariant.call?.phone || common.phone;
  const phoneTitle = contactVariant.call?.title || "Phone Number";

  const emailAddress = contactVariant.email?.email || common.email;
  const emailTitle = contactVariant.email?.title || "Email Address";
  const emailNote = contactVariant.email?.note;

  const officeAddress = contactVariant.office?.address || common.address;
  const officeTitle = contactVariant.office?.title || "Office Location";

  const officeHours = common.officeHours || contactVariant.workingHours?.hours;
  const officeHoursTitle = contactVariant.workingHours?.title || "Working Hours";

  // 3. Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    }, 4000);
  };

  return (
    <main className="min-h-screen bg-[#FBFDFA] overflow-x-hidden">
      {/* Header */}
      <Navbar />

      {/* Top Banner */}
      <PageBanner
        title={badgeText}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: badgeText },
        ]}
      />

      {/* Dynamic Content Section */}
      <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Left Column: Contact Information Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              {badgeText && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E3F7EC] text-[#008A44] text-xs font-black tracking-wider uppercase mb-3">
                  <span>{badgeText}</span>
                </div>
              )}

              {(titleLine1 || titleHighlight || titleLine2) && (
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0A1A2F] tracking-tight leading-tight">
                  {titleLine1} {titleLine2}{" "}
                  {titleHighlight && <span className="text-[#00A859]">{titleHighlight}</span>}
                </h2>
              )}

              {descriptionText && (
                <p className="mt-3 text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {descriptionText}
                </p>
              )}
            </div>

            <div className="space-y-4 pt-2">
              {/* Phone Card */}
              {phoneNumber && (
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-xs">
                  <div className="w-11 h-11 rounded-xl bg-[#EAF8F1] text-[#00A859] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{phoneTitle}</h4>
                    <p className="text-sm sm:text-base font-bold text-[#0A1A2F] mt-0.5">{phoneNumber}</p>
                  </div>
                </div>
              )}

              {/* Email Card */}
              {emailAddress && (
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-xs">
                  <div className="w-11 h-11 rounded-xl bg-[#EAF8F1] text-[#00A859] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{emailTitle}</h4>
                    <p className="text-sm sm:text-base font-bold text-[#0A1A2F] mt-0.5">{emailAddress}</p>
                    {emailNote && <p className="text-[11px] text-gray-400 mt-0.5">{emailNote}</p>}
                  </div>
                </div>
              )}

              {/* Office Address Card */}
              {officeAddress && (
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-xs">
                  <div className="w-11 h-11 rounded-xl bg-[#EAF8F1] text-[#00A859] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{officeTitle}</h4>
                    <p className="text-xs sm:text-sm font-semibold text-[#0A1A2F] mt-0.5 leading-snug">
                      {officeAddress}
                    </p>
                  </div>
                </div>
              )}

              {/* Working Hours Card (Only if exists in JSON) */}
              {officeHours && (
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-xs">
                  <div className="w-11 h-11 rounded-xl bg-[#EAF8F1] text-[#00A859] flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{officeHoursTitle}</h4>
                    <p className="text-xs sm:text-sm font-semibold text-[#0A1A2F] mt-0.5">{officeHours}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-lg relative">
              <h3 className="text-xl sm:text-2xl font-black text-[#0A1A2F] mb-1">
                Send Us a Message
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mb-6">
                Fill out the form below and our team will get back to you shortly.
              </p>

              {submitted && (
                <div className="mb-6 p-4 rounded-xl bg-[#EAF8F1] border border-[#00A859]/30 text-[#008A44] flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <p className="text-xs sm:text-sm font-bold">
                    Thank you! Your message has been sent successfully.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#00A859] focus:ring-1 focus:ring-[#00A859] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={emailAddress || "e.g. john@example.com"}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#00A859] focus:ring-1 focus:ring-[#00A859] transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder={phoneNumber || "e.g. +1 234 567 890"}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#00A859] focus:ring-1 focus:ring-[#00A859] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">
                      Subject / Service
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ITR Filing, Tax Advice"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#00A859] focus:ring-1 focus:ring-[#00A859] transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:border-[#00A859] focus:ring-1 focus:ring-[#00A859] transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#00A859] hover:bg-[#00924D] text-white text-xs sm:text-sm font-bold tracking-wider uppercase rounded-xl transition shadow-md active:scale-95 cursor-pointer"
                >
                  <span>SEND MESSAGE</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}