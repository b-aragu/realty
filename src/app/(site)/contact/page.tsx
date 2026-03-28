"use client";

import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import { buildWhatsAppHref } from "@/lib/whatsapp";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      interest: formData.get("interest"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send message");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header — editorial two-column */}
      <section className="pt-12 pb-0 lg:pt-20 lg:pb-0">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 items-end gap-8 lg:gap-16 pb-10 border-b border-[#dde1ee]">
              <div>
                <p className="text-[0.52rem] tracking-[0.38em] uppercase text-[#2e4480] mb-3">Get in Touch</p>
                <h1 className="font-cormorant font-light text-[clamp(3rem,5vw,5rem)] leading-[1.04] text-[#1c2340]">
                  Con<em className="italic text-[#3a5299]">tact</em>
                </h1>
                <div className="w-8 h-px bg-[#c49a3c] mt-5" />
              </div>
              <p className="text-[0.68rem] leading-[2.1] tracking-[0.08em] text-[#8b91a8] max-w-[38ch] lg:text-right">
                Have a question, want to schedule a viewing, or simply want to
                learn more? We&apos;d love to hear from you.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <AnimatedSection>
              {submitted ? (
                <div className="bg-[#f8f7f4] p-12 text-center border border-[#dde1ee]">
                  <span className="text-3xl mb-4 block text-[#c49a3c]">✓</span>
                  <h2 className="font-cormorant font-light text-[1.8rem] text-[#1c2340] mb-2">
                    Thank You
                  </h2>
                  <p className="text-[0.68rem] leading-[2] text-[#8b91a8]">
                    We&apos;ve received your message and will get back to you
                    within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-[0.5rem] tracking-[0.26em] text-[#8b91a8] uppercase mb-2">
                        First Name *
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-[#f8f7f4] border border-[#dde1ee] text-[0.72rem] text-[#1c2340] focus:outline-none focus:border-[#2e4480] transition-colors"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-[0.5rem] tracking-[0.26em] text-[#8b91a8] uppercase mb-2">
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        className="w-full px-4 py-3 bg-[#f8f7f4] border border-[#dde1ee] text-[0.72rem] text-[#1c2340] focus:outline-none focus:border-[#2e4480] transition-colors"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[0.5rem] tracking-[0.26em] text-[#8b91a8] uppercase mb-2">
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-[#f8f7f4] border border-[#dde1ee] text-[0.72rem] text-[#1c2340] focus:outline-none focus:border-[#2e4480] transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-[0.5rem] tracking-[0.26em] text-[#8b91a8] uppercase mb-2">
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="w-full px-4 py-3 bg-[#f8f7f4] border border-[#dde1ee] text-[0.72rem] text-[#1c2340] focus:outline-none focus:border-[#2e4480] transition-colors"
                      placeholder="+254 7XX XXX XXX"
                    />
                  </div>
                  <div>
                    <label htmlFor="interest" className="block text-[0.5rem] tracking-[0.26em] text-[#8b91a8] uppercase mb-2">
                      I&apos;m interested in
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      className="w-full px-4 py-3 bg-[#f8f7f4] border border-[#dde1ee] text-[0.72rem] text-[#1c2340] focus:outline-none focus:border-[#2e4480] transition-colors appearance-none cursor-pointer"
                    >
                      <option>Buying a property</option>
                      <option>Renting a property</option>
                      <option>Off-plan investment</option>
                      <option>Scheduling a viewing</option>
                      <option>Short-term stay</option>
                      <option>General enquiry</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-[0.5rem] tracking-[0.26em] text-[#8b91a8] uppercase mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full px-4 py-3 bg-[#f8f7f4] border border-[#dde1ee] text-[0.72rem] text-[#1c2340] focus:outline-none focus:border-[#2e4480] transition-colors resize-none"
                      placeholder="Tell us what you're looking for..."
                    />
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-[0.65rem] rounded">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-8 py-3.5 bg-[#1c2340] text-white text-[0.55rem] tracking-[0.28em] uppercase font-light hover:bg-[#2e4480] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </AnimatedSection>

            {/* Info */}
            <AnimatedSection delay={0.2}>
              <div className="space-y-10">
                <div>
                  <h3 className="font-cormorant font-light text-[1.4rem] text-[#1c2340] mb-4">Visit Our Office</h3>
                  <p className="text-[0.68rem] leading-[2] text-[#8b91a8]">
                    Kilimani, near Yaya Center<br />
                    Nairobi, Kenya
                  </p>
                </div>
                <div>
                  <h3 className="font-cormorant font-light text-[1.4rem] text-[#1c2340] mb-4">Get in Touch</h3>
                  <div className="space-y-2 text-[0.68rem] text-[#8b91a8]">
                    <p>
                      Email:{" "}
                      <a href="mailto:info@wanderealty.com" className="text-[#2e4480] hover:text-[#1c2340] transition-colors">
                        info@wanderealty.com
                      </a>
                    </p>
                    <p>
                      Phone:{" "}
                      <a href="tel:+254140530539" className="text-[#2e4480] hover:text-[#1c2340] transition-colors">
                        +254 140 530 539
                      </a>
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-cormorant font-light text-[1.4rem] text-[#1c2340] mb-4">Office Hours</h3>
                  <div className="text-[#8b91a8] text-[0.65rem] space-y-1 leading-[1.8]">
                    <p>Monday — Friday: 8:00 AM — 6:00 PM</p>
                    <p>Saturday: 9:00 AM — 3:00 PM</p>
                    <p>Sunday: By appointment</p>
                  </div>
                </div>
                <div>
                    <a
                      href={buildWhatsAppHref({
                        intro: "Hello Wande Realty, I'm reaching out from your Contact page. I'd like to enquire about a property.",
                        pagePath: "/contact",
                        source: "contact_page_direct"
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 w-fit border border-[#c49a3c]/30 bg-transparent text-[#1c2340] px-6 py-4 text-[0.56rem] tracking-[0.24em] uppercase hover:border-[#c49a3c] hover:bg-[#c49a3c]/5 transition-colors duration-300"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#c49a3c] group-hover:scale-110 transition-transform duration-300">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      Chat on WhatsApp
                      <span className="opacity-0 -translate-x-2 w-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:w-auto transition-all duration-300 text-[#c49a3c]">→</span>
                    </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
