"use client";

import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section className="pt-12 pb-6 lg:pt-20 lg:pb-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="jp-divider" />
            <h1 className="font-playfair text-4xl md:text-5xl text-[#2f4858] mb-4">
              Contact
            </h1>
            <p className="text-lg text-[#6b7c8a] max-w-2xl">
              Have a question, want to schedule a viewing, or simply want to
              learn more? We&apos;d love to hear from you.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <AnimatedSection>
              {submitted ? (
                <div className="bg-[#eaeff3]/60 rounded-sm p-12 text-center">
                  <span className="text-4xl mb-4 block text-[#ffc14d]">✓</span>
                  <h2 className="font-playfair text-2xl text-[#2f4858] mb-2">
                    Thank You
                  </h2>
                  <p className="text-[#6b7c8a]">
                    We&apos;ve received your message and will get back to you
                    within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs tracking-wide text-[#6b7c8a] uppercase mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-white border border-[#eaeff3] rounded-sm text-sm text-[#131110] focus:outline-none focus:border-[#5a73d7] transition-colors"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-xs tracking-wide text-[#6b7c8a] uppercase mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-white border border-[#eaeff3] rounded-sm text-sm text-[#131110] focus:outline-none focus:border-[#5a73d7] transition-colors"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs tracking-wide text-[#6b7c8a] uppercase mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-white border border-[#eaeff3] rounded-sm text-sm text-[#131110] focus:outline-none focus:border-[#5a73d7] transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-wide text-[#6b7c8a] uppercase mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 bg-white border border-[#eaeff3] rounded-sm text-sm text-[#131110] focus:outline-none focus:border-[#5a73d7] transition-colors"
                      placeholder="+254 712 678 334"
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-wide text-[#6b7c8a] uppercase mb-2">
                      I&apos;m interested in
                    </label>
                    <select className="w-full px-4 py-3 bg-white border border-[#eaeff3] rounded-sm text-sm text-[#131110] focus:outline-none focus:border-[#5a73d7] transition-colors appearance-none">
                      <option>Buying a property</option>
                      <option>Renting a property</option>
                      <option>Off-plan investment</option>
                      <option>Scheduling a viewing</option>
                      <option>General enquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs tracking-wide text-[#6b7c8a] uppercase mb-2">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-3 bg-white border border-[#eaeff3] rounded-sm text-sm text-[#131110] focus:outline-none focus:border-[#5a73d7] transition-colors resize-none"
                      placeholder="Tell us what you're looking for..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-8 py-3.5 bg-[#2f4858] text-white text-sm tracking-wide font-medium rounded-sm hover:bg-[#5a73d7] transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </AnimatedSection>

            {/* Info */}
            <AnimatedSection delay={0.2}>
              <div className="space-y-10">
                <div>
                  <h3 className="font-playfair text-xl text-[#2f4858] mb-4">Visit Our Office</h3>
                  <p className="text-[#6b7c8a] leading-relaxed">
                    Kilimani, near Yaya Center<br />
                    Nairobi, Kenya
                  </p>
                </div>
                <div>
                  <h3 className="font-playfair text-xl text-[#2f4858] mb-4">Get in Touch</h3>
                  <div className="space-y-2 text-[#6b7c8a]">
                    <p>
                      Email:{" "}
                      <a href="mailto:hello@wanderealty.com" className="text-[#5a73d7] hover:underline">
                        hello@wanderealty.com
                      </a>
                    </p>
                    <p>
                      Phone:{" "}
                      <a href="tel:+254712678334" className="text-[#5a73d7] hover:underline">
                        +254 712 678 334
                      </a>
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-playfair text-xl text-[#2f4858] mb-4">Office Hours</h3>
                  <div className="text-[#6b7c8a] text-sm space-y-1">
                    <p>Monday — Friday: 8:00 AM — 6:00 PM</p>
                    <p>Saturday: 9:00 AM — 3:00 PM</p>
                    <p>Sunday: By appointment</p>
                  </div>
                </div>
                <div>
                  <a
                    href="https://wa.me/254712678334?text=Hello Wande Realty, I'd like to enquire about a property."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3 bg-[#25D366] text-white text-sm rounded-sm hover:bg-[#1fb855] transition-colors"
                  >
                    💬 Chat on WhatsApp
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
