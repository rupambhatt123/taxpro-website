"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";
import PageBanner from "../../../components/common/PageBanner";
import { Mail, Phone, MapPin, Send, Check, ArrowRight } from "lucide-react";
import rawSiteData from "../../../data/siteData.json";

const siteData = rawSiteData as any;

export default function ContactPage() {
  const common = siteData.common || {};
  const contactVariant =
    siteData.categories?.TaxConsulting?.sections?.Contact?.variants?.TaxContact1 || {};

  const badgeText = contactVariant.badge || "CONTACT US";
  const titleLine1 = contactVariant.titleLine1 || "";
  const titleLine2 = contactVariant.titleLine2 || "";
  const titleHighlight = contactVariant.titleHighlight || "";
  const descriptionText = contactVariant.description || "";

  const phoneNumber = contactVariant.call?.phone || common.phone;
  const phoneTitle = contactVariant.call?.title || "Call or Text";
  const phoneHours = contactVariant.call?.hours || common.officeHours;

  const emailAddress = contactVariant.email?.email || common.email;
  const emailTitle = contactVariant.email?.title || "Email Us";
  const emailNote = contactVariant.email?.note || "We reply within 30 minutes";

  const officeAddress = contactVariant.office?.address || common.address;
  const officeTitle = contactVariant.office?.title || "Our Office";

  const mapUrl =
    contactVariant.mapLocation?.embedUrl ||
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110502.6118939768!2d-95.53597652701037!3d30.165819777550868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864736bfa5a9757f%3A0xe5c9941a547fae32!2sThe%20Woodlands%2C%20TX!5e0!3m2!1sen!2sus!4v1716500000000!5m2!1sen!2sus";

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
  };

  return (
    <main className="min-h-screen bg-[#FBFDFA] overflow-x-hidden">
      <Navbar />

      <PageBanner
        title={badgeText}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: badgeText },
        ]}
      />

      <section className="pt-6 sm:pt-8 lg:pt-10 pb-12 sm:pb-16 lg:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {submitted ? (
          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-[0_15px_45px_rgba(0,0,0,0.05)] p-8 sm:p-14 text-center animate-in fade-in zoom-in-95 duration-500">
            <div className="relative inline-flex items-center justify-center mb-6">
              <div className="absolute inset-0 -m-3 border-2 border-dashed border-[#00A859]/30 rounded-full animate-spin-slow pointer-events-none" />
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#EAF8F1] flex items-center justify-center text-[#00A859] shadow-md relative z-10">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#00A859] text-white flex items-center justify-center shadow-md">
                  <Check className="w-8 h-8 sm:w-9 sm:h-9 stroke-[3]" />
                </div>
              </div>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-[#0A1A2F] tracking-tight leading-tight mb-3">
              Thank <span className="text-[#00A859]">You!</span>
            </h2>

            <h3 className="text-xl sm:text-2xl font-black text-[#0A1A2F] mb-4">
              Your message has been sent successfully.
            </h3>

            <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-base leading-relaxed mb-8">
              We appreciate you reaching out to us. Our team will review your information and get back to you within 30 minutes during business hours.
            </p>

            <div className="mb-12">
              <Link
                href="/services"
                className="inline-flex items-center gap-3 px-9 py-4 bg-[#0A1A2F] hover:bg-[#00A859] text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-[#00A859]/25 hover:-translate-y-0.5 active:scale-95"
              >
                <span>EXPLORE SERVICES</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t border-gray-100 bg-gray-50/70 p-6 rounded-2xl">
              {phoneNumber && (
                <div className="flex items-center gap-3 text-left">
                  <div className="w-11 h-11 rounded-full bg-[#EAF8F1] text-[#00A859] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0A1A2F] uppercase">{phoneTitle}</h4>
                    <p className="text-xs sm:text-sm font-extrabold text-[#0A1A2F]">{phoneNumber}</p>
                    {phoneHours && <p className="text-[11px] text-gray-500">{phoneHours}</p>}
                  </div>
                </div>
              )}

              {emailAddress && (
                <div className="flex items-center gap-3 text-left md:border-l md:border-gray-200 md:pl-4">
                  <div className="w-11 h-11 rounded-full bg-[#EAF8F1] text-[#00A859] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0A1A2F] uppercase">{emailTitle}</h4>
                    <p className="text-xs sm:text-sm font-extrabold text-[#0A1A2F] break-all">{emailAddress}</p>
                    <p className="text-[11px] text-gray-500">{emailNote}</p>
                  </div>
                </div>
              )}

              {officeAddress && (
                <div className="flex items-center gap-3 text-left md:border-l md:border-gray-200 md:pl-4">
                  <div className="w-11 h-11 rounded-full bg-[#EAF8F1] text-[#00A859] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0A1A2F] uppercase">{officeTitle}</h4>
                    <p className="text-xs text-gray-600 font-medium leading-snug line-clamp-2">{officeAddress}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6">
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: "", email: "", phone: "", service: "", message: "" });
                }}
                className="text-xs font-bold text-gray-400 hover:text-[#00A859] underline cursor-pointer"
              >
                Send another message
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-5 space-y-5">
              <div>
                {badgeText && (
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E3F7EC] text-[#008A44] text-xs font-black tracking-wider uppercase mb-2.5">
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
                  <p className="mt-2.5 text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {descriptionText}
                  </p>
                )}
              </div>

              <div className="space-y-3.5 pt-1">
                {phoneNumber && (
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-xs">
                    <div className="w-11 h-11 rounded-xl bg-[#EAF8F1] text-[#00A859] flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{phoneTitle}</h4>
                      <p className="text-sm sm:text-base font-bold text-[#0A1A2F] mt-0.5">{phoneNumber}</p>
                    </div>
                  </div>
                )}

                {emailAddress && (
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-xs">
                    <div className="w-11 h-11 rounded-xl bg-[#EAF8F1] text-[#00A859] flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{emailTitle}</h4>
                      <p className="text-sm sm:text-base font-bold text-[#0A1A2F] mt-0.5">{emailAddress}</p>
                      {emailNote && <p className="text-[11px] text-gray-400 mt-0.5">{emailNote}</p>}
                    </div>
                  </div>
                )}

                {officeAddress && (
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-xs">
                    <div className="w-11 h-11 rounded-xl bg-[#EAF8F1] text-[#00A859] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{officeTitle}</h4>
                      <p className="text-xs sm:text-sm font-semibold text-[#0A1A2F] mt-0.5 leading-snug">
                        {officeAddress}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-lg relative">
                <h3 className="text-xl sm:text-2xl font-black text-[#0A1A2F] mb-1">
                  Send Us a Message
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mb-5">
                  Fill out the form below and our team will get back to you shortly.
                </p>

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
        )}

        {mapUrl && (
          <div className="mt-10 sm:mt-12 lg:mt-14 w-full h-[340px] sm:h-[400px] rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Our Location Map"
            />
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}