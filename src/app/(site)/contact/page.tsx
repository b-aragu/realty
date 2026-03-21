"use client";

import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";

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
                    href="https://wa.me/254140530539?text=Hello Wande Realty, I'd like to enquire about a property."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 w-fit border border-[#c49a3c]/30 bg-transparent text-[#1c2340] px-6 py-4 text-[0.56rem] tracking-[0.24em] uppercase hover:border-[#c49a3c] hover:bg-[#c49a3c]/5 transition-colors duration-300"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#c49a3c] group-hover:scale-110 transition-transform duration-300">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
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
